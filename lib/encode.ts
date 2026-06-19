export interface CreatorData {
  name: string
  message: string
  email: string
  theme: 'kawaii' | 'romantic'
  partnerName?: string
}

export function encode(data: CreatorData): string {
  const json = JSON.stringify(data)
  const bytes = new TextEncoder().encode(json)
  const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join('')
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export function decode(str: string): CreatorData | null {
  try {
    const padded = str + '==='.slice((str.length + 3) % 4)
    const normalized = padded.replace(/-/g, '+').replace(/_/g, '/')
    const binary = atob(normalized)
    const bytes = Uint8Array.from(binary.split(''), (c: string) => c.charCodeAt(0))
    return JSON.parse(new TextDecoder().decode(bytes))
  } catch {
    return null
  }
}
