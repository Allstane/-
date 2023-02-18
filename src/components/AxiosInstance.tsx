import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://alefowl.com/api',
  timeout: 10000
});
