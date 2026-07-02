import type { CSSProperties, HTMLAttributes } from 'react'

type IconTileProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
  color?: string
  class?: string
}

export function IconTile({
  size = 56,
  color,
  className,
  class: classProp,
  style,
  children,
  ...props
}: IconTileProps) {
  return (
    <div
      className={[
        'grid shrink-0 place-items-center bg-accent text-accent-foreground pixel-corner',
        className,
        classProp,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}
