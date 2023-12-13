import { SchemaTypeDefinition, defineField, defineType } from 'sanity';

export const seriesParameter: SchemaTypeDefinition = defineType({
  name: 'seriesParameter',
  type: 'object',
  title: 'Parameter',
  fields: [
    defineField({
      name: 'label',
      type: 'localeString',
      title: 'Label',
    }),
    defineField({
      name: 'unit',
      type: 'string',
      title: 'Unit',
    }),
    defineField({
      name: 'id',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
  ],
});
