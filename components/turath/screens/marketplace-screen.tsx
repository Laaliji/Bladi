"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { CRAFT_CATEGORIES } from '@/lib/turath-types'
import { SearchIcon, FilterIcon, HeartIcon, CartIcon, ChevronRightIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'

const FEATURED_ARTISANS = [
  { id: '1', name: 'Fatima Zahra', craft: 'Zellige', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=400&h=200&fit=crop' },
  { id: '2', name: 'Hassan Benchekroun', craft: 'Leather', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', coverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=200&fit=crop' },
]

const PRODUCTS = [
  { id: '1', name: 'Handwoven Berber Rug', price: 3200, image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=300&h=400&fit=crop', artisan: 'Aicha B.', category: 'Textiles', commission: 85, liked: false },
  { id: '2', name: 'Zellige Mirror Frame', price: 1450, image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=300&h=400&fit=crop', artisan: 'Fatima Z.', category: 'Zellige', commission: 85, liked: true },
  { id: '3', name: 'Leather Pouf Ottoman', price: 890, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop', artisan: 'Hassan B.', category: 'Leather', commission: 85, liked: false },
  { id: '4', name: 'Silver Berber Necklace', price: 2100, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=400&fit=crop', artisan: 'Malika A.', category: 'Jewelry', commission: 85, liked: false },
  { id: '5', name: 'Carved Cedar Box', price: 650, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=300&h=400&fit=crop', artisan: 'Omar T.', category: 'Wood', commission: 85, liked: true },
  { id: '6', name: 'Traditional Tagine', price: 380, image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=400&fit=crop', artisan: 'Khadija M.', category: 'Pottery', commission: 85, liked: false },
]

interface MarketplaceScreenProps {
  isDark?: boolean
}

export function MarketplaceScreen({ isDark }: MarketplaceScreenProps) {
  void isDark
  const { navigate } = useNavigation()
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
      <div className="pt-12 px-4 pb-4 bg-[#006233] text-white relative shadow-md">
        <div className="absolute inset-0 zellige-pattern opacity-[0.15] pointer-events-none mix-blend-overlay" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-bold font-serif drop-shadow-md">Artisan Shop</h1>
            <span className="text-sm font-sans tracking-widest text-[#F4C430]/90">ⵜⴰⵃⴰⵏⵓⵜ ⵏ ⵉⵏⴰⵥⵓⵕⵏ</span>
          </div>
          <button onClick={() => navigate('checkout')} className="relative w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
            <CartIcon className="w-5 h-5 text-white" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F4C430] text-[#1A1A1A] font-bold text-xs rounded-full flex items-center justify-center border-2 border-[#006233]">{cartCount}</span>}
          </button>
        </div>

        <div className="flex gap-2 relative z-10">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-black/20 border border-white/10 rounded-2xl backdrop-blur-md">
            <SearchIcon className="w-5 h-5 text-white/50" />
            <input type="text" placeholder="Search products..." className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none font-sans" />
          </div>
          <button className="w-12 h-12 rounded-2xl bg-[#F4C430] flex items-center justify-center shadow-lg active:scale-95 transition-transform hover:-translate-y-0.5">
            <FilterIcon className="w-5 h-5 text-[#1A1A1A]" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto mt-5 pb-1 scrollbar-hide relative z-10">
           {/* Replaced fixed elements with conditional styles for Moroccan theme */}
          <button onClick={() => setActiveCategory(null)} className={cn("px-4 py-2 rounded-xl text-sm font-bold font-serif whitespace-nowrap transition-all shadow-sm border flex flex-col items-center justify-center", !activeCategory ? "bg-[#C1272D] text-white border-[#C1272D]" : "bg-black/20 text-white/80 border-white/10 hover:bg-black/30")}>
            <span>All</span>
            <span className="text-[9px] opacity-80 mt-0.5 font-sans">ⴰⴽⴽⵯ</span>
          </button>
          {CRAFT_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={cn("px-4 py-2 rounded-xl text-sm font-bold font-serif whitespace-nowrap transition-all shadow-sm border", activeCategory === cat ? "bg-[#C1272D] text-white border-[#C1272D]" : "bg-black/20 text-white/80 border-white/10 hover:bg-black/30")}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Featured Artisans</h2>
            <button onClick={() => navigate('artisan-profile')} className="text-sm text-accent font-medium flex items-center gap-1">View all <ChevronRightIcon className="w-4 h-4" /></button>
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
                  <p className="text-xs text-muted-foreground">{artisan.craft} Artisan</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 pt-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">Products</h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <button key={product.id} onClick={() => navigate('checkout')} className="rounded-2xl overflow-hidden bg-card border border-border text-left active:scale-[0.97] transition-transform">
                <div className="relative">
                  <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                  <button onClick={(e) => { e.stopPropagation(); toggleLike(product.id); setCartCount(c => c + 1) }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center">
                    <HeartIcon className={cn("w-4 h-4", likedProducts[product.id] ? "text-primary fill-primary" : "text-muted-foreground")} filled={likedProducts[product.id]} />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-secondary/90 text-secondary-foreground rounded-lg text-[10px] font-medium">{product.commission}% to artisan</div>
                </div>
                <div className="p-3 bg-card relative">
                  <p className="text-xs text-muted-foreground font-medium">{product.artisan}</p>
                  <h3 className="font-semibold text-sm font-serif text-foreground truncate mt-0.5 leading-snug">{product.name}</h3>
                  <p className="text-[#C1272D] font-bold mt-1 text-lg">{product.price} MAD</p>
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
