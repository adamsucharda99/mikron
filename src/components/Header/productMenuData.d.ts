export interface ProductMenuData {
  manufacturers: {
    items: {
      fields: {
        name: string;
        slug: string;
      };
    }[];
  };
  categories: {
    items: {
      fields: {
        name: string;
        slug: string;
        parent?: {
          fields: {
            name: string;
            slug: string;
          };
        };
      };
    }[];
  };
  series: {
    items: {
      fields: {
        name: string;
        slug: string;
        manufacturer: {
          fields: {
            slug: string;
          };
        };
        category: {
          fields: {
            slug: string;
          };
        };
      };
    }[];
  };
}
