'use client'
import DashboardLayout from '@/components/layout'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      header={'Auth'}
      tabs={[
        {
          label: 'Users',
          value: '/dashboard/auth',
        },
        {
          label: 'Security',
          value: '/dashboard/auth/security',
        },
        {
          label: 'Usage',
          value: '/dashboard/auth/usage',
        },
        {
          label: 'Settings',
          value: '/dashboard/auth/settings',
        },
      ]}
    >
      {children}
    </DashboardLayout>
  )
}
