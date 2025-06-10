

export default {
  name: 'vippsCard',
  title: 'Vipps Card',
  type: 'document',
  fields: [
    {
      name: 'serviceTitle',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'number',
          title: 'Number',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        },
        {
          name: 'period',
          title: 'Period',
          type: 'string',
          options: {
            list: [
              {title: 'Hour/hours', value: 't'},
              {title: 'Day', value: 'd'},
              {title: 'Days', value: 'dager'},
              {title: 'Week', value: 'u'},
              {title: 'Weeks', value: 'uker'},
              {title: 'Month', value: 'mnd'},
              {title: 'Months', value: 'mndr'},
              {title: 'Year', value: 'år'},
              {title: 'Years', value: 'år'},
            ],
          },
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the Vipps page',
      validation: (Rule) => Rule.required(),
    },
  ],
}
