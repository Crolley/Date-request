'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { decode } from '@/lib/encode'

function MerciPage() {
  const searchParams = useSearchParams()
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

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: styles.bg, fontFamily: styles.font, zoom: styles.zoom }}
    >
      <div
        className="w-full max-w-sm rounded-3xl shadow-lg p-8 flex flex-col gap-5 text-center"
        style={{ background: styles.card, border: `2px solid ${styles.border}` }}
      >
        <div className="text-6xl">{isKawaii ? '🎊' : '🌹'}</div>

        <h1 className="text-3xl font-bold" style={{ color: styles.text }}>
          {isKawaii ? 'Yaaaay ! 🎉' : 'Merci !'}
        </h1>

        <p style={{ color: styles.textLight }}>
          {isKawaii
            ? `${data?.name ?? 'La personne'} va être aux anges quand il/elle recevra ton message 💕`
            : `${data?.name ?? 'La personne'} a été informé(e) de votre réponse.`}
        </p>

        {isKawaii && (
          <p className="text-2xl">💕✨🌸</p>
        )}
      </div>
    </div>
  )
}

export default function MerciPageWrapper() {
  return (
    <Suspense>
      <MerciPage />
    </Suspense>
  )
}
