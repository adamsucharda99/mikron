// @ts-nocheck

import { defaultLocale } from '@/i18n';
import { defineField, defineType, type SchemaTypeDefinition } from 'sanity';

export const contactDepartments: SchemaTypeDefinition = defineType({
  name: 'contactDepartments',
  type: 'object',
  title: 'Contact',
  fields: [
    defineField({
      name: 'departments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'department',
              type: 'localeString',
              title: 'Department',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'people',
              type: 'array',
              title: 'People',
              of: [
                {
                  type: 'object',
                  name: 'person',
                  fields: [
                    {
                      name: 'name',
                      type: 'string',
                      title: 'Name',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'position',
                      type: 'localeString',
                      title: 'Position',
                    },
                    {
                      name: 'phone',
                      title: 'Phone numbers',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                    {
                      name: 'email',
                      title: 'Email',
                      type: 'string',
                    },
                    {
                      name: 'region',
                      type: 'string',
                      title: 'Region',
                    },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'department',
            },
            prepare: ({ title }) => ({
              title: title[defaultLocale] ?? '',
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Contact departments',
    }),
  },
});
