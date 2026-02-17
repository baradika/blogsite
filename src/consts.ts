import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'b4r',
  description:
    'b4r is a opinionated, unstyled blogging template—built with Astro, Tailwind, and shadcn/ui.',
  href: 'https://astro-erudite.vercel.app',
  author: 'jktrn',
  locale: 'en-US',
  featuredPostCount: 6,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/authors',
    label: 'me',
  },
  {
    href: '/tags',
    label: 'tags',
  },
  {
    href: '/projects',
    label: 'projects',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/baradika',
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/faseraisbaradika',
    label: 'LinkedIn',
  },
  {
    href: 'mailto:fasebaradika@gmail.com',
    label: 'Email',
  }
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
