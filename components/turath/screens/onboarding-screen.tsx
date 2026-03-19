"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { LANGUAGES, INTERESTS } from '@/lib/turath-types'
import { CheckIcon, ChevronRightIcon } from '../icons'

interface OnboardingScreenProps {
  onComplete?: () => void
  isDark?: boolean
}

export function OnboardingScreen({ onComplete, isDark }: OnboardingScreenProps) {
  void isDark // dark mode handled by parent container
  const [step, setStep] = useState<'splash' | 'language' | 'interests'>('splash')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  if (step === 'splash') {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 pt-12 pb-8 zellige-pattern">
        {/* Animated zellige pattern background */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.15'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg">
            <svg className="w-14 h-14 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          {/* App name */}
          <h1 className="text-4xl font-bold text-foreground mb-2">Turath</h1>
          <h2 className="text-3xl font-serif text-accent mb-4" dir="rtl">تراث</h2>
          
          <p className="text-center text-muted-foreground text-sm mb-12 max-w-[240px]">
            Explore Morocco&apos;s rich cultural heritage and artisan traditions
          </p>

          {/* Start button */}
          <button
            onClick={() => setStep('language')}
            className="w-full max-w-[280px] py-4 px-6 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Partner logos */}
        <div className="absolute bottom-24 left-0 right-0 flex items-center justify-center gap-6 opacity-40">
          <span className="text-xs text-muted-foreground">Supported by</span>
        </div>
      </div>
    )
  }

  if (step === 'language') {
    return (
      <div className="h-full flex flex-col pt-16 px-6 pb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose your language</h2>
        <p className="text-sm text-muted-foreground mb-6">Select your preferred language</p>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                  selectedLanguage === lang.code
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card hover:border-accent/50"
                )}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-medium text-sm text-foreground">{lang.name}</p>
                  <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                </div>
                {selectedLanguage === lang.code && (
                  <CheckIcon className="w-5 h-5 text-accent ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStep('interests')}
          disabled={!selectedLanguage}
          className={cn(
            "w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all mt-4",
            selectedLanguage
              ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Continue
        </button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col pt-16 px-6 pb-8">
      <h2 className="text-2xl font-bold text-foreground mb-2">What interests you?</h2>
      <p className="text-sm text-muted-foreground mb-6">Select topics you want to explore</p>

      <div className="flex-1 flex flex-col gap-3">
        {INTERESTS.map((interest) => (
          <button
            key={interest.id}
            onClick={() => toggleInterest(interest.id)}
            className={cn(
              "flex items-center justify-between p-5 rounded-2xl border-2 transition-all",
              selectedInterests.includes(interest.id)
                ? "border-accent bg-accent/10"
                : "border-border bg-card hover:border-accent/50"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                selectedInterests.includes(interest.id) ? "bg-accent" : "bg-muted"
              )}>
                <InterestIcon interest={interest.id} selected={selectedInterests.includes(interest.id)} />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{interest.label}</p>
                <p className="text-sm text-muted-foreground font-serif" dir="rtl">{interest.labelAr}</p>
              </div>
            </div>
            {selectedInterests.includes(interest.id) && (
              <CheckIcon className="w-6 h-6 text-accent" />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onComplete}
        disabled={selectedInterests.length === 0}
        className={cn(
          "w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all mt-4 flex items-center justify-center gap-2",
          selectedInterests.length > 0
            ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        <span>Start Exploring</span>
        <span className="font-serif" dir="rtl">ابدأ الاستكشاف</span>
      </button>
    </div>
  )
}

function InterestIcon({ interest, selected }: { interest: string; selected: boolean }) {
  const color = selected ? "text-accent-foreground" : "text-muted-foreground"
  
  switch (interest) {
    case 'tourism':
      return (
        <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="10" r="3" />
          <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
        </svg>
      )
    case 'handicrafts':
      return (
        <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case 'history':
      return (
        <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M4 21V10.5M20 21V10.5" />
        </svg>
      )
    case 'gastronomy':
      return (
        <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      )
    case 'music':
      return (
        <svg className={cn("w-6 h-6", color)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )
    default:
      return null
  }
}
