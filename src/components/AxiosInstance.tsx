import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://ec2-13-48-204-23.eu-north-1.compute.amazonaws.com/api',
  timeout: 10000
});
