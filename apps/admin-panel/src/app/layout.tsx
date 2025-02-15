import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Provider } from './provider'
import { Suspense } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Appflare - Admin Panel',
  description: 'Admin panel for Appflare',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} light bg-gray-50 antialiased dark:bg-gray-950`}
      >
        <Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <Icon
                icon={'tabler:circle-dashed'}
                className="text-tremor-brand h-10 w-10 animate-spin"
              />
            </div>
          }
        >
          <Provider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </Provider>
        </Suspense>
      </body>
    </html>
  )
}
