import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:8085',
  timeout: 1000
});