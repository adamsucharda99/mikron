// @ts-nocheck

import { defineField, defineType } from 'sanity';

export const machineParameter = defineType({
  name: 'machineParameter',
  type: 'object',
  fields: [
    defineField({
      name: 'seriesParameterId',
      type: 'string',
    }),
    defineField({
      name: 'value',
      type: 'string',
    }),
  ],
});
