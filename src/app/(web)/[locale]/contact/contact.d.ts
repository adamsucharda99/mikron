export interface ContactPage {
  title: string;
  pageBuilder: {
    departments: Department[];
  };
}

export interface Person {
  _key: string;
  name: string;
  position?: string;
  phone?: string[];
  email?: string;
  region?: string;
}

export interface Department {
  _key: string;
  department: string;
  people: Person[];
}
