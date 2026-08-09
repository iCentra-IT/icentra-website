import { defineType, defineField } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'parent',
      title: 'Parent category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Set this to make the category a sub-category of another category.',
    }),
  ],
  preview: {
    select: { title: 'title', parentTitle: 'parent.title' },
    prepare({ title, parentTitle }) {
      return { title, subtitle: parentTitle ? `Sub-category of ${parentTitle}` : undefined }
    },
  },
})
