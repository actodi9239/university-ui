// src/config/axiosConfig.js
import axios from 'axios';

// Configuración global de Axios
const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Asegúrate de que esta URL base esté correcta
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
