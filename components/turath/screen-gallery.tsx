"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { PhoneFrame } from "./phone-frame"
import { OnboardingScreen } from "./screens/onboarding-screen"
import { HomeMapScreen } from "./screens/home-map-screen"
import { RegionDetailScreen } from "./screens/region-detail-screen"
import { HeritageDetailScreen } from "./screens/heritage-detail-screen"
import { ItineraryScreen } from "./screens/itinerary-screen"
import { VoiceAIGuideScreen } from "./screens/voice-ai-guide-screen"
import { ArtisanProfileScreen } from "./screens/artisan-profile-screen"
import { MarketplaceScreen } from "./screens/marketplace-screen"
import { CheckoutScreen } from "./screens/checkout-screen"
import { ProfileScreen } from "./screens/profile-screen"
import { ChallengesScreen } from "./screens/challenges-screen"
import { SettingsScreen } from "./screens/settings-screen"

const screens = [
  { id: "onboarding", name: "Onboarding", component: OnboardingScreen },
  { id: "home-map", name: "Home Map", component: HomeMapScreen },
  { id: "region-detail", name: "Region Detail", component: RegionDetailScreen },
  { id: "heritage-detail", name: "Heritage Detail", component: HeritageDetailScreen },
  { id: "itinerary", name: "Itinerary Builder", component: ItineraryScreen },
  { id: "voice-ai", name: "Voice AI Guide", component: VoiceAIGuideScreen },
  { id: "artisan-profile", name: "Artisan Profile", component: ArtisanProfileScreen },
  { id: "marketplace", name: "Marketplace", component: MarketplaceScreen },
  { id: "checkout", name: "Checkout", component: CheckoutScreen },
  { id: "profile", name: "Profile", component: ProfileScreen },
  { id: "challenges", name: "Challenges", component: ChallengesScreen },
  { id: "settings", name: "Settings", component: SettingsScreen },
]

export function ScreenGallery() {
  const [isDark, setIsDark] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null)

  return (
    <div className={cn("min-h-screen transition-colors duration-300", isDark ? "bg-[#1a1a1a]" : "bg-[#FAF7F0]")}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C1121F] to-[#C9A84C] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-[#1a1a1a]")}>
                Turath
              </h1>
              <p className={cn("text-xs", isDark ? "text-white/60" : "text-[#1a1a1a]/60")}>
                Moroccan Heritage UI Kit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                isDark 
                  ? "bg-white/10 text-white hover:bg-white/20" 
                  : "bg-[#1a1a1a]/10 text-[#1a1a1a] hover:bg-[#1a1a1a]/20"
              )}
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </header>

      {/* Screen Count Badge */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex items-center gap-4 mb-8">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            isDark ? "bg-[#C1121F]/20 text-[#C1121F]" : "bg-[#C1121F]/10 text-[#C1121F]"
          )}>
            12 Screens
          </span>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            isDark ? "bg-[#C9A84C]/20 text-[#C9A84C]" : "bg-[#C9A84C]/10 text-[#C9A84C]"
          )}>
            Light + Dark Mode
          </span>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            isDark ? "bg-[#1B4332]/20 text-[#4ade80]" : "bg-[#1B4332]/10 text-[#1B4332]"
          )}>
            Production Ready
          </span>
        </div>
      </div>

      {/* Screen Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {screens.map((screen) => {
            const ScreenComponent = screen.component
            return (
              <div key={screen.id} className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setSelectedScreen(selectedScreen === screen.id ? null : screen.id)}
                  className="transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#C1121F] focus:ring-offset-4 rounded-[3rem]"
                >
                  <PhoneFrame isDark={isDark}>
                    <ScreenComponent isDark={isDark} />
                  </PhoneFrame>
                </button>
                <span className={cn(
                  "text-sm font-medium",
                  isDark ? "text-white/80" : "text-[#1a1a1a]/80"
                )}>
                  {screen.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className={cn(
        "border-t py-8",
        isDark ? "border-white/10" : "border-[#1a1a1a]/10"
      )}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={cn(
            "text-sm",
            isDark ? "text-white/50" : "text-[#1a1a1a]/50"
          )}>
            Turath UI Kit - Moroccan Cultural Heritage App
          </p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#C1121F]" />
            <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />
            <div className="w-3 h-3 rounded-full bg-[#1B4332]" />
            <div className="w-3 h-3 rounded-full bg-[#FAF7F0] border border-[#1a1a1a]/20" />
          </div>
        </div>
      </footer>
    </div>
  )
}
