export interface User {
  id: number;
  fullName: string;
  phone: string;
  description: string;
  region: string;
  type: string;
  created_at: string;
  updated_at: string;
  sequentialNumber?: number;
}

export interface Params {
  regions: string[];
  userTypes: string[];
}
