import logger from "@shared/Logger";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import { BAD_REQUEST } from "http-status-codes";
import morgan from "morgan";
import path from "path";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import BaseRouter from "./routes";
import cors from 'cors';
import bodyParser from 'body-parser';

const API_PREFIX = process.env.API_PREFIX || '';
const authenticationProvider = new AuthenticationProvider();
// Init express
const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

// default options
app.use(fileUpload());
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true
}));

app.use(express.urlencoded({ extended: true }));

if(process.env.CORS_ORIGIN){
  app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
  }));
}

app.use(cookieParser(authenticationProvider.getCookiesSecret()));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use(API_PREFIX + "/api", BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message,
    statusCode: BAD_REQUEST,
  });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));
// Export express instance
export default app;
