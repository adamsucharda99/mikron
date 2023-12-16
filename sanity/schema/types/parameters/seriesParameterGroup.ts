// @ts-nocheck

import { SchemaTypeDefinition, defineField, defineType } from 'sanity';

export const seriesParameterGroup: SchemaTypeDefinition = defineType({
  name: 'seriesParameterGroup',
  type: 'object',
  title: 'Parameter Group',
  fields: [
    defineField({
      name: 'label',
      type: 'localeString',
      title: 'Label',
    }),
    defineField({
      name: 'seriesParameters',
      type: 'array',
      title: 'Parameters',
      of: [{ type: 'seriesParameter' }],
    }),
  ],
});
