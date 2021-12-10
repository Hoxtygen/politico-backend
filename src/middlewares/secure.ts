import dotenv from "dotenv"
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

dotenv.config()

export function generateToken(id:string, email:string): string {
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: "3d" })
    return token;
}

export function encryptPassword(pwd: string): string {
    const salt = bcrypt.genSaltSync(14);
    return bcrypt.hashSync(pwd, salt)
}

export function comparePassword( encryptedPwd:string, userPass:string): boolean {
    return bcrypt.compareSync(userPass, encryptedPwd);
}

export const isProd = () => process.env.NODE_ENV === 'production'
export const isDev = () => process.env.NODE_ENV === 'development'
