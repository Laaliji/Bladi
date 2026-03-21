"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CATEGORY_TABS } from '@/lib/turath-types'
import { ChevronLeftIcon, ShareIcon, MapPinIcon, HeartIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'

const REGION_DATA = {
  id: '1',
  name: 'Marrakech-Safi',
  nameAr: 'مراكش-آسفي',
  image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&h=600&fit=crop',
  heritageSites: 24,
  artisans: 156,
  itineraries: 8,
}

const CONTENT_CARDS = [
  { id: '1', title: 'Koutoubia Mosque', titleAr: 'جامع الكتبية', titleAmz: 'ⵜⵉⵎⵣⴳⵉⴷⴰ ⵏ ⵍⴽⵓⵜⵓⴱⵉⵢⵢⴰ', description: 'The largest mosque in Marrakech, built in the 12th century', image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400&h=300&fit=crop', category: 'history', saved: false },
  { id: '2', title: 'Berber Pottery', titleAr: 'الفخار الأمازيغي', titleAmz: 'ⴰⴼⵅⵅⴰⵔ ⴰⵎⴰⵣⵉⵖ', description: 'Traditional clay pottery with geometric patterns', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop', category: 'crafts', saved: true },
  { id: '3', title: 'Tagine Cuisine', titleAr: 'طاجين', titleAmz: 'ⵟⴰⵊⵉⵏ', description: 'Traditional slow-cooked Moroccan dishes', image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop', category: 'food', saved: false },
  { id: '4', title: 'Gnawa Music', titleAr: 'موسيقى كناوة', titleAmz: 'ⴰⵥⴰⵡⴰⵏ ⵏ ⴳⵏⴰⵡⴰ', description: 'Spiritual music tradition with African roots', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop', category: 'music', saved: false },
  { id: '5', title: 'Ben Youssef Madrasa', titleAr: 'مدرسة ابن يوسف', titleAmz: 'ⵜⵉⵏⵎⵍ ⵏ ⴱⵏ ⵢⵓⵙⴼ', description: 'Historic Islamic college with intricate carvings', image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=400&h=300&fit=crop', category: 'history', saved: true },
  { id: '6', title: 'Saadian Tombs', titleAr: 'مقابر السعديين', titleAmz: 'ⵉⵥⵎⴹⴰⵍ ⵉⵙⵄⴷⵉⵢⵏ', description: '16th century royal necropolis', image: 'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=400&h=300&fit=crop', category: 'history', saved: false },
]

interface RegionDetailScreenProps {
  isDark?: boolean
}

export function RegionDetailScreen({ isDark }: RegionDetailScreenProps) {
  void isDark
  const { navigate, goBack } = useNavigation()
  const [activeTab, setActiveTab] = useState('history')
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>(
    CONTENT_CARDS.reduce((acc, card) => ({ ...acc, [card.id]: card.saved }), {})
  )

  const filteredCards = CONTENT_CARDS.filter(card =>
    activeTab === 'all' || card.category === activeTab
  )

  const toggleSave = (id: string) => {
    setSavedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Hero */}
      <div className="relative h-[280px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${REGION_DATA.image})` }} />
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
          <h1 className="text-4xl font-bold font-serif text-white drop-shadow-md mb-1">{REGION_DATA.name}</h1>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-3xl font-serif text-[#F4C430] drop-shadow-md" dir="rtl">{REGION_DATA.nameAr}</h2>
            <h3 className="text-lg font-sans text-[#F4C430]/90 drop-shadow-sm tracking-widest">ⵎⵕⵕⴰⴽⵛ - ⴰⵙⴼⵉ</h3>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-around py-4 border-b border-border bg-card relative overflow-hidden">
        <div className="absolute inset-0 zellige-pattern opacity-5 pointer-events-none" />
        <div className="absolute inset-0 amazigh-pattern opacity-5 pointer-events-none" />
        <div className="text-center relative z-10"><p className="text-2xl font-bold text-[#C1272D]">{REGION_DATA.heritageSites}</p><p className="text-xs text-muted-foreground">Heritage Sites</p></div>
        <div className="w-px h-10 bg-border relative z-10" />
        <div className="text-center relative z-10"><p className="text-2xl font-bold text-[#F4C430]">{REGION_DATA.artisans}</p><p className="text-xs text-muted-foreground">Artisans</p></div>
        <div className="w-px h-10 bg-border relative z-10" />
        <div className="text-center relative z-10"><p className="text-2xl font-bold text-[#2A52BE]">{REGION_DATA.itineraries}</p><p className="text-xs text-muted-foreground">Itineraries</p></div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeTab === tab.id ? "bg-[#2A52BE] text-white shadow-md font-bold" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <div className="flex items-center gap-1.5">
                <span>{tab.label}</span>
                <span className={cn("text-[10px] tracking-wide", activeTab === tab.id ? "text-white/80" : "text-muted-foreground/60")}>{tab.labelAmz}</span>
              </div>
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
              onClick={() => navigate('heritage-detail')}
              className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all text-left active:scale-[0.97]"
            >
              <div className="relative h-28 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})`, clipPath: 'ellipse(100% 80% at 50% 0%)' }} />
                <button onClick={(e) => { e.stopPropagation(); toggleSave(card.id) }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center" aria-label={savedItems[card.id] ? "Unsave" : "Save"}>
                  <HeartIcon className={cn("w-4 h-4", savedItems[card.id] ? "text-primary fill-primary" : "text-muted-foreground")} filled={savedItems[card.id]} />
                </button>
              </div>
              <div className="p-3 bg-card/90">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm font-serif text-foreground truncate">{card.title}</h3>
                  <span className="text-[10px] text-muted-foreground tracking-wide shrink-0 font-sans">{card.titleAmz}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{card.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <button onClick={() => navigate('itinerary')} className="w-full py-4 px-6 bg-[#C1272D] text-white rounded-2xl font-semibold font-serif shadow-[0_8px_30px_rgba(193,39,45,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <MapPinIcon className="w-5 h-5" />
          <span>Start Itinerary</span>
        </button>
      </div>
    </div>
  )
}
