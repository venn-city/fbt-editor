import logger from '@shared/Logger';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import { BAD_REQUEST } from 'http-status-codes';
import morgan from 'morgan';
import path from 'path';
import AuthenticationProvider from './providers/AuthenticationProvider';
import BaseRouter from './routes';

const authenticationProvider = new AuthenticationProvider();
// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

// default options
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(authenticationProvider.getCookiesSecret()));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
        statusCode: BAD_REQUEST
    });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
