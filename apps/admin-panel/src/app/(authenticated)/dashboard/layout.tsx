import React from 'react'
import Sidebar from './_components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-tremor-background-muted flex h-screen w-full flex-row">
      <Sidebar />
      <div className="bg-tremor-background-subtle flex-1 pt-20">{children}</div>
    </div>
  )
}
