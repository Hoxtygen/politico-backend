export interface User {
    firstName: string;
    lastName: string;
    otherName?: string;
    email: string;
    password: string;
    phoneNumber: string;
    isAdmin?: boolean;
    passportUrl: string
}