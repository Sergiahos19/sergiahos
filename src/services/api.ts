import { content } from '../data/content'
import { profile } from '../data/profile'
import type { Resource, SeoResult } from '../types'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(BASE + path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  const text = await response.text()
  let body: unknown
  if (text) {
    try {
      body = JSON.parse(text)
    } catch {
      body = text
    }
  }
  if (!response.ok) {
    const message = typeof body === 'object' && body !== null && 'message' in body
      ? String((body as { message: unknown }).message)
      : typeof body === 'string' && body ? body : `Erreur ${response.status}`
    throw new Error(message)
  }
  if (!text) throw new Error('Le serveur a renvoyé une réponse vide.')
  return body as T
}

export const api = {
  async list<T = unknown>(resource: Resource): Promise<T[]> {
    return structuredClone(content[resource]) as T[]
  },

  async submit(kind: 'requests' | 'messages', data: Record<string, string>): Promise<{ url: string }> {
    const labels: Record<string, string> = {
      nom: 'Nom',
      email: 'E-mail',
      service: 'Service demandé',
      budget: 'Budget estimé',
      desc: 'Description du projet',
      sujet: 'Sujet',
      msg: 'Message',
    }
    const details = Object.entries(data)
      .filter(([, value]) => value.trim())
      .map(([key, value]) => `${labels[key] ?? key} : ${value.trim()}`)
      .join('\n')
    const purpose = kind === 'requests' ? 'une demande de projet' : 'un message'
    const text = `Bonjour Sergiahos, je souhaite vous envoyer ${purpose}.\n\n${details}`
    const phone = profile.phone.replace(/\D/g, '')
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    return { url }
  },

  async analyze(url: string): Promise<SeoResult> {
    const result = await http<SeoResult>('/seo-audits', {
      method: 'POST',
      body: JSON.stringify({ url }),
    })
    if (result.exists !== true) {
      throw new Error(result.message ?? 'Ce site n’existe pas ou n’est pas accessible. Aucune analyse n’a été effectuée.')
    }
    return result
  },
}
