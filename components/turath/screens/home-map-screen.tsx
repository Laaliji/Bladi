"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FILTER_CHIPS } from '@/lib/turath-types'
import {
  SearchIcon, MicIcon, MapPinIcon, ChevronRightIcon, StarIcon, BellIcon,
} from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import {
  InteractiveMoroccoMap,
  TYPE_META,
  type MapCity,
  type CityType,
} from '../interactive-morocco-map'

// ─────────────────────────────────────────────────────────────────────────────
//  Real monument images per city (from /public/cities/)
// ─────────────────────────────────────────────────────────────────────────────

const CITY_HIGHLIGHTS: Record<string, {
  id: string; name: string; category: string; description: string; image: string
}[]> = {
  tangier: [
    { id: 't1', name: 'Kasbah Museum',       category: 'Heritage',      description: 'Iconic fortress overlooking the strait',      image: '/cities/Tangier/kasbah%20museum.jpg' },
    { id: 't2', name: 'Caves of Hercules',   category: 'Nature',        description: 'Legendary sea caves at the cape',             image: '/cities/Tangier/hercules.jpg' },
    { id: 't3', name: 'Grand Socco',         category: 'Market',        description: 'Lively central square of Tangier',            image: '/cities/Tangier/Grand_Socco_Tangier.jpg' },
  ],
  chefchaouen: [
    { id: 'c1', name: 'Blue Medina',         category: 'Heritage',      description: 'Iconic blue-washed alleyways',                image: '/cities/Chefchaouen/blue%20medina.jpg' },
    { id: 'c2', name: 'Ras El Maa',          category: 'Nature',        description: 'Crystal-clear spring waterfall',              image: '/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp' },
    { id: 'c3', name: 'Spanish Mosque',      category: 'Monument',      description: 'Panoramic hilltop mosque',                    image: '/cities/Chefchaouen/spanish%20mosque.jpg' },
    { id: 'c4', name: 'Akchour Waterfalls',  category: 'Nature',        description: 'Stunning cascades in the Rif mountains',      image: '/cities/Chefchaouen/akchour.jpg' },
  ],
  fes: [
    { id: 'f1', name: 'Al-Qarawiyyin',       category: 'Heritage',      description: "World's oldest university",                   image: '/cities/fes/mezquita-al-karaouine-4.jpg' },
    { id: 'f2', name: 'Bou Inania Madrasa',  category: 'Architecture',  description: 'Exquisite Marinid-era school',                image: '/cities/fes/bou%20inania.webp' },
    { id: 'f3', name: 'Chouara Tannery',     category: 'Artisan',       description: 'Iconic leather dyeing pits of Fès',           image: '/cities/fes/Chouara-Tannery.jpg' },
  ],
  meknes: [
    { id: 'm1', name: 'Bab Mansour',         category: 'Architecture',  description: 'Majestic imperial gate of Meknès',            image: '/cities/Meknes/bab-mansour-gate.jpg' },
    { id: 'm2', name: 'Moulay Ismail Tomb',  category: 'Heritage',      description: 'Mausoleum of the sultan builder',             image: '/cities/Meknes/Le-tombeau-de-Moulay-Isma%C3%AFl.jpg' },
    { id: 'm3', name: 'Place El Hedim',      category: 'Market',        description: 'Grand square of the imperial city',           image: '/cities/Meknes/el-hedim-square.jpg' },
  ],
  rabat: [
    { id: 'r1', name: 'Hassan Tower',        category: 'Monument',      description: 'Unfinished minaret of the 12th century',      image: '/cities/Rabat/hassan-tower2.webp' },
    { id: 'r2', name: 'Chellah',             category: 'Ruins',         description: 'Ancient Roman & Merinid riverside site',      image: '/cities/Rabat/necropolis-de-chellah-3.jpg' },
    { id: 'r3', name: 'Kasbah des Oudaias',  category: 'Heritage',      description: 'Fortified Andalusian neighbourhood',          image: '/cities/Rabat/Kasbah-Udayas-Rabat.webp' },
  ],
  casablanca: [
    { id: 'ca1', name: 'Hassan II Mosque',   category: 'Monument',      description: "Africa's largest mosque, sea terrace",        image: '/cities/Casablanca/hassan-ii-mosque-2.jpg' },
    { id: 'ca2', name: 'Quartier Habous',    category: 'Heritage',      description: 'French-Moroccan neo-Moorish district',        image: '/cities/Casablanca/habbous.png' },
    { id: 'ca3', name: 'Morocco Mall',       category: 'Shopping',      description: 'Iconic aquarium shopping landmark',           image: '/cities/Casablanca/morocco-mall-3-.webp' },
  ],
  safi: [
    { id: 's1', name: 'Kechla Fortress',     category: 'Heritage',      description: 'Portuguese sea fortress on the cliff',        image: '/cities/Safi/kachla%20fortress.jpg' },
    { id: 's2', name: 'Pottery Quarter',     category: 'Artisan',       description: 'Famous blue glazed ceramics workshops',       image: '/cities/Safi/pottery%20quarter.png' },
    { id: 's3', name: 'Portuguese Chapel',   category: 'Architecture',  description: 'Historic Manueline-style chapel',             image: '/cities/Safi/cathedrale-portugaise0-scaled.jpg' },
    { id: 's4', name: 'Safi Tagine',         category: 'Food',          description: 'Authentic slow-cooked Safi tagine',           image: '/cities/Safi/tajine.webp' },
  ],
  essaouira: [
    { id: 'e1', name: 'Skala Ramparts',      category: 'Heritage',      description: 'Atlantic-facing cannon sea walls',            image: '/cities/Essaouira/skala.jpeg' },
    { id: 'e2', name: 'Medina UNESCO',       category: 'Monument',      description: 'World Heritage walled medina port',           image: '/cities/Essaouira/skala.webp' },
  ],
  marrakech: [
    { id: 'mk1', name: 'Jemaa el-Fna',      category: 'Market',        description: 'Vibrant UNESCO-listed main square',           image: '/cities/Marrakech/jama-el-fnaa.jpg' },
    { id: 'mk2', name: 'Bahia Palace',       category: 'Architecture',  description: 'Opulent 19th-century royal palace',           image: '/cities/Marrakech/bahia%20palace.jpeg' },
    { id: 'mk3', name: 'Majorelle Garden',   category: 'Nature',        description: 'Cobalt-blue Yves Saint Laurent garden',       image: '/cities/Marrakech/majorelle.jpg' },
  ],
}

// Default when no city is selected — one card per city
const DEFAULT_HIGHLIGHTS = [
  { id: 'd1', name: 'Al-Qarawiyyin',       category: 'Fès',           description: "World's oldest university",                   image: '/cities/fes/mezquita-al-karaouine-4.jpg' },
  { id: 'd2', name: 'Jemaa el-Fna',        category: 'Marrakech',     description: 'Vibrant UNESCO-listed main square',           image: '/cities/Marrakech/jama-el-fnaa.jpg' },
  { id: 'd3', name: 'Hassan II Mosque',    category: 'Casablanca',    description: "Africa's largest mosque",                     image: '/cities/Casablanca/hassan-ii-mosque-2.jpg' },
  { id: 'd4', name: 'Hassan Tower',        category: 'Rabat',         description: 'Unfinished 12th-century minaret',             image: '/cities/Rabat/hassan-tower2.webp' },
  { id: 'd5', name: 'Blue Medina',         category: 'Chefchaouen',   description: 'Iconic blue-washed alleyways',                image: '/cities/Chefchaouen/blue medina.jpg' },
  { id: 'd6', name: 'Bab Mansour',         category: 'Meknès',        description: 'Majestic imperial gate',                      image: '/cities/Meknes/bab-mansour-gate.jpg' },
  { id: 'd7', name: 'Chouara Tannery',     category: 'Fès',           description: 'Iconic leather dyeing pits',                  image: '/cities/fes/Chouara-Tannery.jpg' },
  { id: 'd8', name: 'Skala Ramparts',      category: 'Essaouira',     description: 'Atlantic-facing cannon sea walls',            image: '/cities/Essaouira/skala.jpeg' },
  { id: 'd9', name: 'Kasbah Museum',       category: 'Tanger',        description: 'Fortress overlooking the strait',             image: '/cities/Tangier/kasbah museum.jpg' },
]

interface HomeMapScreenProps {
  isDark?: boolean
}

export function HomeMapScreen({ isDark }: HomeMapScreenProps) {
  const { navigate, setSelectedCityId } = useNavigation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredCity, setHoveredCity]   = useState<MapCity | null>(null)
  const [selectedCity, setSelectedCity] = useState<MapCity | null>(null)

  const goToCity = (cityId: string | null) => {
    setSelectedCityId(cityId)
    navigate('region-detail')
  }

  const activeCity = selectedCity ?? hoveredCity
  const activeMeta = activeCity ? TYPE_META[activeCity.type] : null

  const highlights = selectedCity
    ? (CITY_HIGHLIGHTS[selectedCity.id] ?? DEFAULT_HIGHLIGHTS)
    : DEFAULT_HIGHLIGHTS

  const filteredHighlights = activeFilter === 'all'
    ? highlights
    : highlights.filter(h => h.category.toLowerCase().includes(activeFilter.toLowerCase()))

  const mapBg = isDark
    ? 'linear-gradient(135deg, #060810 0%, #0b0d18 40%, #0e1022 70%, #080a10 100%)'
    : 'linear-gradient(135deg, #BDD9EF 0%, #C8E8D8 100%)'

  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* ── HERO HEADER ─────────────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 pt-10 pb-3 px-4"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #0d0d16 0%, #0b0b13 80%, transparent 100%)'
            : undefined,
        }}
      >
        {/* Greeting row */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
              style={{ color: '#C9A84C', opacity: isDark ? 0.8 : 1 }}
            >
              استكشف المغرب
            </p>
            <h1 className={cn("text-[17px] font-black leading-tight tracking-tight", isDark ? "text-white" : "text-foreground")}>
              Discover Morocco
            </h1>
          </div>
          <div className="relative">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", isDark ? "bg-white/8 border border-white/10" : "bg-black/5 border border-black/8")}>
              <BellIcon className={cn("w-4 h-4", isDark ? "text-white/60" : "text-foreground/60")} />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#C1121F] border border-background" />
          </div>
        </div>

        {/* Search bar */}
        <div
          className={cn("flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border")}
          style={{
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)',
            border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <SearchIcon className={cn("w-4 h-4 flex-shrink-0", isDark ? "text-white/35" : "text-muted-foreground")} />
          <input
            type="text"
            placeholder="Search cities, crafts, artisans…"
            className={cn("flex-1 bg-transparent text-xs outline-none", isDark ? "text-white placeholder:text-white/25" : "text-foreground placeholder:text-muted-foreground")}
          />
          <button className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.20)' }}>
            <MicIcon className="w-3.5 h-3.5 text-[#C9A84C]" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide mt-2.5">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className="px-3 py-1 rounded-xl text-[10px] font-semibold whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: activeFilter === chip.id ? '#C9A84C' : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                color: activeFilter === chip.id ? '#1a1a1a' : isDark ? 'rgba(255,255,255,0.55)' : undefined,
                border: activeFilter === chip.id ? 'none' : isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: activeFilter === chip.id ? '0 2px 8px rgba(201,168,76,0.35)' : undefined,
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAP + SIDE INFO PANEL ────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 mx-3 rounded-2xl overflow-hidden flex"
        style={{
          height: 248,
          border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.55)' : '0 4px 20px rgba(0,0,0,0.09)',
        }}
      >
        {/* Map */}
        <div className="relative flex-1 overflow-hidden" style={{ background: mapBg }}>
          {isDark && (
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(6,8,16,0.65) 100%)' }}
            />
          )}
          <InteractiveMoroccoMap
            hoveredCity={hoveredCity}
            selectedCity={selectedCity}
            onCityHover={setHoveredCity}
            onCityClick={(city) => setSelectedCity(prev => prev?.id === city.id ? null : city)}
            topOffset={0}
            bottomOffset={0}
            isDark={isDark}
            className="absolute inset-0"
          />
        </div>

        {/* Info Panel */}
        <div
          className="flex-shrink-0 flex flex-col py-3 px-3"
          style={{
            width: 108,
            background: isDark ? 'rgba(10,10,20,0.97)' : 'rgba(255,255,255,0.96)',
            borderLeft: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {/* City count */}
          <div className="mb-2">
            <p className={cn("text-[8px] font-bold uppercase tracking-widest mb-0.5", isDark ? "text-white/30" : "text-muted-foreground")}>Explore</p>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-[26px] font-black leading-none", isDark ? "text-white" : "text-foreground")}>9</span>
              <span className={cn("text-[9px]", isDark ? "text-white/35" : "text-muted-foreground")}>cities</span>
            </div>
          </div>

          <div className={cn("h-px mb-2", isDark ? "bg-white/7" : "bg-black/6")} />

          {/* City detail or legend */}
          <div className="flex-1 min-h-0">
            {activeCity ? (
              <div className="space-y-1">
                {activeMeta && (
                  <span
                    className="inline-block text-[7px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: activeMeta.hex, color: activeCity.type === 'artisan' ? '#1a1a1a' : 'white' }}
                  >
                    {activeMeta.label}
                  </span>
                )}
                <p className={cn("text-[11px] font-bold leading-tight", isDark ? "text-white" : "text-foreground")}>{activeCity.name}</p>
                <p className={cn("text-[9px]", isDark ? "text-white/35" : "text-muted-foreground")} dir="rtl">{activeCity.nameAr}</p>
                <div className={cn("h-px my-1", isDark ? "bg-white/7" : "bg-black/6")} />
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-2.5 h-2.5 text-[#C1121F] flex-shrink-0" />
                    <span className={cn("text-[8px]", isDark ? "text-white/45" : "text-muted-foreground")}>{activeCity.heritageSites} sites</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-2.5 h-2.5 text-[#C9A84C] flex-shrink-0" />
                    <span className={cn("text-[8px]", isDark ? "text-white/45" : "text-muted-foreground")}>{activeCity.artisans} artisans</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className={cn("text-[8.5px] leading-snug mb-2", isDark ? "text-white/35" : "text-muted-foreground")}>Tap a city on the map</p>
                <div className="space-y-1.5">
                  {(Object.entries(TYPE_META) as [CityType, typeof TYPE_META[CityType]][]).map(([type, meta]) => (
                    <div key={type} className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 border"
                        style={{ backgroundColor: meta.hex, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
                      />
                      <span className={cn("text-[8px]", isDark ? "text-white/40" : "text-muted-foreground")}>{meta.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View all CTA */}
          <button
            onClick={() => goToCity(activeCity?.id ?? null)}
            className="w-full mt-2 text-[8px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-0.5 transition-all"
            style={{
              background: isDark ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.14)',
              border: '1px solid rgba(201,168,76,0.25)',
              color: isDark ? '#C9A84C' : '#8a6a10',
            }}
          >
            View all <ChevronRightIcon className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* ── HIGHLIGHTS SECTION ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 px-3 pt-3 pb-1">
        {/* Section header */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div>
            <h2 className={cn("text-xs font-bold", isDark ? "text-white" : "text-foreground")}>
              {selectedCity ? `${selectedCity.name} Highlights` : 'Explore Morocco'}
            </h2>
            {selectedCity && (
              <p className={cn("text-[9px] mt-0.5", isDark ? "text-white/35" : "text-muted-foreground")} dir="rtl">
                {selectedCity.nameAr}
              </p>
            )}
          </div>
          <button
            onClick={() => goToCity(selectedCity?.id ?? null)}
            className="text-[10px] font-semibold flex items-center gap-0.5 transition-opacity hover:opacity-80"
            style={{ color: isDark ? '#C9A84C' : '#8a6a10' }}
          >
            See all <ChevronRightIcon className="w-3 h-3" />
          </button>
        </div>

        {/* City quick-tags */}
        {selectedCity && (
          <div className="flex gap-1.5 mb-2 overflow-x-auto scrollbar-hide flex-shrink-0">
            {selectedCity.highlights.map((h, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-2 py-0.5 rounded-lg text-[8px] font-semibold border whitespace-nowrap"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : undefined,
                  border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid var(--color-border)',
                  color: isDark ? 'rgba(255,255,255,0.50)' : undefined,
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Highlight cards */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide flex-shrink-0">
          {filteredHighlights.map((place) => (
            <button
              key={place.id}
              onClick={() => goToCity(place.id.startsWith('d') ? null : selectedCity?.id ?? null)}
              className="flex-shrink-0 w-28 rounded-xl overflow-hidden text-left transition-all active:scale-[0.97]"
              style={{
                background: isDark ? 'rgba(255,255,255,0.04)' : 'var(--color-card)',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--color-border)',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.4)' : '0 1px 4px rgba(0,0,0,0.07)',
              }}
            >
              <div className="overflow-hidden" style={{ height: 62 }}>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
                  style={{ backgroundImage: `url(${place.image})` }}
                />
              </div>
              <div
                className="p-2"
                style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : undefined }}
              >
                <h4 className={cn("font-semibold text-[10px] truncate leading-tight", isDark ? "text-white/90" : "text-foreground")}>
                  {place.name}
                </h4>
                <p className={cn("text-[8px] mt-0.5 line-clamp-2 leading-tight", isDark ? "text-white/38" : "text-muted-foreground")}>
                  {place.description}
                </p>
                <span
                  className="inline-block mt-1 text-[7.5px] font-bold uppercase tracking-wide"
                  style={{ color: isDark ? '#C9A84C' : '#8a6a10' }}
                >
                  {place.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
