"use client"

import { useNavigation } from './navigation-provider'
import { useTranslation } from './language-provider'
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

const tabs: { id: NavigationTab; labelKey: string; Icon: typeof CompassIcon }[] = [
  { id: 'map', labelKey: 'navigation.map', Icon: CompassIcon },
  { id: 'explore', labelKey: 'navigation.explore', Icon: GridIcon },
  { id: 'guide', labelKey: 'navigation.guide', Icon: WaveformIcon },
  { id: 'artisans', labelKey: 'navigation.artisans', Icon: BasketIcon },
  { id: 'profile', labelKey: 'navigation.profile', Icon: UserIcon },
]

export function BottomNavigation() {
  const { navigate, currentScreen } = useNavigation()
  const { t } = useTranslation()
  const activeTab = SCREEN_TAB_MAP[currentScreen] ?? 'map'

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-3 mb-3">
        <div className="glass rounded-2xl border border-border/50 shadow-lg">
          <div className="flex items-center justify-around px-2 py-3">
            {tabs.map(({ id, labelKey, Icon }) => {
              const isActive = activeTab === id
              const label = t(labelKey)
              return (
                <button
                  key={id}
                  onClick={() => navigate(TAB_SCREEN_MAP[id] as Parameters<typeof navigate>[0])}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                    "min-w-[52px] min-h-[44px]",
                    isActive
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground"
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
                    "text-[10px] font-medium transition-opacity",
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
