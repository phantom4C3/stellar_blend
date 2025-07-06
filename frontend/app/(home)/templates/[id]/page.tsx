'use client'; 

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import  useWalletStore  from '@/stores/walletStore.js';

const TemplateDetails = () => {
  const [template, setTemplate] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWalletStore();

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!wallet?.address) {
        setError('Wallet not connected');
        setIsLoading(false);
        toast.error('Wallet not connected. Please connect your wallet.');
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        // Dynamically import useRouter to access query params
        const { useRouter } = await import('next/router');
        const router = useRouter();
        const { id } = router.query;

        if (!id || typeof id !== 'string') {
          setError('Invalid template ID');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`/api/templates/${id}`);
        if (!response.ok) throw new Error('Failed to fetch template details');
        const data = await response.json();
        setTemplate(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch template details');
        toast.error(`Error: ${err.message || 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplate();
  }, [wallet]);

  const handleNavigate = async (path: string) => {
    const { useRouter } = await import('next/router');
    const router = useRouter();
    router.push(path);
  };

  if (isLoading) return <div className="text-center text-gray-600 mt-[8rem]">Loading template details...</div>;
  if (error) return <div className="text-red-500 text-center mt-[8rem]">{error}</div>;
  if (!template) return <div className="text-center text-gray-600 mt-[8rem]">Template not found</div>;

  return (
    <div className="min-h-screen flex flex-col text-white items-center justify-center bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Template Details</h1>
        <p><strong>ID:</strong> {template.template_id}</p>
        <p><strong>Creator:</strong> {template.creator}</p>
        <p><strong>APY:</strong> {(template.parameters.apy / 100).toFixed(2)}%</p>
        <p><strong>TVL:</strong> {template.parameters.tvl.toLocaleString()} XLM</p>
        <p><strong>Risk Factor:</strong> {template.parameters.risk_factor}</p>
        <button
          onClick={() => handleNavigate('/')}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TemplateDetails;
