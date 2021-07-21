const axios = require('axios');

const baseURL = 'http://localhost:8080/';
const headers = {
  'Content-Type': 'application/json',
};
const instance = axios.create({
  baseURL,
  timeout: 1000,
  headers,
});

export { instance as api };
