import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 1|Zlgu0vBTVsxQLA8ZUX6JR056RoMSQI5Pwd1DfK1C42d17b71'
  },
  
});

export default api;
