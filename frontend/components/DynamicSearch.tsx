"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { fetchPoolsFromContract } from '../lib/soroban';
import  useWalletStore  from '../stores/walletStore';
import { CURRENT_DATE } from '../lib/constants';
import { TEMPLATE_OPTIONS } from "../lib/constants.js";

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

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    rating: '',
    riskFactor: '',
    popularity: '',
    deploymentFrequency: '',
    interestPercentage: '',
    date: '',
    apy: '',
    tvl: '',
    deposits: '',
    borrows: '',
  });
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWalletStore();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!wallet?.address) {
        setError('Wallet not connected');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const pools = await fetchPoolsFromContract();
        setTemplates(pools);
      } catch (err) {
        setError(err.message || 'Failed to fetch templates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [wallet]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesName = template.template_id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = !filters.rating || Math.round(template.parameters.apy / 100) === Number(filters.rating);
      const matchesRiskFactor = !filters.riskFactor || template.parameters.risk_factor === filters.riskFactor;
      const matchesPopularity = !filters.popularity || TEMPLATE_OPTIONS.popularity.includes(filters.popularity); // Placeholder logic
      const matchesDeploymentFrequency = !filters.deploymentFrequency || template.deployment_frequency?.toString() === filters.deploymentFrequency;
      const matchesInterestPercentage = !filters.interestPercentage || template.parameters.apy === Number(filters.interestPercentage) * 100;
      const matchesDate = !filters.date || template.created_at <= new Date(filters.date).getTime() / 1000;
      const matchesApy = !filters.apy || template.parameters.apy === Number(filters.apy) * 100;
      const matchesTvl = !filters.tvl || template.parameters.tvl === Number(filters.tvl);
      const matchesDeposits = !filters.deposits || template.deposits === Number(filters.deposits);
      const matchesBorrows = !filters.borrows || template.borrows === Number(filters.borrows);

      return matchesName && matchesRating && matchesRiskFactor && matchesPopularity && matchesDeploymentFrequency &&
             matchesInterestPercentage && matchesDate && matchesApy && matchesTvl && matchesDeposits && matchesBorrows;
    });
  }, [searchTerm, filters, templates]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return <div className="text-center text-gray-600">Loading templates...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Templates</h2>

      <div className="mb-4">
        <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700">Search by Name</label>
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter template name..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
          <select
            id="rating"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {Array.from({ length: 6 }, (_, i) => i).map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="riskFactor" className="block text-sm font-medium text-gray-700">Risk Factor</label>
          <select
            id="riskFactor"
            name="riskFactor"
            value={filters.riskFactor}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.riskFactors.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="popularity" className="block text-sm font-medium text-gray-700">Popularity</label>
          <select
            id="popularity"
            name="popularity"
            value={filters.popularity}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.popularity.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="deploymentFrequency" className="block text-sm font-medium text-gray-700">Deployment Frequency</label>
          <select
            id="deploymentFrequency"
            name="deploymentFrequency"
            value={filters.deploymentFrequency}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.deploymentFrequencies.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="interestPercentage" className="block text-sm font-medium text-gray-700">Interest Percentage (%)</label>
          <select
            id="interestPercentage"
            name="interestPercentage"
            value={filters.interestPercentage}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.apy.map((option) => (
              <option key={option} value={option}>{(option * 100).toFixed(2)}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date (Before)</label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            max={CURRENT_DATE.toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label htmlFor="apy" className="block text-sm font-medium text-gray-700">APY (%)</label>
          <select
            id="apy"
            name="apy"
            value={filters.apy}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.apy.map((option) => (
              <option key={option} value={option}>{(option * 100).toFixed(2)}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="tvl" className="block text-sm font-medium text-gray-700">TVL (XLM)</label>
          <select
            id="tvl"
            name="tvl"
            value={filters.tvl}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.tvl.map((option) => (
              <option key={option} value={option}>{option.toLocaleString()}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="deposits" className="block text-sm font-medium text-gray-700">Deposits (XLM)</label>
          <select
            id="deposits"
            name="deposits"
            value={filters.deposits}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.deposits.map((option) => (
              <option key={option} value={option}>{option.toLocaleString()}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="borrows" className="block text-sm font-medium text-gray-700">Borrows (XLM)</label>
          <select
            id="borrows"
            name="borrows"
            value={filters.borrows}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {TEMPLATE_OPTIONS.borrows.map((option) => (
              <option key={option} value={option}>{option.toLocaleString()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Search Results</h3>
        {filteredTemplates.length > 0 ? (
          <ul className="list-disc pl-5">
            {filteredTemplates.map((template) => (
              <li key={template.id} className="mb-2">
                {template.template_id} (APY: {(template.parameters.apy / 100).toFixed(2)}%, TVL: {template.parameters.tvl.toLocaleString()} XLM)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No templates found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
