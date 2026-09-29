import { mock } from '../data/mock'
import type { Partner, Project, Resource, SeoResult } from '../types'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
const MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const PARTNERS_KEY = 'portfolio-partners'
const PROJECTS_KEY = 'portfolio-projects'
const wait = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token')
  const response = await fetch(BASE + path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
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
  async list<T = any>(resource: Resource): Promise<T[]> {
    if (!MOCK) return http(`/${resource}`)
    await wait()
    if (resource === 'partners' || resource === 'projects') {
      const key = resource === 'partners' ? PARTNERS_KEY : PROJECTS_KEY
      const saved = localStorage.getItem(key)
      return structuredClone(saved
        ? JSON.parse(saved) as (Partner | Project)[]
        : mock[resource]) as T[]
    }
    return structuredClone(mock[resource])
  },

  async addProject(project: Pick<Project, 'name' | 'description' | 'image'>): Promise<Project> {
    if (!MOCK) {
      return http<Project>('/projects', { method: 'POST', body: JSON.stringify(project) })
    }
    await wait(300)
    const current = await this.list<Project>('projects')
    const created: Project = { id: Date.now(), ...project, active: true, published: true }
    localStorage.setItem(PROJECTS_KEY, JSON.stringify([...current, created]))
    return created
  },

  async addPartner(partner: Pick<Partner, 'name' | 'logoUrl'>): Promise<Partner> {
    if (!MOCK) return http<Partner>('/partners', { method: 'POST', body: JSON.stringify(partner) })
    await wait(300)
    const current = await this.list<Partner>('partners')
    const created: Partner = { id: Date.now(), ...partner, description: '', active: true }
    localStorage.setItem(PARTNERS_KEY, JSON.stringify([...current, created]))
    return created
  },

  async get<T = any>(resource: Resource, id: number): Promise<T | undefined> {
    if (!MOCK) return http(`/${resource}/${id}`)
    await wait(300)
    return (await this.list<{ id: number } & T>(resource)).find(item => item.id === id)
  },

  async submit(kind: 'requests' | 'messages', data: unknown) {
    if (!MOCK) return http(`/${kind}`, { method: 'POST', body: JSON.stringify(data) })
    await wait(900)
    return { ok: true }
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

  async login(email: string, password: string) {
    if (MOCK) throw new Error('La connexion nécessite un serveur configuré. Désactivez le mode démo et configurez l’API.')
    return http<{ token: string; role: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
}
