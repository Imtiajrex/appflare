/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import DashboardLayout from '@/components/layout'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const databaseId = searchParams.get('databaseId')
  const collectionId = searchParams.get('collectionId')
  const params = `?databaseId=${databaseId}&collectionId=${collectionId}`
  return (
    <div className="flex flex-row">
      <CollectionsListSidebar />
      <DashboardLayout
        header={collectionId}
        tabs={[
          {
            label: 'Documents',
            value: `/dashboard/databases/collections${params}`,
          },
          {
            label: 'Attributes',
            value: `/dashboard/databases/collections/attributes${params}`,
          },
          {
            label: 'Indexes',
            value: `/dashboard/databases/collections/indexes${params}`,
          },
          {
            label: 'Activity',
            value: `/dashboard/databases/collections/activity${params}`,
          },
          {
            label: 'Usage',
            value: `/dashboard/databases/collections/usage${params}`,
          },
          {
            label: 'Settings',
            value: `/dashboard/databases/collections/settings${params}`,
          },
        ]}
      >
        {children}
      </DashboardLayout>
    </div>
  )
}

const CollectionsListSidebar = () => {
  const collections = [
    {
      _id: 'articles',
      name: 'Articles',
    },
    {
      _id: 'shops',
      name: 'Shops',
    },
  ]
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div className="border-tremor-border hidden h-screen w-52 border-r p-2 pt-[88px] md:block">
      <button
        className={cn(
          'bg-tremor-background-subtle hover:text-tremor-brand mb-2 w-full rounded-xl px-4 py-2 text-left text-sm font-bold transition-all',
        )}
      >
        + Create Collection
      </button>
      {collections.map((collection) => {
        const isActive = collection._id === searchParams.get('collectionId')
        return (
          <button
            className={cn(
              'bg-tremor-background-subtle hover:bg-tremor-background w-full rounded-xl border px-4 py-2 text-left text-sm font-semibold transition-all',
              isActive
                ? 'bg-tremor-background border-tremor-border'
                : 'border-transparent',
            )}
            key={collection._id}
            onClick={() => {
              const queryString = createQueryString(
                'collectionId',
                collection._id,
              )
              router.push(`${pathname}?${queryString}`)
            }}
          >
            {collection.name}
          </button>
        )
      })}
    </div>
  )
}
