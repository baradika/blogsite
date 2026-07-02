import type { HTMLAttributes, ReactNode } from 'react'

type StickyNoteProps = HTMLAttributes<HTMLDivElement> & {
  glyph?: ReactNode
  align?: 'left' | 'center' | 'right'
  class?: string
}

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

export function StickyNote({
  glyph,
  align = 'left',
  className,
  class: classProp,
  children,
  ...props
}: StickyNoteProps) {
  return (
    <div
      className={[
        'inline-block px-4 py-3.5 font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.05em] text-secondary-foreground pixel-bordered pixel-depth [--pf-fill:var(--secondary)]',
        alignClass[align],
        className,
        classProp,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
      {glyph ? <span className="mt-1 block text-left">{glyph}</span> : null}
    </div>
  )
}
