// @ts-nocheck

import { type SchemaTypeDefinition, defineType, defineField } from 'sanity';
import SerieNameInput from '../../components/SeriesNameInput';
import { imageOptions, referenceOptions } from '../options';
import SeriesParameterInput from '../../components/SeriesParameterInput';
import SlugInput from '../../components/SlugInput';

export const series: SchemaTypeDefinition = defineType({
  name: 'series',
  type: 'document',
  title: 'Series',
  groups: [
    {
      name: 'localized',
      title: 'Localized',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      components: { input: SerieNameInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      components: { input: SlugInput },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'manufacturer',
      type: 'reference',
      title: 'Manufacturer',
      to: [{ type: 'manufacturer' }],
      options: referenceOptions,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      to: [{ type: 'category' }],
      options: {
        ...referenceOptions,
        filter: 'defined(parent)',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: imageOptions,
    }),
    defineField({
      name: 'catalog',
      type: 'file',
      title: 'Catalog',
    }),
    defineField({
      name: 'description',
      type: 'localeBlock',
      title: 'Description',
    }),
    defineField({
      name: 'seriesParameterGroups',
      type: 'array',
      title: 'Series parameters',
      of: [{ type: 'seriesParameterGroup' }],
      components: { input: SeriesParameterInput },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'manufacturer.name',
      image: 'image',
    },
    prepare: ({ title, subtitle, image }) => ({
      title: `${title} Series`,
      subtitle: subtitle ? subtitle : '',
      media: image,
    }),
  },
});
