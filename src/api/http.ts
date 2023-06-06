import axios, { AxiosRequestConfig } from 'axios';
import fs from 'fs';

const http = () => {
  const cookies = fs.readFileSync('./tmp/cookies.txt').toString();
  const config: AxiosRequestConfig = {
    baseURL: process.env.PLATFORM_URL,
    timeout: 120000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
  };
  return axios.create(config);
};

export default http;
