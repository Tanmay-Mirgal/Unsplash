import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://unsplash-ytfm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, // If needed
  },
})

