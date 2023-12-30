// @ts-nocheck

import { defaultLocale } from '@/i18n';
import {
  type SchemaTypeDefinition,
  defineType,
  defineField,
  defineArrayMember,
} from 'sanity';

export const page: SchemaTypeDefinition = defineType({
  name: 'page',
  type: 'document',
  title: 'Pages',
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        defineArrayMember({
          name: 'contactDepartments',
          type: 'contactDepartments',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: title[defaultLocale] ?? '',
    }),
  },
});
