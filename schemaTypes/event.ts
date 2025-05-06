import {Rule} from 'sanity'

export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      options: {
        dateFormat: ' D. MMM. YYYY ',
        locale: 'no',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'link to the event page, company or any extrenal info ',
    },
  ],
}
