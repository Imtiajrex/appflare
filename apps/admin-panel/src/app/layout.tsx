import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

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
  console.log(geistSans.variable)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} light bg-gray-50 antialiased dark:bg-gray-950`}
      >
        {children}
      </body>
    </html>
  )
}
