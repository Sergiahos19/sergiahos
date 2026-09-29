import test from 'node:test'
import assert from 'node:assert/strict'
import { analyzeHtml, analyzeSite, isPublicAddress, validateSiteUrl } from './seo.js'

test('repère les adresses IP non publiques et publiques', () => {
  assert.equal(isPublicAddress('127.0.0.1'), false)
  assert.equal(isPublicAddress('10.0.0.1'), false)
  assert.equal(isPublicAddress('192.168.1.10'), false)
  assert.equal(isPublicAddress('8.8.8.8'), true)
})

test('refuse les protocoles non HTTP et les ports non standards', async () => {
  await assert.rejects(validateSiteUrl('file:///etc/passwd'), /HTTP ou HTTPS/)
  await assert.rejects(validateSiteUrl('http://example.com:8080'), /ports HTTP et HTTPS standards/)
})

test('refuse les hôtes locaux avant toute requête', async () => {
  await assert.rejects(validateSiteUrl('http://127.0.0.1'), /n’est pas accessible/)
  await assert.rejects(validateSiteUrl('http://localhost'), /n’est pas accessible/)
})

test('détecte un nom de domaine inexistant sans retourner de score', async () => {
  await assert.rejects(
    analyzeSite('https://this-domain-should-not-exist-783924.invalid'),
    /Ce site n’existe pas ou son nom de domaine ne peut pas être résolu/,
  )
})

test('analyse les balises SEO réelles et retourne un score sans données simulées', () => {
  const html = '<html lang="fr"><head><title>Site de test avec titre adapté aux moteurs</title><meta name="description" content="Une description suffisamment longue pour représenter correctement cette page dans les résultats de recherche."><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="canonical" href="https://example.com/"></head><body><h1>Présentation</h1><img src="/photo.jpg" alt="Photo de présentation"></body></html>'
  const result = analyzeHtml(html, new URL('https://example.com/'))
  assert.equal(result.exists, true)
  assert.equal(result.score, 100)
  assert.deepEqual(result.critical, [])
  assert.equal(result.good.length, 8)
})

test('signale les balises manquantes à partir du contenu inspecté', () => {
  const result = analyzeHtml('<html><body><img src="/photo.jpg"></body></html>', new URL('http://example.com/'))
  assert.equal(result.exists, true)
  assert.equal(result.score, 22)
  assert.equal(result.critical.length, 3)
  assert.ok(result.warnings.some(message => message.includes('HTTPS')))
})
