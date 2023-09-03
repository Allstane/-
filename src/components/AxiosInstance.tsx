import axios from 'axios'

export const instance = axios.create({
  baseURL: 'localhost:80',
  timeout: 10000
});
