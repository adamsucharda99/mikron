import { type SchemaTypeDefinition, defineType, defineField } from 'sanity';

export const contact: SchemaTypeDefinition = defineType({
  name: 'contact',
  type: 'document',
  title: 'Contact',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'departments',
      type: 'array',
      title: 'Departments',
      of: [{ type: 'contactDepartment' }],
    }),
  ],
});
