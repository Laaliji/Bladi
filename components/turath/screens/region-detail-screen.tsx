"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CATEGORY_TABS } from '@/lib/turath-types'
import { ChevronLeftIcon, ShareIcon, MapPinIcon, HeartIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'

// ─────────────────────────────────────────────────────────────────────────────
//  Per-city region data
// ─────────────────────────────────────────────────────────────────────────────

const CITY_REGION_DATA: Record<string, {
  name: string; nameAr: string; image: string
  heritageSites: number; artisans: number; itineraries: number
  cards: { id: string; title: string; titleAr: string; description: string; image: string; category: string; saved: boolean }[]
}> = {
  marrakech: {
    name: 'Marrakech', nameAr: 'مراكش', image: '/cities/Marrakech/jama-el-fnaa.jpg',
    heritageSites: 24, artisans: 156, itineraries: 8,
    cards: [
      { id: 'm1', title: 'Jemaa el-Fna',     titleAr: 'جامع الفنا',      description: 'Vibrant UNESCO-listed main square', image: '/cities/Marrakech/jama-el-fnaa.jpg',     category: 'history', saved: false },
      { id: 'm2', title: 'Bahia Palace',      titleAr: 'قصر الباهية',     description: 'Opulent 19th-century royal palace',  image: '/cities/Marrakech/bahia%20palace.jpeg', category: 'history', saved: true  },
      { id: 'm3', title: 'Majorelle Garden',  titleAr: 'حديقة ماجوريل',   description: 'Cobalt-blue Yves Saint Laurent garden', image: '/cities/Marrakech/majorelle.jpg',   category: 'nature',  saved: false },
    ],
  },
  fes: {
    name: 'Fès', nameAr: 'فاس', image: '/cities/fes/mezquita-al-karaouine-4.jpg',
    heritageSites: 31, artisans: 180, itineraries: 10,
    cards: [
      { id: 'fs1', title: 'Al-Qarawiyyin',      titleAr: 'جامعة القرويين',   description: "World's oldest university",          image: '/cities/fes/mezquita-al-karaouine-4.jpg', category: 'history', saved: false },
      { id: 'fs2', title: 'Bou Inania Madrasa', titleAr: 'مدرسة بو عنانية', description: 'Exquisite Marinid scholastic jewel',  image: '/cities/fes/bou%20inania.webp',           category: 'history', saved: true  },
      { id: 'fs3', title: 'Chouara Tannery',    titleAr: 'دباغة الشوارة',   description: 'Iconic medieval leather dyeing pits', image: '/cities/fes/Chouara-Tannery.jpg',         category: 'crafts',  saved: false },
    ],
  },
  casablanca: {
    name: 'Casablanca', nameAr: 'الدار البيضاء', image: '/cities/Casablanca/hassan-ii-mosque-2.jpg',
    heritageSites: 15, artisans: 120, itineraries: 5,
    cards: [
      { id: 'cb1', title: 'Hassan II Mosque', titleAr: 'مسجد الحسن الثاني', description: "Africa's largest mosque on the sea",   image: '/cities/Casablanca/hassan-ii-mosque-2.jpg', category: 'history', saved: false },
      { id: 'cb2', title: 'Quartier Habous',  titleAr: 'حي الحبوس',          description: 'Neo-Moorish French-Moroccan quarter', image: '/cities/Casablanca/habbous.png',             category: 'history', saved: true  },
      { id: 'cb3', title: 'Morocco Mall',     titleAr: 'مول المغرب',         description: 'Iconic aquarium shopping landmark',   image: '/cities/Casablanca/morocco-mall-3-.webp',   category: 'crafts',  saved: false },
    ],
  },
  rabat: {
    name: 'Rabat', nameAr: 'الرباط', image: '/cities/Rabat/hassan-tower2.webp',
    heritageSites: 22, artisans: 90, itineraries: 6,
    cards: [
      { id: 'rb1', title: 'Hassan Tower',       titleAr: 'صومعة حسان',       description: 'Unfinished minaret of the 12th century', image: '/cities/Rabat/hassan-tower2.webp',          category: 'history', saved: false },
      { id: 'rb2', title: 'Chellah',            titleAr: 'شالة',              description: 'Ancient Roman & Merinid riverside site', image: '/cities/Rabat/necropolis-de-chellah-3.jpg', category: 'history', saved: false },
      { id: 'rb3', title: 'Kasbah des Oudaias', titleAr: 'قصبة الوداية',      description: 'Fortified Andalusian neighbourhood',     image: '/cities/Rabat/Kasbah-Udayas-Rabat.webp',   category: 'history', saved: true  },
    ],
  },
  tangier: {
    name: 'Tanger', nameAr: 'طنجة', image: '/cities/Tangier/kasbah%20museum.jpg',
    heritageSites: 18, artisans: 42, itineraries: 4,
    cards: [
      { id: 'tg1', title: 'Kasbah Museum',     titleAr: 'متحف القصبة',    description: 'Fortress panorama over the Strait',  image: '/cities/Tangier/kasbah%20museum.jpg',   category: 'history', saved: false },
      { id: 'tg2', title: 'Caves of Hercules', titleAr: 'كهوف هرقل',      description: 'Legendary sea caves at the cape',    image: '/cities/Tangier/hercules.jpg',           category: 'nature',  saved: false },
      { id: 'tg3', title: 'Grand Socco',       titleAr: 'السوق الكبير',   description: 'Lively central square of Tangier',   image: '/cities/Tangier/Grand_Socco_Tangier.jpg', category: 'crafts', saved: true  },
    ],
  },
  chefchaouen: {
    name: 'Chefchaouen', nameAr: 'شفشاون', image: '/cities/Chefchaouen/blue%20medina.jpg',
    heritageSites: 9, artisans: 55, itineraries: 3,
    cards: [
      { id: 'ch1', title: 'Blue Medina',        titleAr: 'المدينة الزرقاء', description: 'Iconic blue-washed alleyways',           image: '/cities/Chefchaouen/blue%20medina.jpg',         category: 'history', saved: false },
      { id: 'ch2', title: 'Ras El Maa',         titleAr: 'رأس الماء',       description: 'Crystal-clear spring waterfall',         image: '/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp', category: 'nature',  saved: true  },
      { id: 'ch3', title: 'Spanish Mosque',     titleAr: 'المسجد الإسباني', description: 'Panoramic hilltop mosque',               image: '/cities/Chefchaouen/spanish%20mosque.jpg',      category: 'history', saved: false },
      { id: 'ch4', title: 'Akchour Waterfalls', titleAr: 'شلالات أكشور',   description: 'Stunning Rif mountain cascades',         image: '/cities/Chefchaouen/akchour.jpg',               category: 'nature',  saved: false },
    ],
  },
  meknes: {
    name: 'Meknès', nameAr: 'مكناس', image: '/cities/Meknes/bab-mansour-gate.jpg',
    heritageSites: 14, artisans: 70, itineraries: 4,
    cards: [
      { id: 'mk1', title: 'Bab Mansour',        titleAr: 'باب منصور',           description: 'Majestic imperial gate of Meknès',  image: '/cities/Meknes/bab-mansour-gate.jpg',              category: 'history', saved: false },
      { id: 'mk2', title: 'Moulay Ismail Tomb', titleAr: 'ضريح مولاي إسماعيل', description: 'Mausoleum of the sultan builder',    image: '/cities/Meknes/Le-tombeau-de-Moulay-Isma%C3%AFl.jpg', category: 'history', saved: true },
      { id: 'mk3', title: 'Place El Hedim',     titleAr: 'ساحة الهديم',         description: 'Grand square of the imperial city', image: '/cities/Meknes/el-hedim-square.jpg',               category: 'history', saved: false },
    ],
  },
  safi: {
    name: 'Safi', nameAr: 'آسفي', image: '/cities/Safi/kachla%20fortress.jpg',
    heritageSites: 9, artisans: 75, itineraries: 3,
    cards: [
      { id: 'sf1', title: 'Kechla Fortress',   titleAr: 'قلعة كشلة',         description: 'Portuguese sea fortress on the cliff',     image: '/cities/Safi/kachla%20fortress.jpg',           category: 'history', saved: false },
      { id: 'sf2', title: 'Pottery Quarter',   titleAr: 'حي الفخار',          description: 'Famous blue glazed ceramics workshops',    image: '/cities/Safi/pottery%20quarter.png',           category: 'crafts',  saved: true  },
      { id: 'sf3', title: 'Portuguese Chapel', titleAr: 'الكنيسة البرتغالية', description: 'Historic Manueline-style chapel',          image: '/cities/Safi/cathedrale-portugaise0-scaled.jpg', category: 'history', saved: false },
      { id: 'sf4', title: 'Safi Tagine',       titleAr: 'طاجين آسفي',         description: 'Authentic slow-cooked local tagine',       image: '/cities/Safi/tajine.webp',                     category: 'food',    saved: false },
    ],
  },
  essaouira: {
    name: 'Essaouira', nameAr: 'الصويرة', image: '/cities/Essaouira/skala.jpeg',
    heritageSites: 12, artisans: 88, itineraries: 4,
    cards: [
      { id: 'es1', title: 'Skala Ramparts', titleAr: 'أسوار الصقالة', description: 'Atlantic-facing cannon sea walls',      image: '/cities/Essaouira/skala.jpeg', category: 'history', saved: false },
      { id: 'es2', title: 'Medina UNESCO',  titleAr: 'المدينة العتيقة', description: 'World Heritage walled medina port',   image: '/cities/Essaouira/skala.webp', category: 'history', saved: true  },
    ],
  },
}

const DEFAULT_REGION = {
  name: 'Morocco', nameAr: 'المغرب', image: '/cities/Marrakech/jama-el-fnaa.jpg',
  heritageSites: 144, artisans: 876, itineraries: 48,
  cards: [
    { id: 'd1', title: 'Al-Qarawiyyin',     titleAr: 'جامعة القرويين',   description: "World's oldest university – Fès",         image: '/cities/fes/mezquita-al-karaouine-4.jpg',         category: 'history', saved: false },
    { id: 'd2', title: 'Jemaa el-Fna',     titleAr: 'جامع الفنا',        description: 'Vibrant UNESCO square – Marrakech',       image: '/cities/Marrakech/jama-el-fnaa.jpg',              category: 'history', saved: false },
    { id: 'd3', title: 'Hassan II Mosque', titleAr: 'مسجد الحسن الثاني', description: "Africa's largest mosque",                 image: '/cities/Casablanca/hassan-ii-mosque-2.jpg',       category: 'history', saved: false },
    { id: 'd4', title: 'Bab Mansour',      titleAr: 'باب منصور',          description: 'Majestic imperial gate – Meknès',         image: '/cities/Meknes/bab-mansour-gate.jpg',             category: 'history', saved: false },
    { id: 'd5', title: 'Blue Medina',      titleAr: 'المدينة الزرقاء',   description: 'Blue-washed alleyways – Chefchaouen',     image: '/cities/Chefchaouen/blue%20medina.jpg',           category: 'history', saved: false },
    { id: 'd6', title: 'Chouara Tannery', titleAr: 'دباغة الشوارة',      description: 'Iconic leather dyeing pits – Fès',        image: '/cities/fes/Chouara-Tannery.jpg',                 category: 'crafts',  saved: false },
  ],
}

interface RegionDetailScreenProps {
  isDark?: boolean
}

export function RegionDetailScreen({ isDark }: RegionDetailScreenProps) {
  void isDark
  const { navigate, goBack, selectedCityId, setSelectedCityId, setSelectedHeritageId } = useNavigation()
  const region = (selectedCityId ? CITY_REGION_DATA[selectedCityId] : null) ?? DEFAULT_REGION

  const [activeTab, setActiveTab] = useState('all')
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>(
    region.cards.reduce((acc, card) => ({ ...acc, [card.id]: card.saved }), {})
  )

  const filteredCards = region.cards.filter(card =>
    activeTab === 'all' || card.category === activeTab
  )

  const toggleSave = (id: string) => setSavedItems(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="h-full flex flex-col">
      {/* Hero */}
      <div className="relative h-[260px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${region.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button onClick={goBack} className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="Go back">
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="Share">
            <ShareIcon className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl font-bold text-foreground mb-1">{region.name}</h1>
          <h2 className="text-xl font-serif text-accent" dir="rtl">{region.nameAr}</h2>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-around py-4 border-b border-border bg-card">
        <div className="text-center"><p className="text-2xl font-bold text-primary">{region.heritageSites}</p><p className="text-xs text-muted-foreground">Heritage Sites</p></div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center"><p className="text-2xl font-bold text-accent">{region.artisans}</p><p className="text-xs text-muted-foreground">Artisans</p></div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center"><p className="text-2xl font-bold text-secondary">{region.itineraries}</p><p className="text-xs text-muted-foreground">Itineraries</p></div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-3 pt-2">
          {filteredCards.map((card) => (
            <button
              key={card.id}
              onClick={() => { setSelectedHeritageId(card.id); navigate('heritage-detail') }}
              className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all text-left active:scale-[0.97]"
            >
              <div className="relative h-28 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})`, clipPath: 'ellipse(100% 80% at 50% 0%)' }} />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(card.id) }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                  aria-label={savedItems[card.id] ? "Unsave" : "Save"}
                >
                  <HeartIcon className={cn("w-4 h-4", savedItems[card.id] ? "text-primary fill-primary" : "text-muted-foreground")} filled={savedItems[card.id]} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">{card.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{card.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <button
          onClick={() => { setSelectedCityId(selectedCityId); navigate('itinerary') }}
          className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <MapPinIcon className="w-5 h-5" />
          <span>Start Itinerary{region.name !== 'Morocco' ? ` · ${region.name}` : ''}</span>
        </button>
      </div>
    </div>
  )
}
