"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ShareIcon, BookmarkIcon, PlayIcon, Volume2Icon, CameraIcon, ChevronRightIcon } from '../icons'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

// Data arrays moved inside component for translation

interface HeritageDetailScreenProps {
  isDark?: boolean
}

export function HeritageDetailScreen({ isDark }: HeritageDetailScreenProps) {
  void isDark
  const { goBack, navigate } = useNavigation()
  const { t } = useTranslation()

  const HERITAGE_DATA = {
    title: t('data.heritage_sites.koutoubia'),
    titleAr: 'جامع الكتبية',
    description: t('heritage_detail.koutoubia_desc'),
    images: [
      'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=800&h=600&fit=crop',
    ],
    pullQuote: 'صومعة الكتبية رمز من رموز مراكش العريقة',
    pullQuoteEn: t('heritage_detail.pull_quote'),
    timeline: [
      { year: '1147', event: t('heritage_detail.timeline_1147'), eventAr: 'تأسيس من طرف الموحدين' },
      { year: '1158', event: t('heritage_detail.timeline_1158'), eventAr: 'بداية إعادة البناء' },
      { year: '1195', event: t('heritage_detail.timeline_1195'), eventAr: 'اكتمال الصومعة' },
      { year: '1990', event: t('heritage_detail.timeline_1990'), eventAr: 'اعتراف اليونسكو' },
    ],
    relatedContent: [
      { id: '1', title: t('heritage_detail.title_almohad'), image: 'https://images.unsplash.com/photo-1548018560-c7196bf66e3c?w=200&h=150&fit=crop' },
      { id: '2', title: t('heritage_detail.title_islamic_arch'), image: 'https://images.unsplash.com/photo-1580746738099-78d6833b3f84?w=200&h=150&fit=crop' },
      { id: '3', title: t('heritage_detail.title_medina'), image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=200&h=150&fit=crop' },
    ],
  }

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
          <h1 className="text-2xl font-bold text-foreground">{HERITAGE_DATA.title}</h1>
          <h2 className="text-xl font-serif text-accent" dir="rtl">{HERITAGE_DATA.titleAr}</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-28 space-y-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={cn("w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all",
            isPlaying ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
          )}
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-0.5 h-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-1 bg-current rounded-full waveform-bar" style={{ height: `${8 + (i * 3)}px`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <span className="font-medium">{t('heritage_detail.listening')}</span>
            </>
          ) : (
            <>
              <Volume2Icon className="w-5 h-5" />
              <span className="font-medium">{t('heritage_detail.hear_story')}</span>
            </>
          )}
        </button>

        <div>
          <p className="text-foreground leading-relaxed text-sm">{HERITAGE_DATA.description}</p>
        </div>

        <blockquote className="relative py-6 px-4 bg-accent/10 rounded-2xl border-l-4 border-accent">
          <p className="text-lg font-serif text-accent leading-relaxed text-center" dir="rtl">{HERITAGE_DATA.pullQuote}</p>
          <p className="text-sm text-muted-foreground mt-2 text-center italic">{HERITAGE_DATA.pullQuoteEn}</p>
        </blockquote>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">{t('heritage_detail.historical_timeline')}</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {HERITAGE_DATA.timeline.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-32 p-3 bg-card rounded-2xl border border-border text-center">
                <p className="text-xl font-bold text-primary">{item.year}</p>
                <p className="text-xs text-foreground mt-1">{item.event}</p>
                <p className="text-xs text-muted-foreground font-serif mt-1" dir="rtl">{item.eventAr}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{t('heritage_detail.related_content')}</h3>
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
        <button className="flex-1 py-3 px-4 bg-card border border-border text-foreground rounded-2xl font-medium flex items-center justify-center gap-2">
          <ShareIcon className="w-5 h-5" />
          {t('heritage_detail.share')}
        </button>
        <button onClick={() => navigate('itinerary')} className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-medium flex items-center justify-center gap-2">
          <PlayIcon className="w-5 h-5" />
          {t('heritage_detail.plan_visit')}
        </button>
      </div>
    </div>
  )
}
