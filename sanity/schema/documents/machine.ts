// @ts-nocheck

import { defineField, defineType, type SchemaTypeDefinition } from 'sanity';
import { imageOptions, referenceOptions } from '../options';
import MachineParameterInput from '../../components/MachineParameterInput';

export const machine: SchemaTypeDefinition = defineType({
  name: 'machine',
  type: 'document',
  title: 'Machines',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      type: 'reference',
      title: 'Series',
      to: [{ type: 'series' }],
      options: referenceOptions,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'machineParameters',
      type: 'array',
      of: [{ type: 'machineParameter' }],
      components: { input: MachineParameterInput },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      image: 'image',
      subtitle: 'series.manufacturer.name',
    },
    prepare: ({ title, image, subtitle }) => {
      return {
        title,
        media: image,
        subtitle: subtitle ? `- ${subtitle}` : '',
      };
    },
  },
});
