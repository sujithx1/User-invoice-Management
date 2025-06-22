import express,{Request,Response,NextFunction} from 'express';
import cookieParser from "cookie-parser"
import cors from 'cors';
import { DB_Connection } from './config/mongoconection';
import { corsOptions } from './config/cors';
import morgan from "morgan"
import { errorHandler } from './presentations/middlewares/errorhandler';
import { router } from './presentations/routes/userrouts';

const app = express();



DB_Connection()
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded())
app.use(morgan('dev'))
app.use('/api',router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>
  {
    
    errorHandler(err, req, res, next)
  }  
);   




export {app}