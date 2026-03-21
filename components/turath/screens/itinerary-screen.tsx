"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TransportMode } from '@/lib/turath-types'
import { ChevronLeftIcon, WalkingIcon, CarIcon, BusIcon, NavigationIcon, CheckIcon, ClockIcon, MapPinIcon, WaveformIcon } from '../icons'
import { useNavigation } from '../navigation-provider'

const ITINERARY_DATA = {
  name: 'Historic Marrakech',
  nameAr: 'مراكش التاريخية',
  totalDays: 3,
  stops: [
    { id: '1', name: "Jemaa el-Fnaa", nameAr: 'جامع الفنا', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=300&h=200&fit=crop', time: '9:00 AM', duration: '2 hours', distance: 'Start point', description: 'Begin your journey at the bustling main square', completed: true },
    { id: '2', name: 'Koutoubia Mosque', nameAr: 'جامع الكتبية', image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=300&h=200&fit=crop', time: '11:30 AM', duration: '1 hour', distance: '0.5 km', description: 'Admire the iconic 12th-century minaret', completed: true },
    { id: '3', name: 'Bahia Palace', nameAr: 'قصر الباهية', image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=300&h=200&fit=crop', time: '1:00 PM', duration: '1.5 hours', distance: '1.2 km', description: 'Explore the stunning 19th-century palace', completed: false },
    { id: '4', name: 'El Badi Palace', nameAr: 'قصر البديع', image: 'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=300&h=200&fit=crop', time: '3:00 PM', duration: '1 hour', distance: '0.8 km', description: 'Discover the ruins of the grand Saadian palace', completed: false },
    { id: '5', name: 'Saadian Tombs', nameAr: 'مقابر السعديين', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=300&h=200&fit=crop', time: '4:30 PM', duration: '45 mins', distance: '0.3 km', description: 'Visit the ornate royal necropolis', completed: false },
  ],
}

interface ItineraryScreenProps {
  isDark?: boolean
}

export function ItineraryScreen({ isDark }: ItineraryScreenProps) {
  void isDark
  const { goBack, navigate } = useNavigation()
  const [selectedDay, setSelectedDay] = useState(1)
  const [transportMode, setTransportMode] = useState<TransportMode>('walking')

  const completedStops = ITINERARY_DATA.stops.filter(s => s.completed).length
  const totalStops = ITINERARY_DATA.stops.length

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="pt-12 px-4 pb-4 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-colors" aria-label="Go back">
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-serif text-foreground">{ITINERARY_DATA.name}</h1>
            <p className="text-lg font-serif text-[#F4C430]" dir="rtl">{ITINERARY_DATA.nameAr}</p>
          </div>
          <button onClick={() => navigate('voice-ai')} className="w-10 h-10 rounded-full bg-[#2A52BE]/10 flex items-center justify-center hover:bg-[#2A52BE]/20 transition-colors" aria-label="AI Guide">
            <WaveformIcon className="w-5 h-5 text-[#2A52BE]" />
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
                transportMode === id ? "bg-[#C1272D] text-white shadow-md font-bold" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Day selector */}
        <div className="flex gap-2">
          {Array.from({ length: ITINERARY_DATA.totalDays }, (_, i) => i + 1).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn("flex-1 py-2 rounded-xl text-sm font-medium transition-all",
                selectedDay === day ? "bg-[#2A52BE] text-white shadow-md font-bold" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 bg-[#006233]/5 flex items-center gap-3 border-y border-border/50">
        <div className="flex-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-[#006233] rounded-full transition-all" style={{ width: `${(completedStops / totalStops) * 100}%` }} />
          </div>
        </div>
        <span className="text-sm font-medium text-foreground">{completedStops}/{totalStops} completed</span>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-36">
        <div className="relative">
          <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-border" />
          <div className="space-y-4">
            {ITINERARY_DATA.stops.map((stop, index) => (
              <div key={stop.id} className="flex gap-4">
                <div className="relative z-10 flex-shrink-0">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner",
                    stop.completed ? "bg-[#F4C430] text-[#1A1A1A] border-2 border-[#F4C430]" : "bg-muted text-muted-foreground border-2 border-transparent"
                  )}>
                    {stop.completed ? <CheckIcon className="w-6 h-6" /> : <span className="text-lg font-bold font-serif">{index + 1}</span>}
                  </div>
                </div>
                <button
                  onClick={() => navigate('heritage-detail')}
                  className={cn("flex-1 rounded-2xl overflow-hidden border transition-all text-left active:scale-[0.97]",
                    stop.completed ? "bg-card border-secondary/30" : "bg-card border-border"
                  )}
                >
                  <div className="flex">
                    <div className="w-24 h-24 bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${stop.image})` }} />
                    <div className="flex-1 p-3">
                      <h3 className="font-semibold text-sm text-foreground">{stop.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{stop.description}</p>
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

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-[var(--turath-gold)]/20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="h-20 bg-[#E8E0D5] relative overflow-hidden">
          <div className="absolute inset-0 arabesque-pattern opacity-20 pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 20">
            <path d="M10 10 Q25 5 40 10 T70 10 T100 10" fill="none" stroke="#2A52BE" strokeWidth="0.8" strokeDasharray="2,2" />
            {[10, 25, 40, 55, 70, 85].map((x, i) => (
              <circle key={i} cx={x} cy="10" r="2" fill={i < 2 ? "#006233" : "#C1272D"} />
            ))}
          </svg>
        </div>
        <div className="p-4 bg-background">
          <button className="w-full py-4 px-6 bg-[#C1272D] text-white rounded-2xl font-serif font-bold text-lg shadow-[0_8px_30px_rgba(193,39,45,0.3)] hover:bg-[#A00F1A] transition-colors flex items-center justify-center gap-2">
            <NavigationIcon className="w-5 h-5" />
            <span>Start Navigation</span>
          </button>
        </div>
      </div>
    </div>
  )
}
