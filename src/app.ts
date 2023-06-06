import express, { NextFunction, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRoutes from './routes/index';

const expressSanitizer = require('express-sanitizer');

const PORT = process.env.PORT || 9090;
const proxyApp = express();

proxyApp.use(cors({
  origin: 'http://localhost:6006',
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  optionsSuccessStatus: 200,
}));
proxyApp.use(urlencoded({extended: true}));
proxyApp.use(cookieParser('secret'));

proxyApp.use((req: any, res, next) => {
  res.locals.env = proxyApp.get('env') || 'development';
  next();
});

proxyApp.use(json());
proxyApp.use(expressSanitizer());

proxyApp.use('/', indexRoutes);

// 404 handler
proxyApp.use((req, res) => {
  return res.status(404).json();
});

// error handler
proxyApp.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (parseInt(err.toString(), 10) === 404) {
      return res.status(404).json({
        status: 'err',
        code: 404,
        message: 'Not found',
      });
    }
    return res.status(500).json({
      status: 'err',
      err,
      code: 500,
      message:
        'Unexpected error',
    });
  }
);

proxyApp.listen(PORT);
