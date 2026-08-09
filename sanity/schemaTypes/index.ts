import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postTypes'
import { categoryType } from './categoryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, categoryType],
}
