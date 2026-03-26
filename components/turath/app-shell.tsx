"use client"

import { useState, useEffect, useRef, type ComponentType } from 'react'
import { cn } from '@/lib/utils'
import { NavigationProvider, useNavigation, type ScreenId } from './navigation-provider'
import { LanguageProvider } from './language-provider'
import { PhoneFrame } from './phone-frame'
import { OnboardingScreen } from './screens/onboarding-screen'
import { HomeMapScreen } from './screens/home-map-screen'
import { RegionDetailScreen } from './screens/region-detail-screen'
import { HeritageDetailScreen } from './screens/heritage-detail-screen'
import { ItineraryScreen } from './screens/itinerary-screen'
import { VoiceAIGuideScreen } from './screens/voice-ai-guide-screen'
import { ArtisanProfileScreen } from './screens/artisan-profile-screen'
import { MarketplaceScreen } from './screens/marketplace-screen'
import { CheckoutScreen } from './screens/checkout-screen'
import { ProfileScreen } from './screens/profile-screen'
import { ChallengesScreen } from './screens/challenges-screen'
import { SettingsScreen } from './screens/settings-screen'

const SCREEN_COMPONENTS: Record<ScreenId, ComponentType<{ isDark?: boolean }>> = {
  'onboarding': OnboardingScreen,
  'home-map': HomeMapScreen,
  'region-detail': RegionDetailScreen,
  'heritage-detail': HeritageDetailScreen,
  'itinerary': ItineraryScreen,
  'voice-ai': VoiceAIGuideScreen,
  'artisan-profile': ArtisanProfileScreen,
  'marketplace': MarketplaceScreen,
  'checkout': CheckoutScreen,
  'profile': ProfileScreen,
  'challenges': ChallengesScreen,
  'settings': SettingsScreen,
}

const SCREEN_LABELS: Record<ScreenId, string> = {
  'onboarding': 'Onboarding',
  'home-map': 'Home Map',
  'region-detail': 'Region Detail',
  'heritage-detail': 'Heritage Detail',
  'itinerary': 'Itinerary',
  'voice-ai': 'AI Guide',
  'artisan-profile': 'Artisan',
  'marketplace': 'Marketplace',
  'checkout': 'Checkout',
  'profile': 'Profile',
  'challenges': 'Challenges',
  'settings': 'Settings',
}

function AnimatedScreen({ screenId, isDark }: { screenId: ScreenId; isDark: boolean }) {
  const { direction, currentScreen, previousScreen } = useNavigation()
  const [animClass, setAnimClass] = useState('')
  const prevRef = useRef(currentScreen)

  useEffect(() => {
    if (prevRef.current !== currentScreen) {
      const isEntering = screenId === currentScreen
      const isLeaving = screenId === previousScreen

      if (isEntering) {
        setAnimClass(direction === 'forward' ? 'screen-enter-right' : 'screen-enter-left')
      } else if (isLeaving) {
        setAnimClass(direction === 'forward' ? 'screen-exit-left' : 'screen-exit-right')
      }

      prevRef.current = currentScreen

      const timeout = setTimeout(() => setAnimClass(''), 350)
      return () => clearTimeout(timeout)
    }
  }, [currentScreen, direction, screenId, previousScreen])

  const Comp = SCREEN_COMPONENTS[screenId]
  const isVisible = screenId === currentScreen || screenId === previousScreen

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "absolute inset-0",
        animClass,
        screenId !== currentScreen && !animClass && "hidden"
      )}
    >
      <Comp isDark={isDark} />
    </div>
  )
}

function AppContent() {
  const { isDark, setIsDark, currentScreen } = useNavigation()
  const [showMenu, setShowMenu] = useState(false)
  const { navigate } = useNavigation()

  const screenIds = Object.keys(SCREEN_COMPONENTS) as ScreenId[]

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center relative transition-colors duration-300",
        isDark
          ? "bg-gradient-to-br from-[#0a0a0a] via-[#141210] to-[#0a0a0a]"
          : "bg-gradient-to-br from-[#FAF7F0] via-[#F0E8D8] to-[#FAF7F0]"
      )}
    >
      {/* Zellige Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Top Chrome Bar */}
      <div className="relative z-10 w-full max-w-sm mx-auto mb-4 px-2">
        <div className={cn(
          "flex items-center justify-between px-4 py-2 rounded-2xl",
          isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"
        )}>
          {/* Logo + App name */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C1121F] to-[#C9A84C] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-[#1a1a1a]")}>
              Turath <span className="font-normal opacity-50">/</span> <span className="text-[#C9A84C] text-xs">{SCREEN_LABELS[currentScreen]}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Screen picker toggle */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              title="Switch screen"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all",
                isDark ? "bg-white/10 text-white/80 hover:bg-white/20" : "bg-black/10 text-black/70 hover:bg-black/15"
              )}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="7" height="7" rx="1"/>
                <rect x="15" y="3" width="7" height="7" rx="1"/>
                <rect x="2" y="14" width="7" height="7" rx="1"/>
                <rect x="15" y="14" width="7" height="7" rx="1"/>
              </svg>
              Screens
            </button>

            {/* Dark mode */}
            <button
              onClick={() => setIsDark(!isDark)}
              title="Toggle theme"
              className={cn(
                "w-8 h-8 rounded-xl flex items-center justify-center transition-all",
                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-black/10 text-black/70 hover:bg-black/15"
              )}
            >
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Screen Jump Menu */}
        {showMenu && (
          <div className={cn(
            "absolute top-full mt-2 left-2 right-2 z-50 rounded-2xl border shadow-2xl overflow-hidden",
            isDark ? "bg-[#1E1C1A] border-white/10" : "bg-white border-black/10"
          )}>
            <div className="p-3">
              <p className={cn("text-xs font-medium mb-2 px-1", isDark ? "text-white/40" : "text-black/40")}>
                JUMP TO SCREEN
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {screenIds.map(id => (
                  <button
                    key={id}
                    onClick={() => { navigate(id); setShowMenu(false) }}
                    className={cn(
                      "px-2 py-2 rounded-xl text-xs font-medium text-center transition-all",
                      currentScreen === id
                        ? "bg-[#C9A84C] text-[#1a1a1a]"
                        : isDark
                          ? "bg-white/5 text-white/70 hover:bg-white/10"
                          : "bg-black/5 text-black/70 hover:bg-black/10"
                    )}
                  >
                    {SCREEN_LABELS[id]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Phone Frame */}
      <div className="relative z-10">
        <PhoneFrame isDark={isDark}>
          <div className="relative w-full h-full overflow-hidden">
            {screenIds.map(id => (
              <AnimatedScreen key={id} screenId={id} isDark={isDark} />
            ))}
          </div>
        </PhoneFrame>

        {/* Side reflection glow */}
        <div
          className="absolute -inset-4 opacity-20 pointer-events-none rounded-[4rem]"
          style={{
            background: 'radial-gradient(ellipse at center, #C9A84C22 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Bottom tagline */}
      <div className="relative z-10 mt-6 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#C1121F]" />
        <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
        <div className="w-2 h-2 rounded-full bg-[#1B4332]" />
        <span className={cn("text-xs ml-1", isDark ? "text-white/30" : "text-black/30")}>
          Turath — Moroccan Cultural Heritage
        </span>
      </div>
    </div>
  )
}

export function AppShell() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </LanguageProvider>
  )
}
