'use client'; 

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import  useWalletStore  from '@/stores/walletStore';

const Deploy = () => {
  const [templateData, setTemplateData] = useState({
    template_id: '',
    creator: '',
    parameters: {
      assets: '', 
      apy: '',
      tvl: '',
      risk_factor: '',
    },  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { wallet, connectWallet } = useWalletStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('parameters.')) {
      const param = name.split('.')[1];
      setTemplateData((prev) => ({
        ...prev,
        parameters: { ...prev.parameters, [param]: value },
      }));
    } else {
      setTemplateData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDeploy = async () => {
    if (!wallet?.address) {
      setError('Wallet not connected');
      toast.error('Please connect your wallet to deploy.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
            if (!templateData.template_id || !templateData.creator || !templateData.parameters.apy || !templateData.parameters.tvl || !templateData.parameters.risk_factor || !templateData.parameters.assets || !templateData.default_rate) {
        throw new Error('All fields are required');
      }

      await connectWallet(); 
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData),
      });
      if (!response.ok) throw new Error('Deployment failed');
      toast.success('Template deployed successfully!');
      const { useRouter } = await import('next/router');
      const router = useRouter();
      router.push('/');
    } catch (err) {
      setError(err.message || 'Failed to deploy template');
      toast.error(`Error: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = async (path: string) => {
    const { useRouter } = await import('next/router');
    const router = useRouter();
    router.push(path);
  };

  return (
    <div className="min-h-screen mt-[8rem] rounded-3xl flex flex-col text-black items-center justify-center bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 ">Deploy New Template</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          name="template_id"
          value={templateData.template_id}
          onChange={handleInputChange}
          placeholder="Template ID"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="creator"
          value={templateData.creator}
          onChange={handleInputChange}
          placeholder="Creator"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="parameters.assets"
          value={templateData.parameters.assets}
          onChange={handleInputChange}
          placeholder="Assets (e.g., XLM, USD)"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="parameters.apy"
          value={templateData.parameters.apy}
          onChange={handleInputChange}
          placeholder="APY (%)"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="parameters.tvl"
          value={templateData.parameters.tvl}
          onChange={handleInputChange}
          placeholder="TVL (XLM)"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="parameters.risk_factor"
          value={templateData.parameters.risk_factor}
          onChange={handleInputChange}
          placeholder="Risk Factor"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="default_rate"
          value={templateData.default_rate}
          onChange={handleInputChange}
          placeholder="Default Rate (%)"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          onClick={handleDeploy}
          disabled={isLoading}
          className="w-full bg-pink-500 text-white py-2 rounded hover:scale-105 transition-colors disabled:bg-green-300"
        >
          {isLoading ? 'Deploying...' : 'Deploy Template'}
        </button>
        <button
          onClick={() => handleNavigate('/')}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:scale-105 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Deploy;
