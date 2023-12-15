export interface Series {
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
  name: string;
  machineParameters: {
    _key: string;
    seriesParameterId: string;
    seriesParameterGroupKey: string;
  }[];
}

export interface SeriesParameterGroup {
  label: string;
  seriesParameters: {
    id: string;
    label: string;
    unit?: string;
  }[];
}
