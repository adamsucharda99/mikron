export interface Series {
  _id: string;
  name: string;
  seriesParameterGroups: SeriesParameterGroup[];
}

export interface SeriesParameterGroup {
  _key: string;
  _type: 'seriesParameterGroup';
  label: Record<string, string>;
  seriesParameters: SeriesParameter[];
}

export interface SeriesParameter {
  id: string;
  _type: 'seriesParameter';
  label: Record<string, string>;
  unit?: string;
}
