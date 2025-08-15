import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {Rule} from 'sanity'

export default {
  title: 'Vipps Card',
  name: 'vippsCard',
  type: 'document',
  orderings: [orderRankOrdering],
  initialValue: {
    details: {
      unitType: 'monthly',
      unitAmount: 1,
    },
  },
  fields: [
    orderRankField({type: 'category', newItemPosition: 'before'}),
    {
      title: 'Tittel på kortet',
      name: 'title',
      type: 'string',
      description:
        'Kort og tydelig navn på tjenesten. Vises på knappen/kortet og i Sanity for å skille mellom tjenester. (Maks 60 tegn)',
      validation: (Rule: Rule) =>
        Rule.required().min(3).max(60).error('Skriv en kort og tydelig tittel (3-60 tegn).'),
    },
    {
      title: 'Beskrivelse av tjeneste',
      name: 'description',
      type: 'text',
      description:
        'Forklar hva kunden får. Denne teksten vises i modal når brukeren klikker «Vis mer». Skriv konkret og lett å forstå (anbefalt 40-400 tegn).',
      rows: 4,
      validation: (Rule: Rule) => [
        Rule.required().error('Beskrivelse er påkrevd.'),
        Rule.min(40).warning('Beskrivelsen er veldig kort - vurder å utdype.'),
        Rule.max(400).warning('Vurder å korte ned teksten.'),
        Rule.max(600).warning('Teksten din er for lang.'),
      ],
    },

    {
      title: 'Pakke informasjon',
      name: 'details',
      type: 'object',
      description: 'Pris og periode for visning, f.eks. «1 000 kr / mnd» eller «500 kr / 3 dager».',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          title: 'Pris (NOK)',
          name: 'price',
          type: 'number',
          description:
            'Total pris inkludert mva. Skriv kun tall (ikke «kr» eller bindestrek). Bruk punktum for desimaler, f.eks. 199.50.',
          validation: (Rule: Rule) =>
            Rule.required()
              .positive()
              .precision(2)
              .min(1)
              .max(1_000_000)
              .error('Pris må være et tall mellom 1 og 1 000 000, med inntil 2 desimaler.'),
        },
        {
          title: 'Periode type',
          name: 'unitType',
          type: 'string',
          description:
            'Velg ønsket periode type for pakke, brukes for å vise pris per enhet. F.eks: 1000,- / mnd',
          options: {
            list: [
              {title: 'Time', value: 'hourly'},
              {title: 'Dag', value: 'daily'},
              {title: 'Uke', value: 'weekly'},
              {title: 'Måned', value: 'monthly'},
              {title: 'År', value: 'yearly'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          validation: (Rule: Rule) => Rule.required().error('Velg en periodetype.'),
        },
        {
          title: 'Varighet (antall perioder)',
          name: 'unitAmount',
          type: 'number',
          description:
            'Antall perioder denne pakken gjelder for. Eksempel: 5 (dager) eller 12 (måneder). La stå som 1 hvis det ikke er en flerperiode.',
          initialValue: 1,
          validation: (Rule: Rule) =>
            Rule.required()
              .integer()
              .min(1)
              .max(365)
              .error('Varighet må være et heltall mellom 1 og 365.'),
          hidden: ({parent}: {parent: {unitType: string | undefined}}) =>
            parent?.unitType === 'none',
        },
      ],
      validation: (Rule: Rule) => Rule.required().error('Fyll ut pakkeinformasjon.'),
    },
    {
      title: 'Vipps-lenke',
      name: 'url',
      type: 'url',
      description: 'Lim inn lenken fra Vipps. Støtter https://-lenker (Vipps på Nett/Checkout)',
      validation: (Rule: Rule) =>
        Rule.required()
          .uri({
            scheme: ['https'],
            allowRelative: false,
          })
          .custom((value: string | undefined) => {
            if (!value) return true
            const isVippsHost = /^https:\/\/([^/]+\.)*vipps\.[^/]+(\/|$)/i.test(value)
            return isVippsHost || 'URL må være en Vipps-lenke (f.eks. https://betal.vipps.no/...)'
          }),
    },
  ],
  preview: {
    select: {
      title: 'title',
      price: 'details.price',
      unitType: 'details.unitType',
      unitAmount: 'details.unitAmount',
    },
    prepare({
      title,
      price,
      unitType,
      unitAmount = 1,
    }: {
      title: string | undefined
      price: number | undefined
      unitType: string
      unitAmount: number
    }) {
      // Map each unit to its singular/plural labels
      const UNIT_LABELS = {
        hourly: {single: 'time', plural: 'timer'},
        daily: {single: 'dag', plural: 'dager'},
        weekly: {single: 'uke', plural: 'uker'},
        monthly: {single: 'måned', plural: 'måneder'},
        yearly: {single: 'år', plural: 'år'},
      }

      // Type helpers
      type UnitLabelIndex = keyof typeof UNIT_LABELS

      // Grap the correct label
      const unitCategory = unitAmount > 1 ? 'plural' : 'single'
      const unitLabel =
        (UNIT_LABELS[unitType as UnitLabelIndex] &&
          UNIT_LABELS[unitType as UnitLabelIndex][unitCategory]) ||
        ''

      // Construct units strings
      const unitAmountAdjusted = unitLabel.length ? (unitAmount > 1 ? unitAmount + ' ' : '') : ''
      const unitCombined = `${unitLabel.length ? ' / ' : ''}${unitAmountAdjusted}${unitLabel}`

      // Construct preview card
      return {
        title: title || 'Uten tittel',
        subtitle: price + ',-' + unitCombined,
      }
    },
  },
}
