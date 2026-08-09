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

const media = JSON.parse(fs.readFileSync('./raw/media.json'))
const imageMap = {}

async function migrateImages() {
  for (const item of media) {
    const url = item.source_url
    if (!url) continue

    try {
      const res = await fetch(url)
      const buffer = await res.buffer()
      const asset = await client.assets.upload('image', buffer, {
        filename: url.split('/').pop(),
      })
      imageMap[item.id] = asset._id
      console.log(`Uploaded ${item.id} -> ${asset._id}`)
    } catch (err) {
      console.error(`Failed on ${item.id}:`, err.message)
    }
  }

  fs.writeFileSync('./transformed/image-map.json', JSON.stringify(imageMap, null, 2))
}

migrateImages()