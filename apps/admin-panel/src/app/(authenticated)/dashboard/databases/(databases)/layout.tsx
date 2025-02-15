'use client'
import DashboardLayout from '@/components/layout'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      header={'Databases'}
      tabs={[
        {
          label: 'Databases',
          value: '/dashboard/databases',
        },
        {
          label: 'Usage',
          value: '/dashboard/databases/usage',
        },
      ]}
    >
      {children}
    </DashboardLayout>
  )
}
