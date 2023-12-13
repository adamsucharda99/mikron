import { defaultLocale } from '@/i18n';
import { defineField, defineType, type SchemaTypeDefinition } from 'sanity';

export const contactPerson: SchemaTypeDefinition = defineType({
  name: 'contactPerson',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'position',
      type: 'localeString',
      title: 'Position',
    }),
    defineField({
      name: 'phoneNumbers',
      type: 'array',
      title: 'Phone numbers',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email',
    }),
    defineField({
      name: 'region',
      type: 'string',
      title: 'Region',
    }),
  ],
  options: { modal: { type: 'popover' } },
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
    },
    prepare: ({ title, subtitle }) => ({
      title: title ? title : '',
      subtitle: subtitle ? `- ${subtitle[defaultLocale]}` : '',
    }),
  },
});
