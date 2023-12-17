// @ts-nocheck

import { type SchemaTypeDefinition, defineType, defineField } from 'sanity';

export const manufacturer: SchemaTypeDefinition = defineType({
  name: 'manufacturer',
  type: 'document',
  title: 'Manufacturers',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
