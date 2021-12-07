import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDef from './docs/config/swaggerDef';
import router from './routes';
import {apiErroHandler} from './errorHandler/apiErrorHandle';

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Politico API',
  });
});

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDef);
});
app.use(morgan('dev'));

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDef));
app.use('/api/v1', router);
app.use(apiErroHandler)
export default app;