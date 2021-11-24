import dotenv from "dotenv"
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";


dotenv.config()

interface ComparePass {
    encryptedPwd: string;
    userPass: string;
}

interface Payload {
    id: string;
    email: string
}

export function generateToken(payload: Payload):string {
    const token = jwt.sign({payload}, process.env.JWT_SECRET as string, { expiresIn: "3d" })
    return token;
}

export function encryptPassword(pwd:string):string {
    const salt = bcrypt.genSaltSync(14);
    return bcrypt.hashSync(pwd, salt)
}

export function comparePassword({encryptedPwd, userPass}: ComparePass):boolean {
    return bcrypt.compareSync(encryptedPwd, userPass);
}