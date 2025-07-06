import { create } from "zustand";
import {
  getPublicKey,
  signTransaction,
  isConnected,
} from "@stellar/freighter-api"; 
import {NETWORK} from '@/lib/constants.js'
import { Server } from "@stellar/stellar-sdk/rpc";

const sorobanClient = new Server(NETWORK.SOROBAN_RPC_URL, {
  allowHttp: true,
});

const useWalletStore = create((set, get) => ({
  accountDetails: null,
  publicKey: null,
  secretKey: null,
  loading: false,
  error: null,
  wallet: null,
  signature: null,

  setPublicKey: (publicKey) => set({ publicKey }),
  setSecretKey: (secretKey) => set({ secretKey }),

  connectWallet: async () => {
    try {
      const publicKey = await getPublicKey();
      const challenge = "default-challenge";
      const signedChallenge = await signTransaction(challenge);

      setSignature(signedChallenge);
      setWallet({ address: publicKey, signature: signedChallenge });

      if (!(await isConnected())) {
        throw new Error("Freighter wallet is not installed or not connected");
      }

      set({ isLoading: false });
      return wallet;
    } catch (error) {
      alert("Failed to connect wallet.");
      console.error("Failed to connect Wallet", error);
    }
  },

  disconnectWallet: () => set({ wallet: null }),

  getAuthHeaders: () => {
    const { wallet } = useWalletStore.getState();
    return wallet
      ? {
          "x-stellar-address": wallet.address,
          "x-stellar-signature": wallet.signature,
        }
      : {};
  },

  resetError: () => set({ error: null }),

  getAccountDetails: async () => {
    const publicKey = get().publicKey;
    if (!publicKey) return;

    set({ loading: true });
    try {
    } catch (error) {
      console.error("Error loading Account");
      set({ error: "Error loading account" });
    } finally {
      set({ loading: false });
    }
  },

  submitTransaction: async (transaction) => {
    try {
      const result = await server.submitTransaction(transaction);
      return result;
    } catch (error) {
      console.error("Error submitting Transaction");
      throw error;
    }
  },

  signTransaction: async (transaction) => {
    const secretKey = get().secretKey;
    if (!secretKey) return;

    try {
      const keyPair = StellarSdk.KeyPair.fromSecretKey(secretKey);
      transaction.sign(keyPair);
      return transaction;
    } catch (error) {
      console.error("Error signing Transaction");
      throw error;
    }
  },

  buildTransaction: async (operation) => {
    const accountDetails = get().accountDetails;
    if (!accountDetails) return;

    try {
      const transaction = StellarSdk.TransactionBuilder(accountDetails)
        .addOperation(operation)
        .setTimeOut(30)
        .build();
      return transaction;
    } catch (error) {
      console.error("Error buiding Transaction", error);
      throw error;
    }
  },
}));

export default useWalletStore;
