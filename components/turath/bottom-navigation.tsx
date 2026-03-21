"use client"

import { useNavigation } from './navigation-provider'
import { type NavigationTab } from '@/lib/turath-types'
import { CompassIcon, GridIcon, WaveformIcon, BasketIcon, UserIcon } from './icons'
import { cn } from '@/lib/utils'

const TAB_SCREEN_MAP: Record<NavigationTab, string> = {
  map: 'home-map',
  explore: 'region-detail',
  guide: 'voice-ai',
  artisans: 'artisan-profile',
  profile: 'profile',
}

const SCREEN_TAB_MAP: Record<string, NavigationTab> = {
  'home-map': 'map',
  'region-detail': 'explore',
  'heritage-detail': 'explore',
  'itinerary': 'explore',
  'voice-ai': 'guide',
  'artisan-profile': 'artisans',
  'marketplace': 'artisans',
  'checkout': 'artisans',
  'profile': 'profile',
  'challenges': 'profile',
  'settings': 'profile',
}

const tabs: { id: NavigationTab; label: string; Icon: typeof CompassIcon }[] = [
  { id: 'map', label: 'Map', Icon: CompassIcon },
  { id: 'explore', label: 'Explore', Icon: GridIcon },
  { id: 'guide', label: 'AI Guide', Icon: WaveformIcon },
  { id: 'artisans', label: 'Artisans', Icon: BasketIcon },
  { id: 'profile', label: 'Profile', Icon: UserIcon },
]

export function BottomNavigation() {
  const { navigate, currentScreen } = useNavigation()
  const activeTab = SCREEN_TAB_MAP[currentScreen] ?? 'map'

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-3 mb-3">
        <div className="glass rounded-2xl border border-border/50 shadow-lg">
          <div className="flex items-center justify-around px-2 py-3">
            {tabs.map(({ id, label, Icon }) => {
              const isActive = activeTab === id
              return (
                <button
                  key={id}
                  onClick={() => navigate(TAB_SCREEN_MAP[id] as Parameters<typeof navigate>[0])}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                    "min-w-[52px] min-h-[44px]",
                    isActive
                      ? "text-[#2A52BE] bg-[#2A52BE]/10 dark:text-[#F4C430] dark:bg-[#F4C430]/10 shadow-inner"
                      : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                  aria-label={label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isActive && "scale-110"
                    )}
                  />
                  <span className={cn(
                    "text-[10px] font-medium transition-opacity font-serif",
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
