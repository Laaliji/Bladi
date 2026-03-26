"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { getHeritageDetail } from '@/lib/heritage-data'
import { ChatMessage } from '@/lib/turath-types'
import { MicIcon, KeyboardIcon, GlobeIcon, ChevronLeftIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

interface VoiceAIGuideScreenProps {
  isDark?: boolean
}

export function VoiceAIGuideScreen({ isDark }: VoiceAIGuideScreenProps) {
  void isDark
  const { t, locale } = useTranslation()
  const { goBack, selectedHeritageId, selectedCityId } = useNavigation()

  // Resolve heritage data from context
  const heritage = getHeritageDetail(selectedHeritageId)

  const cityName  = heritage?.city   ?? selectedCityId ?? t('common.country_name', 'Morocco')
  const siteName  = heritage?.title  ?? t('common.app_subtitle', 'Moroccan Heritage')
  const heroImage = heritage?.images?.[0] ?? null
  const narration = heritage?.aiNarration ?? t('voice_ai.welcome_msg', "Marhaba! I'm your Turath guide. Ask me anything about Morocco's culture, history, or heritage sites. You can speak or type your questions.")
  const suggestedQuestions = heritage?.suggestedQuestions ?? [
    t('voice_ai.tag_tell_me', 'Tell me about this site'),
    t('voice_ai.tag_background', 'Historical background'),
    t('voice_ai.tag_must_sees', 'What are the must-sees?'),
    t('voice_ai.tag_traditions', 'Local traditions here'),
  ]

  const buildInitialMessages = (): ChatMessage[] => [
    {
      id: '1',
      role: 'assistant',
      content: narration,
      timestamp: new Date(),
      tags: heritage?.tags ?? [t('voice_ai.tag_welcome', 'Welcome'), locale === 'ar' ? 'ترحيب' : t('voice_ai.tag_welcome', 'Welcome')],
    },
  ]

  const [messages, setMessages] = useState<ChatMessage[]>(buildInitialMessages)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [inputText, setInputText] = useState('')

  // Reset conversation when the selected heritage changes
  useEffect(() => {
    setMessages(buildInitialMessages())
    setIsListening(false)
    setIsSpeaking(false)
    setShowKeyboard(false)
    setInputText('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHeritageId])

  useEffect(() => {
    if (isSpeaking) {
      const timer = setTimeout(() => setIsSpeaking(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isSpeaking])

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false)
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: `Tell me more about ${siteName}`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, userMessage])
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: heritage?.description ?? `${siteName} is one of Morocco's most treasured cultural landmarks, steeped in centuries of history and craftsmanship.`,
          timestamp: new Date(),
          tags: heritage?.tags ?? ['Morocco', 'Heritage'],
        }
        setMessages(prev => [...prev, aiMessage])
        setIsSpeaking(true)
      }, 1500)
    } else {
      setIsListening(true)
    }
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setShowKeyboard(false)
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Great question about ${siteName}! ${heritage?.description ?? "Morocco has a rich cultural heritage spanning thousands of years. Let me tell you more about this specific topic..."}`,
        timestamp: new Date(),
        tags: heritage?.tags ?? ['Culture', 'History'],
      }
      setMessages(prev => [...prev, aiMessage])
      setIsSpeaking(true)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col bg-[#0F0F0F] dark">
      {/* Hero image strip */}
      {heroImage && (
        <div
          className="flex-shrink-0 h-28 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 to-[#0F0F0F]" />
          {/* Site name overlay */}
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-xs text-[#C9A84C] font-medium tracking-widest uppercase">{cityName}</p>
            <h1 className="text-lg font-bold text-[#F5F0E8] leading-tight">{siteName}</h1>
          </div>
          {/* Back button */}
          <button
            onClick={goBack}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#0F0F0F]/60 flex items-center justify-center"
            aria-label="Go back"
          >
            <ChevronLeftIcon className="w-5 h-5 text-[#F5F0E8]" />
          </button>
          <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0F0F0F]/60 flex items-center justify-center">
            <GlobeIcon className="w-5 h-5 text-[#F5F0E8]" />
          </button>
        </div>
      )}

      {/* Header (no hero fallback) */}
      {!heroImage && (
        <div className="pt-12 px-4 pb-4 flex items-center justify-between">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-[#1E1C1A] flex items-center justify-center" aria-label="Go back">
            <ChevronLeftIcon className="w-5 h-5 text-[#F5F0E8]" />
          </button>
          <div className="text-center">
            <p className="text-xs text-[#C9A84C] tracking-widest uppercase">{cityName}</p>
            <h1 className="text-sm font-semibold text-[#F5F0E8]">{siteName}</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#1E1C1A] flex items-center justify-center">
            <GlobeIcon className="w-5 h-5 text-[#F5F0E8]" />
          </button>
        </div>
      )}

      {/* Voice visualizer */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center py-6">
        <div className="relative">
          <div className={cn("absolute inset-0 rounded-full border-4 border-[#C9A84C] transition-all duration-500", isSpeaking && "gold-pulse")} />
          <div className={cn("relative w-28 h-28 rounded-full bg-[#1E1C1A] flex items-center justify-center", isListening && "ring-4 ring-[#C1121F]/50")}>
            <div className="flex items-center gap-1 h-8">
              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                <div
                  key={i}
                  className={cn("w-1.5 rounded-full transition-all duration-200", isSpeaking || isListening ? "bg-[#C9A84C]" : "bg-[#3A3836]")}
                  style={{ height: isSpeaking || isListening ? `${h * 6}px` : `${h * 3}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-[#A0A0A0] mt-3">
          {isListening ? t('voice_ai.status_listening', 'Listening...') : isSpeaking ? t('voice_ai.status_speaking', 'Speaking...') : t('voice_ai.status_tap_story', 'Tap the mic to hear the story')}
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-3", message.role === 'user' && "flex-row-reverse")}>
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {heroImage ? (
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
                  ) : (
                    <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>
              )}
              <div className={cn("flex-1 rounded-2xl p-4 max-w-[80%]", message.role === 'assistant' ? "bg-[#1E1C1A]" : "bg-[#C1121F] ml-auto")}>
                <p className="text-sm text-[#F5F0E8] leading-relaxed">{message.content}</p>
                {message.tags && message.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-[#C9A84C]/20 text-[#C9A84C] text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested questions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInputText(q)}
              className="flex-shrink-0 px-4 py-2 bg-[#1E1C1A] rounded-2xl border border-[#3A3836] text-sm text-[#F5F0E8] hover:border-[#C9A84C] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2">
        {showKeyboard ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('voice_ai.type_placeholder', 'Type your question...')}
              className="flex-1 py-3 px-4 bg-[#1E1C1A] border border-[#3A3836] rounded-2xl text-sm text-[#F5F0E8] placeholder:text-[#6B6B6B] outline-none focus:border-[#C9A84C]"
              autoFocus
            />
            <button onClick={handleSendMessage} className="w-12 h-12 rounded-2xl bg-[#C1121F] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setShowKeyboard(true)} className="w-12 h-12 rounded-full bg-[#1E1C1A] flex items-center justify-center">
              <KeyboardIcon className="w-5 h-5 text-[#F5F0E8]" />
            </button>
            <button
              onClick={handleMicClick}
              className={cn("w-16 h-16 rounded-full flex items-center justify-center transition-all", isListening ? "bg-[#C1121F] scale-110" : "bg-[#C9A84C]")}
            >
              <MicIcon className={cn("w-7 h-7", isListening ? "text-white" : "text-[#1A1A1A]")} />
            </button>
            <button className="w-12 h-12 rounded-full bg-[#1E1C1A] flex items-center justify-center">
              <GlobeIcon className="w-5 h-5 text-[#F5F0E8]" />
            </button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
