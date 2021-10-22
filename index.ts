import express, { Application, Request, Response } from 'express'
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config()


const app: Application = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Politico API"
    });
});


app.listen(port, () => {

    console.log(`Server is listening on port ${port}`);
})