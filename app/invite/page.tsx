'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useCallback, Suspense } from 'react'
import { decode } from '@/lib/encode'

function InvitePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const d = searchParams.get('d') ?? ''
  const data = decode(d)

  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const [noClicks, setNoClicks] = useState(0)

  const isKawaii = data?.theme === 'kawaii'

  const styles = {
    bg: isKawaii ? '#FFF0F5' : '#FDF5F0',
    primary: isKawaii ? '#FF6B9D' : '#8B1A3A',
    border: isKawaii ? '#FFB3D1' : '#C9856E',
    text: isKawaii ? '#2D0A1E' : '#1A0008',
    textLight: isKawaii ? '#7A3A5A' : '#5C2A35',
    card: isKawaii ? '#FFFFFF' : '#FFF8F5',
    font: isKawaii ? 'var(--font-kawaii), sans-serif' : 'var(--font-romantic), serif',
      }

  const moveNo = useCallback(() => {
    const margin = 140
    const x = margin + Math.random() * (window.innerWidth - margin * 2)
    const y = margin + Math.random() * (window.innerHeight - margin * 2)
    setNoPos({ x, y })
    setNoClicks(c => c + 1)
  }, [])

  const noMessages = isKawaii
    ? ['Non', 'Non merci', 'Vraiment non', 'Pitié non', 'Jamais', 'Nooooon']
    : ['Non', 'Je refuse', 'Non, merci', 'Certainement pas', 'Jamais', 'Hors de question']

  const noLabel = noMessages[Math.min(noClicks, noMessages.length - 1)]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFF0F5' }}>
        <p style={{ color: '#7A3A5A', fontFamily: 'var(--font-kawaii), sans-serif' }}>
          Lien invalide 😕
        </p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: styles.bg, fontFamily: styles.font }}
    >
      <div
        className="w-full max-w-md rounded-3xl shadow-lg p-8 flex flex-col gap-6 text-center"
        style={{ background: styles.card, border: `2px solid ${styles.border}` }}
      >
        <div className="text-5xl">{isKawaii ? '💌' : '🌹'}</div>

        <div>
          {data.partnerName && (
            <p className="text-lg font-bold mb-1" style={{ color: styles.primary }}>
              {isKawaii ? `Hey ${data.partnerName} ! 👋` : `Cher(e) ${data.partnerName},`}
            </p>
          )}
          <p className="text-sm font-semibold" style={{ color: styles.textLight }}>
            {data.name} t'invite...
          </p>
          <h1 className="text-2xl font-bold mt-2" style={{ color: styles.text }}>
            {isKawaii ? 'Veux-tu sortir avec moi ? 🥺' : 'Acceptes-tu de sortir avec moi ?'}
          </h1>
        </div>

        <div
          className="rounded-2xl p-5 italic"
          style={{ background: styles.bg, border: `1px solid ${styles.border}`, color: styles.textLight }}
        >
          <p className="text-lg leading-relaxed">
            {isKawaii ? '❝ ' : '"'}{data.message}{isKawaii ? ' ❞' : '"'}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push(`/invite/restaurant?d=${d}`)}
            className="rounded-2xl px-8 py-3 font-bold text-white text-lg transition-all shadow-md hover:shadow-lg hover:scale-105"
            style={{ background: styles.primary }}
          >
            {isKawaii ? 'OUI ! 💕' : 'Oui, avec plaisir'}
          </button>

          <button
            onMouseEnter={moveNo}
            onTouchStart={moveNo}
            className="rounded-2xl px-6 py-3 font-semibold text-sm transition-all"
            style={{
              border: `2px solid ${styles.border}`,
              color: styles.textLight,
              background: styles.card,
              ...(noPos
                ? {
                    position: 'fixed',
                    left: noPos.x,
                    top: noPos.y,
                    zIndex: 50,
                    transition: 'left 0.08s ease, top 0.08s ease',
                  }
                : {}),
            }}
          >
            {noLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function InvitePageWrapper() {
  return (
    <Suspense>
      <InvitePage />
    </Suspense>
  )
}
