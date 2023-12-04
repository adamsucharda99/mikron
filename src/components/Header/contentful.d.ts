export interface CategorySkeleton {
  contentTypeId: 'category';
  fields: {
    name: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    parent: Entry<{
      contentTypeId: 'category';
      fields: { name: EntryFieldTypes.Text };
    }>;
  };
}

export type CategoryData = EntryCollection<CategorySkeleton, undefined, string>;
