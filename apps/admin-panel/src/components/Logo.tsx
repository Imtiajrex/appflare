import { cn } from '@/lib/utils'
import React from 'react'

export default function Logo({
  textClassName,
  iconClassName,
}: {
  textClassName?: string
  iconClassName?: string
}) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <img
        src="/icon.png"
        alt="Appflare Logo"
        className={cn('h-8 w-8', iconClassName)}
      />
      <h1 className={cn('text-2xl', textClassName)}>
        App
        <span className="text-tremor-brand font-medium">flare</span>
      </h1>
    </div>
  )
}
