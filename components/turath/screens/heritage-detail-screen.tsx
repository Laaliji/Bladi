"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getHeritageDetail } from '@/lib/heritage-data'
import {
  ChevronLeftIcon,
  ShareIcon,
  BookmarkIcon,
  PlayIcon,
  Volume2Icon,
  CameraIcon,
  ChevronRightIcon
} from '../icons'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

interface HeritageDetailScreenProps {
  isDark?: boolean
}

export function HeritageDetailScreen({ isDark }: HeritageDetailScreenProps) {
  void isDark
  const { goBack, navigate, selectedHeritageId } = useNavigation()
  const { t } = useTranslation()
  
  const data = getHeritageDetail(selectedHeritageId)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Fallback data if nothing selected
  const title    = data?.title    ?? t('heritage_detail.fallback_title', 'Heritage Site')
  const titleAr  = data?.titleAr  ?? ''
  const desc     = data?.description ?? t('heritage_detail.fallback_desc', 'Explore the rich cultural heritage of Morocco.')
  const images   = data?.images   ?? ['https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&h=600&fit=crop']
  const quote    = data?.pullQuote   ?? ''
  const quoteEn  = data?.pullQuoteEn ?? ''
  const timeline = data?.timeline ?? []

  const handleListenStory = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setTimeout(() => navigate('voice-ai'), 1500)
    }
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-background">
      {/* Immersive media viewer */}
      <div className="relative h-[320px] flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="absolute top-12 left-4 right-4 flex items-center justify-between z-10">
          <button onClick={goBack} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center" aria-label="Go back">
            <ChevronLeftIcon className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            <button onClick={() => setSaved(!saved)} className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center" aria-label={saved ? "Unsave" : "Save"}>
              <BookmarkIcon className={cn("w-5 h-5", saved ? "text-accent fill-accent" : "text-white")} filled={saved} />
            </button>
            <button className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center" aria-label="Share">
              <ShareIcon className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center" aria-label="AR View">
              <CameraIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn("h-1.5 rounded-full transition-all", index === currentImageIndex ? "bg-accent w-5" : "bg-white/40 w-1.5")}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">{title}</h1>
          {titleAr && <h2 className="text-xl font-serif text-accent drop-shadow-sm" dir="rtl">{titleAr}</h2>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-28 space-y-6">
        {/* Listen Story CTA */}
        <button
          onClick={handleListenStory}
          className={cn(
            "w-full py-4 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-sm active:scale-[0.98]",
            isPlaying ? "bg-accent text-accent-foreground" : "bg-muted text-foreground border border-border"
          )}
        >
          {isPlaying ? (
            <>
              <div className="flex items-end gap-1 h-4">
                {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-current rounded-full animate-pulse" 
                    style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }} 
                  />
                ))}
              </div>
              <span className="font-bold text-sm tracking-wide uppercase">{t('heritage_detail.listening', 'Listening...')}</span>
            </>
          ) : (
            <>
              <Volume2Icon className="w-5 h-5 text-accent" />
              <span className="font-bold text-sm tracking-wide uppercase">{t('heritage_detail.hear_story', 'Hear the Story')}</span>
            </>
          )}
        </button>

        <div className="space-y-4">
          <p className="text-foreground/90 leading-relaxed text-[15px]">{desc}</p>
        </div>

        {quote && (
          <blockquote className="relative py-6 px-6 bg-accent/5 rounded-3xl border-l-[6px] border-accent/40 backdrop-blur-sm">
            <p className="text-lg font-serif text-accent leading-relaxed text-center italic" dir="rtl">"{quote}"</p>
            {quoteEn && <p className="text-sm text-muted-foreground mt-3 text-center font-medium opacity-80">— {quoteEn}</p>}
          </blockquote>
        )}

        {timeline.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full" />
              {t('heritage_detail.timeline_title', 'Historical Timeline')}
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {timeline.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-40 p-4 bg-card rounded-2xl border border-border/60 shadow-sm snap-start">
                  <p className="text-2xl font-black text-primary">{item.year}</p>
                  <p className="text-xs font-bold text-foreground mt-2 leading-tight">{item.event}</p>
                  <p className="text-[10px] text-muted-foreground font-serif mt-1.5" dir="rtl">{item.eventAr}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data?.suggestedQuestions && data.suggestedQuestions.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full" />
              {t('heritage_detail.explore_more', 'Explore More')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.suggestedQuestions.map((q, i) => (
                <button key={i} className="px-4 py-2 bg-muted/50 border border-border rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent pt-10 flex gap-3 z-20">
        <button className="flex-1 py-4 px-4 bg-card border border-border text-foreground rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.97] transition-all">
          <ShareIcon className="w-4 h-4" />
          {t('heritage_detail.share', 'Share')}
        </button>
        <button onClick={() => navigate('itinerary')} className="flex-1 py-4 px-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.97] transition-all">
          <PlayIcon className="w-4 h-4" />
          {t('heritage_detail.plan_visit', 'Plan Visit')}
        </button>
      </div>
    </div>
  )
}
