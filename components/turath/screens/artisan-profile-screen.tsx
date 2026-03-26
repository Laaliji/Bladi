"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ShareIcon, StarIcon, VerifiedIcon, HeartIcon, CartIcon, MapPinIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

// Data is now inside the component to use translations

interface ArtisanProfileScreenProps {
  isDark?: boolean
}

export function ArtisanProfileScreen({ isDark }: ArtisanProfileScreenProps) {
  void isDark
  const { goBack, navigate } = useNavigation()
  const { t } = useTranslation()
  const artisanData = {
    name: t('demo_artisan.name'),
    nameAr: 'فاطمة الزهراء',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    craft: t('demo_artisan.craft'),
    city: t('demo_artisan.city'),
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    bio: t('demo_artisan.bio'),
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
    { id: '1', name: t('demo_artisan.product1'), price: 4500, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop' },
    { id: '2', name: t('demo_artisan.product2'), price: 1800, image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=300&h=300&fit=crop' },
    { id: '3', name: t('demo_artisan.product3'), price: 750, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop' },
  ]

  const REVIEWS = [
    { id: '1', name: t('demo_artisan.review1_name'), photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', rating: 5, text: t('demo_artisan.review1_text'), date: t('demo_artisan.time_2w') },
    { id: '2', name: t('demo_artisan.review2_name'), photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', rating: 5, text: t('demo_artisan.review2_text'), date: t('demo_artisan.time_1m') },
  ]

  const [isFollowing, setIsFollowing] = useState(artisanData.following)
  const [activeTab, setActiveTab] = useState<'portfolio' | 'products' | 'reviews'>('portfolio')

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="pt-12 px-4 pb-4 flex items-center justify-between bg-card">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center" aria-label="Go back">
          <ChevronLeftIcon className="w-5 h-5 text-foreground" />
        </button>
        <button onClick={() => navigate('marketplace')} className="px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-medium">
          {t('artisan_profile_screen.view_shop')}
        </button>
        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ShareIcon className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Profile header */}
      <div className="px-4 pb-6 bg-card border-b border-border">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-cover bg-center border-2 border-accent" style={{ backgroundImage: `url(${artisanData.photo})` }} />
            {artisanData.verified && <VerifiedIcon className="absolute -bottom-1 -right-1 w-6 h-6 text-secondary" />}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{artisanData.name}</h1>
            <p className="text-sm text-accent font-serif" dir="rtl">{artisanData.nameAr}</p>
            <p className="text-sm text-muted-foreground mt-1">{artisanData.craft}</p>
            <div className="flex items-center gap-2 mt-2">
              <MapPinIcon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{artisanData.city}</span>
              <div className="flex items-center gap-1 ml-2">
                <StarIcon className="w-4 h-4 text-accent" filled />
                <span className="text-sm font-medium text-foreground">{artisanData.rating}</span>
                <span className="text-sm text-muted-foreground">({artisanData.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button onClick={() => setIsFollowing(!isFollowing)} className={cn("flex-1 py-3 rounded-2xl font-medium transition-all", isFollowing ? "bg-muted text-foreground border border-border" : "bg-primary text-primary-foreground")}>{isFollowing ? t('artisan_profile_screen.following') : t('artisan_profile_screen.follow')}</button>
          <button onClick={() => navigate('marketplace')} className="py-3 px-6 bg-accent text-accent-foreground rounded-2xl font-medium">{t('artisan_profile_screen.shop')}</button>
        </div>

        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{artisanData.bio}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-card">
        {(['portfolio', 'products', 'reviews'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-3 text-sm font-medium transition-all border-b-2 capitalize", activeTab === tab ? "text-primary border-primary" : "text-muted-foreground border-transparent")}>
            {t(`artisan_profile_screen.${tab}`)}
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
                    <p className="text-lg font-bold text-primary mt-1">{product.price} {t('artisan_profile_screen.mad')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate('checkout')} className="flex-1 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                      <CartIcon className="w-4 h-4" />
                      {t('artisan_profile_screen.add_to_cart')}
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
