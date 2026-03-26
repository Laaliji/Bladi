"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CRAFT_CATEGORIES } from '@/lib/turath-types'
import { SearchIcon, FilterIcon, HeartIcon, CartIcon, ChevronRightIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

interface MarketplaceScreenProps {
  isDark?: boolean
}

export function MarketplaceScreen({ isDark }: MarketplaceScreenProps) {
  void isDark
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  const FEATURED_ARTISANS = [
    { id: '1', name: t('data.artisans.fatima', 'Fatima Zahra'), craft: t('marketplace.cat_pottery', 'Zellige'), image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=400&h=200&fit=crop' },
    { id: '2', name: t('data.artisans.hassan', 'Hassan Benchekroun'), craft: t('marketplace.cat_wood', 'Leather'), image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=200&fit=crop' },
  ]

  const PRODUCTS = [
    { id: '1', name: t('data.products.rug', 'Handwoven Berber Rug'), price: 3200, image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=300&h=400&fit=crop', artisan: t('data.artisans.aicha', 'Aicha B.'), category: t('marketplace.cat_textiles', 'Textiles'), commission: 85, liked: false },
    { id: '2', name: t('data.products.mirror', 'Zellige Mirror Frame'), price: 1450, image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=300&h=400&fit=crop', artisan: t('data.artisans.fatima', 'Fatima Z.'), category: t('marketplace.cat_pottery', 'Zellige'), commission: 85, liked: true },
    { id: '3', name: t('data.products.pouf', 'Leather Pouf Ottoman'), price: 890, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop', artisan: t('data.artisans.hassan', 'Hassan B.'), category: t('marketplace.cat_wood', 'Leather'), commission: 85, liked: false },
    { id: '4', name: t('data.products.necklace', 'Silver Berber Necklace'), price: 2100, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=400&fit=crop', artisan: t('data.artisans.malika', 'Malika A.'), category: t('marketplace.cat_jewelry', 'Jewelry'), commission: 85, liked: false },
    { id: '5', name: t('data.products.box', 'Carved Cedar Box'), price: 650, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=400&fit=crop', artisan: t('data.artisans.omar', 'Omar T.'), category: t('marketplace.cat_wood', 'Wood'), commission: 85, liked: true },
    { id: '6', name: t('data.products.tagine', 'Traditional Tagine'), price: 380, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=400&fit=crop', artisan: t('data.artisans.khadija', 'Khadija M.'), category: t('marketplace.cat_pottery', 'Pottery'), commission: 85, liked: false },
  ]

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: p.liked }), {})
  )
  const [cartCount, setCartCount] = useState(0)

  const filteredProducts = activeCategory ? PRODUCTS.filter(p => p.category === activeCategory) : PRODUCTS

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => ({ ...prev, [productId]: !prev[productId] }))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pt-12 px-4 pb-4 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">{t('marketplace.marketplace', 'Artisan Shop')}</h1>
          <button onClick={() => navigate('checkout')} className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <CartIcon className="w-5 h-5 text-foreground" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted rounded-2xl">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder={t('common.search')} className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
          <button className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
            <FilterIcon className="w-5 h-5 text-accent-foreground" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto mt-4 pb-1 scrollbar-hide">
          <button onClick={() => setActiveCategory(null)} className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all", !activeCategory ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{t('home_map.all')}</button>
          {CRAFT_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all", activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">{t('marketplace.artisan_products', 'Featured Artisans')}</h2>
            <button onClick={() => navigate('artisan-profile')} className="text-sm text-accent font-medium flex items-center gap-1">{t('common.view_all', 'View all')} <ChevronRightIcon className="w-4 h-4" /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {FEATURED_ARTISANS.map((artisan) => (
              <button key={artisan.id} onClick={() => navigate('artisan-profile')} className="flex-shrink-0 w-64 rounded-2xl overflow-hidden bg-card border border-border">
                <div className="h-20 bg-cover bg-center relative" style={{ backgroundImage: `url(${artisan.coverImage})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="px-4 pb-4 -mt-6 relative">
                  <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-background" style={{ backgroundImage: `url(${artisan.image})` }} />
                  <p className="font-semibold text-foreground mt-2">{artisan.name}</p>
                  <p className="text-xs text-muted-foreground">{artisan.craft} {t('category.artisan', 'Artisan')}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">{t('marketplace.products', 'Products')}</h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <button key={product.id} onClick={() => navigate('checkout')} className="rounded-2xl overflow-hidden bg-card border border-border text-left active:scale-[0.97] transition-transform">
                <div className="relative">
                  <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(product.id); setCartCount(c => c + 1) }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center">
                    <HeartIcon className={cn("w-4 h-4", likedProducts[product.id] ? "text-primary fill-primary" : "text-muted-foreground")} filled={likedProducts[product.id]} />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-secondary/90 text-secondary-foreground rounded-lg text-[10px] font-medium">{t('data.products.commission_msg', '{{count}}% to artisan', { count: product.commission })}</div>
                </div>
                <div className="p-3">
                  <p className="text-xs text-muted-foreground">{product.artisan}</p>
                  <h3 className="font-semibold text-sm text-foreground truncate mt-0.5">{product.name}</h3>
                  <p className="text-primary font-bold mt-1">{product.price} {t('checkout.mad', 'MAD')}</p>
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
