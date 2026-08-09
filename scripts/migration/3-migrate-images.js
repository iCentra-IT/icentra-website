import 'dotenv/config'
import * as fs from 'node:fs'
import fetch from 'node-fetch'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const MAX_RETRIES = 5
const CONCURRENCY = 6

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const media = JSON.parse(fs.readFileSync('./raw/media.json'))

// Resume support: keep whatever was already uploaded in a previous run.
const imageMap = fs.existsSync('./transformed/image-map.json')
  ? JSON.parse(fs.readFileSync('./transformed/image-map.json'))
  : {}

async function uploadWithRetry(item) {
  const url = item.source_url
  if (!url) return { ok: false, id: item.id, error: 'no source_url' }

  let lastErr
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`fetch failed: ${res.status}`)
      const buffer = await res.buffer()
      const asset = await client.assets.upload('image', buffer, {
        filename: url.split('/').pop(),
      })
      imageMap[item.id] = asset._id
      console.log(`Uploaded ${item.id} -> ${asset._id}${attempt > 1 ? ` (attempt ${attempt})` : ''}`)
      return { ok: true, id: item.id }
    } catch (err) {
      lastErr = err
      const backoff = Math.min(1000 * 2 ** (attempt - 1), 15000)
      console.warn(`Attempt ${attempt}/${MAX_RETRIES} failed for ${item.id}: ${err.message} — retrying in ${backoff}ms`)
      await sleep(backoff)
    }
  }
  console.error(`Gave up on ${item.id} after ${MAX_RETRIES} attempts: ${lastErr.message}`)
  return { ok: false, id: item.id, error: lastErr.message }
}

async function migrateImages() {
  const pending = media.filter((item) => !imageMap[item.id])
  console.log(`${media.length} total, ${media.length - pending.length} already uploaded, ${pending.length} to go`)

  const results = []
  let cursor = 0

  async function worker() {
    while (cursor < pending.length) {
      const item = pending[cursor++]
      results.push(await uploadWithRetry(item))
      // Persist progress after every upload so a crash/interrupt doesn't lose work.
      fs.writeFileSync('./transformed/image-map.json', JSON.stringify(imageMap, null, 2))
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, pending.length) }, worker))

  const failed = results.filter((r) => !r.ok)
  console.log(`\n${Object.keys(imageMap).length}/${media.length} images uploaded overall`)
  if (failed.length > 0) {
    fs.writeFileSync('./transformed/image-migration-failures.json', JSON.stringify(failed, null, 2))
    console.log(`${failed.length} failed after retries — see transformed/image-migration-failures.json`)
    console.log('Re-run this script to retry only the missing ones (progress is resumed automatically).')
  }
}

migrateImages()
