'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { decode } from '@/lib/encode'

const RESTAURANTS = [
  { id: 'japonais', emoji: '🍣', label: 'Japonais' },
  { id: 'italien', emoji: '🍕', label: 'Italien' },
  { id: 'francais', emoji: '🥐', label: 'Français' },
  { id: 'burger', emoji: '🍔', label: 'Burger' },
  { id: 'mexicain', emoji: '🌮', label: 'Mexicain' },
  { id: 'asiatique', emoji: '🍜', label: 'Asiatique' },
  { id: 'healthy', emoji: '🥗', label: 'Healthy' },
  { id: 'gastro', emoji: '🍷', label: 'Gastronomique' },
]

function RestaurantPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const d = searchParams.get('d') ?? ''
  const data = decode(d)

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

  function pick(id: string) {
    router.push(`/invite/date?d=${d}&r=${id}`)
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFF0F5' }}>
        <p style={{ color: '#7A3A5A' }}>Lien invalide 😕</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: styles.bg, fontFamily: styles.font, zoom: styles.zoom }}
    >
      <div
        className="w-full max-w-lg rounded-3xl shadow-lg p-8 flex flex-col gap-6"
        style={{ background: styles.card, border: `2px solid ${styles.border}` }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">{isKawaii ? '🎉' : '✨'}</div>
          <h1 className="text-2xl font-bold" style={{ color: styles.text }}>
            {isKawaii ? 'Yesss ! C\'est un OUI 💕' : 'Magnifique !'}
          </h1>
          <p className="text-sm mt-1" style={{ color: styles.textLight }}>
            {isKawaii
              ? 'Maintenant, quel type de resto tu préfères ?'
              : 'Quelle cuisine vous ferait plaisir ?'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {RESTAURANTS.map(r => (
            <button
              key={r.id}
              onClick={() => pick(r.id)}
              className="rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-105"
              style={{
                background: styles.bg,
                border: `2px solid ${styles.border}`,
                color: styles.text,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = styles.primary
                el.style.borderColor = styles.primary
                el.style.color = '#FFFFFF'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = styles.bg
                el.style.borderColor = styles.border
                el.style.color = styles.text
              }}
            >
              <span className="text-2xl">{r.emoji}</span>
              <span className="text-xs font-semibold">{r.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function RestaurantPageWrapper() {
  return (
    <Suspense>
      <RestaurantPage />
    </Suspense>
  )
}
