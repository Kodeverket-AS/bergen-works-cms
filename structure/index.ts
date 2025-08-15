import {StructureResolver} from 'sanity/structure'
import {CalendarIcon, ComposeIcon, CreditCardIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Upcoming Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(
          S.documentList()
            .title('Upcoming Events')
            .filter('date >= now()')
            .defaultOrdering([{field: 'date', direction: 'asc'}]),
        )
        .child(S.documentTypeList('event').title('Upcoming Events').filter('date >= now()'))
        .icon(CalendarIcon),
      S.listItem()
        .title('Past Events')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(
          S.documentList()
            .title('Past Events')
            .filter('date < now()')
            .defaultOrdering([{field: 'date', direction: 'desc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Articles')
        .schemaType('article')
        .icon(ComposeIcon)
        .child(S.documentTypeList('article').title('Articles')),
      orderableDocumentListDeskItem({
        type: 'vippsCard',
        title: 'Vipps Kort',
        icon: CreditCardIcon,
        S,
        context,
      }),
    ])
