import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://lb-north-1c-235947014.eu-north-1.elb.amazonaws.com',
  timeout: 10000
});
