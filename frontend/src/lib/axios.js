import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, // If needed
  },
})

