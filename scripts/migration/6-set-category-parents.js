import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const PARENT_ID = 'wp-category-5' // Insights

const CHILD_IDS = [
  'wp-category-4',   // Strategy Management
  'wp-category-11',  // PMO Solution
  'wp-category-16',  // Organizational Transformation
  'wp-category-7',   // Risk Management
  'wp-category-79',  // Executive Training
  'wp-category-10',  // Agile Transformation
  'wp-category-3',   // Digital Transformation
  'wp-category-78',  // Cybersecurity
  'wp-category-75',  // ISMS ISO
  'wp-category-65',  // Project Resourcing
]

async function main() {
  const parent = await client.getDocument(PARENT_ID)
  if (!parent) {
    throw new Error(`Parent category ${PARENT_ID} not found`)
  }
  console.log(`Parent category: "${parent.title}" (${PARENT_ID})`)

  for (const id of CHILD_IDS) {
    const doc = await client.getDocument(id)
    if (!doc) {
      console.error(`SKIP: ${id} not found`)
      continue
    }
    await client
      .patch(id)
      .set({ parent: { _type: 'reference', _ref: PARENT_ID } })
      .commit()
    console.log(`Set parent -> "${doc.title}" (${id}) is now a sub-category of "${parent.title}"`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
