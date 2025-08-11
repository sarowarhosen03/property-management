import { Response } from "./fetchDataTypes";

export interface PhoneNumber {
  number: string;
  types: ("whatsApp" | "viber" | "telegram" | "messenger")[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SocialMedia {
  linkedin: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumbers: PhoneNumber[];
  address: Address;
  avatar: string;
  bio: string;
  role: "agent" | "manager" | "director";
  branchId: {
    _id?: string;
    name?: string;
  };
  activity: {
    _id: string;
    userId: string;
    loginTime: string;
    ipAddress: string;
    userAgent: string;
  };
  __v: number;
}
export interface UserByIdResponse extends Response {
  data: User;
}

export interface AllUsersResponse extends Response {
  data: User[];
}
