'use client'
import Tabs from '@/components/tabs'
import { Icon } from '@iconify/react'
import { Button, Divider } from '@tremor/react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function DashboardLayout({
  children,
  header,
  onTabPress,
  tabs,
}: {
  children: React.ReactNode
  tabs: { label: string; value: string }[]
  onTabPress?: (value: string) => void
  header: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex w-full flex-col px-4">
        <div className="container flex flex-col gap-2 pb-16 pt-16 text-xl font-semibold">
          <Button
            variant="light"
            className="h-max w-max"
            onClick={() => {
              router.back()
            }}
          >
            <Icon
              icon={'material-symbols:chevron-left-rounded'}
              className="text-2xl font-bold"
            />
          </Button>
          {header}
        </div>
        <div className="container">
          <Tabs
            tabs={tabs}
            activeTab={pathname}
            onTabChange={(value) => {
              onTabPress?.(value)
              router.push(value)
            }}
          />
        </div>
        <Divider className="my-1" />
      </div>
      {children}
    </div>
  )
}
