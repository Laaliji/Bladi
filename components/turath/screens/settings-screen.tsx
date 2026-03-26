"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { LANGUAGES } from '@/lib/turath-types'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, GlobeIcon, BellIcon, UserIcon } from '../icons'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

interface SettingsScreenProps {
  isDark?: boolean
}

export function SettingsScreen({ isDark }: SettingsScreenProps) {
  void isDark
  const { goBack } = useNavigation()
  const { t, locale, setLocale } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(locale)
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
      <div className="pt-12 px-4 pb-4 flex items-center gap-3 border-b border-border bg-card">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center" aria-label="Go back">
          <ChevronLeftIcon className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">{t('settings.settings')}</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Profile */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">{t('profile.my_profile')}</h2>
          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
            <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
              <UserIcon className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">{t('demo_user.name')}</p>
              <p className="text-sm text-muted-foreground">{t('settings.profile_edit')}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Language */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">{t('settings.language')}</h2>
          <button onClick={() => setShowLanguageModal(true)} className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <GlobeIcon className="w-5 h-5 text-secondary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">{t('settings.app_language')}</p>
              <p className="text-sm text-muted-foreground">{LANGUAGES.find(l => l.code === selectedLanguage)?.name || 'English'}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Notifications */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">{t('settings.notifications')}</h2>
          <div className="space-y-2">
            {[
              { id: 'newContent' as const, label: t('settings.new_content'), description: t('settings.new_content_desc') },
              { id: 'challenges' as const, label: t('challenges.challenges'), description: t('settings.challenges_desc') },
              { id: 'artisanUpdates' as const, label: t('settings.artisan_updates'), description: t('settings.artisan_updates_desc') },
              { id: 'promotions' as const, label: t('settings.promotions'), description: t('settings.promotions_desc') },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <button onClick={() => toggleNotification(item.id)} className={cn("relative w-12 h-7 rounded-full transition-colors", notifications[item.id] ? "bg-secondary" : "bg-muted")}>
                  <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform", notifications[item.id] ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Accessibility */}
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">{t('settings.accessibility')}</h2>
          <div className="space-y-2">
            <div className="p-4 bg-card rounded-2xl border border-border">
              <p className="font-medium text-foreground mb-3">{t('settings.text_size')}</p>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button key={size} onClick={() => setAccessibility(prev => ({ ...prev, textSize: size }))} className={cn("flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all", accessibility.textSize === size ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                    {t(`settings.${size}`)}
                  </button>
                ))}
              </div>
            </div>
            {[
              { key: 'highContrast' as const, label: t('settings.high_contrast'), desc: t('settings.high_contrast_desc') },
              { key: 'audioDescriptions' as const, label: t('settings.audio_desc'), desc: t('settings.audio_desc_desc') },
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <button onClick={() => setAccessibility(prev => ({ ...prev, [item.key]: !prev[item.key] }))} className={cn("relative w-12 h-7 rounded-full transition-colors", accessibility[item.key] ? "bg-secondary" : "bg-muted")}>
                  <div className={cn("absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform", accessibility[item.key] ? "translate-x-6" : "translate-x-1")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">{t('settings.about')}</h2>
          <div className="p-4 bg-card rounded-2xl border border-border space-y-4">
            <p className="text-sm text-muted-foreground text-center">{t('settings.developed_by')}</p>
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
            <p className="text-xs text-center text-muted-foreground">{t('settings.version_info')}</p>
          </div>
        </div>
      </div>

      {/* Language modal */}
      {showLanguageModal && (
        <div className="absolute inset-0 z-50 bg-black/50 flex items-end">
          <div className="w-full bg-background rounded-t-3xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">{t('settings.select_language')}</h2>
              <button onClick={() => setShowLanguageModal(false)} className="text-accent font-medium">{t('settings.done')}</button>
            </div>
            <div className="overflow-y-auto max-h-[50vh] p-4">
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <button key={lang.code} onClick={() => { setSelectedLanguage(lang.code as typeof locale); setShowLanguageModal(false) }} className={cn("flex items-center gap-3 p-4 rounded-2xl border-2 transition-all", selectedLanguage === lang.code ? "border-accent bg-accent/10" : "border-border bg-card")}>
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
