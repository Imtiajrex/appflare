/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Table } from '@/components/table'
import { Badge } from '@tremor/react'
import { useRouter } from 'next/navigation'

export default function CollectionsPage() {
  const router = useRouter()
  return (
    <div className="container flex flex-1 flex-col p-4">
      <Table
        data={[
          {
            _id: 'articles',
            name: 'Articles',
            collections: 10,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]}
        columns={[
          {
            render: (item) => <Badge>{item._id}</Badge>,
            title: 'Collection Id',
          },
          {
            render: (item) => item.name,
            title: 'Name',
          },
          {
            render: (item) => item.collections,
            title: 'Documents',
          },
          {
            render: (item) => item.createdAt,
            title: 'Created At',
          },
          {
            render: (item) => item.updatedAt,
            title: 'Updated At',
          },
        ]}
        onRowClick={(item) => {
          router.push(
            `/dashboard/databases/collections?databaseId=${item._id}&collectionId=${item._id}`,
          )
        }}
      />
    </div>
  )
}
