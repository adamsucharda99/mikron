import { type SchemaTypeDefinition, defineType, defineField } from 'sanity';
import { referenceOptions } from '../options';
import { defaultLocale } from '@/i18n';
import { EarthGlobeIcon } from '@sanity/icons';

export const category: SchemaTypeDefinition = defineType({
  name: 'category',
  type: 'document',
  title: 'Categories',
  groups: [
    {
      name: 'localized',
      title: 'Localized',
      icon: EarthGlobeIcon,
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'localeString',
      title: 'Name',
      group: 'localized',
    }),
    defineField({
      name: 'parent',
      type: 'reference',
      title: 'Parent category',
      to: [{ type: 'category' }],
      options: { ...referenceOptions, filter: '!defined(parent)' },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'parent.name',
    },
    prepare: ({ title, subtitle }) => ({
      title: title ? title[defaultLocale] : '',
      subtitle: subtitle ? `- ${subtitle[defaultLocale]}` : '',
    }),
  },
  orderings: [
    {
      title: 'Category',
      name: 'category',
      by: [{ field: 'parent->_id', direction: 'asc' }],
    },
  ],
});
