import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://ec2-16-171-68-169.eu-north-1.compute.amazonaws.com:80',
  timeout: 10000
});
