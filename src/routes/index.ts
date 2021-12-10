import express, { Request, Response } from 'express';
import UserController from '../controller/userController';
import validateUserData from './../middlewares/validateBody';
import { loginDataSchema, userInfoSchema } from './../validation/index';

const router = express.Router();

router.get('/user', UserController.getUserByMail);
router.post('/signup', validateUserData(userInfoSchema), UserController.signup);
router.post("/login", validateUserData(loginDataSchema), UserController.loginUser)

export default router;