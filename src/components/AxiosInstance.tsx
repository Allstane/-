import axios from 'axios'

export const instance = axios.create({
  baseURL: 'localhost:8080',
  timeout: 10000
});
