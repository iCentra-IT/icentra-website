import 'dotenv/config'
import * as fs from 'node:fs'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'
import schema from './schema.js'

const blockContentType = schema.get('post').fields.find(f => f.name === 'body').type

const posts = JSON.parse(fs.readFileSync('./raw/posts.json'))

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
}

function stripOuterWrapper(html) {
  const match = html.match(/^\s*<div[^>]*>([\s\S]*)<\/div>\s*(<!--.*?-->)?\s*$/)
  return match ? match[1] : html
}

const transformed = posts.map((wpPost) => {
  const cleanedHtml = stripOuterWrapper(wpPost.content.rendered)

  const body = htmlToBlocks(cleanedHtml, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  })

  return {
    _type: 'post',
    _id: `wp-post-${wpPost.id}`,
    title: decodeHtmlEntities(wpPost.title.rendered),
    slug: { _type: 'slug', current: wpPost.slug },
    publishedAt: wpPost.date,
    excerpt: decodeHtmlEntities(wpPost.excerpt.rendered.replace(/<[^>]+>/g, '').trim()),
    body,
    _wpCategoryIds: wpPost.categories,
    _wpTagIds: wpPost.tags,
    _wpFeaturedMediaId: wpPost.featured_media,
  }
})

fs.mkdirSync('./transformed', { recursive: true })
fs.writeFileSync('./transformed/posts.json', JSON.stringify(transformed, null, 2))
console.log(`Transformed ${transformed.length} posts`)