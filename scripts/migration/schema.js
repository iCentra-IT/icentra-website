import { Schema } from '@sanity/schema'

export default Schema.compile({
  name: 'migration',
  types: [
    {
      type: 'document',
      name: 'post',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }, { type: 'image' }],
        },
      ],
    },
  ],
})