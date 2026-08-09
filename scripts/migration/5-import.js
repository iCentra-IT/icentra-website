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

async function importDocs(filepath, label) {
  const docs = JSON.parse(fs.readFileSync(filepath))
  for (const doc of docs) {
    try {
      await client.createOrReplace(doc)
      console.log(`${label}: imported ${doc._id}`)
    } catch (err) {
      console.error(`${label}: failed ${doc._id}:`, err.message)
    }
  }
}

async function main() {
  await importDocs('./transformed/final-categories.json', 'category')
  await importDocs('./transformed/final-posts.json', 'post')
}

main()
