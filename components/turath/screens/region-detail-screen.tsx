"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CATEGORY_TABS } from '@/lib/turath-types'
import { ChevronLeftIcon, BookmarkIcon, ShareIcon, MapPinIcon, HeartIcon } from '../icons'

interface RegionDetailScreenProps {
  onBack?: () => void
  onCardSelect?: (id: string) => void
}

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
  {
    id: '1',
    title: 'Koutoubia Mosque',
    titleAr: 'جامع الكتبية',
    description: 'The largest mosque in Marrakech, built in the 12th century',
    image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400&h=300&fit=crop',
    category: 'architecture',
    saved: false,
  },
  {
    id: '2',
    title: 'Berber Pottery',
    titleAr: 'الفخار الأمازيغي',
    description: 'Traditional clay pottery with geometric patterns',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop',
    category: 'crafts',
    saved: true,
  },
  {
    id: '3',
    title: 'Tagine Cuisine',
    titleAr: 'طاجين',
    description: 'Traditional slow-cooked Moroccan dishes',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&h=300&fit=crop',
    category: 'food',
    saved: false,
  },
  {
    id: '4',
    title: 'Gnawa Music',
    titleAr: 'موسيقى كناوة',
    description: 'Spiritual music tradition with African roots',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
    category: 'music',
    saved: false,
  },
  {
    id: '5',
    title: 'Ben Youssef Madrasa',
    titleAr: 'مدرسة ابن يوسف',
    description: 'Historic Islamic college with intricate carvings',
    image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=400&h=300&fit=crop',
    category: 'history',
    saved: true,
  },
  {
    id: '6',
    title: 'Saadian Tombs',
    titleAr: 'مقابر السعديين',
    description: '16th century royal necropolis',
    image: 'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=400&h=300&fit=crop',
    category: 'history',
    saved: false,
  },
]

export function RegionDetailScreen({ onBack, onCardSelect }: RegionDetailScreenProps) {
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
      {/* Hero section with arch frame */}
      <div className="relative h-[280px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${REGION_DATA.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Header actions */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button 
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
              aria-label="Share"
            >
              <ShareIcon className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Region name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl font-bold text-foreground mb-1">{REGION_DATA.name}</h1>
          <h2 className="text-2xl font-serif text-accent" dir="rtl">{REGION_DATA.nameAr}</h2>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-around py-4 border-b border-border bg-card">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{REGION_DATA.heritageSites}</p>
          <p className="text-xs text-muted-foreground">Heritage Sites</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">{REGION_DATA.artisans}</p>
          <p className="text-xs text-muted-foreground">Artisans</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center">
          <p className="text-2xl font-bold text-secondary">{REGION_DATA.itineraries}</p>
          <p className="text-xs text-muted-foreground">Itineraries</p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
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
              onClick={() => onCardSelect?.(card.id)}
              className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all text-left"
            >
              {/* Arch-shaped image frame */}
              <div className="relative h-28 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${card.image})`,
                    clipPath: 'ellipse(100% 80% at 50% 0%)'
                  }}
                />
                {/* Save button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSave(card.id)
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center"
                  aria-label={savedItems[card.id] ? "Unsave" : "Save"}
                >
                  <HeartIcon 
                    className={cn(
                      "w-4 h-4",
                      savedItems[card.id] ? "text-primary fill-primary" : "text-muted-foreground"
                    )} 
                    filled={savedItems[card.id]}
                  />
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

      {/* Sticky CTA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8">
        <button className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <MapPinIcon className="w-5 h-5" />
          <span>Start Itinerary</span>
        </button>
      </div>
    </div>
  )
}
