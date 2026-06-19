'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { decode } from '@/lib/encode'

const RESTAURANT_LABELS: Record<string, string> = {
  japonais: '🍣 Japonais',
  italien: '🍕 Italien',
  francais: '🥐 Français',
  burger: '🍔 Burger',
  mexicain: '🌮 Mexicain',
  asiatique: '🍜 Asiatique',
  healthy: '🥗 Healthy',
  gastro: '🍷 Gastronomique',
}

function DatePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const d = searchParams.get('d') ?? ''
  const r = searchParams.get('r') ?? ''
  const data = decode(d)

  const [selected, setSelected] = useState<Date | undefined>()
  const [time, setTime] = useState('19:00')
  const [loading, setLoading] = useState(false)

  const isKawaii = data?.theme === 'kawaii'

  const styles = {
    bg: isKawaii ? '#FFF0F5' : '#FDF5F0',
    primary: isKawaii ? '#FF6B9D' : '#8B1A3A',
    primaryHover: isKawaii ? '#FF4D8D' : '#6B1230',
    border: isKawaii ? '#FFB3D1' : '#C9856E',
    text: isKawaii ? '#2D0A1E' : '#1A0008',
    textLight: isKawaii ? '#7A3A5A' : '#5C2A35',
    card: isKawaii ? '#FFFFFF' : '#FFF8F5',
    font: isKawaii ? 'var(--font-kawaii), sans-serif' : 'var(--font-romantic), serif',
      }

  async function confirm() {
    if (!selected || !data) return
    setLoading(true)
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creator: data,
          restaurant: RESTAURANT_LABELS[r] ?? r,
          date: `${selected.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${time}`,
        }),
      })
      router.push(`/invite/merci?d=${d}`)
    } finally {
      setLoading(false)
    }
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
        className="w-full max-w-sm rounded-3xl shadow-lg p-8 flex flex-col gap-6"
        style={{ background: styles.card, border: `2px solid ${styles.border}` }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">{isKawaii ? '🗓️' : '📅'}</div>
          <h1 className="text-2xl font-bold" style={{ color: styles.text }}>
            {isKawaii ? 'On se voit quand ? 🥰' : 'Choisissez une date'}
          </h1>
          {r && (
            <p className="text-sm mt-1" style={{ color: styles.textLight }}>
              {RESTAURANT_LABELS[r] ?? r} · {isKawaii ? 'trop hâte !' : 'avec impatience'}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={setSelected}
            disabled={{ before: new Date() }}
            className="rounded-2xl"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: styles.text }}>
            {isKawaii ? '⏰ À quelle heure ?' : 'Heure'}
          </label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            style={{
              border: `2px solid ${styles.border}`,
              background: styles.bg,
              color: styles.text,
              fontFamily: styles.font,
            }}
            onFocus={e => { e.target.style.borderColor = styles.primary }}
            onBlur={e => { e.target.style.borderColor = styles.border }}
          />
        </div>

        <button
          onClick={confirm}
          disabled={!selected || loading}
          className="w-full rounded-2xl py-3 font-bold text-white transition-all disabled:opacity-40"
          style={{ background: styles.primary }}
          onMouseEnter={e => { if (selected) (e.target as HTMLElement).style.background = styles.primaryHover }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = styles.primary }}
        >
          {loading
            ? (isKawaii ? 'Envoi... 💌' : 'Envoi en cours...')
            : (isKawaii ? '💕 Confirmer !' : 'Confirmer la date')}
        </button>
      </div>
    </div>
  )
}

export default function DatePageWrapper() {
  return (
    <Suspense>
      <DatePage />
    </Suspense>
  )
}
