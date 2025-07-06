export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001/api',
  TIMEOUT_MS: 30000,
};

export const NETWORK = {
  NETWORK_PASSPHRASE: 'Test SDF Network ; September 2015',
  SOROBAN_RPC_URL: 'https://soroban-testnet.stellar.org',
};

export const NOTIFICATION_TYPES = {
  CUSTOM: 'custom',
  RISK_ALERT: 'risk_alert',
  DEPOSIT: 'deposit',
  BORROW: 'borrow',
  POOL_DEPLOYED: 'pool_deployed',
};

export const NOTIFICATION_SEVERITIES = {
  INFO: 'info',
  WARNING: 'warning',
  HIGH: 'high',
};

export const NOTIFICATION_MAX_MESSAGE_LENGTH = 500;

export const DEFAULT_POOL_PARAMETERS = {
  ASSETS: ['XLM', 'USDC', 'ZUSD', 'AUDD', 'MBRL', 'KES', 'RWF', 'NGNT', 'BTC', 'ETH', 'REToken', 'GOLD', 'SVLR', 'LiquidityPoolShares', 'Custom'],
  DEFAULT_APY: 500,   DEFAULT_TVL: 100000,   DEFAULT_RISK_FACTOR: 'Low',
  DEFAULT_RATE: 0,
};

export const TEMPLATE_NAMES = [
  'StableYield',
  'GlobalFlow',
  'AssetVault',
  'CryptoBoost',
  'InclusiveLend',
  'Custom',
];

export const WALLET_CONFIG = {
  MIN_LENGTH_ADDRESS: 56,
  MAX_LENGTH_ADDRESS: 56,
};

export const CURRENT_DATE = new Date('2025-07-06T18:30:00+05:30'); export const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Wallet not connected',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_INPUT: 'Invalid input provided',
};

export const ASSET_DISPLAY = {
  XLM: { symbol: 'XLM', decimals: 7 },
  USDC: { symbol: 'USDC', decimals: 6 },
  ZUSD: { symbol: 'ZUSD', decimals: 6 },
  };

  export  const TEMPLATE_OPTIONS = {
  names: ['StableYield', 'GlobalFlow', 'AssetVault', 'CryptoBoost', 'InclusiveLend', 'Custom'],
  imageTypes: ['PNG', 'SVG', 'JPEG', 'GIF', 'WebP'],
  assets: ['XLM', 'USDC', 'ZUSD', 'AUDD', 'MBRL', 'KES', 'RWF', 'NGNT', 'BTC', 'ETH', 'REToken', 'GOLD', 'SVLR', 'LiquidityPoolShares', 'Custom'],
  popularity: ['Low', 'Medium', 'High', 'Very High'],
  apy: [0.02, 0.035, 0.05, 0.065, 0.078, 0.082, 0.1, 0.12],
  tvl: [100000, 500000, 800000, 1000000, 2300000, 3500000, 5000000, 6000000],
  riskFactors: ['Low', 'Medium', 'Medium-High', 'High', 'Very High'],
  deploymentFrequencies: ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'One-Time', 'Custom'],
  interestPeriods: ['weekly', 'bi-weekly', 'monthly', 'quarterly'],
  returnDurations: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Custom'],
  deposits: [10000, 100000, 500000, 700000, 1000000, 2000000, 3200000, 4800000, 5500000],
  borrows: [5000, 50000, 200000, 400000, 1000000, 1400000, 1800000, 2100000, 3200000],
  maxPositions: [1, 2, 3, 4, 5, 'Unlimited'],
  oracleProviders: ['Chainlink', 'MINTX', 'Band Protocol', 'Custom'],
  backstopModules: ['Enabled', 'Disabled'],
  collateralizationRatios: [1, 1.25, 1.5, 2],
  liquidationThresholds: [0.8, 0.85, 0.9],
  anchorIntegrations: ['MoneyGram', 'Cowrie', 'Vibrant', 'None'],
  poolTypes: ['Isolated', 'Cross-Pool'],
  accessControls: ['Public', 'Whitelisted', 'KYC-Required'],
  feeStructures: [0.001, 0.005, 0.01],
  loopingStrategies: ['Enabled', 'Disabled'],
  geographicFocuses: ['Global', 'Emerging Markets', 'Specific Region', 'Custom'],
};