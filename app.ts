import express, { Application, Request, Response } from 'express'
import cors from 'cors'


const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Politico API"
    });
});

app.get("/api/v1", (req:Request, res:Response) => {
    res.status(200).json({
        message: "Welcome to Politico API v1. Documentation coming soon."
    })
})


export default app