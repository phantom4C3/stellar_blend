import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/blend_templates',
  SOROBAN_RPC_URL: process.env.SOROBAN_RPC_URL || 'https://soroban-testnet.stellar.org',
  BLEND_CONTRACT_ADDRESS: process.env.BLEND_CONTRACT_ADDRESS || '',
  NOTIFICATION_CONTRACT_ADDRESS: process.env.NOTIFICATION_CONTRACT_ADDRESS || '',
  API_SECRET: process.env.API_SECRET || 'default-secret',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  DEBUG_MODE: process.env.DEBUG_MODE || 'true',
};

export const requiredEnvVars = [
  'MONGODB_URI',
  'SOROBAN_RPC_URL',
  'BLEND_CONTRACT_ADDRESS',
  'NOTIFICATION_CONTRACT_ADDRESS',
];
requiredEnvVars.forEach((varName) => {
  if (!env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

