import http from 'node:http'
import { analyzeSite } from './seo.js'
import { loadProjectEnv } from './env.js'

loadProjectEnv()
const PORT = Number(process.env.PORT ?? 3000)
const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)
const requestCounts = new Map()
const RATE_LIMIT = 15
const RATE_WINDOW_MS = 60_000
const MAX_BODY_BYTES = 16 * 1024

function send(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  response.end(JSON.stringify(payload))
}

function applyCors(request, response) {
  const origin = request.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
  }
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

function rateLimited(request) {
  const now = Date.now()
  const address = request.socket.remoteAddress ?? 'unknown'
  const recent = (requestCounts.get(address) ?? []).filter(timestamp => now - timestamp < RATE_WINDOW_MS)
  recent.push(now)
  requestCounts.set(address, recent)
  return recent.length > RATE_LIMIT
}

const server = http.createServer(async (request, response) => {
  applyCors(request, response)
  if (request.method === 'OPTIONS') {
    response.writeHead(204)
    response.end()
    return
  }
  if (request.method !== 'POST' || request.url !== '/api/seo-audits') {
    send(response, 404, { message: 'Route introuvable.' })
    return
  }
  if (request.headers.origin && !allowedOrigins.includes(request.headers.origin)) {
    send(response, 403, { message: 'Origine non autorisée.' })
    return
  }
  if (rateLimited(request)) {
    send(response, 429, { message: 'Trop de diagnostics ont été demandés. Réessayez dans une minute.' })
    return
  }

  const chunks = []
  let size = 0
  request.on('data', chunk => {
    size += chunk.length
    if (size > MAX_BODY_BYTES) {
      if (!response.writableEnded) send(response, 413, { message: 'La requête est trop volumineuse.' })
      request.resume()
      return
    }
    if (response.writableEnded) return
    chunks.push(chunk)
  })
  request.on('end', async () => {
    if (response.writableEnded) return
    let body
    try {
      body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch {
      send(response, 400, { message: 'La requête doit contenir un JSON valide.' })
      return
    }
    if (typeof body.url !== 'string' || !body.url.trim()) {
      send(response, 400, { message: 'Veuillez renseigner l’adresse du site à analyser.' })
      return
    }
    try {
      send(response, 200, await analyzeSite(body.url.trim()))
    } catch (error) {
      send(response, 422, {
        message: error instanceof Error ? error.message : 'Le diagnostic du site a échoué.',
      })
    }
  })
})

server.listen(PORT, () => {
  console.log(`API du diagnostic SEO à l’écoute sur http://localhost:${PORT}`)
})
