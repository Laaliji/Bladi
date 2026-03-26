"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { getHeritageDetail } from '@/lib/heritage-data'
import { ChevronLeftIcon, ShareIcon, BookmarkIcon, PlayIcon, Volume2Icon, CameraIcon, ChevronRightIcon } from '../icons'
import { useNavigation } from '../navigation-provider'

interface HeritageDetailScreenProps {
  isDark?: boolean
}

export function HeritageDetailScreen({ isDark }: HeritageDetailScreenProps) {
  void isDark
  const { goBack, navigate, selectedHeritageId } = useNavigation()
  const data = getHeritageDetail(selectedHeritageId)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [saved, setSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Fallback data if nothing selected
  const title    = data?.title    ?? 'Heritage Site'
  const titleAr  = data?.titleAr  ?? ''
  const desc     = data?.description ?? 'Explore the rich cultural heritage of Morocco.'
  const images   = data?.images   ?? ['https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&h=600&fit=crop']
  const quote    = data?.pullQuote   ?? ''
  const quoteEn  = data?.pullQuoteEn ?? ''
  const timeline = data?.timeline ?? []

  const handleListenStory = () => {
    navigate('voice-ai')
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Immersive media viewer */}
      <div className="relative h-[320px] flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        />
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

        {/* Image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn("h-2 rounded-full transition-all", index === currentImageIndex ? "bg-accent w-6" : "bg-white/50 w-2")}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {titleAr && <h2 className="text-xl font-serif text-accent" dir="rtl">{titleAr}</h2>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pt-4 pb-28 space-y-6">
        {/* Listen Story CTA */}
        <button
          onClick={handleListenStory}
          className={cn(
            "w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all",
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
          <p className="text-foreground leading-relaxed text-sm">{desc}</p>
        </div>

        {quote && (
          <blockquote className="relative py-6 px-4 bg-accent/10 rounded-2xl border-l-4 border-accent">
            <p className="text-lg font-serif text-accent leading-relaxed text-center" dir="rtl">{quote}</p>
            {quoteEn && <p className="text-sm text-muted-foreground mt-2 text-center italic">{quoteEn}</p>}
          </blockquote>
        )}

        {timeline.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Historical Timeline</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {timeline.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-32 p-3 bg-card rounded-2xl border border-border text-center">
                  <p className="text-xl font-bold text-primary">{item.year}</p>
                  <p className="text-xs text-foreground mt-1">{item.event}</p>
                  <p className="text-xs text-muted-foreground font-serif mt-1" dir="rtl">{item.eventAr}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related images */}
        {images.length > 1 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Gallery</h3>
              <button className="text-sm text-accent font-medium flex items-center gap-1">
                View all <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={cn(
                    "flex-shrink-0 w-36 rounded-2xl overflow-hidden bg-card border-2 transition-all",
                    i === currentImageIndex ? "border-accent" : "border-border"
                  )}
                >
                  <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-8 flex gap-3">
        <button className="flex-1 py-3 px-4 bg-card border border-border text-foreground rounded-2xl font-medium flex items-center justify-center gap-2">
          <ShareIcon className="w-5 h-5" />
          Share
        </button>
        <button onClick={() => navigate('itinerary')} className="flex-1 py-3 px-4 bg-primary text-primary-foreground rounded-2xl font-medium flex items-center justify-center gap-2">
          <PlayIcon className="w-5 h-5" />
          Plan Visit
        </button>
      </div>
    </div>
  )
}
