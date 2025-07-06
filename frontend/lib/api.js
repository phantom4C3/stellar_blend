import { useWalletStore } from '../stores/walletStore';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001/api';

const request = async (url, options = {}) => {
  const wallet = useWalletStore.getState().wallet;
  const headers = {
    'Content-Type': 'application/json',
    ...useWalletStore.getState().getAuthHeaders(),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

export const get = async (endpoint) => {
  return await request(endpoint);
};

export const post = async (endpoint, body) => {
  return await request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const del = async (endpoint) => {
  return await request(endpoint, {
    method: 'DELETE',
  });
};

export const api = {
  fetchNotifications: () => get('/notifications'),
  addNotification: (type, severity, message, templateId = null, poolId = null) =>
  post('/notifications', { type, severity, message, templateId, poolId }),
  clearNotification: (notificationId) => del(`/notifications/${notificationId}`),
  clearAllNotifications: () => del('/notifications'),

  fetchPools: () => get('/pools'),
  fetchUserPositions: () => get('/pools/positions'),
  fetchSupportedAssets: () => get('/pools/assets'),
  deployPool: (templateId, parameters) => post('/pools', { templateId, parameters }),

  depositToPool: (poolId, amount, asset) => post('/pools/positions/deposit', { poolId, amount, asset }),
  borrowFromPool: (poolId, amount, collateral) =>
  post('/pools/positions/borrow', { poolId, amount, collateral }),

  fetchTemplate: (id) => get(`/templates/${id}`),
  fetchTemplates: () => get('/templates'),
};

export default api;
