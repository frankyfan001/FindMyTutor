const axios = require('axios');

const baseURL = 'http://localhost:8080/';
const instance = axios.create({
  baseURL,
  timeout: 1000,
});

export { instance as api };
