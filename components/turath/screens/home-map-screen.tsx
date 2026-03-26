"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FILTER_CHIPS } from '@/lib/turath-types'
import {
  SearchIcon, MicIcon, MapPinIcon, ChevronRightIcon, StarIcon, BellIcon,
} from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'
import {
  InteractiveMoroccoMap,
  TYPE_META,
  type MapCity,
  type CityType,
} from '../interactive-morocco-map'

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface HomeMapScreenProps {
  isDark?: boolean
}

export function HomeMapScreen({ isDark }: HomeMapScreenProps) {
  const { navigate, setSelectedCityId } = useNavigation()
  const { t } = useTranslation()

  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredCity, setHoveredCity]   = useState<MapCity | null>(null)
  const [selectedCity, setSelectedCity] = useState<MapCity | null>(null)

  // Real monument images per city (from /public/cities/)
  // Using t() for names and descriptions where appropriate
  const CITY_HIGHLIGHTS: Record<string, {
    id: string; name: string; category: string; description: string; image: string
  }[]> = {
    tangier: [
      { id: 'tg1', name: t('home_map.kasbah_museum', 'Kasbah Museum'),       category: t('home_map.cat_heritage', 'Heritage'),      description: t('home_map.kasbah_museum_desc', 'Iconic fortress overlooking the strait'),      image: '/cities/Tangier/kasbah%20museum.jpg' },
      { id: 'tg2', name: t('home_map.caves_hercules', 'Caves of Hercules'),   category: t('home_map.cat_nature', 'Nature'),        description: t('home_map.caves_hercules_desc', 'Legendary sea caves at the cape'),             image: '/cities/Tangier/hercules.jpg' },
      { id: 'tg3', name: t('home_map.grand_socco', 'Grand Socco'),         category: t('home_map.cat_market', 'Market'),        description: t('home_map.grand_socco_desc', 'Lively central square of Tangier'),            image: '/cities/Tangier/Grand_Socco_Tangier.jpg' },
    ],
    chefchaouen: [
      { id: 'ch1', name: t('home_map.blue_medina', 'Blue Medina'),         category: t('home_map.cat_heritage', 'Heritage'),      description: t('home_map.blue_medina_desc', 'Iconic blue-washed alleyways'),                image: '/cities/Chefchaouen/blue%20medina.jpg' },
      { id: 'ch2', name: t('home_map.ras_el_maa', 'Ras El Maa'),          category: t('home_map.cat_nature', 'Nature'),        description: t('home_map.ras_el_maa_desc', 'Crystal-clear spring waterfall'),              image: '/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp' },
    ],
    fes: [
      { id: 'fs1', name: t('home_map.al_qarawiyyin', 'Al-Qarawiyyin'),       category: t('home_map.cat_heritage', 'Heritage'),      description: t('home_map.al_qarawiyyin_desc', "World's oldest university"),                   image: '/cities/fes/mezquita-al-karaouine-4.jpg' },
      { id: 'fs2', name: t('home_map.bou_inania', 'Bou Inania Madrasa'),  category: t('home_map.cat_architecture', 'Architecture'),  description: t('home_map.bou_inania_desc', 'Exquisite Marinid-era school'),                image: '/cities/fes/bou%20inania.webp' },
      { id: 'fs3', name: t('home_map.chouara', 'Chouara Tannery'),     category: t('home_map.cat_artisan', 'Artisan'),       description: t('home_map.chouara_desc', 'Iconic leather dyeing pits of Fès'),           image: '/cities/fes/Chouara-Tannery.jpg' },
    ],
    meknes: [
      { id: 'mk1', name: t('home_map.bab_mansour', 'Bab Mansour'),         category: t('home_map.cat_architecture', 'Architecture'),  description: t('home_map.bab_mansour_desc', 'Majestic imperial gate of Meknès'),            image: '/cities/Meknes/bab-mansour-gate.jpg' },
    ],
    rabat: [
      { id: 'rb1', name: t('home_map.hassan_tower', 'Hassan Tower'),        category: t('home_map.cat_monument', 'Monument'),      description: t('home_map.hassan_tower_desc', 'Unfinished minaret of the 12th century'),      image: '/cities/Rabat/hassan-tower2.webp' },
      { id: 'rb2', name: t('home_map.chellah', 'Chellah'),             category: t('home_map.cat_ruins', 'Ruins'),         description: t('home_map.chellah_desc', 'Ancient Roman & Merinid riverside site'),      image: '/cities/Rabat/necropolis-de-chellah-3.jpg' },
      { id: 'rb3', name: t('home_map.kasbah_oudaias', 'Kasbah des Oudaias'),  category: t('home_map.cat_heritage', 'Heritage'),      description: t('home_map.kasbah_oudaias_desc', 'Fortified Andalusian neighbourhood'),          image: '/cities/Rabat/Kasbah-Udayas-Rabat.webp' },
    ],
    casablanca: [
      { id: 'cb1', name: t('home_map.hassan_ii_mosque', 'Hassan II Mosque'),   category: t('home_map.cat_monument', 'Monument'),      description: t('home_map.hassan_ii_mosque_desc', "Africa's largest mosque, sea terrace"),        image: '/cities/Casablanca/hassan-ii-mosque-2.jpg' },
      { id: 'cb2', name: t('home_map.habous', 'Quartier Habous'),    category: t('home_map.cat_heritage', 'Heritage'),      description: t('home_map.habous_desc', 'French-Moroccan neo-Moorish district'),        image: '/cities/Casablanca/habbous.png' },
    ],
    safi: [
      { id: 'sf1', name: t('home_map.kechla', 'Kechla Fortress'),     category: t('home_map.cat_heritage', 'Heritage'),      description: t('home_map.kechla_desc', 'Portuguese sea fortress on the cliff'),        image: '/cities/Safi/kachla%20fortress.jpg' },
      { id: 'sf2', name: t('home_map.pottery_quarter', 'Pottery Quarter'),     category: t('home_map.cat_artisan', 'Artisan'),       description: t('home_map.pottery_quarter_desc', 'Famous blue glazed ceramics workshops'),       image: '/cities/Safi/pottery%20quarter.png' },
    ],
    essaouira: [
      { id: 'es1', name: t('home_map.skala', 'Skala Ramparts'),      category: t('home_map.cat_heritage', 'Heritage'),      description: t('home_map.skala_desc', 'Atlantic-facing cannon sea walls'),            image: '/cities/Essaouira/skala.jpeg' },
    ],
    marrakech: [
      { id: 'm1', name: t('home_map.jemaa_el_fna', 'Jemaa el-Fna'),      category: t('home_map.cat_market', 'Market'),        description: t('home_map.jemaa_el_fna_desc', 'Vibrant UNESCO-listed main square'),           image: '/cities/Marrakech/jama-el-fnaa.jpg' },
      { id: 'm2', name: t('home_map.bahia_palace', 'Bahia Palace'),       category: t('home_map.cat_architecture', 'Architecture'),  description: t('home_map.bahia_palace_desc', 'Opulent 19th-century royal palace'),           image: '/cities/Marrakech/bahia%20palace.jpeg' },
      { id: 'm3', name: t('home_map.majorelle', 'Majorelle Garden'),   category: t('home_map.cat_nature', 'Nature'),        description: t('home_map.majorelle_desc', 'Cobalt-blue Yves Saint Laurent garden'),       image: '/cities/Marrakech/majorelle.jpg' },
    ],
  }

  const DEFAULT_HIGHLIGHTS = [
    CITY_HIGHLIGHTS.fes[0],
    CITY_HIGHLIGHTS.marrakech[0],
    CITY_HIGHLIGHTS.casablanca[0],
    CITY_HIGHLIGHTS.rabat[0],
    CITY_HIGHLIGHTS.chefchaouen[0],
    CITY_HIGHLIGHTS.meknes[0],
    CITY_HIGHLIGHTS.fes[2],
    CITY_HIGHLIGHTS.essaouira[0],
    CITY_HIGHLIGHTS.tangier[0],
  ]

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
    <div className="h-full flex flex-col overflow-hidden bg-background">

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
              className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
              style={{ color: '#C9A84C', opacity: isDark ? 0.8 : 1 }}
            >
              {t('home_map.subtitle', 'استكشف المغرب')}
            </p>
            <h1 className={cn("text-[17px] font-black leading-tight tracking-tight", isDark ? "text-white" : "text-foreground")}>
              {t('home_map.title', 'Discover Morocco')}
            </h1>
          </div>
          <div className="relative">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95", isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/8")}>
              <BellIcon className={cn("w-4 h-4", isDark ? "text-white/60" : "text-foreground/60")} />
            </div>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#C1121F] border-2 border-background" />
          </div>
        </div>

        {/* Search bar */}
        <div
          className={cn("flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all focus-within:ring-2 focus-within:ring-primary/20")}
          style={{
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)',
            border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <SearchIcon className={cn("w-4 h-4 flex-shrink-0", isDark ? "text-white/35" : "text-muted-foreground")} />
          <input
            type="text"
            placeholder={t('home_map.search_placeholder', 'Search cities, crafts, artisans…')}
            className={cn("flex-1 bg-transparent text-xs outline-none", isDark ? "text-white placeholder:text-white/25" : "text-foreground placeholder:text-muted-foreground")}
          />
          <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform active:scale-90" style={{ background: 'rgba(201,168,76,0.20)' }}>
            <MicIcon className="w-3.5 h-3.5 text-[#C9A84C]" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide mt-2.5">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className="px-3.5 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: activeFilter === chip.id ? '#C9A84C' : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                color: activeFilter === chip.id ? '#1a1a1a' : isDark ? 'rgba(255,255,255,0.55)' : undefined,
                border: activeFilter === chip.id ? 'none' : isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: activeFilter === chip.id ? '0 4px 12px rgba(201,168,76,0.3)' : undefined,
              }}
            >
              {t(`filter.${chip.id}`, chip.label)}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAP + SIDE INFO PANEL ────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 mx-3 rounded-3xl overflow-hidden flex shadow-2xl"
        style={{
          height: 248,
          border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)',
          boxShadow: isDark ? '0 12px 48px rgba(0,0,0,0.6)' : '0 8px 32px rgba(0,0,0,0.12)',
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
          className="flex-shrink-0 flex flex-col py-4 px-3"
          style={{
            width: 110,
            background: isDark ? 'rgba(10,10,24,0.98)' : 'rgba(255,255,255,0.98)',
            borderLeft: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* City count */}
          <div className="mb-3">
            <p className={cn("text-[8px] font-black uppercase tracking-widest mb-1", isDark ? "text-white/40" : "text-muted-foreground")}>{t('common.explore', 'Explore')}</p>
            <div className="flex items-baseline gap-1">
              <span className={cn("text-[28px] font-black leading-none", isDark ? "text-white" : "text-foreground")}>9</span>
              <span className={cn("text-[9px] font-bold", isDark ? "text-white/40" : "text-muted-foreground")}>{t('common.cities', 'cities')}</span>
            </div>
          </div>

          <div className={cn("h-px mb-3", isDark ? "bg-white/10" : "bg-black/8")} />

          {/* City detail or legend */}
          <div className="flex-1 min-h-0">
            {activeCity ? (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-right-2">
                {activeMeta && (
                  <span
                    className="inline-block text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ backgroundColor: activeMeta.hex, color: activeCity.type === 'artisan' ? '#1a1a1a' : 'white' }}
                  >
                    {t(`city_type.${activeCity.type}`, activeMeta.label)}
                  </span>
                )}
                <p className={cn("text-[11px] font-black leading-tight truncate", isDark ? "text-white" : "text-foreground")}>{activeCity.name}</p>
                <p className={cn("text-[9px] font-serif", isDark ? "text-white/40" : "text-muted-foreground")} dir="rtl">{activeCity.nameAr}</p>
                <div className={cn("h-px my-1.5", isDark ? "bg-white/10" : "bg-black/8")} />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <MapPinIcon className="w-3 h-3 text-[#C1121F] flex-shrink-0" />
                    <span className={cn("text-[8px] font-medium", isDark ? "text-white/50" : "text-muted-foreground")}>{activeCity.heritageSites} {t('common.sites', 'sites')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StarIcon className="w-3 h-3 text-[#C9A84C] flex-shrink-0" />
                    <span className={cn("text-[8px] font-medium", isDark ? "text-white/50" : "text-muted-foreground")}>{activeCity.artisans} {t('common.artisans', 'artisans')}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in">
                <p className={cn("text-[8.5px] font-medium leading-snug mb-3", isDark ? "text-white/40" : "text-muted-foreground")}>{t('home_map.tap_hint', 'Tap a city on the map')}</p>
                <div className="space-y-2">
                  {(Object.entries(TYPE_META) as [CityType, typeof TYPE_META[CityType]][]).map(([type, meta]) => (
                    <div key={type} className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 border"
                        style={{ backgroundColor: meta.hex, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' }}
                      />
                      <span className={cn("text-[8px] font-semibold uppercase tracking-tight", isDark ? "text-white/45" : "text-muted-foreground")}>{t(`city_type.${type}`, meta.label)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View all CTA */}
          <button
            onClick={() => goToCity(activeCity?.id ?? null)}
            className="w-full mt-3 text-[8px] font-black uppercase tracking-wider py-2 rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95"
            style={{
              background: isDark ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.12)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: isDark ? '#C9A84C' : '#8a6a10',
            }}
          >
            {t('common.view_all', 'View all')} <ChevronRightIcon className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* ── HIGHLIGHTS SECTION ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 px-3 pt-5 pb-1">
        {/* Section header */}
        <div className="flex items-center justify-between mb-3 px-1 flex-shrink-0">
          <div>
            <h2 className={cn("text-xs font-black uppercase tracking-wide", isDark ? "text-white" : "text-foreground")}>
              {selectedCity ? t('home_map.city_highlights', '{{city}} Highlights', { city: selectedCity.name }) : t('home_map.explore_morocco', 'Explore Morocco')}
            </h2>
            {selectedCity && (
              <p className={cn("text-[9px] mt-0.5 opacity-60 font-serif", isDark ? "text-white" : "text-muted-foreground")} dir="rtl">
                {selectedCity.nameAr}
              </p>
            )}
          </div>
          <button
            onClick={() => goToCity(selectedCity?.id ?? null)}
            className="text-[10px] font-bold flex items-center gap-0.5 transition-all hover:opacity-70 active:scale-95"
            style={{ color: isDark ? '#C9A84C' : '#8a6a10' }}
          >
            {t('common.see_all', 'See all')} <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* City quick-tags */}
        {selectedCity && (
          <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide flex-shrink-0 px-1">
            {selectedCity.highlights.map((h, i) => (
              <span
                key={i}
                className="flex-shrink-0 px-2.5 py-1 rounded-lg text-[8px] font-bold border whitespace-nowrap shadow-sm"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'white',
                  border: isDark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(0,0,0,0.06)',
                  color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                }}
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Highlight cards */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide flex-shrink-0 px-1 snap-x">
          {filteredHighlights.map((place) => (
            <button
              key={place.id}
              onClick={() => {
                // If it's a default highlight, we don't necessarily have a selected city
                // But we can try to find the city from the ID prefix if needed
                // For now, simplify and just navigate to heritage-detail if it's a real ID
                if (!place.id.startsWith('d')) {
                   // would need to set selectedHeritageId here
                   navigate('heritage-detail')
                } else {
                   goToCity(null)
                }
              }}
              className="flex-shrink-0 w-32 rounded-2xl overflow-hidden text-left transition-all active:scale-95 shadow-lg snap-start"
              style={{
                background: isDark ? 'rgba(255,255,255,0.03)' : 'white',
                border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div className="relative overflow-hidden group" style={{ height: 74 }}>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${place.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div
                className="p-3"
                style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : undefined }}
              >
                <h4 className={cn("font-bold text-[10px] truncate leading-tight mb-1", isDark ? "text-white/95" : "text-foreground")}>
                  {place.name}
                </h4>
                <p className={cn("text-[8px] line-clamp-2 leading-snug opacity-70", isDark ? "text-white" : "text-muted-foreground")}>
                  {place.description}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span
                    className="text-[7.5px] font-black uppercase tracking-wider"
                    style={{ color: isDark ? '#C9A84C' : '#8a6a10' }}
                  >
                    {place.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
