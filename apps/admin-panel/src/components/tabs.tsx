import { cn } from '@/lib/utils'

export default function Tabs({
  tabs,
  onTabChange,
  activeTab,
}: {
  tabs: { label: string; value: string }[]
  onTabChange: (value: string) => void
  activeTab: string
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value.split('?')[0]
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              'text-tremor-content-subtle hover:bg-tremor-background bg-tremor-background-subtle rounded-md px-4 py-2 text-sm font-bold transition-all',
              isActive ? 'text-tremor-brand' : '',
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
