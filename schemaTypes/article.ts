import {Rule} from '@sanity/types'
import imageTextBlocks from './blocks/imageTextBlocks'


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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD') // Bryter ned spesialtegn til base + diakritika
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/æ/g, 'ae')
            .replace(/ø/g, 'oe')
            .replace(/å/g, 'aa')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 200),
      },
      validation: (Rule: Rule) => Rule.required().error('Slug is required'),
    },
    {
      name: 'articleBody',
      title: 'Article Body',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}, ...imageTextBlocks],
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
        dateFormat: ' D. MMM. YYYY ',
        locale: 'no',
      },
      validation: (Rule: Rule) => Rule.required().error('Date is required'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'object',
      fields: [
        {
          title: 'Category',
          name: 'category',
          type: 'string',
          options: {
            list: [
              {title: 'Inkubator', value: 'incubator'},
              {title: 'Coworking', value: 'coworking'},
              {title: 'Medlemmer', value: 'medlemmer'},
            ],
          },
        },
      ],
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{name: 'tag', type: 'string', title: 'Tag'}],
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
              title: 'Alternative text/img name',
            },
            {
              name: 'slug',
              type: 'slug',
              title: 'Image Slug',
              options: {
                source: 'alt',
              },
            },
          ],
        },
      ],
    },
  ],
} as const
