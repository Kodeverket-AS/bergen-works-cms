import {Rule} from '@sanity/types'

export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Title is required'),
    },
    {
      name: 'articleBody',
      title: 'Article Body',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().error('Article body is required'),
    },
    {
      name: 'background',
      title: 'Background',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule: Rule) => Rule.required().error('Background is required'),
    },
    {
      name: 'releaseDate',
      title: 'Release date',
      type: 'datetime',
      options: {
        dateFormat: ' D. MMM. Do YYYY ',
        locale: 'no',
      },
      validation: (Rule: Rule) => Rule.required().error('Date is required'),
    },

    {
      name: 'images',
      title: 'Images',
      type: 'array',

      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
    },
  ],
} as const
