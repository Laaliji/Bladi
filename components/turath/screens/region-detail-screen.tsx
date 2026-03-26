"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HeritageIcon, ArtisanIcon, ItineraryIcon, ChevronRightIcon, HeartIcon, MapPinIcon, BackIcon, SearchIcon, FilterIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

interface RegionDetailScreenProps {
  isDark?: boolean
}

export function RegionDetailScreen({ isDark }: RegionDetailScreenProps) {
  void isDark
  const { navigate, goBack, selectedCityId, setSelectedCityId, setSelectedHeritageId } = useNavigation()
  const { t } = useTranslation()

  const CITY_REGION_DATA: Record<string, {
    name: string; nameAr: string; image: string
    heritageSites: number; artisans: number; itineraries: number
    cards: { id: string; title: string; titleAr: string; description: string; image: string; category: string; saved: boolean }[]
  }> = {
    marrakech: {
      name: t('common.marrakech', 'Marrakech'), nameAr: t('demo_artisan.name_ar', 'مراكش'), image: '/cities/Marrakech/jama-el-fnaa.jpg',
      heritageSites: 24, artisans: 156, itineraries: 8,
      cards: [
        { id: 'm1', title: t('home_map.jemaa_el_fna'),     titleAr: t('home_map.jemaa_el_fna'),      description: t('home_map.jemaa_el_fna_desc'), image: '/cities/Marrakech/jama-el-fnaa.jpg',     category: 'history', saved: false },
        { id: 'm2', title: t('home_map.bahia_palace'),      titleAr: t('home_map.bahia_palace'),     description: t('home_map.bahia_palace_desc'),  image: '/cities/Marrakech/bahia%20palace.jpeg', category: 'history', saved: true  },
        { id: 'm3', title: t('home_map.majorelle'),  titleAr: t('home_map.majorelle'),   description: t('home_map.majorelle_desc'), image: '/cities/Marrakech/majorelle.jpg',   category: 'nature',  saved: false },
      ],
    },
    fes: {
      name: t('common.fes', 'Fès'), nameAr: t('data.regions.fes_ar', 'فاس'), image: '/cities/fes/mezquita-al-karaouine-4.jpg',
      heritageSites: 31, artisans: 180, itineraries: 10,
      cards: [
        { id: 'fs1', title: t('home_map.al_qarawiyyin'),      titleAr: t('home_map.al_qarawiyyin'),   description: t('home_map.al_qarawiyyin_desc'),          image: '/cities/fes/mezquita-al-karaouine-4.jpg', category: 'history', saved: false },
        { id: 'fs2', title: t('home_map.bou_inania'), titleAr: t('home_map.bou_inania'), description: t('home_map.bou_inania_desc'),  image: '/cities/fes/bou%20inania.webp',           category: 'history', saved: true  },
        { id: 'fs3', title: t('home_map.chouara'),    titleAr: t('home_map.chouara'),   description: t('home_map.chouara_desc'), image: '/cities/fes/Chouara-Tannery.jpg',         category: 'crafts',  saved: false },
      ],
    },
    casablanca: {
      name: t('common.casablanca', 'Casablanca'), nameAr: t('data.regions.casablanca_ar', 'الدار البيضاء'), image: '/cities/Casablanca/hassan-ii-mosque-2.jpg',
      heritageSites: 15, artisans: 120, itineraries: 5,
      cards: [
        { id: 'cb1', title: t('home_map.hassan_ii_mosque'), titleAr: t('home_map.hassan_ii_mosque'), description: t('home_map.hassan_ii_mosque_desc'),   image: '/cities/Casablanca/hassan-ii-mosque-2.jpg', category: 'history', saved: false },
        { id: 'cb2', title: t('home_map.habous'),  titleAr: t('home_map.habous'),          description: t('home_map.habous_desc'), image: '/cities/Casablanca/habbous.png',             category: 'history', saved: true  },
        { id: 'cb3', title: t('data.products.mall'),     titleAr: t('data.products.mall'),         description: t('data.products.mall_desc'),   image: '/cities/Casablanca/morocco-mall-3-.webp',   category: 'crafts',  saved: false },
      ],
    },
    rabat: {
      name: t('common.rabat', 'Rabat'), nameAr: t('data.regions.rabat_ar', 'الرباط'), image: '/cities/Rabat/hassan-tower2.webp',
      heritageSites: 22, artisans: 90, itineraries: 6,
      cards: [
        { id: 'rb1', title: t('home_map.hassan_tower', 'Hassan Tower'),       titleAr: 'صومعة حسان',       description: t('home_map.hassan_tower_desc', 'Unfinished minaret of the 12th century'), image: '/cities/Rabat/hassan-tower2.webp',          category: 'history', saved: false },
        { id: 'rb2', title: t('home_map.chellah', 'Chellah'),            titleAr: 'شالة',              description: t('home_map.chellah_desc', 'Ancient Roman & Merinid riverside site'), image: '/cities/Rabat/necropolis-de-chellah-3.jpg', category: 'history', saved: false },
        { id: 'rb3', title: t('home_map.kasbah_oudaias', 'Kasbah des Oudaias'), titleAr: 'قصبة الوداية',      description: t('home_map.kasbah_oudaias_desc', 'Fortified Andalusian neighbourhood'),     image: '/cities/Rabat/Kasbah-Udayas-Rabat.webp',   category: 'history', saved: true  },
      ],
    },
    tangier: {
      name: t('common.tangier', 'Tanger'), nameAr: t('data.regions.tangier_ar', 'طنجة'), image: '/cities/Tangier/kasbah%20museum.jpg',
      heritageSites: 18, artisans: 42, itineraries: 4,
      cards: [
        { id: 'tg1', title: t('home_map.kasbah_museum'),     titleAr: t('home_map.kasbah_museum'),    description: t('home_map.kasbah_museum_desc'),  image: '/cities/Tangier/kasbah%20museum.jpg',   category: 'history', saved: false },
        { id: 'tg2', title: t('home_map.caves_hercules'), titleAr: t('home_map.caves_hercules'),      description: t('home_map.caves_hercules_desc'),    image: '/cities/Tangier/hercules.jpg',           category: 'nature',  saved: false },
        { id: 'tg3', title: t('home_map.grand_socco'),       titleAr: t('home_map.grand_socco'),   description: t('home_map.grand_socco_desc'),   image: '/cities/Tangier/Grand_Socco_Tangier.jpg', category: 'crafts', saved: true  },
      ],
    },
    chefchaouen: {
      name: t('common.chefchaouen', 'Chefchaouen'), nameAr: t('data.regions.chefchaouen_ar', 'شفشاون'), image: '/cities/Chefchaouen/blue%20medina.jpg',
      heritageSites: 9, artisans: 55, itineraries: 3,
      cards: [
        { id: 'ch1', title: t('home_map.blue_medina'),        titleAr: t('home_map.blue_medina'), description: t('home_map.blue_medina_desc'),           image: '/cities/Chefchaouen/blue%20medina.jpg',         category: 'history', saved: false },
        { id: 'ch2', title: t('home_map.ras_el_maa'),         titleAr: t('home_map.ras_el_maa'),       description: t('home_map.ras_el_maa_desc'),         image: '/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp', category: 'nature',  saved: true  },
        { id: 'ch3', title: t('home_map.spanish_mosque'),     titleAr: t('home_map.spanish_mosque'), description: t('home_map.spanish_mosque_desc'),               image: '/cities/Chefchaouen/spanish%20mosque.jpg',      category: 'history', saved: false },
        { id: 'ch4', title: t('data.products.akchour'), titleAr: t('data.products.akchour'),   description: t('data.products.akchour_desc'),         image: '/cities/Chefchaouen/akchour.jpg',               category: 'nature',  saved: false },
      ],
    },
    meknes: {
      name: t('common.meknes', 'Meknès'), nameAr: t('data.regions.meknes_ar', 'مكناس'), image: '/cities/Meknes/bab-mansour-gate.jpg',
      heritageSites: 14, artisans: 70, itineraries: 4,
      cards: [
        { id: 'mk1', title: t('home_map.bab_mansour'),        titleAr: t('home_map.bab_mansour'),           description: t('home_map.bab_mansour_desc'),  image: '/cities/Meknes/bab-mansour-gate.jpg',              category: 'history', saved: false },
        { id: 'mk2', title: t('data.products.moulay_ismail'), titleAr: t('data.products.moulay_ismail'), description: t('data.products.moulay_ismail_desc'),    image: '/cities/Meknes/Le-tombeau-de-Moulay-Isma%C3%AFl.jpg', category: 'history', saved: true },
        { id: 'mk3', title: t('data.products.el_hedim'),     titleAr: t('data.products.el_hedim'),         description: t('data.products.el_hedim_desc'), image: '/cities/Meknes/el-hedim-square.jpg',               category: 'history', saved: false },
      ],
    },
    safi: {
      name: t('common.safi', 'Safi'), nameAr: t('data.regions.safi_ar', 'آسفي'), image: '/cities/Safi/kachla%20fortress.jpg',
      heritageSites: 9, artisans: 75, itineraries: 3,
      cards: [
        { id: 'sf1', title: t('home_map.kechla'),   titleAr: t('home_map.kechla'),         description: t('home_map.kechla_desc'),     image: '/cities/Safi/kachla%20fortress.jpg',           category: 'history', saved: false },
        { id: 'sf2', title: t('home_map.pottery_quarter'),   titleAr: t('home_map.pottery_quarter'),          description: t('home_map.pottery_quarter_desc'),    image: '/cities/Safi/pottery%20quarter.png',           category: 'crafts',  saved: true  },
        { id: 'sf3', title: t('data.products.portuguese_chapel'), titleAr: t('data.products.portuguese_chapel'), description: t('data.products.portuguese_chapel_desc'),          image: '/cities/Safi/cathedrale-portugaise0-scaled.jpg', category: 'history', saved: false },
        { id: 'sf4', title: t('data.products.safi_tagine'),       titleAr: t('data.products.safi_tagine'),         description: t('data.products.safi_tagine_desc'),       image: '/cities/Safi/tajine.webp',                     category: 'food',    saved: false },
      ],
    },
    essaouira: {
      name: t('common.essaouira', 'Essaouira'), nameAr: t('data.regions.essaouira_ar', 'الصويرة'), image: '/cities/Essaouira/skala.jpeg',
      heritageSites: 12, artisans: 88, itineraries: 4,
      cards: [
        { id: 'es1', title: t('home_map.skala'), titleAr: t('home_map.skala'), description: t('home_map.skala_desc'),      image: '/cities/Essaouira/skala.jpeg', category: 'history', saved: false },
        { id: 'es2', title: t('data.products.essaouira_medina'),  titleAr: t('data.products.essaouira_medina'), description: t('data.products.essaouira_medina_desc'),   image: '/cities/Essaouira/skala.webp', category: 'history', saved: true  },
      ],
    },
  }

  const DEFAULT_REGION = {
    name: t('common.country_name', 'Morocco'), nameAr: 'المغرب', image: '/cities/Marrakech/jama-el-fnaa.jpg',
    heritageSites: 144, artisans: 876, itineraries: 48,
    cards: [
      { id: 'd1', title: t('home_map.al_qarawiyyin', 'Al-Qarawiyyin'),     titleAr: 'جامعة القرويين',   description: t('home_map.al_qarawiyyin_desc', "World's oldest university"),         image: '/cities/fes/mezquita-al-karaouine-4.jpg',         category: 'history', saved: false },
      { id: 'd2', title: t('home_map.jemaa_el_fna', 'Jemaa el-Fna'),     titleAr: 'جامع الفنا',        description: t('home_map.jemaa_el_fna_desc', 'Vibrant UNESCO square'),       image: '/cities/Marrakech/jama-el-fnaa.jpg',              category: 'history', saved: false },
      { id: 'd3', title: t('home_map.hassan_ii_mosque', 'Hassan II Mosque'), titleAr: 'مسجد الحسن الثاني', description: t('home_map.hassan_ii_mosque_desc', "Africa's largest mosque"),                 image: '/cities/Casablanca/hassan-ii-mosque-2.jpg',       category: 'history', saved: false },
      { id: 'd4', title: t('home_map.bab_mansour', 'Bab Mansour'),      titleAr: 'باب منصور',          description: t('home_map.bab_mansour_desc', 'Majestic imperial gate'),         image: '/cities/Meknes/bab-mansour-gate.jpg',             category: 'history', saved: false },
      { id: 'd5', title: t('home_map.blue_medina', 'Blue Medina'),      titleAr: 'المدينة الزرقاء',   description: t('home_map.blue_medina_desc', 'Blue-washed alleyways'),     image: '/cities/Chefchaouen/blue%20medina.jpg',           category: 'history', saved: false },
      { id: 'd6', title: t('home_map.chouara', 'Chouara Tannery'), titleAr: 'دباغة الشوارة',      description: t('home_map.chouara_desc', 'Iconic leather dyeing pits'),        image: '/cities/fes/Chouara-Tannery.jpg',                 category: 'crafts',  saved: false },
    ],
  }
  
  const region = (selectedCityId ? CITY_REGION_DATA[selectedCityId] : null) ?? DEFAULT_REGION

  const [activeTab, setActiveTab] = useState('heritage')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCards = region.cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         card.titleAr.includes(searchQuery)
    const matchesTab = activeTab === 'heritage' ? card.category !== 'crafts' : card.category === 'crafts'
    return matchesSearch && matchesTab
  })

  return (
    <div className="h-full flex flex-col bg-background">
      {/* City Hero */}
      <div className="relative h-[280px] w-full">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${region.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        </div>
        
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20">
            <BackIcon className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <HeartIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <MapPinIcon className="w-4 h-4 text-primary" />
            <span className="text-white/90 text-sm font-medium">{t('region_detail.marrakech_safi', 'Marrakech-Safi Region')}</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 flex items-baseline gap-3">
            {region.name}
            <span className="text-2xl font-medium opacity-80" dir="rtl">{region.nameAr}</span>
          </h1>

          <div className="flex gap-4">
            <div className="flex-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-3">
              <div className="flex items-center gap-2 mb-1 opacity-80">
                <HeritageIcon className="w-4 h-4 text-white" />
                <span className="text-[10px] text-white uppercase tracking-wider">{t('region_detail.heritage_sites', 'Heritage')}</span>
              </div>
              <p className="text-xl font-bold text-white">{region.heritageSites}</p>
            </div>
            <div className="flex-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-3">
              <div className="flex items-center gap-2 mb-1 opacity-80">
                <ArtisanIcon className="w-4 h-4 text-white" />
                <span className="text-[10px] text-white uppercase tracking-wider">{t('region_detail.artisans', 'Artisans')}</span>
              </div>
              <p className="text-xl font-bold text-white">{region.artisans}</p>
            </div>
            <div className="flex-1 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-3">
              <div className="flex items-center gap-2 mb-1 opacity-80">
                <ItineraryIcon className="w-4 h-4 text-white" />
                <span className="text-[10px] text-white uppercase tracking-wider">{t('region_detail.itineraries', 'Paths')}</span>
              </div>
              <p className="text-xl font-bold text-white">{region.itineraries}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Tabs */}
      <div className="flex-1 flex flex-col min-h-0 bg-background rounded-t-[32px] -mt-6 z-10 px-4 pt-6">
        <div className="flex gap-2 p-1 bg-muted rounded-2xl mb-6">
          <button onClick={() => setActiveTab('heritage')} className={cn("flex-1 py-2 rounded-xl text-sm font-semibold transition-all", activeTab === 'heritage' ? "bg-background text-primary shadow-sm" : "text-muted-foreground")}>{t('region_detail.heritage_sites', 'Heritage Sites')}</button>
          <button onClick={() => setActiveTab('artisans')} className={cn("flex-1 py-2 rounded-xl text-sm font-semibold transition-all", activeTab === 'artisans' ? "bg-background text-primary shadow-sm" : "text-muted-foreground")}>{t('region_detail.artisans', 'Artisans')}</button>
          <button onClick={() => setActiveTab('itinerary')} className={cn("flex-1 py-2 rounded-xl text-sm font-semibold transition-all", activeTab === 'itinerary' ? "bg-background text-primary shadow-sm" : "text-muted-foreground")}>{t('region_detail.itineraries', 'Itineraries')}</button>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted rounded-2xl">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder={t('common.search')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 bg-transparent text-sm text-foreground outline-none" />
          </div>
          <button className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
            <FilterIcon className="w-5 h-5 text-accent-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {activeTab === 'itinerary' ? (
            <button onClick={() => navigate('itinerary')} className="w-full relative rounded-3xl overflow-hidden border border-border group active:scale-[0.98] transition-all">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('/cities/Marrakech/itinerary.jpg')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground uppercase tracking-widest">{t('region_detail.days_3', '3 Days')}</span>
                  <span className="text-white/80 text-xs font-medium">{t('region_detail.distance_8_4', '8.4 km total')}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{t('region_detail.itinerary_red_city_discovery', 'Red City Craft Discovery')}</h3>
                <p className="text-white/70 text-sm mb-4">{t('region_detail.itinerary_red_city_desc', 'A journey through Fès’ historical heart and leather workshops.')}</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-muted" />)}
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white text-black text-sm font-bold flex items-center gap-2">
                    {t('region_detail.start_itinerary', 'Start Path')} <ChevronRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredCards.map((card) => (
                <button key={card.id} onClick={() => { setSelectedHeritageId(card.id); navigate('heritage-detail') }} className="flex gap-4 p-3 rounded-2xl border border-border bg-card active:scale-[0.98] transition-all">
                  <div className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${card.image})` }} />
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", card.category === 'history' ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : card.category === 'crafts' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400")}>{card.category}</span>
                      {card.saved && <HeartIcon className="w-4 h-4 text-primary fill-primary" filled />}
                    </div>
                    <h3 className="font-bold text-foreground truncate">{card.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1">{card.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-[10px] font-medium text-accent">5.0</span>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
