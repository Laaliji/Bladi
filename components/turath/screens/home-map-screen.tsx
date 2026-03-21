"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FILTER_CHIPS } from '@/lib/turath-types'
import { SearchIcon, MicIcon, MapPinIcon, ChevronRightIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'

const MAP_PINS = [
  { id: 'fez', name: 'Fez', x: 55, y: 35, type: 'heritage' as const },
  { id: 'marrakech', name: 'Marrakech', x: 45, y: 55, type: 'artisan' as const },
  { id: 'chefchaouen', name: 'Chefchaouen', x: 50, y: 28, type: 'heritage' as const },
  { id: 'essaouira', name: 'Essaouira', x: 30, y: 52, type: 'food' as const },
  { id: 'atlas', name: 'Atlas Mountains', x: 55, y: 60, type: 'itinerary' as const },
  { id: 'tangier', name: 'Tangier', x: 48, y: 18, type: 'heritage' as const },
]

const NEARBY_HIGHLIGHTS = [
  { id: '1', name: 'Al Quaraouiyine', category: 'Heritage', distance: '2.3 km', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400' },
  { id: '2', name: 'Chouara Tannery', category: 'Artisan', distance: '1.8 km', image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=400' },
  { id: '3', name: 'Bab Boujloud', category: 'Heritage', distance: '3.1 km', image: 'https://images.unsplash.com/photo-1553899017-9279a3e1c0c9?w=400' },
  { id: '4', name: 'Dar Batha', category: 'Museum', distance: '2.5 km', image: 'https://images.unsplash.com/photo-1548018560-c7196548e84d?w=400' },
]

interface HomeMapScreenProps {
  isDark?: boolean
}

export function HomeMapScreen({ isDark }: HomeMapScreenProps) {
  void isDark
  const { navigate } = useNavigation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false)

  const getPinColor = (type: 'heritage' | 'artisan' | 'food' | 'itinerary') => {
    switch (type) {
      case 'heritage': return 'bg-[#C1272D] text-white ring-2 ring-[#C1272D]/20'
      case 'artisan': return 'bg-[#F4C430] text-[#1A1A1A] ring-2 ring-[#F4C430]/20'
      case 'food': return 'bg-[#006233] text-white ring-2 ring-[#006233]/20'
      case 'itinerary': return 'bg-[#2A52BE] text-white ring-2 ring-[#2A52BE]/20'
    }
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Search bar */}
      <div className="absolute top-12 left-4 right-4 z-30">
        <div className="glass rounded-2xl border border-[#F4C430]/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden">
          <div className="absolute inset-0 zellige-pattern opacity-10 pointer-events-none" />
          <div className="flex items-center gap-3 px-4 py-3 relative z-10">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder="Search places, crafts, artisans..." className="flex-1 bg-transparent text-sm font-sans text-foreground placeholder:text-muted-foreground outline-none" />
            <button className="w-10 h-10 rounded-xl bg-[#2A52BE]/10 flex items-center justify-center hover:bg-[#2A52BE]/20 transition-all text-[#2A52BE]">
              <MicIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="absolute top-28 left-0 right-0 z-20 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeFilter === chip.id
                  ? "bg-accent text-accent-foreground shadow-md"
                  : "glass border border-border/50 text-foreground hover:bg-accent/10"
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative bg-[var(--color-turath-parchment)]">
        <div className="absolute inset-0 opacity-15 arabesque-pattern pointer-events-none" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 8px 16px rgba(193,39,45,0.05))' }}>
          <path d="M10 20 L30 10 L50 12 L70 18 L85 30 L90 50 L85 70 L70 85 L50 90 L30 88 L15 75 L8 55 L10 35 Z" fill="#F5EFE6" stroke="#F4C430" strokeWidth="0.8" />
          <path d="M25 35 Q35 30 45 35 Q55 30 65 40 Q70 50 65 60 Q55 70 45 68 Q35 70 28 60 Q22 50 25 35 Z" fill="none" stroke="#2A52BE" strokeWidth="0.4" strokeDasharray="2,2" opacity="0.6" />
        </svg>

        {MAP_PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={() => navigate('region-detail')}
            className={cn("absolute w-10 h-10 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-all hover:scale-110 z-10 active:scale-95", getPinColor(pin.type))}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            aria-label={pin.name}
          >
            <MapPinIcon className="w-5 h-5" />
          </button>
        ))}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-32 h-32 rounded-full bg-accent/20 animate-pulse" style={{ left: '40%', top: '50%', transform: 'translate(-50%, -50%)' }} />
        </div>
      </div>

      {/* Bottom sheet */}
      <div className={cn("absolute bottom-20 left-0 right-0 bg-background rounded-t-3xl shadow-2xl transition-all duration-300 z-20", bottomSheetExpanded ? "h-[60%]" : "h-[200px]")}>
        <button onClick={() => setBottomSheetExpanded(!bottomSheetExpanded)} className="w-full flex justify-center py-3" aria-label={bottomSheetExpanded ? "Collapse" : "Expand"}>
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </button>
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Nearby Highlights</h3>
            <button onClick={() => navigate('region-detail')} className="text-sm text-accent font-medium flex items-center gap-1">
              View all <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {NEARBY_HIGHLIGHTS.map((place) => (
              <button
                key={place.id}
                onClick={() => navigate('region-detail')}
                className="flex-shrink-0 w-40 rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-24 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${place.image})` }} />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-background/80 rounded-full text-xs font-medium text-foreground">{place.distance}</div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-foreground truncate">{place.name}</h4>
                  <p className="text-xs text-muted-foreground">{place.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
