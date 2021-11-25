import express, { Request, Response } from 'express';
import UserController from '../controller/userController';
import validateUserData from './../middlewares/validateBody';
import { userInfoSchema } from './../validation/index';

const router = express.Router();

router.get('/v1', (req: Request, res: Response) => {
  res.send(
    `Welcome to Politico API version 1. <br/>Documentation:
        <a href ="https://politico-backend.herokuapp.com/api/v1/docs">https://politico-backend.herokuapp.com/api/vi/docs</a>
        .`,
  );
});

router.get('/v1/user', UserController.getUserByMail);
router.post('/v1/signup', validateUserData(userInfoSchema), UserController.signup);

export default router;