export interface ProductMenuDataParent {
  name: string;
  children?: ProductMenuDataChild[];
}

export interface ProductMenuDataChild {
  name: string;
  series?: ProductMenuDataSeries[];
}

export interface ProductMenuDataSeries {
  _id: string;
  name: string;
  slug: string;
  manufacturer: string;
}
