import type {DocumentDefinition} from 'sanity'
import {defineField} from 'sanity'

export const withSeo = (doc: DocumentDefinition) => {
  return {
    ...doc,
    groups: [
      ...(doc?.groups ?? []),
      {
        name: 'pageData',
        title: 'Page Data',
      },
      {
        name: 'seo',
        title: 'SEO',
      },
    ],
    fields: [
      ...(doc.fields.map((field) => ({
        ...field,
        group: field.group ?? 'pageData',
      })) ?? []),
      defineField({
        title: 'Seo',
        name: 'seo',
        type: 'seoData',
        description:
          'Meta (Search): Control how your page appears in search results (SERP). Set Title and Description.\nOpen Graph (Social): Control how your content appears when shared on social platforms (e.g., Facebook, LinkedIn) or in messaging apps (e.g., Slack, WhatsApp). Set Title and Description.\n\nEach section has its own Title and Description and can differ. If social copy is not different, reuse Meta. \"All fields\" mirrors this data; edit in this SEO tab.',
        group: 'seo',
      }),
    ],
  }
}
