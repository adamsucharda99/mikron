import { defaultLocale, locales } from '@/i18n';
import { defineType, SchemaTypeDefinition } from 'sanity';

export const localeString: SchemaTypeDefinition = defineType({
  name: 'localeString',
  type: 'object',
  title: 'Localized string',
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
    type: 'string',
    fieldset: lang === defaultLocale ? null : 'translations',
  })),
});
