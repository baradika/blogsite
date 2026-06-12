const CACHE_KEY = 'lastfm-last-played'
const CACHE_DURATION = 15 * 60 * 1000
const MAX_RETRIES = 2

const USERNAME = 'baradika'
const API_KEY = '27ff964552f4b4eeba3cee11bd08b86f'
const RECENT_TRACKS_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`
const TRACK_INFO_URL = 'https://ws.audioscrobbler.com/2.0/?method=track.getInfo'
const FALLBACK_ALBUM_ART =
  'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png'

type Track = {
  name: string
  artist: { '#text': string }
  album: { '#text': string }
  image: { '#text': string }[]
  url: string
  date?: { uts?: string; '#text'?: string }
  '@attr'?: { nowplaying?: string }
}

type CachedData = {
  fetchedAt: number
  track: Track | null
  durationMs?: number
}

type TrackInfoResponse = {
  track?: {
    duration?: string
  }
}

const pendingContainers = new WeakSet<HTMLElement>()
const progressTimers = new WeakMap<HTMLElement, number>()

function getCachedTrack(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const parsed: CachedData = JSON.parse(cached)
    const isExpired = Date.now() - parsed.fetchedAt > CACHE_DURATION
    return isExpired ? null : parsed
  } catch (err) {
    console.warn('Invalid cache. Clearing it.', err)
    localStorage.removeItem(CACHE_KEY)
    return null
  }
}

function setCachedTrack(track: Track | null, durationMs?: number): void {
  try {
    const cache: CachedData = { track, durationMs, fetchedAt: Date.now() }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch (err) {
    console.warn('Failed to cache track:', err)
  }
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, {
    signal,
    headers: { 'Cache-Control': 'no-cache' },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

async function fetchTrackWithRetry(
  retries = MAX_RETRIES,
): Promise<{ track: Track | null; durationMs?: number }> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2500)

    const data = await fetchJson<{ recenttracks?: { track?: Track[] } }>(
      RECENT_TRACKS_URL,
      controller.signal,
    )

    clearTimeout(timeoutId)

    const tracks = data?.recenttracks?.track
    if (!tracks || tracks.length === 0) {
      return { track: null }
    }

    const track = tracks[0] as Track
    const durationMs = await fetchTrackDuration(track)
    return { track, durationMs }
  } catch (error) {
    console.warn(`Fetch attempt failed (${MAX_RETRIES - retries + 1}):`, error)
    if (retries > 1) {
      return fetchTrackWithRetry(retries - 1)
    }
    return { track: null }
  }
}

async function fetchTrackDuration(track: Track): Promise<number | undefined> {
  const artist = track.artist['#text']?.trim()
  const name = track.name?.trim()
  if (!artist || !name) return undefined

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000)
    const params = new URLSearchParams({
      method: 'track.getInfo',
      api_key: API_KEY,
      artist,
      track: name,
      format: 'json',
      autocorrect: '1',
    })

    const data = await fetchJson<TrackInfoResponse>(
      `${TRACK_INFO_URL}&${params.toString()}`,
      controller.signal,
    )
    clearTimeout(timeoutId)

    const duration = Number(data?.track?.duration ?? 0)
    return Number.isFinite(duration) && duration > 0 ? duration : undefined
  } catch {
    return undefined
  }
}

function clearProgressTimer(container: HTMLElement) {
  const timer = progressTimers.get(container)
  if (timer) {
    window.clearInterval(timer)
    progressTimers.delete(container)
  }
}

function setContainerAccent(container: HTMLElement, color?: string) {
  if (color) {
    container.style.setProperty('--music-accent', color)
  } else {
    container.style.removeProperty('--music-accent')
  }
}

async function extractAverageColor(img: HTMLImageElement): Promise<string | undefined> {
  if (!img.complete || !img.naturalWidth || !img.naturalHeight) return undefined

  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return undefined

    const sampleSize = 24
    canvas.width = sampleSize
    canvas.height = sampleSize
    context.drawImage(img, 0, 0, sampleSize, sampleSize)
    const { data } = context.getImageData(0, 0, sampleSize, sampleSize)

    let r = 0
    let g = 0
    let b = 0
    let count = 0

    for (let i = 0; i < data.length; i += 16) {
      const alpha = data[i + 3]
      if (alpha < 64) continue
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      count += 1
    }

    if (count === 0) return undefined

    const average = [r, g, b].map((value) => Math.round(value / count))
    const boosted = average.map((value) =>
      Math.max(40, Math.min(215, Math.round(value * 0.9))),
    )

    return `rgb(${boosted[0]} ${boosted[1]} ${boosted[2]})`
  } catch {
    return undefined
  }
}

function updateProgressBar(
  container: HTMLElement,
  progressBar: HTMLElement,
  isNowPlaying: boolean,
  durationMs?: number,
  fetchedAt?: number,
) {
  clearProgressTimer(container)

  if (!durationMs || durationMs <= 0 || !isNowPlaying || !fetchedAt) {
    progressBar.style.width = '0%'
    return
  }

  const update = () => {
    const elapsed = Date.now() - fetchedAt
    const ratio = Math.max(0, Math.min(elapsed / durationMs, 1))
    progressBar.style.width = `${ratio * 100}%`

    if (ratio >= 1) {
      clearProgressTimer(container)
    }
  }

  update()
  const timer = window.setInterval(update, 1000)
  progressTimers.set(container, timer)
}

function renderEmpty(container: HTMLElement) {
  clearProgressTimer(container)
  container.dataset.state = 'empty'

  container.querySelector('#music-skeleton')?.remove()
  container.querySelector('#music-content')?.classList.add('hidden')

  const empty = container.querySelector<HTMLElement>('#music-empty')
  if (empty) {
    empty.classList.remove('hidden')
    empty.classList.add('flex')
  }
}

function renderTrack(
  container: HTMLElement,
  payload: { track: Track | null; durationMs?: number; fetchedAt: number },
) {
  const skeleton = container.querySelector('#music-skeleton')
  const content = container.querySelector<HTMLElement>('#music-content')
  const empty = container.querySelector<HTMLElement>('#music-empty')

  skeleton?.remove()
  empty?.classList.add('hidden')
  empty?.classList.remove('flex')

  if (!content) return

  if (!payload.track) {
    renderEmpty(container)
    return
  }

  const track = payload.track
  const isNowPlaying = track['@attr']?.nowplaying === 'true'
  container.dataset.state = isNowPlaying ? 'playing' : 'idle'

  content.classList.remove('hidden')
  content.classList.add('block')

  const albumArt = content.querySelector<HTMLImageElement>('#album-art')
  const status = content.querySelector<HTMLElement>('#now-playing')
  const songLink = content.querySelector<HTMLAnchorElement>('#song-link')
  const songTitle = content.querySelector<HTMLElement>('#song-title')
  const artistName = content.querySelector<HTMLElement>('#artist-name')
  const artistSeparator = content.querySelector<HTMLElement>('#separator-artist-name')
  const albumName = content.querySelector<HTMLElement>('#album-name')
  const progressWrap = content.querySelector<HTMLElement>('#progress-wrap')
  const progressBar = content.querySelector<HTMLElement>('#progress-bar')

  const artist = track.artist['#text']?.trim() ?? ''
  const album = track.album['#text']?.trim() ?? ''
  const artUrl = track.image?.[3]?.['#text'] || track.image?.[2]?.['#text'] || FALLBACK_ALBUM_ART

  if (albumArt) {
    albumArt.src = artUrl
    albumArt.crossOrigin = 'anonymous'
    albumArt.onload = async () => {
      const color = await extractAverageColor(albumArt)
      setContainerAccent(container, color)
    }
    if (albumArt.complete) {
      extractAverageColor(albumArt).then((color) => setContainerAccent(container, color))
    }
  }

  if (status) {
    status.className = isNowPlaying
      ? 'inline-flex items-center gap-1 text-xs font-medium text-primary'
      : 'inline-flex items-center gap-1 text-xs font-medium text-muted-foreground'
    status.innerHTML = isNowPlaying
      ? '<svg viewBox="0 0 16 16" aria-hidden="true" class="size-3 fill-current"><path d="M5 3.5v9l7-4.5-7-4.5Z"/></svg><span>Now playing</span>'
      : '<span>The last song played</span>'
  }

  if (songLink) songLink.href = track.url
  if (songTitle) songTitle.textContent = track.name
  if (artistName) artistName.textContent = artist
  if (albumName) albumName.textContent = album

  if (artistSeparator) {
    artistSeparator.classList.toggle('hidden', !artist || !album)
  }

  if (progressWrap && progressBar) {
    const showProgress = isNowPlaying && !!payload.durationMs
    progressWrap.classList.toggle('hidden', !showProgress)
    updateProgressBar(
      container,
      progressBar,
      isNowPlaying,
      payload.durationMs,
      payload.fetchedAt,
    )
  }
}

export function initMusicPresence(container: HTMLElement) {
  if (!container) return
  if (pendingContainers.has(container)) return

  clearProgressTimer(container)

  const content = container.querySelector('#music-content')
  const skeleton = container.querySelector('#music-skeleton')

  if (content && !content.classList.contains('hidden') && !skeleton) {
    return
  }

  pendingContainers.add(container)

  const cached = getCachedTrack()
  if (cached) {
    renderTrack(container, {
      track: cached.track,
      durationMs: cached.durationMs,
      fetchedAt: cached.fetchedAt,
    })
    pendingContainers.delete(container)

    fetchTrackWithRetry().then((result) => {
      setCachedTrack(result.track, result.durationMs)

      const current = JSON.stringify({
        track: cached.track,
        durationMs: cached.durationMs,
      })
      const next = JSON.stringify({
        track: result.track,
        durationMs: result.durationMs,
      })

      if (current !== next) {
        renderTrack(container, {
          track: result.track,
          durationMs: result.durationMs,
          fetchedAt: Date.now(),
        })
      }
    })
    return
  }

  fetchTrackWithRetry()
    .then((result) => {
      setCachedTrack(result.track, result.durationMs)
      renderTrack(container, {
        track: result.track,
        durationMs: result.durationMs,
        fetchedAt: Date.now(),
      })
    })
    .finally(() => {
      pendingContainers.delete(container)
    })
}
