export interface Series {
  _id: string;
  name: string;
  manufacturer: string;
  imageUrl: string;
  catalogUrl?: string;
  description: {
    children: { _type: string; text: string; _key: string }[];
    listItem?: string;
  }[];
  machines: Machine[];
  seriesParameterGroups: SeriesParameterGroup[];
}

export interface Machine {
  _id: string;
  name: string;
  machineParameters: {
    _key: string;
    seriesParameterId: string;
    seriesParameterGroupKey: string;
    value: string;
    unit?: string;
  }[];
}

export interface SeriesParameterGroup {
  _key: string;
  label: string;
  seriesParameters: {
    id: string;
    label: string;
    unit?: string;
  }[];
}
