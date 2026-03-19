"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { LANGUAGES } from '@/lib/turath-types'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, GlobeIcon, BellIcon, UserIcon } from '../icons'

interface SettingsScreenProps {
  onBack?: () => void
  isDark?: boolean
}

export function SettingsScreen({ onBack, isDark }: SettingsScreenProps) {
  void isDark // dark mode via CSS .dark class
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [notifications, setNotifications] = useState({
    newContent: true,
    challenges: true,
    artisanUpdates: false,
    promotions: false,
  })
  const [accessibility, setAccessibility] = useState({
    textSize: 'medium',
    highContrast: false,
    audioDescriptions: true,
  })
  const [showLanguageModal, setShowLanguageModal] = useState(false)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="pt-12 px-4 pb-4 flex items-center gap-3 border-b border-border bg-card">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          aria-label="Go back"
        >
          <ChevronLeftIcon className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-8">
        {/* Profile section */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">PROFILE</h2>
          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
              <UserIcon className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">Alexandra Chen</p>
              <p className="text-sm text-muted-foreground">Edit profile</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Language section */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">LANGUAGE</h2>
          <button 
            onClick={() => setShowLanguageModal(true)}
            className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <GlobeIcon className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">App Language</p>
              <p className="text-sm text-muted-foreground">
                {LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'English'}
              </p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Notifications section */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">NOTIFICATIONS</h2>
          <div className="space-y-2">
            {[
              { id: 'newContent', label: 'New Content', description: 'Heritage sites, stories, and guides' },
              { id: 'challenges', label: 'Challenges', description: 'Progress updates and new challenges' },
              { id: 'artisanUpdates', label: 'Artisan Updates', description: 'New products from followed artisans' },
              { id: 'promotions', label: 'Promotions', description: 'Discounts and special offers' },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ 
                    ...prev, 
                    [item.id]: !prev[item.id as keyof typeof prev] 
                  }))}
                  className={cn(
                    "relative w-12 h-7 rounded-full transition-colors",
                    notifications[item.id as keyof typeof notifications]
                      ? "bg-secondary"
                      : "bg-muted"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform",
                    notifications[item.id as keyof typeof notifications]
                      ? "translate-x-6"
                      : "translate-x-1"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility section */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">ACCESSIBILITY</h2>
          <div className="space-y-2">
            {/* Text size */}
            <div className="p-4 bg-card rounded-2xl border border-border">
              <p className="font-medium text-foreground mb-3">Text Size</p>
              <div className="flex gap-2">
                {['small', 'medium', 'large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setAccessibility(prev => ({ ...prev, textSize: size }))}
                    className={cn(
                      "flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all",
                      accessibility.textSize === size
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* High contrast */}
            <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
              <div className="flex-1">
                <p className="font-medium text-foreground">High Contrast</p>
                <p className="text-sm text-muted-foreground">Increase visual contrast</p>
              </div>
              <button
                onClick={() => setAccessibility(prev => ({ ...prev, highContrast: !prev.highContrast }))}
                className={cn(
                  "relative w-12 h-7 rounded-full transition-colors",
                  accessibility.highContrast ? "bg-secondary" : "bg-muted"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform",
                  accessibility.highContrast ? "translate-x-6" : "translate-x-1"
                )} />
              </button>
            </div>

            {/* Audio descriptions */}
            <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
              <div className="flex-1">
                <p className="font-medium text-foreground">Audio Descriptions</p>
                <p className="text-sm text-muted-foreground">Spoken descriptions for visual content</p>
              </div>
              <button
                onClick={() => setAccessibility(prev => ({ ...prev, audioDescriptions: !prev.audioDescriptions }))}
                className={cn(
                  "relative w-12 h-7 rounded-full transition-colors",
                  accessibility.audioDescriptions ? "bg-secondary" : "bg-muted"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform",
                  accessibility.audioDescriptions ? "translate-x-6" : "translate-x-1"
                )} />
              </button>
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">ABOUT</h2>
          <div className="p-4 bg-card rounded-2xl border border-border space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Turath is developed in partnership with:
            </p>
            <div className="flex items-center justify-center gap-6 py-2">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 mx-auto flex items-center justify-center mb-1">
                  <span className="text-blue-600 font-bold text-xs">UNESCO</span>
                </div>
                <span className="text-xs text-muted-foreground">UNESCO</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-1">
                  <span className="text-primary font-bold text-xs">MC</span>
                </div>
                <span className="text-xs text-muted-foreground">Ministry</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 mx-auto flex items-center justify-center mb-1">
                  <span className="text-accent font-bold text-xs">CRI</span>
                </div>
                <span className="text-xs text-muted-foreground">CRI MS</span>
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Version 1.0.0 | Made with love in Morocco
            </p>
          </div>
        </div>
      </div>

      {/* Language modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full bg-background rounded-t-3xl max-h-[70%] overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Select Language</h2>
              <button 
                onClick={() => setShowLanguageModal(false)}
                className="text-muted-foreground"
              >
                Done
              </button>
            </div>
            <div className="overflow-y-auto max-h-[50vh] p-4">
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code)
                      setShowLanguageModal(false)
                    }}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                      selectedLanguage === lang.code
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card"
                    )}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left flex-1">
                      <p className="font-medium text-sm text-foreground">{lang.name}</p>
                      <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                    </div>
                    {selectedLanguage === lang.code && (
                      <CheckIcon className="w-5 h-5 text-accent" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
