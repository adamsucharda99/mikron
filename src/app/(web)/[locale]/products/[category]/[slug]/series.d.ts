export interface Series {
  name: string;
  manufacturer: string;
  image: any;
  catalog?: any;
  description: any;
  machines: Machine[];
}

export interface Machine {
  name: string;
  image: any;
}
