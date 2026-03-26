"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TransportMode } from '@/lib/turath-types'
import { ChevronLeftIcon, WalkingIcon, CarIcon, BusIcon, NavigationIcon, CheckIcon, ClockIcon, MapPinIcon, WaveformIcon } from '../icons'
import { useNavigation } from '../navigation-provider'

// ─────────────────────────────────────────────────────────────────────────────
//  Per-city itinerary stops
// ─────────────────────────────────────────────────────────────────────────────

const CITY_ITINERARIES: Record<string, {
  name: string; nameAr: string; totalDays: number
  stops: { id: string; name: string; nameAr: string; image: string; time: string; duration: string; distance: string; description: string; completed: boolean }[]
}> = {
  marrakech: {
    name: 'Historic Marrakech', nameAr: 'مراكش التاريخية', totalDays: 3,
    stops: [
      { id: '1', name: 'Jemaa el-Fna',    nameAr: 'جامع الفنا',      image: '/cities/Marrakech/jama-el-fnaa.jpg',     time: '9:00 AM',  duration: '2 hours',  distance: 'Start point', description: 'Begin at the vibrant UNESCO-listed main square', completed: true  },
      { id: '2', name: 'Bahia Palace',    nameAr: 'قصر الباهية',     image: '/cities/Marrakech/bahia%20palace.jpeg', time: '11:30 AM', duration: '1.5 hours', distance: '1.2 km',    description: 'Explore the opulent 19th-century royal palace',  completed: true  },
      { id: '3', name: 'Majorelle Garden',nameAr: 'حديقة ماجوريل',   image: '/cities/Marrakech/majorelle.jpg',       time: '2:00 PM',  duration: '1 hour',   distance: '2.5 km',    description: 'Stroll through the cobalt-blue YSL garden',      completed: false },
    ],
  },
  fes: {
    name: 'Imperial Fès', nameAr: 'فاس العتيقة', totalDays: 3,
    stops: [
      { id: '1', name: 'Al-Qarawiyyin',      nameAr: 'جامعة القرويين',   image: '/cities/fes/mezquita-al-karaouine-4.jpg', time: '9:00 AM',  duration: '2 hours',  distance: 'Start point', description: "Visit the world's oldest university",             completed: true  },
      { id: '2', name: 'Bou Inania Madrasa', nameAr: 'مدرسة بو عنانية', image: '/cities/fes/bou%20inania.webp',           time: '11:30 AM', duration: '1 hour',   distance: '0.3 km',    description: 'Marvel at the intricate Marinid craftsmanship',   completed: true  },
      { id: '3', name: 'Chouara Tannery',    nameAr: 'دباغة الشوارة',   image: '/cities/fes/Chouara-Tannery.jpg',         time: '1:30 PM',  duration: '1 hour',   distance: '0.8 km',    description: 'Witness the iconic medieval leather dyeing pits', completed: false },
    ],
  },
  casablanca: {
    name: 'Modern Casablanca', nameAr: 'الدار البيضاء', totalDays: 2,
    stops: [
      { id: '1', name: 'Hassan II Mosque', nameAr: 'مسجد الحسن الثاني', image: '/cities/Casablanca/hassan-ii-mosque-2.jpg', time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: "Marvel at Africa's largest mosque on the sea",    completed: true  },
      { id: '2', name: 'Quartier Habous',  nameAr: 'حي الحبوس',          image: '/cities/Casablanca/habbous.png',            time: '11:30 AM', duration: '1.5 hours', distance: '3 km',      description: 'Wander the neo-Moorish French-Moroccan quarter',  completed: false },
      { id: '3', name: 'Morocco Mall',     nameAr: 'مول المغرب',          image: '/cities/Casablanca/morocco-mall-3-.webp',   time: '2:30 PM',  duration: '2 hours',   distance: '6 km',      description: 'Explore the iconic aquarium shopping landmark',   completed: false },
    ],
  },
  rabat: {
    name: 'Royal Rabat', nameAr: 'الرباط الملكية', totalDays: 2,
    stops: [
      { id: '1', name: 'Hassan Tower',       nameAr: 'صومعة حسان',   image: '/cities/Rabat/hassan-tower2.webp',          time: '9:00 AM',  duration: '1 hour',   distance: 'Start point', description: 'Admire the unfinished 12th-century minaret',      completed: true  },
      { id: '2', name: 'Chellah',            nameAr: 'شالة',          image: '/cities/Rabat/necropolis-de-chellah-3.jpg', time: '10:30 AM', duration: '1.5 hours', distance: '1.5 km',    description: 'Explore the ancient Roman & Merinid necropolis',  completed: false },
      { id: '3', name: 'Kasbah des Oudaias', nameAr: 'قصبة الوداية', image: '/cities/Rabat/Kasbah-Udayas-Rabat.webp',    time: '1:00 PM',  duration: '1.5 hours', distance: '1.2 km',    description: 'Stroll through the fortified Andalusian quarter', completed: false },
    ],
  },
  tangier: {
    name: 'Gateway Tanger', nameAr: 'بوابة طنجة', totalDays: 2,
    stops: [
      { id: '1', name: 'Kasbah Museum',     nameAr: 'متحف القصبة',  image: '/cities/Tangier/kasbah%20museum.jpg',    time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: 'Discover the fortress overlooking the strait',   completed: true  },
      { id: '2', name: 'Caves of Hercules', nameAr: 'كهوف هرقل',    image: '/cities/Tangier/hercules.jpg',           time: '11:30 AM', duration: '1 hour',    distance: '14 km',     description: 'Explore the legendary sea caves at the cape',    completed: false },
      { id: '3', name: 'Grand Socco',       nameAr: 'السوق الكبير', image: '/cities/Tangier/Grand_Socco_Tangier.jpg', time: '2:00 PM',  duration: '1 hour',    distance: '12 km',     description: 'Soak in the lively central square of Tangier',   completed: false },
    ],
  },
  chefchaouen: {
    name: 'Blue Chefchaouen', nameAr: 'شفشاون الزرقاء', totalDays: 2,
    stops: [
      { id: '1', name: 'Blue Medina',        nameAr: 'المدينة الزرقاء', image: '/cities/Chefchaouen/blue%20medina.jpg',         time: '9:00 AM',  duration: '2 hours', distance: 'Start point', description: 'Wander the iconic blue-washed alleyways',          completed: true  },
      { id: '2', name: 'Ras El Maa',         nameAr: 'رأس الماء',       image: '/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp', time: '11:30 AM', duration: '1 hour',  distance: '0.5 km',    description: 'Relax at the crystal-clear spring waterfall',      completed: false },
      { id: '3', name: 'Spanish Mosque',     nameAr: 'المسجد الإسباني', image: '/cities/Chefchaouen/spanish%20mosque.jpg',      time: '1:30 PM',  duration: '1 hour',  distance: '1 km',      description: 'Enjoy the panoramic view from the hilltop mosque', completed: false },
      { id: '4', name: 'Akchour Waterfalls', nameAr: 'شلالات أكشور',   image: '/cities/Chefchaouen/akchour.jpg',               time: '3:30 PM',  duration: '2 hours', distance: '30 km',     description: 'Trek to the stunning Rif mountain cascades',        completed: false },
    ],
  },
  meknes: {
    name: 'Imperial Meknès', nameAr: 'مكناس الإمبراطورية', totalDays: 2,
    stops: [
      { id: '1', name: 'Bab Mansour',        nameAr: 'باب منصور',           image: '/cities/Meknes/bab-mansour-gate.jpg',                  time: '9:00 AM',  duration: '30 mins',   distance: 'Start point', description: 'Photograph the majestic Alaouite imperial gate',    completed: true  },
      { id: '2', name: 'Moulay Ismail Tomb', nameAr: 'ضريح مولاي إسماعيل', image: '/cities/Meknes/Le-tombeau-de-Moulay-Isma%C3%AFl.jpg',  time: '10:00 AM', duration: '1 hour',    distance: '0.3 km',    description: 'Visit the ornate mausoleum of the sultan builder',   completed: false },
      { id: '3', name: 'Place El Hedim',     nameAr: 'ساحة الهديم',         image: '/cities/Meknes/el-hedim-square.jpg',                  time: '12:00 PM', duration: '1.5 hours', distance: '0.2 km',    description: 'Explore the grand square of the imperial city',      completed: false },
    ],
  },
  safi: {
    name: 'Artisan Safi', nameAr: 'آسفي الحرفية', totalDays: 2,
    stops: [
      { id: '1', name: 'Kechla Fortress',   nameAr: 'قلعة كشلة',          image: '/cities/Safi/kachla%20fortress.jpg',            time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: 'Tour the Portuguese sea fortress on the cliff',    completed: true  },
      { id: '2', name: 'Pottery Quarter',   nameAr: 'حي الفخار',           image: '/cities/Safi/pottery%20quarter.png',            time: '11:00 AM', duration: '2 hours',   distance: '1 km',      description: 'Watch artisans throw famous blue glazed ceramics', completed: false },
      { id: '3', name: 'Portuguese Chapel', nameAr: 'الكنيسة البرتغالية', image: '/cities/Safi/cathedrale-portugaise0-scaled.jpg', time: '2:00 PM',  duration: '45 mins',   distance: '0.5 km',    description: 'Admire the historic Manueline-style chapel',       completed: false },
    ],
  },
  essaouira: {
    name: 'Wind City Essaouira', nameAr: 'الصويرة', totalDays: 2,
    stops: [
      { id: '1', name: 'Skala Ramparts', nameAr: 'أسوار الصقالة',  image: '/cities/Essaouira/skala.jpeg', time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: 'Walk the Atlantic-facing cannon sea walls', completed: true  },
      { id: '2', name: 'Medina UNESCO',  nameAr: 'المدينة العتيقة', image: '/cities/Essaouira/skala.webp', time: '11:00 AM', duration: '2 hours',   distance: '0.3 km',    description: 'Explore the World Heritage walled medina', completed: false },
    ],
  },
}

const DEFAULT_ITINERARY = CITY_ITINERARIES.marrakech

interface ItineraryScreenProps {
  isDark?: boolean
}

export function ItineraryScreen({ isDark }: ItineraryScreenProps) {
  void isDark
  const { goBack, navigate, selectedCityId } = useNavigation()
  const itinerary = (selectedCityId ? CITY_ITINERARIES[selectedCityId] : null) ?? DEFAULT_ITINERARY

  const [selectedDay, setSelectedDay] = useState(1)
  const [transportMode, setTransportMode] = useState<TransportMode>('walking')

  const completedStops = itinerary.stops.filter(s => s.completed).length
  const totalStops = itinerary.stops.length

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="pt-12 px-4 pb-4 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors" aria-label="Go back">
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{itinerary.name}</h1>
            <p className="text-sm font-serif text-accent" dir="rtl">{itinerary.nameAr}</p>
          </div>
          <button onClick={() => navigate('voice-ai')} className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/30 transition-colors" aria-label="AI Guide">
            <WaveformIcon className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* Transport mode */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'walking' as const, label: 'Walking', Icon: WalkingIcon },
            { id: 'car' as const, label: 'Car', Icon: CarIcon },
            { id: 'public' as const, label: 'Transit', Icon: BusIcon },
          ].map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTransportMode(id)}
              className={cn("flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-medium",
                transportMode === id ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Day selector */}
        <div className="flex gap-2">
          {Array.from({ length: itinerary.totalDays }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn("flex-1 py-2 rounded-xl text-sm font-medium transition-all",
                selectedDay === day ? "bg-accent text-accent-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 bg-secondary/10 flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${(completedStops / totalStops) * 100}%` }} />
          </div>
        </div>
        <span className="text-sm font-medium text-foreground whitespace-nowrap">{completedStops}/{totalStops} completed</span>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="relative pb-4">
          <div className="absolute left-[27px] top-4 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {itinerary.stops.map((stop, index) => (
              <div key={stop.id} className="flex gap-4">
                <div className="relative z-10 flex-shrink-0">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all",
                    stop.completed ? "bg-secondary text-secondary-foreground shadow-md" : "bg-muted text-muted-foreground"
                  )}>
                    {stop.completed ? <CheckIcon className="w-6 h-6" /> : <span className="text-lg">{index + 1}</span>}
                  </div>
                </div>
                <button
                  onClick={() => navigate('heritage-detail')}
                  className={cn("flex-1 rounded-2xl overflow-hidden border transition-all text-left active:scale-[0.97] hover:shadow-md",
                    stop.completed ? "bg-card border-secondary/30" : "bg-card border-border hover:border-border/80"
                  )}
                >
                  <div className="flex">
                    <div className="w-24 h-24 bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${stop.image})` }} />
                    <div className="flex-1 p-3">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-1">{stop.name}</h3>
                      <p className="text-[10px] text-accent" dir="rtl">{stop.nameAr}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{stop.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3" />{stop.time}</span>
                        <span className="flex items-center gap-1"><MapPinIcon className="w-3 h-3" />{stop.distance}</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Fixed Bottom */}
      <div className="bg-gradient-to-b from-background to-card border-t border-border">
        {/* Enhanced Horizontal Itinerary Progress */}
        

        {/* CTA Button */}
        <div className="p-4 space-y-2">
          <button className="w-full py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <NavigationIcon className="w-5 h-5" />
            <span>Start Navigation</span>
          </button>
          <button className="w-full py-2 px-6 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors">
            View Full Route
          </button>
        </div>
      </div>
    </div>
  )
}
