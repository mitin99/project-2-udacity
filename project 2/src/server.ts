import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import products_routes from './handlers/product';
import cors from 'cors'
import user_routes from './handlers/user';
import order_routes from './handlers/order';
import order_product_routes from './handlers/order-product';


const app: express.Application = express();
const address: string = '0.0.0.0:3001';

const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionSuccessStatus: 200, //some legacy browser
};

app.use(cors(corsOptions))
app.use(bodyParser.json());
products_routes(app)
user_routes(app)
order_routes(app)
order_product_routes(app)

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.get('/test-cors', cors(corsOptions) as any, function (req, res, next) {
  res.json({ mgs: 'This is CORS-enabled with a middleware' });
});

app.listen(3001, function () {
  console.log(`starting app on: ${address}`);
});
