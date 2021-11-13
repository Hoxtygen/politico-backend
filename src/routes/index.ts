import express, { Application, Request, Response } from 'express'
import UserController from './../controller/userController';
const router = express.Router();


router.get("/v1", (req: Request, res: Response) => {
    res.send(
        `Welcome to Politico API version 1. <br/>Documentation:
        <a href ="https://politico-backend.herokuapp.com/api/vi/docs">https://politico-backend.herokuapp.com/api/vi/docs</a>
        .`
    )
})

router.get("/v1/user", UserController.getUserByMail)



export default router;