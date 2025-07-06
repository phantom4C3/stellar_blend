"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DynamicSearch from "../components/DynamicSearch";
import TemplateCard from "../components/TemplateCard";
import { fetchPoolsFromContract } from "@/lib/soroban.js";
import  useWalletStore  from "../stores/walletStore";

const Home: React.FC = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { wallet } = useWalletStore();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!wallet?.address) {
        setError("Wallet not connected");
        setIsLoading(false);
        toast.error("Wallet not connected. Please connect your wallet.");
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const contractTemplates = await fetchPoolsFromContract();

        const apiResponse = await fetch("/api/templates");
        if (!apiResponse.ok)
          throw new Error("Failed to fetch templates from API");
        const apiTemplates = await apiResponse.json();

        const allTemplates = [...contractTemplates, ...apiTemplates]
          .reduce((unique, item) => {
            if (!unique.find((t) => t.template_id === item.template_id)) {
              return [...unique, item];
            }
            return unique;
          }, [])
          .slice(0, 10);

        setTemplates(allTemplates);
      } catch (err) {
        setError(err.message || "Failed to fetch templates");
        toast.error(
          `Error fetching templates: ${err.message || "Unknown error"}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, [wallet]);

  const handleNavigate = async (path: string) => {
    const { useRouter } = await import("next/router");
    const router = useRouter();
    router.push(path);
  };

  if (isLoading)
    return (
      <div className="text-center text-gray-600">Loading templates...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Lending Pool Marketplace
          </h1>
          <DynamicSearch />
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Template List
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.template_id}
                  template={{
                    ...template,
                    image:
                      `/template${templates.indexOf(template) + 1}.jpg` ||
                      "/mock-template.jpg",
                    rating: template.parameters.risk_factor > 2 ? 3 : 4,
                    description: `A lending pool with ${template.parameters.assets} assets offering ${template.parameters.apy}% APY.`,
                  }}
                  onClick={() =>
                    handleNavigate(`/template-details/${template.template_id}`)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <button
        onClick={() => handleNavigate("/deploy")}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Home;
