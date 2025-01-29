import axios from 'axios';

// export const BASE_URL = 'http://192.168.242.139:8080/api/v1/';
// export const BASE_URL = 'http://192.168.242.139:8080/api/v1/';
// export const BASE_URL = 'http://192.168.242.139:8080/api/v1/';
// export const BASE_URL = 'http://192.168.242.139:8080/api/v1/';
// export const BASE_URL = 'http://192.168.96.139:8080/api/v1/';
// export const BASE_URL = 'http://192.168.43.116:8080/api/v1/';
// export const BASE_URL = 'http://192.168.96.139:8080/api/v1/';
// export const BASE_URL = 'http://192.168.199.139:8080/api/v1/';
export const BASE_URL = 'https://spring-chat-application.onrender.com/api/v1/';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
  timeout: 6000, // Specify a timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  },
});

export default axiosInstance;
