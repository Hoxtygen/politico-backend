import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerDef from './docs/config/swaggerDef';
import router from './routes';
import { apiErroHandler } from './errorHandler/apiErrorHandle';
import { isProd } from './middlewares/secure';
import path from 'path';

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


if (isProd()) {
  app.get('/api/v1', (req: Request, res: Response) => {
    res.status(200).json({
      status: 200,
      message: `Welcome to Politico API version 1. Documentation can be found at 
      https://politico-backend.herokuapp.com/api/v1/docs
      .`,
    });
  });
} else {
  app.get('/api/v1', (req: Request, res: Response) => {
    res.status(200).json({
      status: 200,
      message: `Welcome to Politico API version 1. Documentation can be found at http://localhost:4001/api/v1/docs
      .`,
    });
  });
}

//view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../public/views'))


app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDef);
});
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDef));
app.use(morgan('dev'));
app.use('/api/v1', router);
app.use(apiErroHandler)
export default app;