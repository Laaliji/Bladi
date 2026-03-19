"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ShareIcon, BookmarkIcon, PlayIcon, Volume2Icon, CameraIcon, ChevronRightIcon } from '../icons'

interface HeritageDetailScreenProps {
  onBack?: () => void
  isDark?: boolean
}

const HERITAGE_DATA = {
  id: '1',
  title: 'Koutoubia Mosque',
  titleAr: 'جامع الكتبية',
  description: `The Koutoubia Mosque is the largest mosque in Marrakech, Morocco. The mosque is also known by several other names, such as Kutubiyya Mosque, Jami' al-Kutubiyah, Kotoubia Mosque, and Mosque of the Booksellers.

The mosque was founded in 1147 by the Almohad caliph Abd al-Mu'min after his conquest of Marrakesh. The minaret, completed under the reign of Yaqub al-Mansur (1184-1199), is built in a style common to the western Islamic world.`,
  images: [
    'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=800&h=600&fit=crop',
  ],
  pullQuote: 'صومعة الكتبية رمز من رموز مراكش العريقة',
  pullQuoteEn: 'The Koutoubia Minaret - a timeless symbol of Marrakech',
  timeline: [
    { year: '1147', event: 'Foundation by Almohad caliph', eventAr: 'تأسيس من طرف الموحدين' },
    { year: '1158', event: 'Reconstruction begins', eventAr: 'بداية إعادة البناء' },
    { year: '1195', event: 'Minaret completed', eventAr: 'اكتمال الصومعة' },
    { year: '1990', event: 'UNESCO recognition', eventAr: 'اعتراف اليونسكو' },
  ],
  relatedContent: [
    { id: '1', title: 'Almohad Dynasty', image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=200&h=150&fit=crop' },
    { id: '2', title: 'Islamic Architecture', image: 'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=200&h=150&fit=crop' },
    { id: '3', title: 'Marrakech Medina', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=200&h=150&fit=crop' },
  ],
}

export function HeritageDetailScreen({ onBack, isDark }: HeritageDetailScreenProps) {
  void isDark // dark mode via CSS .dark class
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Immersive media viewer */}
      <div className="relative h-[320px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERITAGE_DATA.images[currentImageIndex]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Header actions */}
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full glass flex items-center justify-center"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setSaved(!saved)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
              aria-label={saved ? "Unsave" : "Save"}
            >
              <BookmarkIcon className={cn("w-5 h-5", saved ? "text-accent fill-accent" : "text-foreground")} filled={saved} />
            </button>
            <button 
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
              aria-label="Share"
            >
              <ShareIcon className="w-5 h-5 text-foreground" />
            </button>
            <button 
              className="w-10 h-10 rounded-full glass flex items-center justify-center"
              aria-label="AR View"
            >
              <CameraIcon className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {HERITAGE_DATA.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentImageIndex ? "bg-accent w-6" : "bg-white/50"
              )}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-foreground">{HERITAGE_DATA.title}</h1>
          <h2 className="text-xl font-serif text-accent" dir="rtl">{HERITAGE_DATA.titleAr}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-24 space-y-6">
        {/* Hear the story button */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn(
            "w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all",
            isPlaying 
              ? "bg-accent text-accent-foreground" 
              : "bg-secondary text-secondary-foreground"
          )}
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-current rounded-full waveform-bar"
                    style={{ 
                      height: `${8 + Math.random() * 8}px`,
                      animationDelay: `${i * 0.1}s` 
                    }}
                  />
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

        {/* Description */}
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed">{HERITAGE_DATA.description}</p>
        </div>

        {/* Pull quote */}
        <blockquote className="relative py-6 px-4 bg-accent/10 rounded-2xl border-l-4 border-accent">
          <p className="text-lg font-serif text-accent leading-relaxed text-center" dir="rtl">
            {HERITAGE_DATA.pullQuote}
          </p>
          <p className="text-sm text-muted-foreground mt-2 text-center italic">
            {HERITAGE_DATA.pullQuoteEn}
          </p>
        </blockquote>

        {/* Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Historical Timeline</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {HERITAGE_DATA.timeline.map((item, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-32 p-3 bg-card rounded-2xl border border-border text-center"
              >
                <p className="text-xl font-bold text-primary">{item.year}</p>
                <p className="text-xs text-foreground mt-1">{item.event}</p>
                <p className="text-xs text-muted-foreground font-serif mt-1" dir="rtl">{item.eventAr}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related content */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Related Content</h3>
            <button className="text-sm text-accent font-medium flex items-center gap-1">
              View all
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {HERITAGE_DATA.relatedContent.map((item) => (
              <button
                key={item.id}
                className="flex-shrink-0 w-36 rounded-2xl overflow-hidden bg-card border border-border"
              >
                <div 
                  className="h-20 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <p className="p-2 text-sm font-medium text-foreground truncate">{item.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8 flex gap-3">
        <button className="flex-1 py-3 px-4 bg-card border border-border text-foreground rounded-2xl font-medium flex items-center justify-center gap-2">
          <ShareIcon className="w-5 h-5" />
          Share
        </button>
        <button className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-medium flex items-center justify-center gap-2">
          <CameraIcon className="w-5 h-5" />
          AR View
        </button>
      </div>
    </div>
  )
}
