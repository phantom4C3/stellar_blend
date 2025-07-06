"use client";

import React, { useState, useEffect } from "react";
import { fetchPoolsFromContract } from "@/lib/soroban.js";
import useWalletStore from "@/stores/walletStore";
import { CURRENT_DATE } from "@/lib/constants";
import Image from "next/image";

interface Pool {
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

const TemplateCard: React.FC<{ templateId: string }> = ({ templateId }) => {
  const [pool, setPool] = useState<Pool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWalletStore();

  useEffect(() => {
    const fetchPoolData = async () => {
      if (!wallet?.address) {
        setError("Wallet not connected");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const pools = await fetchPoolsFromContract();
        const poolData = pools.find((p) => p.template_id === templateId);
        if (poolData) {
          const frequency = Math.floor(
            (CURRENT_DATE.getTime() / 1000 - poolData.created_at) / (86400 * 30)
          );
          const deposits = poolData.parameters.tvl;
          const borrows = Math.floor(poolData.parameters.tvl * 0.5);

          setPool({
            ...poolData,
            deployment_frequency: frequency > 0 ? frequency : 1,
            deposits,
            borrows,
          });
        } else {
          setError("Pool data not found for this template");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch pool data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoolData();
  }, [templateId, wallet]);

  if (isLoading)
    return (
      <div className="border p-4 rounded shadow animate-pulse bg-gray-200">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="border p-4 rounded shadow text-red-500">{error}</div>
    );
  if (!pool) return null;

  const renderStars = () => {
    const maxStars = 5;
    return Array.from({ length: maxStars }, (_, index) => (
      <span
        key={index}
        className={
          index < Math.round(pool.parameters.apy / 100)
            ? "text-yellow-400"
            : "text-gray-300"
        }
      >
        ★
      </span>
    ));
  };

  const riskColor =
    pool.parameters.risk_factor.toLowerCase() === "low"
      ? "text-green-500"
      : "text-red-500";

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto bg-white">
      <div className="w-full h-48 bg-gray-300">
        <Image
          src={`/api/image?template=${templateId}`}
          alt={`${templateId} template`}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/placeholder-image.jpg")}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{templateId}</h3>
        <div className="flex items-center mb-2">
          {renderStars(pool.parameters.apy / 100)}
          <span className="ml-2 text-sm text-gray-600">
            ({Math.round(pool.parameters.apy / 100)}/5)
          </span>
        </div>
        <p className={`text-sm mb-2 ${riskColor}`}>
          Risk Factor: {pool.parameters.risk_factor}
        </p>
        <p className="text-sm mb-2">
          Deployment Frequency: {pool.deployment_frequency} months
        </p>
        <p className="text-sm mb-2">
          Collaterals: {pool.parameters.assets.join(", ")}
        </p>
        <p className="text-sm mb-2">
          Allowed Assets: {pool.parameters.assets.join(", ")}
        </p>
        <p className="text-sm mb-2">
          Return Rate: {(pool.parameters.apy / 100).toFixed(2)}% | Duration: N/A
        </p>
        <div className="border-t mt-2 pt-2">
          <p className="text-lg font-bold">
            Deposits: {pool.deposits?.toLocaleString()} XLM
          </p>
          <p className="text-lg font-bold">
            Borrows: {pool.borrows?.toLocaleString()} XLM
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
