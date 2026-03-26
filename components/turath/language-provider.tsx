"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import frTranslations from '@/locales/fr.json'
import arTranslations from '@/locales/ar.json'
import enTranslations from '@/locales/en.json'
import tzmTranslations from '@/locales/tzm.json'

type Locale = 'fr' | 'ar' | 'en' | 'tzm'

interface TranslationData {
  [key: string]: any
}

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, defaultValue?: string) => string
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Locale, TranslationData> = {
  fr: frTranslations,
  ar: arTranslations,
  en: enTranslations,
  tzm: tzmTranslations,
}

function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key // Return key as fallback
    }
  }
  
  return typeof value === 'string' ? value : key
}

function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' || locale === 'tzm' ? 'rtl' : 'ltr'
}

function detectBrowserLanguage(): Locale {
  if (typeof window === 'undefined') return 'fr'
  
  const browserLang = navigator.language.split('-')[0].toLowerCase()
  const supportedLocales: Locale[] = ['fr', 'ar', 'en', 'tzm']
  
  if (supportedLocales.includes(browserLang as Locale)) {
    return browserLang as Locale
  }
  
  return 'fr' // Default to French
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    // Try to get saved locale from localStorage
    const savedLocale = localStorage.getItem('app_locale') as Locale | null
    
    if (savedLocale && ['fr', 'ar', 'en', 'tzm'].includes(savedLocale)) {
      setLocaleState(savedLocale)
    } else {
      // Auto-detect browser language
      const detectedLocale = detectBrowserLanguage()
      setLocaleState(detectedLocale)
    }
  }, [])

  useEffect(() => {
    // Update localStorage when locale changes
    localStorage.setItem('app_locale', locale)
    
    // Update HTML attributes
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
      document.documentElement.dir = getDirection(locale)
      
      // Update body dir attribute for RTL support
      if (getDirection(locale) === 'rtl') {
        document.body.classList.add('rtl-layout')
      } else {
        document.body.classList.remove('rtl-layout')
      }
    }
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
  }

  const t = (key: string, defaultValue?: string): string => {
    const translation = getTranslation(locale, key)
    return translation === key && defaultValue ? defaultValue : translation
  }

  const value: LanguageContextType = {
    locale,
    setLocale,
    t,
    dir: getDirection(locale),
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Default context for SSR
const defaultContext: LanguageContextType = {
  locale: 'fr',
  setLocale: () => {},
  t: (key: string, defaultValue?: string) => defaultValue || key,
  dir: 'ltr',
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  
  // Return default context during SSR, actual context on client
  return context || defaultContext
}
