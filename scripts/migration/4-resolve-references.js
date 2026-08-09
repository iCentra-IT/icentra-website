import * as fs from 'node:fs'

const posts = JSON.parse(fs.readFileSync('./transformed/posts.json'))
const categories = JSON.parse(fs.readFileSync('./raw/categories.json'))
const imageMap = JSON.parse(fs.readFileSync('./transformed/image-map.json'))

const categoryDocs = categories.map((cat) => ({
  _type: 'category',
  _id: `wp-category-${cat.id}`,
  title: cat.name,
  slug: { _type: 'slug', current: cat.slug },
}))

const resolvedPosts = posts.map((post) => {
  const { _wpCategoryIds, _wpTagIds, _wpFeaturedMediaId, ...rest } = post

  const resolved = {
    ...rest,
    categories: (_wpCategoryIds || []).map((id) => ({
      _type: 'reference',
      _ref: `wp-category-${id}`,
      _key: `cat-${id}`,
    })),
  }

  const assetId = imageMap[_wpFeaturedMediaId]
  if (assetId) {
    resolved.mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
    }
  }

  return resolved
})

fs.mkdirSync('./transformed', { recursive: true })
fs.writeFileSync('./transformed/final-posts.json', JSON.stringify(resolvedPosts, null, 2))
fs.writeFileSync('./transformed/final-categories.json', JSON.stringify(categoryDocs, null, 2))
console.log(`Resolved ${resolvedPosts.length} posts, ${categoryDocs.length} categories`)