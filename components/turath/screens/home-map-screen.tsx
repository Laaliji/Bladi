"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FILTER_CHIPS } from '@/lib/turath-types'
// topOffset=168 → image starts below filter chips (which end at ≈148px)
// Northern cities (y=3-17%) render at 174-202px, cleared from all overlays.
import { SearchIcon, MicIcon, MapPinIcon, ChevronRightIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import {
  InteractiveMoroccoMap,
  TYPE_META,
  type MapCity,
  type CityType,
} from '../interactive-morocco-map'

// ─────────────────────────────────────────────────────────────────────────────
//  Content data per city type
// ─────────────────────────────────────────────────────────────────────────────

const HIGHLIGHTS_BY_TYPE: Record<CityType, {
  id: string; name: string; category: string; description: string; image: string
}[]> = {
  heritage: [
    { id: 'h1', name: 'Al Quaraouiyine',  category: 'Heritage',      description: "World's oldest university",      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400' },
    { id: 'h2', name: 'Bab Boujloud',     category: 'Architecture',  description: 'Blue Gate of the Fès Medina',    image: 'https://images.unsplash.com/photo-1553899017-9279a3e1c0c9?w=400' },
    { id: 'h3', name: 'Hassan Tower',     category: 'Monument',      description: 'Unfinished minaret of Rabat',    image: 'https://images.unsplash.com/photo-1548018560-c7196548e84d?w=400' },
    { id: 'h4', name: 'Chellah',          category: 'Ruins',         description: 'Ancient Roman & Merinid site',   image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=400' },
  ],
  artisan: [
    { id: 'a1', name: 'Chouara Tannery',  category: 'Artisan',       description: 'Iconic leather dyeing pits',     image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=400' },
    { id: 'a2', name: 'Jemaa el-Fna',    category: 'Market',        description: 'Vibrant square of Marrakech',    image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400' },
    { id: 'a3', name: 'Zellige Studio',   category: 'Craft',         description: 'Traditional tile artisans',      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400' },
    { id: 'a4', name: 'Safi Pottery',     category: 'Ceramics',      description: 'Famous blue glazed ceramics',    image: 'https://images.unsplash.com/photo-1548018560-c7196548e84d?w=400' },
  ],
  food: [
    { id: 'f1', name: 'Tagine Workshop',  category: 'Gastronomy',    description: 'Slow-cooked Moroccan dishes',    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400' },
    { id: 'f2', name: 'Argan Oil Farm',   category: 'Produce',       description: 'Liquid gold of Morocco',         image: 'https://images.unsplash.com/photo-1548018560-c7196548e84d?w=400' },
    { id: 'f3', name: 'Souk Spices',      category: 'Market',        description: 'Rainbow of Moroccan spices',     image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400' },
    { id: 'f4', name: 'Atlantic Seafood', category: 'Food',          description: 'Fresh catch from the Atlantic',  image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400' },
  ],
}

const DEFAULT_HIGHLIGHTS = [
  { id: 'd1', name: 'Al Quaraouiyine',  category: 'Heritage',   description: "World's oldest university",     image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400' },
  { id: 'd2', name: 'Chouara Tannery',  category: 'Artisan',    description: 'Iconic leather dyeing pits',    image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=400' },
  { id: 'd3', name: 'Jemaa el-Fna',    category: 'Market',     description: 'Vibrant square of Marrakech',   image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400' },
  { id: 'd4', name: 'Tagine Workshop',  category: 'Food',       description: 'Slow-cooked Moroccan dishes',   image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400' },
]

interface HomeMapScreenProps {
  isDark?: boolean
}

export function HomeMapScreen({ isDark }: HomeMapScreenProps) {
  void isDark
  const { navigate } = useNavigation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(false)
  const [hoveredCity, setHoveredCity]   = useState<MapCity | null>(null)
  const [selectedCity, setSelectedCity] = useState<MapCity | null>(null)

  // Hover is used only for marker visuals. Cards are driven by selectedCity.
  const activeBadgeCity = selectedCity ?? hoveredCity   // badge above map
  const activeCity      = selectedCity                  // content
  const activeMeta      = activeCity ? TYPE_META[activeCity.type] : null

  const highlights = activeCity ? HIGHLIGHTS_BY_TYPE[activeCity.type] : DEFAULT_HIGHLIGHTS
  const filteredHighlights = activeFilter === 'all'
    ? highlights
    : highlights.filter(h => h.category.toLowerCase().includes(activeFilter.toLowerCase()))

  // Collapsed sheet height chosen so the map image (326 px tall from the top)
  // is fully visible above the sheet.  Image bottom ≈ 326 px;
  // sheet top = phone-inner-height(784) − nav(64) − sheet(140) = 580 px → clear ✓
  const SHEET_H_COLLAPSED = 140
  const SHEET_H_EXPANDED  = 480

  return (
    <div className="h-full flex flex-col relative">

      {/* ── Search bar ─────────────────────────────────────────────────── */}
      <div className="absolute top-12 left-4 right-4 z-30">
        <div className="glass rounded-2xl border border-border/50 shadow-lg">
          <div className="flex items-center gap-3 px-4 py-3">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search places, crafts, artisans…"
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <MicIcon className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Filter chips ───────────────────────────────────────────────── */}
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

      {/* ── Map area (flex-1 fills remaining height) ───────────────────── */}
      <div className="flex-1 relative bg-gradient-to-b from-[#BDD9EF] to-[#C8E8D8]">
        <InteractiveMoroccoMap
          hoveredCity={hoveredCity}
          selectedCity={selectedCity}
          onCityHover={setHoveredCity}
          onCityClick={(city) => setSelectedCity(prev => prev?.id === city.id ? null : city)}
          topOffset={168}
          bottomOffset={154}
          className="absolute inset-0"
        />

        {/* Active city badge — shown on hover OR selection */}
        {activeBadgeCity && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-1">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold"
              style={{
                backgroundColor: TYPE_META[activeBadgeCity.type].hex,
                color: activeBadgeCity.type === 'artisan' ? '#1a1a1a' : 'white',
              }}
            >
              <MapPinIcon className="w-3 h-3" />
              <span>{activeBadgeCity.name}</span>
              {selectedCity?.id === activeBadgeCity.id && (
                <>
                  <span className="opacity-50">·</span>
                  <span className="opacity-85 font-normal">{activeBadgeCity.heritageSites} sites</span>
                  <span className="opacity-50">·</span>
                  <span className="opacity-85 font-normal">{activeBadgeCity.artisans} artisans</span>
                </>
              )}
            </div>
            {selectedCity?.id === activeBadgeCity.id && (
              <span className="text-[9px] bg-black/40 text-white/80 px-2 py-0.5 rounded-full">
                Tap another city to switch
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom sheet (glassmorphic, short collapsed height) ────────── */}
      <div
        className={cn(
          "absolute bottom-14 left-0 right-0 z-20",
          "rounded-t-3xl overflow-hidden shadow-2xl",
          "bg-background/92 backdrop-blur-md border-t border-border/30",
          "transition-all duration-300"
        )}
        style={{ height: bottomSheetExpanded ? SHEET_H_EXPANDED : SHEET_H_COLLAPSED }}
      >
        {/* Drag handle */}
        <button
          onClick={() => setBottomSheetExpanded(!bottomSheetExpanded)}
          className="w-full flex justify-center py-2.5"
          aria-label={bottomSheetExpanded ? 'Collapse' : 'Expand'}
        >
          <div className="w-8 h-1 bg-muted-foreground/30 rounded-full" />
        </button>

        <div className="px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {activeMeta && (
                <span
                  className="flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: activeMeta.hex, color: activeCity?.type === 'artisan' ? '#1a1a1a' : 'white' }}
                >
                  {activeMeta.label}
                </span>
              )}
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground leading-tight truncate">
                  {activeCity ? `${activeCity.name} Highlights` : 'Explore Morocco'}
                </h3>
                {activeCity && (
                  <p className="text-[10px] text-muted-foreground" dir="rtl">{activeCity.nameAr}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate('region-detail')}
              className="flex-shrink-0 text-xs text-accent font-medium flex items-center gap-0.5 ml-2"
            >
              View all <ChevronRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* City quick-tags (selected only) */}
          {selectedCity && (
            <div className="flex gap-1.5 mb-2.5 overflow-x-auto scrollbar-hide">
              {selectedCity.highlights.map((h, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 px-2 py-0.5 rounded-lg text-[9px] font-semibold border border-border bg-muted text-foreground whitespace-nowrap"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* Content cards */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
            {filteredHighlights.map((place) => (
              <button
                key={place.id}
                onClick={() => navigate('region-detail')}
                className="flex-shrink-0 w-28 rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all text-left active:scale-[0.97]"
              >
                <div className="overflow-hidden" style={{ height: 58 }}>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
                    style={{ backgroundImage: `url(${place.image})` }}
                  />
                </div>
                <div className="p-2">
                  <h4 className="font-semibold text-[10px] text-foreground truncate leading-tight">
                    {place.name}
                  </h4>
                  <p className="text-[8.5px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
                    {place.description}
                  </p>
                  <span className="inline-block mt-1 text-[8px] font-bold text-accent uppercase tracking-wide">
                    {place.category}
                  </span>
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
