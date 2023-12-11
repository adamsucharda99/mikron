export interface Machine {
  fields: {
    name: string;
    parameters: {
      parameterGroups: {
        label: string;
        parameters: {
          label: string;
          value: string;
        }[];
      }[];
    };
  };
}

export interface Series {
  fields: {
    name: string;
    slug: string;
    images: {
      fields: {
        file: {
          url: string;
          details: { image: { width: number; height: number } };
        };
      };
    }[];
    description?: any;
    details?: any;
    catalog?: { fields: { file: { url: string } } };
    category: {
      fields: { name: string };
    };
    manufacturer: {
      fields: {
        name: string;
      };
    };
  };
  machines: { items: Machine[] };
}
