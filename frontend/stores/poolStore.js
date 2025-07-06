import { create } from 'zustand';
import { useWalletStore } from './walletStore';
import api from '@/lib/api';
import { DEFAULT_POOL_PARAMETERS, TEMPLATE_NAMES } from '../lib/constants';

const usePoolStore = create((set, get) => ({
  pools: [],   userPositions: [],   supportedAssets: [],   isLoading: false,
  error: null,

    fetchPools: async () => {
    set({ isLoading: true, error: null });
    try {
      const {data} = await api.fetchPools();
      if (response.ok) {
        set({
          pools: data.data.pools,
          isLoading: false,
        });
      } else {
        set({ error: data.message || 'Failed to fetch pools', isLoading: false });
      }
    } catch (err) {
      set({ error: 'Network error occurred', isLoading: false });
    }
  },

    fetchUserPositions: async () => {
    const wallet = useWalletStore.getState().wallet;
    if (!wallet?.address) {
      set({ error: 'Wallet not connected' });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const {data} = await api.fetchUserPositions();
      if (response.ok) {
        set({
          userPositions: data.data.positions,
          isLoading: false,
        });
      } else {
        set({ error: data.message || 'Failed to fetch user positions', isLoading: false });
      }
    } catch (err) {
      set({ error: 'Network error occurred', isLoading: false });
    }
  },

    fetchSupportedAssets: async () => {
    set({ isLoading: true, error: null });
    try {
      const {data} = await api.fetchSupportedAssets();
      if (response.ok) {
        set({
          supportedAssets: data.data.assets,
          isLoading: false,
        });
      } else {
        set({ error: data.message || 'Failed to fetch supported assets', isLoading: false });
      }
    } catch (err) {
      set({ error: 'Network error occurred', isLoading: false });
    }
  },

    deployPool: async (templateId, parameters) => {
    const wallet = useWalletStore.getState().wallet;
    if (!wallet?.address) {
      set({ error: 'Wallet not connected' });
      return;
    }

    if (!TEMPLATE_NAMES.includes(templateId)) throw new Error('Invalid template ID');
    
    set({ isLoading: true, error: null });
    try {
       const {data} = await api.deployPool({ templateId, parameters });
       await deployPoolToContract(templateId, parameters);
      if (response.ok) {
        set((state) => ({
          pools: [...state.pools, data.data.pool],
          isLoading: false,
        }));
        return data.data.pool;
      } else {
        set({ error: data.message || 'Failed to deploy pool', isLoading: false });
      }
    } catch (err) {
      set({ error: 'Network error occurred', isLoading: false });
    }
  },

    resetError: () => set({ error: null }),
}));

export default usePoolStore;
