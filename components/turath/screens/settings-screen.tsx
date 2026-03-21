"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { LANGUAGES } from '@/lib/turath-types'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, GlobeIcon, BellIcon, UserIcon } from '../icons'
import { useNavigation } from '../navigation-provider'

interface SettingsScreenProps {
  isDark?: boolean
}

export function SettingsScreen({ isDark }: SettingsScreenProps) {
  void isDark
  const { goBack } = useNavigation()
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

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="h-full flex flex-col bg-background relative">
      <div className="pt-12 px-4 pb-4 flex items-center gap-3 border-b border-[#F4C430]/20 bg-[#FAF7F0] dark:bg-card relative overflow-hidden shadow-sm">
        <div className="absolute inset-0 arabesque-pattern opacity-10 pointer-events-none" />
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-background flex items-center justify-center relative z-10 shadow-sm hover:scale-105 transition-transform" aria-label="Go back">
          <ChevronLeftIcon className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-2xl font-bold font-serif text-foreground relative z-10">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Profile */}
        <div className="p-4 border-b border-border">
          <h2 className="text-[11px] font-bold font-serif text-[#F4C430] tracking-[0.15em] mb-4">PROFILE</h2>
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

        {/* Language */}
        <div className="p-4 border-b border-border">
          <h2 className="text-[11px] font-bold font-serif text-[#F4C430] tracking-[0.15em] mb-4">LANGUAGE</h2>
          <button onClick={() => setShowLanguageModal(true)} className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <GlobeIcon className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">App Language</p>
              <p className="text-sm text-muted-foreground">{LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'English'}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Notifications */}
        <div className="p-4 border-b border-border">
          <h2 className="text-[11px] font-bold font-serif text-[#F4C430] tracking-[0.15em] mb-4">NOTIFICATIONS</h2>
          <div className="space-y-2">
            {[
              { id: 'newContent' as const, label: 'New Content', description: 'Heritage sites, stories, and guides' },
              { id: 'challenges' as const, label: 'Challenges', description: 'Progress updates and new challenges' },
              { id: 'artisanUpdates' as const, label: 'Artisan Updates', description: 'New products from followed artisans' },
              { id: 'promotions' as const, label: 'Promotions', description: 'Discounts and special offers' },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <button onClick={() => toggleNotification(item.id)} className={cn("relative w-12 h-7 rounded-full transition-colors", notifications[item.id] ? "bg-[#2A52BE]" : "bg-muted")}>
                  <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform", notifications[item.id] ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility */}
        <div className="p-4 border-b border-border">
          <h2 className="text-[11px] font-bold font-serif text-[#F4C430] tracking-[0.15em] mb-4">ACCESSIBILITY</h2>
          <div className="space-y-2">
            <div className="p-4 bg-card rounded-2xl border border-border">
              <p className="font-medium text-foreground mb-3">Text Size</p>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button key={size} onClick={() => setAccessibility(prev => ({ ...prev, textSize: size }))} className={cn("flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all", accessibility.textSize === size ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {[
              { key: 'highContrast' as const, label: 'High Contrast', desc: 'Increase visual contrast' },
              { key: 'audioDescriptions' as const, label: 'Audio Descriptions', desc: 'Spoken descriptions for visual content' },
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <button onClick={() => setAccessibility(prev => ({ ...prev, [item.key]: !prev[item.key] }))} className={cn("relative w-12 h-7 rounded-full transition-colors", accessibility[item.key] ? "bg-[#2A52BE]" : "bg-muted")}>
                  <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform", accessibility[item.key] ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="p-4">
          <h2 className="text-[11px] font-bold font-serif text-[#F4C430] tracking-[0.15em] mb-4">ABOUT</h2>
          <div className="p-4 bg-card rounded-2xl border border-border space-y-4">
            <p className="text-sm text-muted-foreground text-center">Turath is developed in partnership with:</p>
            <div className="flex items-center justify-center gap-6 py-2">
              {[{ abbr: 'UNESCO', color: 'bg-blue-100 text-blue-600' }, { abbr: 'MC', color: 'bg-primary/10 text-primary' }, { abbr: 'CRI', color: 'bg-accent/20 text-accent' }].map((org) => (
                <div key={org.abbr} className="text-center">
                  <div className={cn("w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-1", org.color)}>
                    <span className="font-bold text-xs">{org.abbr}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{org.abbr}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground">Version 1.0.0 · Made with ❤️ in Morocco</p>
          </div>
        </div>
      </div>

      {/* Language modal */}
      {showLanguageModal && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full bg-background rounded-t-3xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Select Language</h2>
              <button onClick={() => setShowLanguageModal(false)} className="text-accent font-medium">Done</button>
            </div>
            <div className="overflow-y-auto max-h-[50vh] p-4">
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <button key={lang.code} onClick={() => { setSelectedLanguage(lang.code); setShowLanguageModal(false) }} className={cn("flex items-center gap-3 p-4 rounded-2xl border-2 transition-all", selectedLanguage === lang.code ? "border-accent bg-accent/10" : "border-border bg-card")}>
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left flex-1">
                      <p className="font-medium text-sm text-foreground">{lang.name}</p>
                      <p className="text-xs text-muted-foreground">{lang.nativeName}</p>
                    </div>
                    {selectedLanguage === lang.code && <CheckIcon className="w-5 h-5 text-accent" />}
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
