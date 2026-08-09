import 'dotenv/config'
import * as fs from 'node:fs'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const MAX_RETRIES = 5
const CONCURRENCY = 5

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function createWithRetry(doc, label) {
  let lastErr
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await client.createOrReplace(doc)
      console.log(`${label}: imported ${doc._id}${attempt > 1 ? ` (attempt ${attempt})` : ''}`)
      return { ok: true, id: doc._id }
    } catch (err) {
      lastErr = err
      const backoff = Math.min(1000 * 2 ** (attempt - 1), 15000)
      console.warn(`${label}: attempt ${attempt}/${MAX_RETRIES} failed for ${doc._id}: ${err.message} — retrying in ${backoff}ms`)
      await sleep(backoff)
    }
  }
  console.error(`${label}: gave up on ${doc._id} after ${MAX_RETRIES} attempts: ${lastErr.message}`)
  return { ok: false, id: doc._id, error: lastErr.message }
}

async function importDocs(filepath, label) {
  const docs = JSON.parse(fs.readFileSync(filepath))
  const results = []
  let cursor = 0

  async function worker() {
    while (cursor < docs.length) {
      const doc = docs[cursor++]
      results.push(await createWithRetry(doc, label))
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, docs.length) }, worker))

  const failed = results.filter((r) => !r.ok)
  console.log(`${label}: ${results.length - failed.length}/${results.length} imported successfully`)
  return failed
}

async function main() {
  const failedCategories = await importDocs('./transformed/final-categories.json', 'category')
  const failedPosts = await importDocs('./transformed/final-posts.json', 'post')

  const allFailures = [...failedCategories, ...failedPosts]
  if (allFailures.length > 0) {
    fs.writeFileSync('./transformed/import-failures.json', JSON.stringify(allFailures, null, 2))
    console.log(`\n${allFailures.length} document(s) failed after retries — see transformed/import-failures.json`)
    console.log('Re-run this script to retry them (createOrReplace is idempotent, safe to re-run).')
  } else {
    console.log('\nAll documents imported successfully.')
  }
}

main()
