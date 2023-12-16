// @ts-nocheck

import { defaultLocale, locales } from '@/i18n';
import { defineType, SchemaTypeDefinition } from 'sanity';

export const localeBlock: SchemaTypeDefinition = defineType({
  name: 'localeBlock',
  type: 'object',
  title: 'Localized block',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: locales.map((lang) => ({
    title: lang.toUpperCase(),
    name: lang,
    type: 'array',
    of: [{ type: 'block' }],
    fieldset: lang === defaultLocale ? null : 'translations',
  })),
});
