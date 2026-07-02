import type { CSSProperties, HTMLAttributes } from 'react'

const GLYPHS = {
  sparkle: ['..#..', '.###.', '#####', '.###.', '..#..'],
  heart: ['.#.#.', '#####', '#####', '.###.', '..#..'],
  plus: ['..#..', '..#..', '#####', '..#..', '..#..'],
  diamond: ['..#..', '.###.', '#####', '.###.', '..#..'],
  square: ['#####', '#####', '#####', '#####', '#####'],
} as const

type PixelGlyphShape = keyof typeof GLYPHS

type PixelGlyphProps = Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
  shape?: PixelGlyphShape
  rows?: string[]
  unit?: number
  color?: string
  class?: string
}

function buildPixelShadow(rows: readonly string[], unit: number, color: string) {
  const shadows: string[] = []

  rows.forEach((row, y) => {
    Array.from(row).forEach((cell, x) => {
      if (cell === '#') {
        shadows.push(`${x * unit}px ${y * unit}px 0 ${color}`)
      }
    })
  })

  return shadows.join(', ')
}

export function PixelGlyph({
  shape = 'sparkle',
  rows,
  unit = 4,
  color = 'currentColor',
  className,
  class: classProp,
  style,
  ...props
}: PixelGlyphProps) {
  const glyphRows = rows ?? GLYPHS[shape]
  const width = Math.max(...glyphRows.map((row) => row.length)) * unit
  const height = glyphRows.length * unit
  const pixelStyle = {
    width: `${unit}px`,
    height: `${unit}px`,
    boxShadow: buildPixelShadow(glyphRows, unit, color),
  } satisfies CSSProperties

  return (
    <span
      aria-hidden="true"
      className={['inline-block align-middle', className, classProp]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          width: `${width}px`,
          height: `${height}px`,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <span className="block" style={pixelStyle} />
    </span>
  )
}
