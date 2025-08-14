export default {
  title: 'Vipps Card',
  name: 'vippsCard',
  type: 'document',
  initialValue: {
    details: {
      period: 'monthly',
      duration: 1,
    },
  },
  fields: [
    {
      title: 'Tittel på kortet',
      name: 'title',
      type: 'string',
      description:
        'Kort og tydelig navn på tjenesten. Vises på knappen/kortet og i Sanity for å skille mellom tjenester. (Maks 60 tegn)',
      validation: (Rule) =>
        Rule.required().min(3).max(60).error('Skriv en kort og tydelig tittel (3-60 tegn).'),
    },
    {
      title: 'Beskrivelse av tjeneste',
      name: 'description',
      type: 'text',
      description:
        'Forklar hva kunden får. Denne teksten vises i modal når brukeren klikker «Vis mer». Skriv konkret og lett å forstå (anbefalt 40-400 tegn).',
      rows: 4,
      validation: (Rule) => [
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
          validation: (Rule) =>
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
              {title: 'Timer', value: 'time'},
              {title: 'Dager', value: 'dag'},
              {title: 'Uker', value: 'uke'},
              {title: 'Måneder', value: 'mnd'},
              {title: 'År', value: 'år'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          validation: (Rule) => Rule.required().error('Velg en periodetype.'),
        },
        {
          title: 'Varighet (antall perioder)',
          name: 'unitAmount',
          type: 'number',
          description:
            'Antall perioder denne pakken gjelder for. Eksempel: 5 (dager) eller 12 (måneder). La stå som 1 hvis det ikke er en flerperiode.',
          initialValue: 1,
          validation: (Rule) =>
            Rule.required()
              .integer()
              .min(1)
              .max(365)
              .error('Varighet må være et heltall mellom 1 og 365.'),
        },
      ],
      validation: (Rule) => Rule.required().error('Fyll ut pakkeinformasjon.'),
    },
    {
      title: 'Vipps-lenke',
      name: 'url',
      type: 'url',
      description: 'Lim inn lenken fra Vipps. Støtter https://-lenker (Vipps på Nett/Checkout)',
      validation: (Rule) =>
        Rule.required()
          .uri({
            scheme: ['https'],
            allowRelative: false,
          })
          .custom((value) => {
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
      period: 'details.period',
      duration: 'details.duration',
    },
    prepare({title, price, period, duration}) {
      return {
        title: title || 'Uten tittel',
        subtitle: `${price},- / ${duration > 1 ? duration + ' ' : ''}${period}`,
      }
    },
  },
}
