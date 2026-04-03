import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL;
console.log('API Base URL loaded:', baseURL);

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  return config
})

export default apiClient
