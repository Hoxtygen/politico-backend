import { Request, Response } from 'express';
import UserService from '../service/userService';
import { encryptPassword, generateToken } from './../middlewares/secure';
import { User } from './../typedef/index';


class UserController {

    static async signup(req: Request, res: Response) {
        let { firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, password }: User = req.body;
        password = encryptPassword(password)
        const newUserData = { firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, password };
        try {
            const userExists = await UserService.getUserByEmail(email)
            if (userExists) {
                return res.status(409).json({
                    status: 409,
                    message: "User already exists"
                })
            }
            const [newUser] = await UserService.createUser(newUserData);
            if (!newUser) {
                return res.status(400).json({
                    status: "error",
                    message: "Error creating new user"
                })
            }
            return res.status(201).json({
                status: "ok",
                message: "User created successfully",
                token: generateToken(newUser.id),
                newUser
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error
            })
        }

    }

    static async getUserByMail(req: Request, res: Response) {
        const email = req.body;
        const user = await UserService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            })
        }
        return res.status(200).json({
            status: 200,
            message: "User retrieved successfully",
            user
        })
    }
}

export default UserController;