import { Request, Response } from 'express';
import UserService from '../service/userService';
import { encryptPassword, generateToken, comparePassword } from '../middlewares/secure';
import { User } from '../typedef';

class UserController {
  static async signup(req: Request, res: Response) {
    let {
      firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, password, gender,
    }: User = req.body;
    password = encryptPassword(password);
    const newUserData = {
      firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, password, gender,
    };
    try {
      const userExists = await UserService.getUserByEmail(email);
      if (userExists) {
        return res.status(409).json({
          status: 409,
          message: 'User already registered',
        });
      }
      const [newUser] = await UserService.createUser(newUserData);
      if (newUser) {
        const { id, email } = newUser;
        const token = generateToken(id, email);
        return res.status(201).json({
          status: 'ok',
          message: 'User created successfully',
          token,
          user: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            otherName: newUser.otherName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            passportUrl: newUser.passportUrl,
            isAdmin: newUser.isAdmin,
            gender: newUser.gender
          }
        });
      }
      return res.status(400).json({
        status: 'error',
        message: 'Error creating new user',
      });
    } catch (error) {
      return res.status(503).json({
        status: 'error',
        message: error,
      });
    }
  }

  static async getUserByMail(req: Request, res: Response) {
    const { email } = req.body;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'User retrieved successfully',
      user,
    });
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password }: { email: string, password: string } = req.body;
    try {
      const user = await UserService.getUserByEmail(email)
      if (user && comparePassword(user.password, password)) {
        return res.status(200).json({
          status: 200,
          message: `Welcome ${user.email}`,
          token: generateToken(user.id, user.email),
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            otherName: user.otherName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            passportUrl: user.passportUrl,
            isAdmin: user.isAdmin,
            gender: user.gender

          }
        })
      }
      return res.status(401).json({
        status: 401,
        message: "Incorrect email/password"
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error
      })
    }
  }
}

export default UserController;
