import { defaultLocale } from '@/i18n';
import { defineField, defineType, type SchemaTypeDefinition } from 'sanity';

export const contactDepartment: SchemaTypeDefinition = defineType({
  name: 'contactDepartment',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'localeString',
      title: 'Name',
    }),
    defineField({
      name: 'people',
      type: 'array',
      title: 'People',
      of: [{ type: 'contactPerson' }],
    }),
  ],
  preview: {
    select: {
      title: 'department',
    },
    prepare: ({ title }) => ({
      title: title ? title[defaultLocale] : '',
    }),
  },
});
