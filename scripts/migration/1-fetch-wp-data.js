import 'dotenv/config'
import * as fs from 'node:fs'
import fetch from 'node-fetch'

const BASE = process.env.WP_BASE_URL

async function fetchAll(endpoint, filename) {
  let page = 1
  let all = []

  while (true) {
    const res = await fetch(`${BASE}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`)
    if (!res.ok) break

    const data = await res.json()
    if (data.length === 0) break

    all = all.concat(data)
    console.log(`${endpoint}: page ${page}, total ${all.length}`)
    page++
  }

  fs.writeFileSync(`./raw/${filename}.json`, JSON.stringify(all, null, 2))
  console.log(`Saved ${all.length} to raw/${filename}.json`)
}

async function main() {
  fs.mkdirSync('./raw', { recursive: true })
  await fetchAll('posts', 'posts')
  await fetchAll('categories', 'categories')
  await fetchAll('tags', 'tags')
  await fetchAll('media', 'media')
}

main()