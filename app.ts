import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import swaggerDef from "./docs/config/swaggerDef"
import dotenv from "dotenv"
import router from "./src/routes"
dotenv.config()
const port = process.env.PORT || 4001;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Politico API"
    });
});

app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerDef);
})

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDef))

app.use("/api/", router)


export default app