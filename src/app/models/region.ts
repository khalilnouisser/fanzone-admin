export interface Region {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Governorate {
  regions: string[];
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
