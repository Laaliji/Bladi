"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

const NARRATION = `مرحباً بك في بلادي
رفيقك في اكتشاف تراث المغرب العريق
من جبال الأطلس إلى صحراء درعة
كل مدينة تحكي قصة، وكل حجر يروي تاريخاً
هيا بنا نبدأ الرحلة`

interface AnimatedAvatarProps {
  src?: string
  audioSrc?: string
  isDark?: boolean
}

export function AnimatedAvatar({
  src = '/avatar.png',
  audioSrc = '/ar.mp3',
  isDark = true,
}: AnimatedAvatarProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [showBubble,  setShowBubble]  = useState(false)
  const [textIndex,   setTextIndex]   = useState(0)
  const [typingDone,  setTypingDone]  = useState(false)

  const avatarControls = useAnimation()
  const glowControls   = useAnimation()
  const audioRef       = useRef<HTMLAudioElement | null>(null)
  const typingRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const charRef        = useRef(0)

  const displayedText = NARRATION.slice(0, textIndex)
  const isTyping      = textIndex > 0 && !typingDone

  useEffect(() => {
    // Avatar springs in
    avatarControls.start({
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 160, damping: 18, delay: 0.4 },
    })

    // Glow pulse
    glowControls.start({
      opacity: [0.2, 0.55, 0.2],
      scale: [1, 1.1, 1],
      transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
    })

    const t1 = setTimeout(() => setShowBubble(true), 1100)
    const t2 = setTimeout(() => { startTyping(); startAudio() }, 1500)

    return () => {
      clearTimeout(t1); clearTimeout(t2)
      stopTyping(); audioRef.current?.pause()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function startTyping() {
    charRef.current = 0
    function tick() {
      charRef.current++
      setTextIndex(charRef.current)
      if (charRef.current < NARRATION.length) {
        typingRef.current = setTimeout(tick, 38)
      } else {
        setTypingDone(true)
        // Audio plays to natural end — do NOT pause here
      }
    }
    typingRef.current = setTimeout(tick, 38)
  }
  function stopTyping() {
    if (typingRef.current) clearTimeout(typingRef.current)
  }
  function startAudio() {
    const audio = new Audio(audioSrc)
    audioRef.current = audio
    audio.play().catch(() => {})
  }

  async function dismiss() {
    stopTyping(); audioRef.current?.pause()
    await avatarControls.start({
      y: 300, opacity: 0,
      transition: { type: 'spring', stiffness: 200, damping: 22, duration: 0.45 },
    })
    setIsDismissed(true)
  }

  if (isDismissed) return null

  return (
    // Overlay covers bottom half of phone frame
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        zIndex: 65,
        display: 'flex',
        alignItems: 'flex-end',
        pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(6,4,2,0.78) 0%, transparent 100%)',
      }}
    >
      {/* ── Avatar ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ y: 320, opacity: 0 }}
        animate={avatarControls}
        onAnimationComplete={() => {
          avatarControls.start({
            y: [0, -7, 0],
            transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          })
        }}
        style={{
          position: 'relative',
          width: 240,
          height: 240,
          flexShrink: 0,
          marginLeft: -10,
          marginBottom: -6,
        }}
      >
        {/* Gold glow */}
        <motion.div
          animate={glowControls}
          initial={{ opacity: 0.2, scale: 1 }}
          style={{
            position: 'absolute',
            inset: -14,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.38) 0%, rgba(201,168,76,0.10) 55%, transparent 75%)',
            pointerEvents: 'none',
          }}
        />
        <img
          src={src}
          alt="Guide"
          draggable={false}
          style={{
            width: 240,
            height: 240,
            objectFit: 'contain',
            background: 'transparent',
            mixBlendMode: 'normal',
            display: 'block',
            position: 'relative',
            zIndex: 1,
          }}
        />
      </motion.div>

      {/* ── Speech Bubble ────────────────────────────────────────── */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key="bubble"
            initial={{ scale: 0.82, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.82, opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: 'relative',
              flex: 1,
              height: 240,
              marginLeft: 8,
              marginRight: 10,
              marginBottom: 76,
              background: 'rgba(10, 8, 6, 0.93)',
              border: '1px solid rgba(201, 168, 76, 0.55)',
              borderRadius: '18px 18px 18px 5px',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              padding: '14px 16px 14px 14px',
              boxSizing: 'border-box',
              overflow: 'hidden',
              pointerEvents: 'all',
              boxShadow: '0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)',
            }}
          >
            {/* Gold top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 20, right: 20, height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)',
              borderRadius: '0 0 4px 4px',
            }} />

            {/* Close button */}
            <button
              onClick={dismiss}
              style={{
                position: 'absolute', top: 10, right: 12,
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '50%',
                color: '#C9A84C',
                fontSize: 11, fontWeight: 700,
                width: 20, height: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0, zIndex: 2,
              }}
            >✕</button>

            {/* Label */}
            <div style={{
              fontSize: 8, fontWeight: 700, letterSpacing: '0.12em',
              color: 'rgba(201,168,76,0.7)', textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              مرشدك السياحي
            </div>

            {/* Arabic text */}
            <div style={{ height: 'calc(100% - 54px)', overflow: 'hidden' }}>
              <p
                dir="rtl"
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: '#FAF7F0',
                  whiteSpace: 'pre-line',
                  textAlign: 'right',
                  fontFamily: 'inherit',
                  fontWeight: 400,
                }}
              >
                {displayedText}
                {typingDone && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    style={{
                      display: 'inline-block', width: 2, height: '0.9em',
                      backgroundColor: '#C9A84C', marginRight: 2, verticalAlign: 'middle',
                    }}
                  />
                )}
              </p>
            </div>

            {/* Sound wave — bottom right */}
            <div style={{
              position: 'absolute', bottom: 10, right: 14,
              display: 'flex', alignItems: 'flex-end', gap: 3,
            }}>
              <AnimatePresence>
                {isTyping && [
                  [4, 14, 4],
                  [10, 4, 10],
                  [6, 14, 6],
                ].map((heights, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 4 }}
                    animate={{ height: heights }}
                    exit={{ height: 4 }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                    style={{
                      width: 3, borderRadius: 2,
                      background: '#C9A84C',
                      boxShadow: '0 0 5px rgba(201,168,76,0.65)',
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
