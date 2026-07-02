import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  class?: string
}

function Card({ className, class: classProp, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        'text-card-foreground pixel-bordered pixel-depth flex flex-col gap-4 p-5 [--pf-fill:var(--card)]',
        className,
        classProp,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, class: classProp, ...props }: CardProps) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5', className, classProp)}
      {...props}
    />
  )
}

function CardTitle({ className, class: classProp, ...props }: CardProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'font-mono text-sm font-bold uppercase leading-tight tracking-[0.06em]',
        className,
        classProp,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, class: classProp, ...props }: CardProps) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'font-mono text-sm leading-relaxed text-muted-foreground',
        className,
        classProp,
      )}
      {...props}
    />
  )
}

function CardContent({ className, class: classProp, ...props }: CardProps) {
  return (
    <div
      data-slot="card-content"
      className={cn('font-mono text-sm text-muted-foreground', className, classProp)}
      {...props}
    />
  )
}

function CardFooter({ className, class: classProp, ...props }: CardProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-3', className, classProp)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
}
