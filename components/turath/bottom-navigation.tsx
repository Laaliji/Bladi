"use client"

import { NavigationTab } from '@/lib/turath-types'
import { CompassIcon, GridIcon, WaveformIcon, BasketIcon, UserIcon } from './icons'
import { cn } from '@/lib/utils'

interface BottomNavigationProps {
  activeTab: NavigationTab
  onTabChange: (tab: NavigationTab) => void
}

const tabs: { id: NavigationTab; label: string; Icon: typeof CompassIcon }[] = [
  { id: 'map', label: 'Map', Icon: CompassIcon },
  { id: 'explore', label: 'Explore', Icon: GridIcon },
  { id: 'guide', label: 'AI Guide', Icon: WaveformIcon },
  { id: 'artisans', label: 'Artisans', Icon: BasketIcon },
  { id: 'profile', label: 'Profile', Icon: UserIcon },
]

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-4 mb-4">
        <div className="glass rounded-2xl border border-border/50 shadow-lg">
          <div className="flex items-center justify-around px-2 py-3">
            {tabs.map(({ id, label, Icon }) => {
              const isActive = activeTab === id
              return (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                    "min-w-[64px] min-h-[48px]",
                    isActive 
                      ? "text-accent bg-accent/10" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-label={label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon 
                    className={cn(
                      "w-6 h-6 transition-transform duration-200",
                      isActive && "scale-110"
                    )} 
                  />
                  <span className={cn(
                    "text-xs font-medium transition-opacity",
                    isActive ? "opacity-100" : "opacity-70"
                  )}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
