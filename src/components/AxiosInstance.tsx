import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://www.alefowl.com',
  timeout: 10000
});
