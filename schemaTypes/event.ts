import { Rule } from 'sanity';
import { isUniqueAcrossAllDocuments } from '../utils/isSlugUnique';

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
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        isUnique: isUniqueAcrossAllDocuments,
        source: 'title',
        maxLength: 100,
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
      validation: (rule: Rule) => [
        rule
          .required()
          .error('Identifikasjon er ikke unik nok, prøv å endre tittel og så trykk generate'),
      ],
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
};
