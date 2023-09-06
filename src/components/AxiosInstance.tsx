import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://www.alefowl.com:444',
  timeout: 10000
});
