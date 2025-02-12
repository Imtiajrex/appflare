/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { TableHero } from './_components/table'
import { Button } from '@tremor/react'
import Input from '@/components/input'
import { db } from '@/lib/appflare'

export default function Databases() {
  return (
    <div className="flex flex-1 flex-col p-8">
      <div className="w-[250px] p-2"></div>
      <VendorManagement />
      <div className="bg-tremor-background border-tremor-border flex-1 rounded-2xl border p-2">
        <TableHero />
      </div>
    </div>
  )
}

const VendorManagement = () => {
  const [vendors, refetch] = useData('vendors')
  const [vendorName, setVendorName] = React.useState('')
  const [vendorKey, setVendorKey] = React.useState('')
  const createVendor = async () => {
    refetch()
    setVendorKey('')
    setVendorName('')
  }
  console.log(vendors)
  return (
    <div className="bg-card border-border gap-2 rounded-xl border p-6">
      {vendors &&
        vendors.documents.map((vendor: any) => (
          <p key={vendor.$id} className="rounded-xl bg-red-200 p-2">
            {vendor.name} - {vendor.key}
          </p>
        ))}
      <div className="mt-4 flex-col gap-2">
        <Input
          placeholder="Vendor Name"
          onChange={(e) => setVendorName(e.target.value)}
          value={vendorName}
        />
        <Input
          placeholder="Vendor Key"
          onChange={(e) => setVendorKey(e.target.value)}
          value={vendorKey}
        />
        <Button
          disabled={!vendorName || !vendorKey}
          onClick={createVendor}
          className="text-primary-foreground"
        >
          <p>Create Vendor</p>
        </Button>
      </div>
    </div>
  )
}

const useData = (collectionId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState<any>(null)
  const refetch = () => {
    db.listDocuments({
      collectionName: collectionId,
    })
      .then((response) => {
        setData(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  React.useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionId])
  return [data, refetch]
}
