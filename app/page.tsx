'use client'

import { useState } from 'react'
import { encode, type CreatorData } from '@/lib/encode'

type Theme = 'kawaii' | 'romantic'

export default function Home() {
  const [theme, setTheme] = useState<Theme>('kawaii')
  const [name, setName] = useState('')
  const [partnerName, setPartnerName] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)

  const isKawaii = theme === 'kawaii'

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

  function generate() {
    if (!name.trim() || !message.trim() || !email.trim()) return
    const data: CreatorData = { name: name.trim(), partnerName: partnerName.trim() || undefined, message: message.trim(), email: email.trim(), theme }
    const encoded = encode(data)
    const url = `${window.location.origin}/invite?d=${encoded}`
    setLink(url)
    setCopied(false)
  }

  function copyLink() {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: styles.bg, fontFamily: styles.font }}
    >
      <div
        className="w-full max-w-lg rounded-3xl shadow-lg p-8 flex flex-col gap-6"
        style={{ background: styles.card, border: `2px solid ${styles.border}` }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">{isKawaii ? '🌸' : '🌹'}</div>
          <h1 className="text-3xl font-bold" style={{ color: styles.text }}>
            Date Request
          </h1>
          <p className="text-sm mt-1" style={{ color: styles.textLight }}>
            Crée ton invitation et envoie le lien
          </p>
        </div>

        {/* Theme selection */}
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: styles.text }}>
            Choisis un thème
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(['kawaii', 'romantic'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className="rounded-2xl p-4 text-center transition-all"
                style={{
                  background: theme === t ? (t === 'kawaii' ? '#FF6B9D' : '#8B1A3A') : 'transparent',
                  border: `2px solid ${t === 'kawaii' ? '#FF6B9D' : '#8B1A3A'}`,
                  color: theme === t ? '#FFFFFF' : (t === 'kawaii' ? '#FF6B9D' : '#8B1A3A'),
                  fontFamily: t === 'kawaii' ? 'var(--font-kawaii), sans-serif' : 'var(--font-romantic), serif',
                }}
              >
                <div className="text-2xl mb-1">{t === 'kawaii' ? '🌸' : '🌹'}</div>
                <div className="font-semibold">{t === 'kawaii' ? 'Kawaii' : 'Romantique'}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: styles.text }}>
              Ton prénom
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={isKawaii ? 'John Doe ✨' : 'John Doe'}
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

          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: styles.text }}>
              Prénom de la personne <span style={{ color: styles.textLight, fontWeight: 400 }}>(optionnel)</span>
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={e => setPartnerName(e.target.value)}
              placeholder={isKawaii ? 'John Doe 🥰' : 'John Doe'}
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

          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: styles.text }}>
              Ton message
            </label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              placeholder={isKawaii ? "J'aimerais beaucoup qu'on passe une soirée ensemble 🌸" : 'Je serais honoré(e) de passer une soirée avec toi...'}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-none"
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

          <div>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: styles.text }}>
              Ton email (pour recevoir la réponse)
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="toi@example.com"
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
        </div>

        <button
          onClick={generate}
          disabled={!name.trim() || !message.trim() || !email.trim()}
          className="w-full rounded-2xl py-3 font-bold text-white transition-all disabled:opacity-40"
          style={{ background: styles.primary }}
          onMouseEnter={e => { if (name && message && email) (e.target as HTMLElement).style.background = styles.primaryHover }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = styles.primary }}
        >
          {isKawaii ? '✨ Créer mon lien ✨' : 'Créer mon invitation →'}
        </button>

        {link && (
          <div
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{ background: styles.bg, border: `2px dashed ${styles.border}` }}
          >
            <p className="text-sm font-semibold text-center" style={{ color: styles.text }}>
              {isKawaii ? '🎀 Ton invitation est prête !' : '💌 Votre invitation est prête'}
            </p>
            <p
              className="text-xs break-all text-center px-2"
              style={{ color: styles.textLight }}
            >
              {link}
            </p>
            <button
              onClick={copyLink}
              className="w-full rounded-xl py-2 text-sm font-semibold text-white transition-all"
              style={{ background: copied ? '#22c55e' : styles.primary }}
            >
              {copied ? '✓ Copié !' : (isKawaii ? '📋 Copier le lien' : 'Copier le lien')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
