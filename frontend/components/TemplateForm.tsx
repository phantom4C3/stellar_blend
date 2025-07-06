"use client";

import React, { useState } from 'react';
import { TEMPLATE_OPTIONS } from '../lib/constants.js'

interface TemplateFormProps {
  initialValues?: {
    name?: string;
    description?: string;
    content?: string;
    imageType?: string;
    asset?: string;
    popularity?: string;
    apy?: number;
    tvl?: number;
    riskFactor?: string;
    deploymentFrequency?: string;
    interestPeriod?: string;
    returnDuration?: string;
    deposit?: number;
    borrow?: number;
    maxPosition?: number | string;
    oracleProvider?: string;
    backstopModule?: string;
    collateralizationRatio?: number;
    liquidationThreshold?: number;
    anchorIntegration?: string;
    poolType?: string;
    accessControl?: string;
    feeStructure?: number;
    loopingStrategy?: string;
    geographicFocus?: string;
  };
  onSubmit: (formData: {
    name: string;
    description: string;
    content: string;
    imageType: string;
    asset: string;
    popularity: string;
    apy: number;
    tvl: number;
    riskFactor: string;
    deploymentFrequency: string;
    interestPeriod: string;
    returnDuration: string;
    deposit: number;
    borrow: number;
    maxPosition: number | string;
    oracleProvider: string;
    backstopModule: string;
    collateralizationRatio: number;
    liquidationThreshold: number;
    anchorIntegration: string;
    poolType: string;
    accessControl: string;
    feeStructure: number;
    loopingStrategy: string;
    geographicFocus: string;
  }) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ initialValues = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    description: initialValues.description || '',
    content: initialValues.content || '',
    imageType: initialValues.imageType || 'PNG',
    asset: initialValues.asset || 'XLM',
    popularity: initialValues.popularity || 'Low',
    apy: initialValues.apy || 0.02,
    tvl: initialValues.tvl || 100000,
    riskFactor: initialValues.riskFactor || 'Low',
    deploymentFrequency: initialValues.deploymentFrequency || 'Monthly',
    interestPeriod: initialValues.interestPeriod || 'monthly',
    returnDuration: initialValues.returnDuration || 'Monthly',
    deposit: initialValues.deposit || 10000,
    borrow: initialValues.borrow || 5000,
    maxPosition: initialValues.maxPosition || 1,
    oracleProvider: initialValues.oracleProvider || 'Chainlink',
    backstopModule: initialValues.backstopModule || 'Disabled',
    collateralizationRatio: initialValues.collateralizationRatio || 1,
    liquidationThreshold: initialValues.liquidationThreshold || 0.8,
    anchorIntegration: initialValues.anchorIntegration || 'None',
    poolType: initialValues.poolType || 'Isolated',
    accessControl: initialValues.accessControl || 'Public',
    feeStructure: initialValues.feeStructure || 0.001,
    loopingStrategy: initialValues.loopingStrategy || 'Disabled',
    geographicFocus: initialValues.geographicFocus || 'Global',
  });
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    content: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      description: formData.description ? '' : 'Description is required',
      content: formData.content ? '' : 'Content is required',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Template</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <select
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.names.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          rows={3}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          rows={4}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="imageType" className="block text-sm font-medium text-gray-700">Image Type</label>
        <select
          id="imageType"
          name="imageType"
          value={formData.imageType}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.imageTypes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="asset" className="block text-sm font-medium text-gray-700">Asset</label>
        <select
          id="asset"
          name="asset"
          value={formData.asset}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.assets.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="popularity" className="block text-sm font-medium text-gray-700">Popularity</label>
        <select
          id="popularity"
          name="popularity"
          value={formData.popularity}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.popularity.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="apy" className="block text-sm font-medium text-gray-700">APY</label>
        <select
          id="apy"
          name="apy"
          value={formData.apy}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, value: Number(e.target.value) } } as any)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.apy.map((option) => (
            <option key={option} value={option}>{(option * 100).toFixed(2)}%</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="tvl" className="block text-sm font-medium text-gray-700">TVL</label>
        <select
          id="tvl"
          name="tvl"
          value={formData.tvl}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, value: Number(e.target.value) } } as any)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.tvl.map((option) => (
            <option key={option} value={option}>{option.toLocaleString()} XLM</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="riskFactor" className="block text-sm font-medium text-gray-700">Risk Factor</label>
        <select
          id="riskFactor"
          name="riskFactor"
          value={formData.riskFactor}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.riskFactors.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="deploymentFrequency" className="block text-sm font-medium text-gray-700">Deployment Frequency</label>
        <select
          id="deploymentFrequency"
          name="deploymentFrequency"
          value={formData.deploymentFrequency}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.deploymentFrequencies.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="interestPeriod" className="block text-sm font-medium text-gray-700">Interest Period</label>
        <select
          id="interestPeriod"
          name="interestPeriod"
          value={formData.interestPeriod}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.interestPeriods.map((option) => (
            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="returnDuration" className="block text-sm font-medium text-gray-700">Return Duration</label>
        <select
          id="returnDuration"
          name="returnDuration"
          value={formData.returnDuration}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.returnDurations.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">Deposit</label>
        <select
          id="deposit"
          name="deposit"
          value={formData.deposit}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, value: Number(e.target.value) } } as any)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.deposits.map((option) => (
            <option key={option} value={option}>{option.toLocaleString()} XLM</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="borrow" className="block text-sm font-medium text-gray-700">Borrow</label>
        <select
          id="borrow"
          name="borrow"
          value={formData.borrow}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, value: Number(e.target.value) } } as any)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.borrows.map((option) => (
            <option key={option} value={option}>{option.toLocaleString()} XLM</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="maxPosition" className="block text-sm font-medium text-gray-700">Max Position</label>
        <select
          id="maxPosition"
          name="maxPosition"
          value={formData.maxPosition}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.maxPositions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="oracleProvider" className="block text-sm font-medium text-gray-700">Oracle Provider</label>
        <select
          id="oracleProvider"
          name="oracleProvider"
          value={formData.oracleProvider}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.oracleProviders.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="backstopModule" className="block text-sm font-medium text-gray-700">Backstop Module</label>
        <select
          id="backstopModule"
          name="backstopModule"
          value={formData.backstopModule}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.backstopModules.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="collateralizationRatio" className="block text-sm font-medium text-gray-700">Collateralization Ratio</label>
        <select
          id="collateralizationRatio"
          name="collateralizationRatio"
          value={formData.collateralizationRatio}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, value: Number(e.target.value) } } as any)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.collateralizationRatios.map((option) => (
            <option key={option} value={option}>{option}:1</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="liquidationThreshold" className="block text-sm font-medium text-gray-700">Liquidation Threshold</label>
        <select
          id="liquidationThreshold"
          name="liquidationThreshold"
          value={formData.liquidationThreshold}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, value: Number(e.target.value) } } as any)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.liquidationThresholds.map((option) => (
            <option key={option} value={option}>{(option * 100).toFixed(0)}%</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="anchorIntegration" className="block text-sm font-medium text-gray-700">Anchor Integration</label>
        <select
          id="anchorIntegration"
          name="anchorIntegration"
          value={formData.anchorIntegration}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.anchorIntegrations.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="poolType" className="block text-sm font-medium text-gray-700">Pool Type</label>
        <select
          id="poolType"
          name="poolType"
          value={formData.poolType}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.poolTypes.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="accessControl" className="block text-sm font-medium text-gray-700">Access Control</label>
        <select
          id="accessControl"
          name="accessControl"
          value={formData.accessControl}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.accessControls.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="feeStructure" className="block text-sm font-medium text-gray-700">Fee Structure</label>
        <select
          id="feeStructure"
          name="feeStructure"
          value={formData.feeStructure}
          onChange={(e) => handleChange({ ...e, target: { ...e.target, value: Number(e.target.value) } } as any)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.feeStructures.map((option) => (
            <option key={option} value={option}>{(option * 100).toFixed(2)}%</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="loopingStrategy" className="block text-sm font-medium text-gray-700">Looping Strategy</label>
        <select
          id="loopingStrategy"
          name="loopingStrategy"
          value={formData.loopingStrategy}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.loopingStrategies.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="geographicFocus" className="block text-sm font-medium text-gray-700">Geographic Focus</label>
        <select
          id="geographicFocus"
          name="geographicFocus"
          value={formData.geographicFocus}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          {TEMPLATE_OPTIONS.geographicFocuses.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
      >
        Submit Template
      </button>
    </form>
  );
};

export default TemplateForm;
