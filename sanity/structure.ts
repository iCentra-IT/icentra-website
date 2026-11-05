import type {StructureResolver} from 'sanity/structure'
import {client} from './lib/client'

type TopLevelCategory = {_id: string; title: string}

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = async (S) => {
  const topLevelCategories: TopLevelCategory[] = await client.fetch(
    `*[_type == "category" && !defined(parent)] | order(title asc){ _id, title }`
  )

  const categoryItems = await Promise.all(
    topLevelCategories.map(async (category) => {
      const childIds: string[] = await client.fetch(
        `*[_type == "category" && parent._ref == $id]._id`,
        {id: category._id}
      )
      const categoryIds = [category._id, ...childIds]

      return S.listItem()
        .id(`posts-by-category-${category._id}`)
        .title(category.title)
        .schemaType('post')
        .child(
          S.documentList()
            .id(`posts-list-${category._id}`)
            .title(category.title)
            .schemaType('post')
            .filter('_type == "post" && count((categories[]._ref)[@ in $categoryIds]) > 0')
            .params({categoryIds})
        )
    })
  )

  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('all-posts')
        .title('All Posts')
        .schemaType('post')
        .child(S.documentTypeList('post').title('All Posts')),
      S.divider(),
      ...categoryItems,
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'post'),
    ])
}
