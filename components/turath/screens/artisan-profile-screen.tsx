"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ChevronLeftIcon,
  ShareIcon,
  StarIcon,
  VerifiedIcon,
  HeartIcon,
  CartIcon,
  MapPinIcon,
} from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface ArtisanProfileScreenProps {
  isDark?: boolean
}

export function ArtisanProfileScreen({ isDark }: ArtisanProfileScreenProps) {
  void isDark

  const { goBack, navigate } = useNavigation()
  const { t } = useTranslation()

  const artisanData = {
    name: t('demo_artisan.name', 'Hassan Bouazza'),
    nameAr: 'حسان بوعزة',
    photo: '/artisan/profile%20picture.jpg',
    cover: '/artisan/pottery%202.jpg',
    craft: t('demo_artisan.craft', 'Safi Blue Pottery'),
    craftAr: 'فخار آسفي الأزرق',
    city: t('demo_artisan.city', 'Safi'),
    rating: 4.9,
    reviewCount: 214,
    verified: true,
    followers: 3870,
    following: false,
    bio: t('demo_artisan.bio', "Fourth-generation master potter from the heart of Safi's famous pottery quarter. Hassan specialises in hand-thrown pieces glazed with the iconic cobalt-blue, turquoise, and terracotta pigments that have made Safi ceramics world-renowned for over five centuries."),
    yearsExp: 28,
    piecesSold: 1400,
  }

  const PORTFOLIO = [
    '/artisan/profile%20picture.jpg',
    '/artisan/poterry%201.jpg',
    '/artisan/pottery%202.jpg',
    '/artisan/poterry%203.avif',
    '/artisan/poterry%204.jpg',
    '/artisan/pottery%204.jpg',
    '/artisan/pottery%206.avif',
  ]

  const PRODUCTS = [
    {
      id: '1',
      name: t('demo_artisan.product1', 'Hand-Thrown Bowl'),
      price: 680,
      image: '/artisan/poterry%201.jpg',
      description: t('demo_artisan.product1_desc', 'Classic cobalt-blue glazed serving bowl, 28 cm ø'),
    },
    {
      id: '2',
      name: t('demo_artisan.product2', 'Decorative Vase'),
      price: 1200,
      image: '/artisan/pottery%202.jpg',
      description: t('demo_artisan.product2_desc', 'Tall narrow-neck vase with floral Berber motifs'),
    },
    {
      id: '3',
      name: t('demo_artisan.product3', 'Tagine Set'),
      price: 950,
      image: '/artisan/poterry%203.avif',
      description: t('demo_artisan.product3_desc', 'Functional hand-painted tagine — serves 2'),
    },
    {
      id: '4',
      name: t('demo_artisan.product4', 'Wall Plate (30 cm)'),
      price: 780,
      image: '/artisan/poterry%204.jpg',
      description: t('demo_artisan.product4_desc', 'Decorative plate with geometric Andalusian pattern'),
    },
    {
      id: '5',
      name: t('demo_artisan.product5', 'Espresso Cup Set ×4'),
      price: 520,
      image: '/artisan/pottery%204.jpg',
      description: t('demo_artisan.product5_desc', 'Set of 4 tiny hand-painted espresso cups'),
    },
    {
      id: '6',
      name: t('demo_artisan.product6', 'Pitcher'),
      price: 860,
      image: '/artisan/pottery%206.avif',
      description: t('demo_artisan.product6_desc', 'Large pouring pitcher, turquoise & white glaze'),
    },
  ]

  const REVIEWS = [
    {
      id: '1',
      name: t('demo_artisan.review1_name', 'Amélie D.'),
      initials: 'AD',
      rating: 5,
      text: t('demo_artisan.review1_text', 'The tagine set is absolutely gorgeous — unboxed it live on video and had 40k views. Authentic quality that speaks for itself.'),
      date: t('demo_artisan.review1_date', '3 days ago'),
    },
    {
      id: '2',
      name: t('demo_artisan.review2_name', 'Youssef M.'),
      initials: 'YM',
      rating: 5,
      text: t('demo_artisan.review2_text', 'Ordered the decorative vase as a wedding gift. Hassan even engraved a personal message. Outstanding!'),
      date: t('demo_artisan.review2_date', '2 weeks ago'),
    },
    {
      id: '3',
      name: t('demo_artisan.review3_name', 'Claire B.'),
      initials: 'CB',
      rating: 5,
      text: t('demo_artisan.review3_text', 'I visited his workshop in Safi and watched him throw the bowl I ordered. An experience I will never forget.'),
      date: t('demo_artisan.review3_date', '1 month ago'),
    },
  ]

  const [isFollowing, setIsFollowing] = useState(artisanData.following)
  const [activeTab, setActiveTab] = useState<'portfolio' | 'products' | 'reviews'>('portfolio')
  const [savedProducts, setSavedProducts] = useState<Record<string, boolean>>({})

  const toggleSave = (id: string) =>
    setSavedProducts((p) => ({ ...p, [id]: !p[id] }))

  return (
    <div className="h-full flex flex-col overflow-y-auto">

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div className="pt-12 px-4 pb-4 flex items-center justify-between bg-card">
        <button
          onClick={goBack}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeftIcon className="w-5 h-5 text-foreground" />
        </button>

        <span className="text-sm font-semibold text-foreground">{t('artisan_profile_screen.title', 'Artisan Profile')}</span>

        <button
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          aria-label="Share"
        >
          <ShareIcon className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* ── Cover image ────────────────────────────────────────────────────── */}
      <div
        className="w-full h-44 bg-cover bg-center"
        style={{ backgroundImage: `url(${artisanData.cover})` }}
      />

      {/* ── Profile info ───────────────────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-4 bg-card border-b border-border">

        {/* Avatar row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">

            {/* Profile photo */}
            <div className="relative flex-shrink-0">
              <div
                className="w-16 h-16 rounded-2xl bg-cover bg-center border-2 border-border"
                style={{ backgroundImage: `url(${artisanData.photo})` }}
              />
              {artisanData.verified && (
                <VerifiedIcon className="absolute -bottom-1 -right-1 w-5 h-5 text-[#C9A84C]" />
              )}
            </div>

            {/* Name + craft */}
            <div>
              <h1 className="text-lg font-bold text-foreground">{artisanData.name}</h1>
              <p className="text-xs text-accent font-serif" dir="rtl">{artisanData.nameAr}</p>
              <span className="inline-block mt-1 text-[10px] font-semibold text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5 rounded-full">
                {artisanData.craft}
              </span>
            </div>
          </div>

          {/* Rating badge */}
          <div className="flex flex-col items-center bg-muted rounded-xl px-3 py-2 flex-shrink-0">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-3.5 h-3.5 text-[#C9A84C]" filled />
              <span className="text-sm font-bold text-foreground">{artisanData.rating}</span>
            </div>
            <span className="text-[9px] text-muted-foreground">{artisanData.reviewCount} {t('artisan_profile_screen.reviews_count', 'reviews')}</span>
          </div>
        </div>

        {/* Location + stats */}
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          <MapPinIcon className="w-3.5 h-3.5 text-[#C1121F]" />
          <span className="text-xs text-muted-foreground">{artisanData.city}, {t('common.morocco', 'Morocco')}</span>
          <span className="text-muted-foreground/40 mx-1">·</span>
          <span className="text-xs text-muted-foreground">{artisanData.yearsExp} {t('artisan_profile_screen.years_exp', 'yrs experience')}</span>
          <span className="text-muted-foreground/40 mx-1">·</span>
          <span className="text-xs text-muted-foreground">{artisanData.piecesSold.toLocaleString()} {t('artisan_profile_screen.pieces_sold', 'pieces sold')}</span>
        </div>

        {/* Followers */}
        <div className="mt-1">
          <span className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {(artisanData.followers / 1000).toFixed(1)}k
            </span>{' '}
            {t('artisan_profile_screen.followers', 'followers')}
          </span>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{artisanData.bio}</p>

        {/* Follow / Shop CTA */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              'flex-1 py-2.5 rounded-2xl font-medium text-sm transition-all',
              isFollowing
                ? 'bg-muted text-foreground border border-border'
                : 'bg-primary text-primary-foreground',
            )}
          >
            {isFollowing ? t('artisan_profile_screen.following', 'Following ✓') : t('artisan_profile_screen.follow', 'Follow')}
          </button>

          <button
            onClick={() => navigate('marketplace')}
            className="py-2.5 px-6 bg-[#C9A84C] text-[#1a1a1a] rounded-2xl font-semibold text-sm"
          >
            {t('artisan_profile_screen.shop', 'Shop')}
          </button>
        </div>
      </div>

      {/* ── Tabs ───────────────────────────────────────────────────────────── */}
      <div className="flex border-b border-border bg-card sticky top-0 z-10">
        {(['portfolio', 'products', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 py-3 text-sm font-medium transition-all border-b-2 capitalize',
              activeTab === tab
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent',
            )}
          >
            {tab === 'products' ? t('artisan_profile_screen.tab_shop', 'Shop') : t(`artisan_profile_screen.tab_${tab}`, tab.charAt(0).toUpperCase() + tab.slice(1))}
          </button>
        ))}
      </div>

      {/* ── Tab content ────────────────────────────────────────────────────── */}
      <div className="flex-1 pb-24">

        {/* Portfolio grid */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {PORTFOLIO.map((image, i) => (
              <div
                key={i}
                className="aspect-square bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div className="p-4 space-y-3">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-card rounded-2xl border border-border shadow-sm"
              >
                <div
                  className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm truncate">{product.name}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-snug">
                      {product.description}
                    </p>
                    <p className="text-base font-bold text-primary mt-1">
                      {product.price}{' '}
                      <span className="text-xs font-normal text-muted-foreground">{t('artisan_profile_screen.mad', 'MAD')}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('checkout')}
                      className="flex-1 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-medium flex items-center justify-center gap-1.5"
                    >
                      <CartIcon className="w-3.5 h-3.5" />
                      {t('artisan_profile_screen.add_to_cart', 'Add to Cart')}
                    </button>
                    <button
                      onClick={() => toggleSave(product.id)}
                      className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <HeartIcon
                        className={cn(
                          'w-4 h-4',
                          savedProducts[product.id]
                            ? 'text-[#C1121F] fill-[#C1121F]'
                            : 'text-muted-foreground',
                        )}
                        filled={savedProducts[product.id]}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="p-4 space-y-4">

            {/* Aggregate score */}
            <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-foreground">{artisanData.rating}</span>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <StarIcon key={i} className="w-3 h-3 text-[#C9A84C]" filled />
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  {artisanData.reviewCount} {t('artisan_profile_screen.reviews_count', 'reviews')}
                </span>
              </div>

              <div className="flex-1 space-y-1.5">
                {[5, 4, 3].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-4">{star}★</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C9A84C] rounded-full"
                        style={{ width: star === 5 ? '92%' : star === 4 ? '6%' : '2%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review cards */}
            {REVIEWS.map((review) => (
              <div key={review.id} className="p-4 bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C9A84C]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#C9A84C]">{review.initials}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{review.name}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <StarIcon key={i} className="w-3 h-3 text-[#C9A84C]" filled />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}