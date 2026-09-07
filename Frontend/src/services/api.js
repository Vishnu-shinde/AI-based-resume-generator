import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
