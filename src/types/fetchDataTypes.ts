import { CurrencyCode } from "@/utils/convertCurrency";

export type AgentId = {
  _id: string;
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  password: string;
  phoneNumbers: { types: string[]; number: string }[]; // Assuming phoneNumbers is an array of objects with a type and number.
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar: string;
  socialMedia: {
    linkedIn: string;
    facebook: string;
    twitter: string;
    instagram: string;
    whatsapp: string;
  };
};
export interface Property {
  _id: string;
  title: {
    en: string;
    hy: string;
    rus: string;
  };
  description: {
    en: string;
    hy: string;
    rus: string;
  };
  type: string;
  category: string;
  isDuplicate: boolean;
  price: {
    amount: number;
    currency: CurrencyCode;
  };
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number;
    longitude: number;
    address:
      | {
          en: string;
          hy: string;
          rus: string;
        }
      | string;
    tCity: {
      en: string;
      hy: string;
      rus: string;
    };
    tState: {
      en: string;
      hy: string;
      rus: string;
    };
  };
  details: {
    bedrooms: number;
    bathrooms: string;
    area: string;
    totalAreas: number;
    totalRooms: string;
    floorNumber: number;
    totalFloors: number;
    utilities: string[];
    additionalUtilities: string[];
  };
  images: string[];
  likes: number;
  shares: number;
  views: number;
  agentId: AgentId;
  houseType: string;
  buildingType: string;
  renovation: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  projectType: string[];
  lastUpdatedTime: string;
  isContractBased: boolean;
  socials: {};
}

export interface Response {
  code: number;
  success: boolean;
  message: string;
  result: number;
  total: number;
}

export interface PropertyByIdResponse extends Response {
  data: Property;
}
export interface AllPropertyResponse extends Response {
  data: Property[];
  total: number;
  pagination: {
    currentPage: number;
    nextPage: number;
    prevPage: number;
    totalPages: number;
  };
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Contact {
  phone: string;
  email: string;
  fax: string;
  website: string;
}

export interface BranchManager {
  name: string;
  id: string;
}

export interface Branch {
  _id: string;
  name: string;
  coverImage: string;
  address: Address;
  contact: Contact;
  establishedDate: string; // ISO date string
  branchManager: BranchManager;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface BranchByIdResponse extends Response {
  data: Branch;
}

export interface AllBranchResponse extends Response {
  data: Branch[];
}

export type Options = {
  searchParams: Object;
};

//statistics
export interface StatisticsDay {
  _id: string;
  date: string;
  __v: number;
  totalLikes: number;
  totalShares: number;
  totalViews: number;
}

interface StatisticsData {
  _id: string;
  month: number;
  year: number;
  __v: number;
  days: StatisticsDay[];
  totalLikes: number;
  totalShares: number;
  totalViews: number;
}

export interface StatisticsUpdateResponse {
  code: number;
  success: boolean;
  message: string;
  data: StatisticsData;
}

export interface StatisticsYearData {
  code: number;
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  _id: string;
  year: number;
  __v: number;
  months: MonthStatistics[];
  totalLikes: number;
  totalShares: number;
  totalViews: number;
}

export interface MonthStatistics {
  _id: string;
  month: number;
  year: number;
  __v: number;
  days: string[];
  totalLikes: number;
  totalShares: number;
  totalViews: number;
}

//auth object
export interface Auth {
  user: User;
  expires: string;
}

interface User {
  name: string;
  email: string;
  sub: string;
  id: string;
  role: string;
  token: string;
  avatar: string;
  iat: number;
  exp: number;
  jti: string;
}
