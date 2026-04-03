import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL;
console.log('API Base URL loaded:', baseURL);

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Tu peux ajouter des intercepteurs ici pour les tokens ou les logs
apiClient.interceptors.request.use((config) => {
  // console.log('Envoi de la requête à :', config.url)
  return config
})

export default apiClient
