import dns from 'node:dns/promises'
import http from 'node:http'
import https from 'node:https'
import net from 'node:net'

const MAX_REDIRECTS = 5
const MAX_HTML_BYTES = 1_500_000
const REQUEST_TIMEOUT_MS = 10_000

function ipv4ToNumber(address) {
  return address.split('.').reduce((value, part) => ((value << 8) | Number(part)) >>> 0, 0)
}

function inIpv4Range(address, network, prefix) {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  return (ipv4ToNumber(address) & mask) === (ipv4ToNumber(network) & mask)
}

export function isPublicAddress(address) {
  const family = net.isIP(address)
  if (family === 4) {
    const blocked = [
      ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10],
      ['127.0.0.0', 8], ['169.254.0.0', 16], ['172.16.0.0', 12],
      ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.88.99.0', 24],
      ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24],
      ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
    ]
    return !blocked.some(([network, prefix]) => inIpv4Range(address, network, prefix))
  }

  if (family !== 6) return false
  const value = address.toLowerCase()
  return ['2', '3'].includes(value[0]) &&
    !value.startsWith('2001:db8:') &&
    !value.startsWith('2002:')
}

export async function validateSiteUrl(value) {
  let url
  try {
    url = new URL(value)
  } catch {
    throw new Error('Saisissez une adresse de site valide.')
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Utilisez une adresse HTTP ou HTTPS sans identifiant intégré.')
  }
  if (url.port && !['80', '443'].includes(url.port)) {
    throw new Error('Seuls les sites accessibles sur les ports HTTP et HTTPS standards peuvent être analysés.')
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, '')
  let addresses
  try {
    addresses = net.isIP(hostname)
      ? [{ address: hostname, family: net.isIP(hostname) }]
      : await dns.lookup(hostname, { all: true, verbatim: true })
  } catch {
    throw new Error('Ce site n’existe pas ou son nom de domaine ne peut pas être résolu.')
  }
  if (!addresses.length || addresses.some(({ address }) => !isPublicAddress(address))) {
    throw new Error('Cette adresse de site n’est pas accessible pour un diagnostic.')
  }
  return { url, address: addresses[0] }
}

function requestOnce(url, address) {
  return new Promise((resolve, reject) => {
    const client = url.protocol === 'https:' ? https : http
    const request = client.request(url, {
      method: 'GET',
      headers: {
        Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.1',
        'User-Agent': 'Sergiahos-SEO-Audit/1.0',
        Connection: 'close',
      },
      maxHeaderSize: 16 * 1024,
      lookup: (_hostname, options, callback) => {
        if (options?.all) callback(null, [address])
        else callback(null, address.address, address.family)
      },
    }, response => {
      const chunks = []
      let size = 0
      response.on('data', chunk => {
        size += chunk.length
        if (size > MAX_HTML_BYTES) {
          request.destroy(new Error('La page est trop volumineuse pour être analysée.'))
          return
        }
        chunks.push(chunk)
      })
      response.on('end', () => resolve({
        status: response.statusCode ?? 0,
        headers: response.headers,
        body: Buffer.concat(chunks).toString('utf8'),
      }))
      response.on('error', reject)
    })
    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error('Le site ne répond pas dans le délai imparti.'))
    })
    request.on('error', reject)
    request.end()
  })
}

export async function fetchSitePage(input, redirects = 0) {
  const { url, address } = await validateSiteUrl(input)
  let response
  try {
    response = await requestOnce(url, address)
  } catch (error) {
    if (error instanceof Error && error.message.includes('trop volumineuse')) throw error
    if (error instanceof Error && error.message.includes('délai imparti')) throw error
    throw new Error('Le site n’existe pas ou ne répond pas à la requête.')
  }

  if (response.status >= 300 && response.status < 400 && response.headers.location) {
    if (redirects >= MAX_REDIRECTS) throw new Error('Le site redirige trop souvent pour être analysé.')
    const redirect = new URL(response.headers.location, url)
    return fetchSitePage(redirect.href, redirects + 1)
  }
  if (response.status === 404 || response.status === 410) {
    return { exists: false, message: 'Ce site ou cette page n’existe pas (erreur 404). Aucune analyse n’a été effectuée.' }
  }
  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Le site a répondu avec le code HTTP ${response.status}. Aucune analyse n’a été effectuée.`)
  }
  const contentType = String(response.headers['content-type'] ?? '')
  if (!contentType.toLowerCase().includes('text/html') && !contentType.toLowerCase().includes('application/xhtml+xml')) {
    throw new Error('Cette adresse ne renvoie pas une page HTML analysable.')
  }
  return { exists: true, url, html: response.body }
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
}

function cleanText(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim())
}

function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? []
  for (const tag of tags) {
    const key = tag.match(/\bname\s*=\s*["']([^"']+)["']/i)?.[1]
    if (key?.toLowerCase() !== name.toLowerCase()) continue
    return tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1] ?? ''
  }
  return ''
}

export function analyzeHtml(html, url) {
  const critical = []
  const warnings = []
  const good = []
  let score = 100
  const penalize = (list, message, points) => {
    list.push(message)
    score -= points
  }

  const title = cleanText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1] ?? '')
  const description = cleanText(metaContent(html, 'description'))
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi)]
  const images = html.match(/<img\b[^>]*>/gi) ?? []
  const missingAlt = images.filter(image => !/\balt\s*=\s*["'][^"']*["']/i.test(image))
  const language = html.match(/<html\b[^>]*\blang\s*=\s*["']([^"']+)["']/i)?.[1]
  const viewport = metaContent(html, 'viewport')
  const canonical = (html.match(/<link\b[^>]*>/gi) ?? []).some(tag =>
    /\brel\s*=\s*["']canonical["']/i.test(tag))

  if (!title) penalize(critical, 'La page ne possède pas de balise title.', 20)
  else if (title.length < 30 || title.length > 60) penalize(warnings, `La balise title comporte ${title.length} caractères (30 à 60 conseillés).`, 5)
  else good.push('La balise title est présente et sa longueur est adaptée.')

  if (!description) penalize(critical, 'La meta description est absente.', 15)
  else if (description.length < 70 || description.length > 160) penalize(warnings, `La meta description comporte ${description.length} caractères (70 à 160 conseillés).`, 5)
  else good.push('La meta description est présente et sa longueur est adaptée.')

  if (headings.length === 0) penalize(critical, 'Aucun titre H1 ne structure la page.', 15)
  else if (headings.length > 1) penalize(warnings, 'Plusieurs titres H1 sont présents ; un seul est conseillé.', 5)
  else good.push('La page possède un titre H1 unique.')

  if (!viewport) penalize(warnings, 'La meta viewport est absente.', 10)
  else good.push('La meta viewport est configurée.')

  if (missingAlt.length) penalize(warnings, `${missingAlt.length} image(s) n’ont pas d’attribut alt.`, Math.min(15, missingAlt.length * 3))
  else if (images.length) good.push('Toutes les images possèdent un attribut alt.')
  else warnings.push('Aucune image n’a été détectée sur la page.')

  if (!language) penalize(warnings, 'La langue du document n’est pas déclarée.', 5)
  else good.push(`La langue du document est déclarée (${language}).`)

  if (url.protocol !== 'https:') penalize(warnings, 'Le site n’utilise pas HTTPS.', 10)
  else good.push('Le site utilise HTTPS.')

  if (canonical) good.push('Une URL canonique est déclarée.')
  else warnings.push('Aucune URL canonique n’est déclarée.')

  return { exists: true, score: Math.max(0, score), critical, warnings, good }
}

export async function analyzeSite(input) {
  const page = await fetchSitePage(input)
  if (!page.exists) return page
  return analyzeHtml(page.html, page.url)
}
