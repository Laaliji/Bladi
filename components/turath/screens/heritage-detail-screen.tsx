"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ShareIcon, BookmarkIcon, PlayIcon, Volume2Icon, CameraIcon, ChevronRightIcon } from '../icons'
import { useNavigation } from '../navigation-provider'

const HERITAGE_DATA = {
  title: 'Koutoubia Mosque',
  titleAr: 'جامع الكتبية',
  titleAmz: 'ⵜⵉⵎⵣⴳⵉⴷⴰ ⵏ ⵍⴽⵓⵜⵓⴱⵉⵢⵢⴰ',
  description: `The Koutoubia Mosque is the largest mosque in Marrakech, Morocco. The mosque was founded in 1147 by the Almohad caliph Abd al-Mu'min after his conquest of Marrakesh. The minaret, completed under the reign of Yaqub al-Mansur (1184–1199), stands as one of the finest examples of Almohad architecture.`,
  images: [
    'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=800&h=600&fit=crop',
  ],
  pullQuote: 'صومعة الكتبية رمز من رموز مراكش العريقة',
  pullQuoteAmz: 'ⵜⵉⵎⵣⴳⵉⴷⴰ ⵏ ⵍⴽⵓⵜⵓⴱⵉⵢⵢⴰ ⵜⴳⴰ ⵜⴰⵎⴰⵜⴰⵔⵜ ⵏ ⵎⵕⵕⴰⴽⵛ',
  pullQuoteEn: 'The Koutoubia Minaret — a timeless symbol of Marrakech',
  timeline: [
    { year: '1147', event: 'Foundation by Almohad caliph', eventAr: 'تأسيس من طرف الموحدين', eventAmz: 'ⴰⵙⵔⵙ ⵏ ⵉⵎⵡⴰⵃⴷⵉⵢⵏ' },
    { year: '1158', event: 'Reconstruction begins', eventAr: 'بداية إعادة البناء', eventAmz: 'ⴰⵍⴰⵙ ⵏ ⵜⵓⵙⴽⴰ' },
    { year: '1195', event: 'Minaret completed', eventAr: 'اكتمال الصومعة', eventAmz: 'ⵜⵉⴳⵉⵔⴰ ⵏ ⵜⵚⵚⵓⵎⵄⵜ' },
    { year: '1990', event: 'UNESCO recognition', eventAr: 'اعتراف اليونسكو', eventAmz: 'ⴰⵙⵙⵏ ⵏ ⵢⵓⵏⵉⵙⴽⵓ' },
  ],
  relatedContent: [
    { id: '1', title: 'Almohad Dynasty', image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=200&h=150&fit=crop' },
    { id: '2', title: 'Islamic Architecture', image: 'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=200&h=150&fit=crop' },
    { id: '3', title: 'Marrakech Medina', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=200&h=150&fit=crop' },
  ],
}

interface HeritageDetailScreenProps {
  isDark?: boolean
}

export function HeritageDetailScreen({ isDark }: HeritageDetailScreenProps) {
  void isDark
  const { goBack, navigate } = useNavigation()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Immersive media viewer */}
      <div className="relative h-[320px] flex-shrink-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERITAGE_DATA.images[currentImageIndex]})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button onClick={goBack} className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="Go back">
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button onClick={() => setSaved(!saved)} className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label={saved ? "Unsave" : "Save"}>
              <BookmarkIcon className={cn("w-5 h-5", saved ? "text-accent fill-accent" : "text-foreground")} filled={saved} />
            </button>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="Share">
              <ShareIcon className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-10 h-10 rounded-full glass flex items-center justify-center" aria-label="AR View">
              <CameraIcon className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {HERITAGE_DATA.images.map((_, index) => (
            <button key={index} onClick={() => setCurrentImageIndex(index)} className={cn("h-2 rounded-full transition-all", index === currentImageIndex ? "bg-accent w-6" : "bg-white/50 w-2")} aria-label={`View image ${index + 1}`} />
          ))}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl font-bold font-serif text-white drop-shadow-md">{HERITAGE_DATA.title}</h1>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-2xl font-serif text-[#F4C430] drop-shadow-md" dir="rtl">{HERITAGE_DATA.titleAr}</h2>
            <h3 className="text-sm font-sans text-[#F4C430]/90 drop-shadow-sm tracking-widest">{HERITAGE_DATA.titleAmz}</h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-28 space-y-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn("w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all",
            isPlaying ? "bg-[#2A52BE] text-white shadow-[0_8px_30px_rgba(42,82,190,0.3)]" : "bg-[#006233] text-white shadow-lg"
          )}
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-1 bg-current rounded-full waveform-bar" style={{ height: `${8 + (i * 3)}px`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="font-medium">Listening...</span>
            </>
          ) : (
            <>
              <Volume2Icon className="w-5 h-5" />
              <span className="font-medium">Hear the Story</span>
            </>
          )}
        </button>

        <div>
          <p className="text-foreground leading-relaxed text-sm">{HERITAGE_DATA.description}</p>
        </div>

        <blockquote className="relative py-6 px-4 bg-[#F4C430]/10 rounded-2xl border-l-4 border-[#F4C430] overflow-hidden">
          <div className="absolute inset-0 calligraphy-pattern opacity-30 pointer-events-none" />
          <p className="text-xl font-serif text-[#F4C430] font-bold leading-relaxed text-center relative z-10 drop-shadow-sm" dir="rtl">{HERITAGE_DATA.pullQuote}</p>
          <p className="text-sm font-sans text-[#F4C430]/80 mt-1 text-center relative z-10">{HERITAGE_DATA.pullQuoteAmz}</p>
          <p className="text-sm text-muted-foreground mt-2 text-center italic relative z-10">{HERITAGE_DATA.pullQuoteEn}</p>
        </blockquote>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Historical Timeline</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {HERITAGE_DATA.timeline.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-32 p-4 bg-card rounded-2xl border border-border text-center shadow-md relative overflow-hidden">
                <div className="absolute inset-0 zellige-pattern opacity-10 pointer-events-none" />
                <p className="text-2xl font-bold font-serif text-[#C1272D] relative z-10 drop-shadow-sm">{item.year}</p>
                <p className="text-xs text-foreground mt-2 relative z-10 font-medium">{item.event}</p>
                <p className="text-xs text-muted-foreground font-serif mt-1 relative z-10" dir="rtl">{item.eventAr}</p>
                <p className="text-[10px] text-muted-foreground/80 font-sans mt-0.5 relative z-10 tracking-wide">{item.eventAmz}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Related Content</h3>
            <button className="text-sm text-accent font-medium flex items-center gap-1">View all <ChevronRightIcon className="w-4 h-4" /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {HERITAGE_DATA.relatedContent.map((item) => (
              <button key={item.id} onClick={() => navigate('itinerary')} className="flex-shrink-0 w-36 rounded-2xl overflow-hidden bg-card border border-border">
                <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <p className="p-2 text-sm font-medium text-foreground truncate">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8 flex gap-3">
        <button className="flex-1 py-4 px-4 bg-card border border-[#F4C430]/30 text-foreground rounded-2xl font-serif font-bold shadow-md hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2">
          <ShareIcon className="w-5 h-5" />
          Share
        </button>
        <button onClick={() => navigate('itinerary')} className="flex-1 py-4 px-4 bg-[#C1272D] text-white rounded-2xl font-serif font-bold shadow-[0_8px_30px_rgba(193,39,45,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          <PlayIcon className="w-5 h-5" />
          Plan Visit
        </button>
      </div>
    </div>
  )
}
