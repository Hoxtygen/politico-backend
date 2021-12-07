import type { Asserts } from 'yup';
import { userInfoSchema } from '../validation';

type Gender = "male" | "female" | "transgender" | "cisgender" | "non-binary"

export interface User {
    firstName: string;
    lastName: string;
    otherName?: string;
    email: string;
    password: string;
    phoneNumber: string;
    isAdmin?: boolean;
    passportUrl: string;
    gender: Gender
}

export interface ErrorT {
    code: number;
    message:string;
  }


  export interface ValidationT  {
    [key: string]: string;
  }

export interface ValidatedUserSchema extends Asserts<typeof userInfoSchema> {}
