"use client";

import React, { useState, useEffect } from 'react';
import TemplateCard from './TemplateCard'
import { fetchPoolsFromContract } from '../lib/soroban';
import  useWalletStore  from '../stores/walletStore';
import Link from 'next/link';

interface Template {
  id: string;
  template_id: string;
  creator: string;
  parameters: {
    assets: string[];
    apy: number;
    tvl: number;
    risk_factor: string;
  };
  default_rate: number;
  created_at: number;
  updated_at: number;
  deployment_frequency?: number;
  deposits?: number;
  borrows?: number;
}

interface TemplateListProps {
  templates: Template[];
}

const TemplateList: React.FC<TemplateListProps> = ({ templates: initialTemplates }) => {
  const [topTemplates, setTopTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWalletStore();

  useEffect(() => {
    const fetchTopTemplates = async () => {
      if (!wallet?.address) {
        setError('Wallet not connected');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const pools = await fetchPoolsFromContract();
        const sortedTemplates = pools
          .sort((a, b) => (b.parameters.apy / 100) - (a.parameters.apy / 100)) // Sort by APY as rating proxy
          .slice(0, 10); // Limit to top 10
        setTopTemplates(sortedTemplates);
      } catch (err) {
        setError(err.message || 'Failed to fetch templates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTemplates();
  }, [wallet]);

  if (isLoading) return <div className="text-center text-gray-600">Loading templates...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!topTemplates.length) return <div className="text-center text-gray-600">No templates available</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Lending Pool Templates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topTemplates.map((template) => (
          <div key={template.id} className="relative group">
            <TemplateCard templateId={template.template_id} />
            <Link href={`/templates/${template.template_id}`} passHref>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors absolute bottom-0 left-0 opacity-0 group-hover:opacity-100">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateList;
