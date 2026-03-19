"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FILTER_CHIPS } from '@/lib/turath-types'
import { SearchIcon, MicIcon, MapPinIcon, ChevronRightIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'

interface HomeMapScreenProps {
  onRegionSelect?: (regionId: string) => void
  isDark?: boolean
}

export function HomeMapScreen({ onRegionSelect, isDark }: HomeMapScreenProps) {
  void isDark // dark mode handled by parent container
  const [activeFilter, setActiveFilter] = useState('all')
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false)

  const getPinColor = (type: 'heritage' | 'artisan' | 'food' | 'itinerary') => {
    switch (type) {
      case 'heritage': return 'bg-primary text-primary-foreground'
      case 'artisan': return 'bg-accent text-accent-foreground'
      case 'food': return 'bg-secondary text-secondary-foreground'
      case 'itinerary': return 'bg-blue-500 text-white'
    }
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Search bar - glassmorphism */}
      <div className="absolute top-12 left-4 right-4 z-30">
        <div className="glass rounded-2xl border border-border/50 shadow-lg">
          <div className="flex items-center gap-3 px-4 py-3">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search places, crafts, artisans..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <MicIcon className="w-5 h-5 text-primary" />
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
      <div className="flex-1 relative bg-[#E8E0D5]">
        {/* Morocco map simplified SVG */}
        <svg 
          viewBox="0 0 100 100" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        >
          {/* Map background */}
          <path 
            d="M10 20 L30 10 L50 12 L70 18 L85 30 L90 50 L85 70 L70 85 L50 90 L30 88 L15 75 L8 55 L10 35 Z"
            fill="#F5EFE6"
            stroke="#C9A84C"
            strokeWidth="0.5"
            className="drop-shadow-sm"
          />
          {/* Inner details */}
          <path 
            d="M25 35 Q35 30 45 35 Q55 30 65 40 Q70 50 65 60 Q55 70 45 68 Q35 70 28 60 Q22 50 25 35 Z"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="0.3"
            strokeDasharray="2,2"
            opacity="0.5"
          />
        </svg>

        {/* Map pins */}
        {MAP_PINS.map((pin) => (
          <button
            key={pin.id}
            onClick={() => onRegionSelect?.(pin.id)}
            className={cn(
              "absolute w-10 h-10 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-all hover:scale-110 z-10",
              getPinColor(pin.type)
            )}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            aria-label={pin.name}
          >
            <MapPinIcon className="w-5 h-5" />
          </button>
        ))}

        {/* Active region overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-32 h-32 rounded-full bg-accent/20 animate-pulse"
            style={{ left: '40%', top: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>
      </div>

      {/* Bottom sheet */}
      <div 
        className={cn(
          "absolute bottom-20 left-0 right-0 bg-background rounded-t-3xl shadow-2xl transition-all duration-300 z-20",
          bottomSheetExpanded ? "h-[60%]" : "h-[200px]"
        )}
      >
        {/* Drag handle */}
        <button 
          onClick={() => setBottomSheetExpanded(!bottomSheetExpanded)}
          className="w-full flex justify-center py-3"
          aria-label={bottomSheetExpanded ? "Collapse" : "Expand"}
        >
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
        </button>

        {/* Content */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Nearby Highlights</h3>
            <button className="text-sm text-accent font-medium flex items-center gap-1">
              View all
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal scroll cards */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {NEARBY_HIGHLIGHTS.map((place) => (
              <button
                key={place.id}
                onClick={() => onRegionSelect?.(place.id)}
                className="flex-shrink-0 w-40 rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-24 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${place.image})` }}
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-background/80 rounded-full text-xs font-medium text-foreground">
                    {place.distance}
                  </div>
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

      {/* Bottom navigation */}
      <BottomNavigation activeTab="map" onTabChange={() => {}} />
    </div>
  )
}
