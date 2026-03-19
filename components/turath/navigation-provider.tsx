"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type ScreenId =
  | 'onboarding'
  | 'home-map'
  | 'region-detail'
  | 'heritage-detail'
  | 'itinerary'
  | 'voice-ai'
  | 'artisan-profile'
  | 'marketplace'
  | 'checkout'
  | 'profile'
  | 'challenges'
  | 'settings'

export type TransitionDirection = 'forward' | 'backward'

interface NavigationContextType {
  currentScreen: ScreenId
  previousScreen: ScreenId | null
  direction: TransitionDirection
  isDark: boolean
  setIsDark: (v: boolean) => void
  navigate: (screen: ScreenId) => void
  goBack: () => void
  canGoBack: boolean
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<ScreenId[]>(['onboarding'])
  const [previousScreen, setPreviousScreen] = useState<ScreenId | null>(null)
  const [direction, setDirection] = useState<TransitionDirection>('forward')
  const [isDark, setIsDark] = useState(false)

  const currentScreen = stack[stack.length - 1]

  const navigate = useCallback((screen: ScreenId) => {
    setDirection('forward')
    setPreviousScreen(stack[stack.length - 1])
    setStack(prev => [...prev, screen])
  }, [stack])

  const goBack = useCallback(() => {
    if (stack.length <= 1) return
    setDirection('backward')
    setPreviousScreen(stack[stack.length - 1])
    setStack(prev => prev.slice(0, -1))
  }, [stack])

  return (
    <NavigationContext.Provider value={{
      currentScreen,
      previousScreen,
      direction,
      isDark,
      setIsDark,
      navigate,
      goBack,
      canGoBack: stack.length > 1,
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
  return ctx
}
