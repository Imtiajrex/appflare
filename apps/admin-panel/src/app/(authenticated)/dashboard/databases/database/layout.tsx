import DashboardLayout from '@/components/layout'

export default function layout({ children }: { children: React.ReactNode }) {
  const database = {
    _id: 'database-1',
    name: 'Shopxing',
  }
  return (
    <DashboardLayout
      header={database.name}
      tabs={[
        {
          label: 'Collections',
          value: `/dashboard/databases/database?id=${database._id}`,
        },
        {
          label: 'Settings',
          value: `/dashboard/databases/database/settings?id=${database._id}`,
        },
      ]}
    >
      {children}
    </DashboardLayout>
  )
}
