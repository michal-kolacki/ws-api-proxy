import {RequestHandler} from 'express';
import fs from 'fs';
import http from '../api/http';

export const getProxy: RequestHandler = (req, res, next) => {
  console.log('GET: ', new Date().getTime(), req.url);
  return http().get(req.url).then(({data}) => {
    try {
      console.log(`./tmp/${req.url.split('/').join('-').split('?').join('-')}.json`);
      fs.writeFileSync(`./tmp/${req.url.split('/').join('-').split('?').join('-')}.json`, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
    return res.status(200).json(data);
  }).catch((err) => {
    console.log(err);
    return next(err);
  });
};

export const postProxy: RequestHandler = (req, res, next) => {
  console.log('POST: ', new Date().getTime(), req.url, req.body);
  return http().post(req.url, req.body).then(({data}) => {
    return res.status(200).json(data);
  }).catch((err) => next(err));
};

export const home: RequestHandler = (req, res, next) => {
  return res.status(200).json({
    'login': '/login',
  });
};

export const login: RequestHandler = (req, res, next) => {
  return http().post(`/api/users/login/`, {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  }).then((response) => {
    const cookies = response?.headers?.['set-cookie'];
    let cookiesString = '';
    if (cookies) {
      for (let i = 0; i < cookies.length; i++) {
        cookiesString = [cookiesString, cookies[i].split(';')[0]].join('; ');
      }
    }
    fs.writeFileSync('./tmp/cookies.txt', cookiesString);
    return res.status(200).json({status: 'ok'});
  }).catch((err) => next(err));
};
