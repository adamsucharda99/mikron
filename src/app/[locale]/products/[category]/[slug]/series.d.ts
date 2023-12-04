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
    description: any;
    catalog?: any;
    category: {
      fields: { name: string };
    };
    manufacturer: {
      fields: {
        name: string;
      };
    };
    seriesParameters: any;
  };
}
