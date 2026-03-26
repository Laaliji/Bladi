"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChatMessage } from '@/lib/turath-types'
import { MicIcon, KeyboardIcon, GlobeIcon, ChevronLeftIcon } from '../icons'
import { BottomNavigation } from '../bottom-navigation'
import { useNavigation } from '../navigation-provider'
import { useTranslation } from '../language-provider'

interface VoiceAIGuideScreenProps {
  isDark?: boolean
}

const SUGGESTED_QUESTIONS = [
  { en: 'Tell me about the Battle of Dchira', ar: 'حدثني عن معركة الدشيرة' },
  { en: 'History of Hassan Tower', ar: 'تاريخ صومعة حسان' },
  { en: 'What is Zellige art?', ar: 'ما هو فن الزليج؟' },
  { en: 'Berber traditions', ar: 'التقاليد الأمازيغية' },
]

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: '1', role: 'assistant', content: "Marhaba! I'm your Turath guide. Ask me anything about Moroccan culture, history, or heritage sites. You can speak or type your questions.", timestamp: new Date(), tags: ['Welcome', 'ترحيب'] },
]

export function VoiceAIGuideScreen({ isDark }: VoiceAIGuideScreenProps) {
  void isDark
  const { goBack } = useNavigation()
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    if (isSpeaking) {
      const timer = setTimeout(() => setIsSpeaking(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isSpeaking])

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false)
      const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: 'Tell me about the Hassan Tower', timestamp: new Date() }
      setMessages(prev => [...prev, userMessage])
      setTimeout(() => {
        const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: "The Hassan Tower (صومعة حسان) is the minaret of an incomplete mosque in Rabat, Morocco. Construction began in 1195 under Almohad Caliph Yacoub al-Mansour. At 44 meters tall, it would have been the largest minaret in the world. It is now a UNESCO World Heritage Site.", timestamp: new Date(), tags: ['Rabat', 'Architecture', 'UNESCO'] }
        setMessages(prev => [...prev, aiMessage])
        setIsSpeaking(true)
      }, 1500)
    } else {
      setIsListening(true)
    }
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: inputText, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setShowKeyboard(false)
    setTimeout(() => {
      const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: "That's a great question! Morocco has a rich cultural heritage spanning thousands of years. Let me tell you more about this specific topic...", timestamp: new Date(), tags: ['Culture', 'History'] }
      setMessages(prev => [...prev, aiMessage])
      setIsSpeaking(true)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col bg-[#0F0F0F] dark">
      <div className="pt-12 px-4 pb-4 flex items-center justify-between">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-[#1E1C1A] flex items-center justify-center" aria-label="Go back">
          <ChevronLeftIcon className="w-5 h-5 text-[#F5F0E8]" />
        </button>
        <h1 className="text-lg font-semibold text-[#F5F0E8]">AI Guide</h1>
        <button className="w-10 h-10 rounded-full bg-[#1E1C1A] flex items-center justify-center">
          <GlobeIcon className="w-5 h-5 text-[#F5F0E8]" />
        </button>
      </div>

      {/* Voice visualizer */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center py-8">
        <div className="relative">
          <div className={cn("absolute inset-0 rounded-full border-4 border-[#C9A84C] transition-all duration-500", isSpeaking && "gold-pulse")} />
          <div className={cn("relative w-32 h-32 rounded-full bg-[#1E1C1A] flex items-center justify-center", isListening && "ring-4 ring-[#C1121F]/50")}>
            <div className="flex items-center gap-1 h-8">
              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                <div key={i} className={cn("w-1.5 rounded-full transition-all duration-200", isSpeaking || isListening ? "bg-[#C9A84C]" : "bg-[#3A3836]")} style={{ height: isSpeaking || isListening ? `${h * 6}px` : `${h * 3}px`, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-[#A0A0A0] mt-4">{isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap the mic to speak'}</p>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-3", message.role === 'user' && "flex-row-reverse")}>
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
              )}
              <div className={cn("flex-1 rounded-2xl p-4 max-w-[80%]", message.role === 'assistant' ? "bg-[#1E1C1A]" : "bg-[#C1121F] ml-auto")}>
                <p className="text-sm text-[#F5F0E8] leading-relaxed">{message.content}</p>
                {message.tags && message.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.tags.map((tag) => <span key={tag} className="px-2 py-0.5 bg-[#C9A84C]/20 text-[#C9A84C] text-xs rounded-full">{tag}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => setInputText(q.en)} className="flex-shrink-0 px-4 py-2 bg-[#1E1C1A] rounded-2xl border border-[#3A3836] text-sm text-[#F5F0E8] hover:border-[#C9A84C] transition-colors">
              {q.en}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2">
        {showKeyboard ? (
          <div className="flex gap-2">
            <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Type your question..." className="flex-1 py-3 px-4 bg-[#1E1C1A] border border-[#3A3836] rounded-2xl text-sm text-[#F5F0E8] placeholder:text-[#6B6B6B] outline-none focus:border-[#C9A84C]" autoFocus />
            <button onClick={handleSendMessage} className="w-12 h-12 rounded-2xl bg-[#C1121F] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => setShowKeyboard(true)} className="w-12 h-12 rounded-full bg-[#1E1C1A] flex items-center justify-center">
              <KeyboardIcon className="w-5 h-5 text-[#F5F0E8]" />
            </button>
            <button onClick={handleMicClick} className={cn("w-16 h-16 rounded-full flex items-center justify-center transition-all", isListening ? "bg-[#C1121F] scale-110" : "bg-[#C9A84C]")}>
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
