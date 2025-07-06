'use client'; 

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import  useWalletStore  from '@/stores/walletStore.js';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { wallet, connectWallet, error: walletError } = useWalletStore();

  useEffect(() => {
    const checkWallet = async () => {
      if (wallet?.address) {
        // No direct navigation here; handled by handleNavigate
      }
    };
    checkWallet();
  }, [wallet]);

  // Dynamically import useRouter for navigation
  const handleNavigate = async (path: string) => {
    const { useRouter } = await import('next/router');
    const router = useRouter();
    router.push(path);
  };

  const handleConnectWallet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await connectWallet();
      toast.success('Wallet connected successfully!');
      handleNavigate('/');
    } catch {
      setError(walletError || 'Failed to connect wallet');
      toast.error(`Wallet connection error: ${walletError || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    handleNavigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center rounded-4xl bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm">
        <h1 className="text-2xl font-mona-sans font-bold mb-4 text-black">Connect Wallet</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleConnectWallet}
          disabled={isLoading || wallet?.address !== undefined}
          className="w-full bg-pink-500 text-white py-2 rounded hover:scale-105 transition-colors disabled:bg-blue-300"
        >
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
        <button
          onClick={handleGoHome}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:scale-105 transition-colors"
          disabled={wallet?.address === undefined}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Auth;
