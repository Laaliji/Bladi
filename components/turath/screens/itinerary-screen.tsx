"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TransportMode } from '@/lib/turath-types'
import { ChevronLeftIcon, WalkingIcon, CarIcon, BusIcon, NavigationIcon, CheckIcon, ClockIcon, MapPinIcon, WaveformIcon } from '../icons'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

  // Data moved inside component to use t() hook

interface ItineraryScreenProps {
  isDark?: boolean
}

export function ItineraryScreen({ isDark }: ItineraryScreenProps) {
  void isDark
  const { goBack, navigate, selectedCityId } = useNavigation()
  const { t } = useTranslation()

  const CITY_ITINERARIES: Record<string, {
    name: string; nameAr: string; totalDays: number
    stops: { id: string; name: string; nameAr: string; image: string; time: string; duration: string; distance: string; description: string; completed: boolean }[]
  }> = {
    marrakech: {
      name: t('data.itineraries.marrakech.name'), nameAr: t('data.itineraries.marrakech.name_ar'), totalDays: 3,
      stops: [
        { id: '1', name: t('data.itineraries.marrakech.stop1_name'), nameAr: t('home_map.jemaa_el_fna_ar'), image: '/cities/Marrakech/jama-el-fnaa.jpg',     time: '9:00 AM',  duration: '2 hours',  distance: 'Start point', description: t('data.itineraries.marrakech.stop1_desc'), completed: true  },
        { id: '2', name: t('data.itineraries.marrakech.stop2_name'), nameAr: t('home_map.bahia_palace_ar'), image: '/cities/Marrakech/bahia%20palace.jpeg', time: '11:30 AM', duration: '1.5 hours', distance: '1.2 km',    description: t('data.itineraries.marrakech.stop2_desc'),  completed: true  },
        { id: '3', name: t('data.itineraries.marrakech.stop3_name'), nameAr: t('home_map.majorelle_ar'),    image: '/cities/Marrakech/majorelle.jpg',       time: '2:00 PM',  duration: '1 hour',   distance: '2.5 km',    description: t('data.itineraries.marrakech.stop3_desc'),      completed: false },
      ],
    },
    fes: {
      name: t('data.itineraries.fes.name'), nameAr: t('data.itineraries.fes.name_ar'), totalDays: 3,
      stops: [
        { id: '1', name: t('data.itineraries.fes.stop1_name'), nameAr: t('home_map.al_qarawiyyin_ar'),   image: '/cities/fes/mezquita-al-karaouine-4.jpg', time: '9:00 AM',  duration: '2 hours',  distance: 'Start point', description: t('data.itineraries.fes.stop1_desc'),             completed: true  },
        { id: '2', name: t('data.itineraries.fes.stop2_name'), nameAr: t('home_map.bou_inania_ar'), image: '/cities/fes/bou%20inania.webp',           time: '11:30 AM', duration: '1 hour',   distance: '0.3 km',    description: t('data.itineraries.fes.stop2_desc'),   completed: true  },
        { id: '3', name: t('data.itineraries.fes.stop3_name'), nameAr: t('home_map.chouara_ar'),   image: '/cities/fes/Chouara-Tannery.jpg',         time: '1:30 PM',  duration: '1 hour',   distance: '0.8 km',    description: t('data.itineraries.fes.stop3_desc'), completed: false },
      ],
    },
    casablanca: {
      name: t('data.itineraries.casablanca.name'), nameAr: t('data.itineraries.casablanca.name_ar'), totalDays: 2,
      stops: [
        { id: '1', name: t('data.itineraries.casablanca.stop1_name'), nameAr: t('home_map.hassan_ii_mosque_ar'), image: '/cities/Casablanca/hassan-ii-mosque-2.jpg', time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: t('data.itineraries.casablanca.stop1_desc'),    completed: true  },
        { id: '2', name: t('data.itineraries.casablanca.stop2_name'), nameAr: t('home_map.habous_ar'),          image: '/cities/Casablanca/habbous.png',            time: '11:30 AM', duration: '1.5 hours', distance: '3 km',      description: t('data.itineraries.casablanca.stop2_desc'),  completed: false },
        { id: '3', name: t('data.itineraries.casablanca.stop3_name'), nameAr: t('home_map.morocco_mall_ar'),          image: '/cities/Casablanca/morocco-mall-3-.webp',   time: '2:30 PM',  duration: '2 hours',   distance: '6 km',      description: t('data.itineraries.casablanca.stop3_desc'),   completed: false },
      ],
    },
    rabat: {
      name: t('data.itineraries.rabat.name'), nameAr: t('data.itineraries.rabat.name_ar'), totalDays: 2,
      stops: [
        { id: '1', name: t('data.itineraries.rabat.stop1_name'), nameAr: t('home_map.hassan_tower_ar'),   image: '/cities/Rabat/hassan-tower2.webp',          time: '9:00 AM',  duration: '1 hour',   distance: 'Start point', description: t('data.itineraries.rabat.stop1_desc'),      completed: true  },
        { id: '2', name: t('data.itineraries.rabat.stop2_name'), nameAr: t('home_map.chellah_ar'),          image: '/cities/Rabat/necropolis-de-chellah-3.jpg', time: '10:30 AM', duration: '1.5 hours', distance: '1.5 km',    description: t('data.itineraries.rabat.stop2_desc'),  completed: false },
        { id: '3', name: t('data.itineraries.rabat.stop3_name'), nameAr: t('home_map.kasbah_oudaias_ar'), image: '/cities/Rabat/Kasbah-Udayas-Rabat.webp',    time: '1:00 PM',  duration: '1.5 hours', distance: '1.2 km',    description: t('data.itineraries.rabat.stop3_desc'), completed: false },
      ],
    },
    tangier: {
      name: t('data.itineraries.tangier.name'), nameAr: t('data.itineraries.tangier.name_ar'), totalDays: 2,
      stops: [
        { id: '1', name: t('data.itineraries.tangier.stop1_name'), nameAr: t('home_map.kasbah_museum_ar'),  image: '/cities/Tangier/kasbah%20museum.jpg',    time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: t('data.itineraries.tangier.stop1_desc'),   completed: true  },
        { id: '2', name: t('data.itineraries.tangier.stop2_name'), nameAr: t('home_map.caves_hercules_ar'),    image: '/cities/Tangier/hercules.jpg',           time: '11:30 AM', duration: '1 hour',    distance: '14 km',     description: t('data.itineraries.tangier.stop2_desc'),    completed: false },
        { id: '3', name: t('data.itineraries.tangier.stop3_name'), nameAr: t('home_map.grand_socco_ar'), image: '/cities/Tangier/Grand_Socco_Tangier.jpg', time: '2:00 PM',  duration: '1 hour',    distance: '12 km',     description: t('data.itineraries.tangier.stop3_desc'),   completed: false },
      ],
    },
    chefchaouen: {
      name: t('data.itineraries.chefchaouen.name'), nameAr: t('data.itineraries.chefchaouen.name_ar'), totalDays: 2,
      stops: [
        { id: '1', name: t('data.itineraries.chefchaouen.stop1_name'), nameAr: t('home_map.blue_medina_ar'), image: '/cities/Chefchaouen/blue%20medina.jpg',         time: '9:00 AM',  duration: '2 hours', distance: 'Start point', description: t('data.itineraries.chefchaouen.stop1_desc'),          completed: true  },
        { id: '2', name: t('data.itineraries.chefchaouen.stop2_name'), nameAr: t('home_map.ras_el_maa_ar'),       image: '/cities/Chefchaouen/Ras-El-Maa-Waterfall.webp', time: '11:30 AM', duration: '1 hour',  distance: '0.5 km',    description: t('data.itineraries.chefchaouen.stop2_desc'),      completed: false },
        { id: '3', name: t('data.itineraries.chefchaouen.stop3_name'), nameAr: t('home_map.spanish_mosque_ar'), image: '/cities/Chefchaouen/spanish%20mosque.jpg',      time: '1:30 PM',  duration: '1 hour',  distance: '1 km',      description: t('data.itineraries.chefchaouen.stop3_desc'), completed: false },
        { id: '4', name: t('data.itineraries.chefchaouen.stop4_name'), nameAr: t('home_map.akchour_ar'),   image: '/cities/Chefchaouen/akchour.jpg',               time: '3:30 PM',  duration: '2 hours', distance: '30 km',     description: t('data.itineraries.chefchaouen.stop4_desc'),        completed: false },
      ],
    },
    meknes: {
      name: t('data.itineraries.meknes.name'), nameAr: t('data.itineraries.meknes.name_ar'), totalDays: 2,
      stops: [
        { id: '1', name: t('data.itineraries.meknes.stop1_name'), nameAr: t('home_map.bab_mansour_ar'),           image: '/cities/Meknes/bab-mansour-gate.jpg',                  time: '9:00 AM',  duration: '30 mins',   distance: 'Start point', description: t('data.itineraries.meknes.stop1_desc'),    completed: true  },
        { id: '2', name: t('data.itineraries.meknes.stop2_name'), nameAr: t('home_map.moulay_ismail_ar'), image: '/cities/Meknes/Le-tombeau-de-Moulay-Isma%C3%AFl.jpg',  time: '10:00 AM', duration: '1 hour',    distance: '0.3 km',    description: t('data.itineraries.meknes.stop2_desc'),   completed: false },
        { id: '3', name: t('data.itineraries.meknes.stop3_name'), nameAr: t('home_map.el_hedim_ar'),         image: '/cities/Meknes/el-hedim-square.jpg',                  time: '12:00 PM', duration: '1.5 hours', distance: '0.2 km',    description: t('data.itineraries.meknes.stop3_desc'),      completed: false },
      ],
    },
    safi: {
      name: t('data.itineraries.safi.name'), nameAr: t('data.itineraries.safi.name_ar'), totalDays: 2,
      stops: [
        { id: '1', name: t('data.itineraries.safi.stop1_name'), nameAr: t('home_map.kechla_ar'),          image: '/cities/Safi/kachla%20fortress.jpg',            time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: t('data.itineraries.safi.stop1_desc'),    completed: true  },
        { id: '2', name: t('data.itineraries.safi.stop2_name'), nameAr: t('home_map.pottery_quarter_ar'),           image: '/cities/Safi/pottery%20quarter.png',            time: '11:00 AM', duration: '2 hours',   distance: '1 km',      description: t('data.itineraries.safi.stop2_desc'), completed: false },
        { id: '3', name: t('data.itineraries.safi.stop3_name'), nameAr: t('home_map.portuguese_chapel_ar'), image: '/cities/Safi/cathedrale-portugaise0-scaled.jpg', time: '2:00 PM',  duration: '45 mins',   distance: '0.5 km',    description: t('data.itineraries.safi.stop3_desc'),       completed: false },
      ],
    },
    essaouira: {
      name: t('data.itineraries.essaouira.name'), nameAr: t('data.itineraries.essaouira.name_ar'), totalDays: 2,
      stops: [
        { id: '1', name: t('data.itineraries.essaouira.stop1_name'), nameAr: t('home_map.skala_ar'),  image: '/cities/Essaouira/skala.jpeg', time: '9:00 AM',  duration: '1.5 hours', distance: 'Start point', description: t('data.itineraries.essaouira.stop1_desc'), completed: true  },
        { id: '2', name: t('data.itineraries.essaouira.stop2_name'), nameAr: t('home_map.essaouira_medina_ar'), image: '/cities/Essaouira/skala.webp', time: '11:00 AM', duration: '2 hours',   distance: '0.3 km',    description: t('data.itineraries.essaouira.stop2_desc'), completed: false },
      ],
    },
  }

  const DEFAULT_ITINERARY = CITY_ITINERARIES.marrakech
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
            { id: 'walking' as const, label: t('itinerary.walking', 'Walking'), Icon: WalkingIcon },
            { id: 'car' as const, label: t('itinerary.car', 'Car'), Icon: CarIcon },
            { id: 'public' as const, label: t('itinerary.transit', 'Transit'), Icon: BusIcon },
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
              {t('itinerary.day', 'Day')} {day}
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
        <span className="text-sm font-medium text-foreground whitespace-nowrap">{completedStops}/{totalStops} {t('itinerary.completed', 'completed')}</span>
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
            <span>{t('itinerary.start_navigation', 'Start Navigation')}</span>
          </button>
          <button className="w-full py-2 px-6 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors">
            {t('itinerary.view_full_route', 'View Full Route')}
          </button>
        </div>
      </div>
    </div>
  )
}
