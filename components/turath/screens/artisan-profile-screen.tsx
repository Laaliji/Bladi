"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ShareIcon, StarIcon, VerifiedIcon, HeartIcon, CartIcon, MapPinIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'

const ARTISAN_DATA = {
  name: 'Fatima Zahra',
  nameAr: 'فاطمة الزهراء',
  nameAmz: 'ⴼⴰⵟⵉⵎⴰ ⵣⴰⵀⵔⴰ',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  craft: 'Traditional Zellige',
  craftAr: 'الزليج التقليدي',
  craftAmz: 'ⴰⵣⵍⵍⵉⵊ ⴰⵎⵏⵙⴰⵢ',
  city: 'Fes',
  rating: 4.9,
  reviewCount: 127,
  verified: true,
  bio: 'Third-generation zellige artisan specializing in traditional Moroccan mosaic art. My family has been crafting zellige tiles in the medina of Fes for over 80 years, preserving ancient techniques passed down through generations.',
  followers: 2340,
  following: false,
}

const PORTFOLIO = [
  'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=400&h=400&fit=crop',
]

const PRODUCTS = [
  { id: '1', name: 'Zellige Table', price: 4500, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop' },
  { id: '2', name: 'Mosaic Mirror', price: 1800, image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=300&h=300&fit=crop' },
  { id: '3', name: 'Tile Set (25pc)', price: 750, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop' },
]

const REVIEWS = [
  { id: '1', name: 'Sarah M.', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', rating: 5, text: 'Absolutely stunning craftsmanship! The zellige table is the centerpiece of my home.', date: '2 weeks ago' },
  { id: '2', name: 'Ahmed K.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', rating: 5, text: 'Authentic Moroccan artistry. Highly recommended!', date: '1 month ago' },
]

interface ArtisanProfileScreenProps {
  isDark?: boolean
}

export function ArtisanProfileScreen({ isDark }: ArtisanProfileScreenProps) {
  void isDark
  const { goBack, navigate } = useNavigation()
  const [isFollowing, setIsFollowing] = useState(ARTISAN_DATA.following)
  const [activeTab, setActiveTab] = useState<'portfolio' | 'products' | 'reviews'>('portfolio')

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="pt-12 px-4 pb-4 flex items-center justify-between bg-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 arabesque-pattern pointer-events-none" />
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative z-10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors" aria-label="Go back">
          <ChevronLeftIcon className="w-5 h-5 text-foreground" />
        </button>
        <button onClick={() => navigate('marketplace')} className="px-4 py-2 bg-[#2A52BE] text-white rounded-xl text-sm font-bold font-serif shadow-md relative z-10 transition-transform active:scale-95">
          View Shop
        </button>
        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ShareIcon className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Profile header */}
      <div className="px-4 pb-6 bg-card border-b border-border">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-cover bg-center border-2 border-[#F4C430] shadow-lg" style={{ backgroundImage: `url(${ARTISAN_DATA.photo})` }} />
            {ARTISAN_DATA.verified && <VerifiedIcon className="absolute -bottom-1 -right-1 w-6 h-6 text-[#2A52BE] drop-shadow-sm" />}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-serif text-foreground">{ARTISAN_DATA.name}</h1>
            <div className="flex items-center gap-2">
              <p className="text-lg text-[#F4C430] font-serif" dir="rtl">{ARTISAN_DATA.nameAr}</p>
              <span className="text-xs text-muted-foreground/50">|</span>
              <p className="text-sm text-[#F4C430]/90 font-sans tracking-wide">{ARTISAN_DATA.nameAmz}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-foreground/80 font-medium bg-[#006233]/10 px-2 py-0.5 rounded-lg border border-[#006233]/20">{ARTISAN_DATA.craft}</p>
              <p className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-lg">{ARTISAN_DATA.craftAmz}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <MapPinIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{ARTISAN_DATA.city}</span>
              <div className="flex items-center gap-1 ml-2">
                <StarIcon className="w-4 h-4 text-accent" filled />
                <span className="text-sm font-medium text-foreground">{ARTISAN_DATA.rating}</span>
                <span className="text-sm text-muted-foreground">({ARTISAN_DATA.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => setIsFollowing(!isFollowing)} className={cn("flex-1 py-3 rounded-2xl font-medium font-serif transition-all shadow-sm", isFollowing ? "bg-muted text-foreground border border-border" : "bg-[#C1272D] text-white hover:bg-[#A00F1A]")}>{isFollowing ? 'Following' : 'Follow'}</button>
          <button onClick={() => navigate('marketplace')} className="py-3 px-6 bg-[#2A52BE] text-white rounded-2xl font-bold font-serif shadow-[0_4px_20px_rgba(42,82,190,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform">Shop</button>
        </div>

        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{ARTISAN_DATA.bio}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-card">
        {(['portfolio', 'products', 'reviews'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-4 text-sm font-bold font-serif transition-all border-b-2 capitalize", activeTab === tab ? "text-[#C1272D] border-[#C1272D] bg-[#C1272D]/5" : "text-muted-foreground border-transparent hover:bg-black/5 dark:hover:bg-white/5")}>
            {tab === 'products' ? 'Shop' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 pb-24">
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {PORTFOLIO.map((image, i) => (
              <div key={i} className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="p-4 space-y-3">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="flex gap-4 p-3 bg-card rounded-2xl border border-border">
                <div className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${product.image})` }} />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-lg font-bold text-primary mt-1">{product.price} MAD</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate('checkout')} className="flex-1 py-2 bg-[#2A52BE] text-white rounded-xl text-sm font-bold font-serif shadow-md hover:bg-[#1E4080] transition-colors flex items-center justify-center gap-2">
                      <CartIcon className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <HeartIcon className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="p-4 space-y-4">
            {REVIEWS.map((review) => (
              <div key={review.id} className="p-4 bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${review.photo})` }} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{review.name}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => <StarIcon key={i} className="w-3 h-3 text-accent" filled />)}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
