import { Server, Contract, TransactionBuilder, Networks, Keypair, StrKey, Asset } from "@stellar/stellar-sdk";
import env from "../config/env.js";
import Pool from '../models/pool.models.js';
import { validatePoolData } from "./apyCalculator.js"; 

const sorobanClient = new Server(env.SOROBAN_RPC_URL);

const POOL_OPTIONS = {
  names: ['StableYield', 'GlobalFlow', 'AssetVault', 'CryptoBoost', 'InclusiveLend', 'Custom'],
  imageTypes: ['PNG', 'SVG', 'JPEG', 'GIF', 'WebP'],
  assets: ['XLM', 'USDC', 'ZUSD', 'AUDD', 'MBRL', 'KES', 'RWF', 'NGNT', 'BTC', 'ETH', 'REToken', 'GOLD', 'SVLR', 'LiquidityPoolShares', 'Custom'],
  popularity: ['Low', 'Medium', 'High', 'Very High'],
  apy: [0.02, 0.035, 0.05, 0.065, 0.078, 0.082, 0.1, 0.12, 'Custom'],
  tvl: [100000, 500000, 800000, 1000000, 2300000, 3500000, 5000000, 6000000, 'Custom'],
  riskFactors: ['Low', 'Medium', 'Medium-High', 'High', 'Very High'],
  deploymentFrequencies: ['Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'One-Time', 'Custom'],
  interestPercentages: [
    { rate: 0.001, period: 'weekly' },
    { rate: 0.004, period: 'monthly' },
    { rate: 0.005, period: 'monthly' },
    { rate: 0.007, period: 'bi-weekly' },
    { rate: 0.01, period: 'weekly' },
    { rate: 0.02, period: 'quarterly' },
    'Custom',
  ],
  collaterals: ['XLM', 'USDC', 'ZUSD', 'AUDD', 'MBRL', 'KES', 'RWF', 'NGNT', 'BTC', 'ETH', 'REToken', 'GOLD', 'SVLR', 'LiquidityPoolShares', 'None', 'Custom'],
  returnDurations: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Custom'],
  deposits: [10000, 100000, 500000, 700000, 1000000, 2000000, 3200000, 4800000, 5500000, 'Custom'],
  borrows: [5000, 50000, 200000, 400000, 1000000, 1400000, 1800000, 2100000, 3200000, 'Custom'],
  maxPositions: [1, 2, 3, 4, 5, 'Unlimited'],
  oracleProviders: ['Chainlink', 'MINTX', 'Band Protocol', 'Custom'],
  backstopModules: ['Enabled', 'Disabled'],
  collateralizationRatios: [1, 1.25, 1.5, 2, 'Custom'],
  liquidationThresholds: [0.8, 0.85, 0.9, 'Custom'],
  anchorIntegrations: ['MoneyGram', 'Cowrie', 'Vibrant', 'None'],
  poolTypes: ['Isolated', 'Cross-Pool'],
  accessControls: ['Public', 'Whitelisted', 'KYC-Required'],
  feeStructures: [0.001, 0.005, 0.01, 'Custom'],
  loopingStrategies: ['Enabled', 'Disabled'],
  geographicFocuses: ['Global', 'Emerging Markets', 'Specific Region', 'Custom'],
};

export function validateStellarAddress(address) {
    try {
        return StrKey.isValidEd25519PublicKey(address);
    } catch (error) {
        console.error("Error validating Stellar Address:", error);
        return false;
    }
}

export async function fetchAllPools() {
    try {
        const contract = new Contract(env.BLEND_CONTRACT_ADDRESS);
        const poolsData = await contract.call("get_all_pools");

        const enrichedPools = poolsData
        .filter(validatePoolData)
        .map((pool) => ({
            ...pool,
            defaultRate : pool.defaultRate || Math.random() * 0.1
        }));

        await Pool.deleteMany({});
        await Pool.insertMany(enrichedPools);

        return enrichedPools;
    } catch (error) {
        console.error("Error fetching Pools: ", error);
        throw new Error("Failed to fetch Pools from Blend's smart contract");
    }
}

export async function fetchUserPositions(userAddress) {
    if (!validateStellarAddress(userAddress)) {
         throw new Error("Invalid Stellar Address");
    }

    try {
        const contract = new Contract(env.BLEND_CONTRACT_ADDRESS);
        const positions = await contract.call("get_user_positions", userAddress);
        
        return positions.map((position) => ({
            ...position,
            defaultRate: position.defaultRate || Math.random() * 0.1,
        }));

    } catch (error) {
        console.error("Error fetching user positions:", error);
        throw new Error("Failed to fetch User Positions");
    }
}

export function validatePoolParams(params) {
    const errors = [];

    if (!POOL_OPTIONS.names.includes(params.name) && params.name !== "Custom") {
        errors.push("Invalid Pool Name");
    }
    
    if (!POOL_OPTIONS.imageTypes.includes(params.imageType)) {
        errors.push("Invalid Image Type");
    }

    if (!params.assets.every((asset) => POOL_OPTIONS.assets.includes(asset) || asset === "Custom")) {
        errors.push("Invalid Asset")
    }

    if (!POOL_OPTIONS.popularity.includes(params.popularity)) {
        errors.push("Invalid Popularity Setting")
    }
    
    if (!POOL_OPTIONS.apy.includes(params.apy) && params.apy !== "Custom") {
        if (typeof params.apy !== "number" || params.apy < 0.001 || params.apy > 0.2) {
            errors.push("Custom APY must be between 0.1% AND 20%");
        }
    }

    if (!POOL_OPTIONS.tvl.includes(params.tvl) && params.tvl !== "Custom") {
        if (typeof params.tvl !== "number" || params.apy < 1000) {
            errors.push("Custom TVL must be atleast $10,000");
        }
    }
    
    if (!POOL_OPTIONS.riskFactors.includes(params.riskFactors)) {
            errors.push("Invlaid Risk Factor");
    }
    
    if (!POOL_OPTIONS.deploymentFrequencies.includes(params.deploymentFrequencies)) {
            errors.push("Invalid Deployment Frequency");
    }
    
    if (!POOL_OPTIONS.interestPercentages.some(
        (ip) => typeof ip === "object" && ip.rate === params.interestPercentage?.rate && ip.period === params.interestPercentage?.period
    ) && params.interestPercentage !== "Custom") {
        if (! params.interestPercentage || 
            typeof params.interestPercentage.rate !== "number" ||
            params.interestPercentage.rate < 0.0001 || 
            params.interestPercentage.rate > 0.02 ||
        !["quarterly", "bi-weekly", "monthly", "weekly"].includes(params.interestPercentage.period)) {
            errors.push("Custom Interest Percentage must be between 0.01% AND 2% with a valid period");
        }
    }

    If (!params.allowedAssets.every((asset) => POOL_OPTIONS.assets.includes(asset) || asset === 'Custom')) {

        errors.push('Invalid allowed assets');
        
    }

    if (!params.collaterals.every((collateral) => POOL_OPTIONS.collaterals.includes(collateral) || collateral === 'Custom')) {

        errors.push('Invalid collaterals');

    }

    if (!POOL_OPTIONS.returnDurations.includes(params.returnDuration)) {

        errors.push('Invalid return duration');

    }

    if (!POOL_OPTIONS.deposits.includes(params.deposits) && params.deposits !== 'Custom') {

    if (typeof params.deposits !== 'number' || params.deposits < 10000) {

        errors.push('Custom deposits must be at least $10,000');

    }

    }

    if (!POOL_OPTIONS.borrows.includes(params.borrows) && params.borrows !== 'Custom') {

    if (typeof params.borrows !== 'number' || params.borrows < 5000) {

        errors.push('Custom borrows must be at least $5,000');

    }

    }

    if (!POOL_OPTIONS.maxPositions.includes(params.maxPositions)) {

        errors.push('Invalid maximum positions');

    }

    if (!POOL_OPTIONS.oracleProviders.includes(params.oracleProvider)) {

        errors.push('Invalid oracle provider');

    }

    if (!POOL_OPTIONS.backstopModules.includes(params.backstopModule)) {

        errors.push('Invalid backstop module setting');

    }

    if (!POOL_OPTIONS.collateralizationRatios.includes(params.collateralizationRatio) && params.collateralizationRatio !== 'Custom') {

    if (typeof params.collateralizationRatio !== 'number' || params.collateralizationRatio < 1 || params.collateralizationRatio > 3) {

        errors.push('Custom collateralization ratio must be between 100% and 300%');

    }

    }

    if (!POOL_OPTIONS.liquidationThresholds.includes(params.liquidationThreshold) && params.liquidationThreshold !== 'Custom') {

    if (typeof params.liquidationThreshold !== 'number' || params.liquidationThreshold < 0.5 || params.liquidationThreshold > 0.95) {

        errors.push('Custom liquidation threshold must be between 50% and 95%');

    }

    }

    if (!POOL_OPTIONS.anchorIntegrations.includes(params.anchorIntegration)) {

        errors.push('Invalid anchor integration');

    }

    if (!POOL_OPTIONS.poolTypes.includes(params.poolType)) {

        errors.push('Invalid pool type');

    }

    if (!POOL_OPTIONS.accessControls.includes(params.accessControl)) {

        errors.push('Invalid access control');

    }

    if (!POOL_OPTIONS.feeStructures.includes(params.feeStructure) && params.feeStructure !== 'Custom') {

    if (typeof params.feeStructure !== 'number' || params.feeStructure < 0.0005 || params.feeStructure > 0.02) {

        errors.push('Custom fee structure must be between 0.05% and 2%');

    }

    }

    if (!POOL_OPTIONS.loopingStrategies.includes(params.loopingStrategy)) {

        errors.push('Invalid looping strategy');

    }

    if (!POOL_OPTIONS.geographicFocuses.includes(params.geographicFocus)) {

        errors.push('Invalid geographic focus');

    }

    return {
        isValid : errors.length === 0,
        errors,
    }
}

export async function deployLendingPool(params, wallet) {
    try {
        const {isValid, errors} = validatePoolParams(params);
        if (!isValid) {
            throw new Error(`Invalid Pool Parameters: ${errors.join(", ")}`);
        }

        const contract = new Contract(blendContractAddress);
        const account = await sorobanClient.getAccount(wallet.address);

        const tx = new TransactionBuilder(account, {
            fee: "100",
            networkPassphrase: Networks.TESTNET,
        })
        .addOperation(
            contract.call("deploy_pool", {
                name: params.name,
                assets: params.asset,
                apy: params.apy,
                collateralizationRatio: params.collateralizationRatio,
                liquidationThreshold: params.liquidationThreshold,
                poolType: params.poolType
            })
        )
        .setTimeout(30)
        .build();

        const preparedTx = await sorobanClient.prepareTransaction(tx);
        const signedTx = await wallet.signedTransaction(preparedTx);
        const txResult = await sorobanClient.sendTransaction(signedTx);

        return { success:true, txHash: txResult.hash };
    } catch (error) {
        console.error("Error in deploying Lending Pool:", error);
        return { success: false, error: error.message }
    }
}

export async function getSupportedAssets() {
    try {
        const contract = new Contract(blendContractAddress);
        const assets = await contract.call("get_supported_assets");
        return assets.filter((asset) => POOL_OPTIONS.assets.includes(asset) || asset === "Custom");
    } catch (error) {
        console.error("Error fetching Supported Assets:", error);
        return POOL_OPTIONS.assets;
    }
}

export async function getNotificationsOnChain(userAddress) {
  try {
    const contract = new Contract(notificationContractAddress);
    const account = await sorobanClient.getAccount(userAddress);
    const txBuilder = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: Networks.TESTNET,
    });

    const tx = txBuilder
      .addOperation(contract.call('get_notifications', userAddress))
      .setTimeout(30)
      .build();

    return [
      {
        user: userAddress,
        type: 'risk_alert',
        severity: 'warning',
        message: 'Low TVL in template StableYield: $50000',
        template_id: 'mock_template_id',
        pool_id: null,
        timestamp: Date.now() / 1000,
      },
    ];
  } catch (error) {
    const err = new Error('Failed to fetch notifications');
    err.name = 'StellarError';
    err.cause = error.message;
    throw err;
  }
}

export async function addNotificationOnChain(userAddress, type, severity, message, templateId, poolId) {
  try {
    const contract = new Contract(notificationContractAddress);
    const account = await sorobanClient.getAccount(userAddress);
    const txBuilder = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: Networks.TESTNET,
    });

    const tx = txBuilder
      .addOperation(
        contract.call(
          'add_notification',
          userAddress,
          type,
          severity,
          message,
          templateId ? Buffer.from(templateId, 'hex') : null,
          poolId ? Buffer.from(poolId, 'hex') : null
        )
      )
      .setTimeout(30)
      .build();

    return {
      id: `onchain-${Date.now()}`,
      user: userAddress,
      type,
      severity,
      message,
      template_id: templateId,
      pool_id: poolId,
      timestamp: Date.now() / 1000,
    };
  } catch (error) {
    const err = new Error('Failed to add notification');
    err.name = 'StellarError';
    err.cause = error.message;
    throw err;
  }
}

export function createCustomAsset(assetCode, issuer) {
    try {
        if (!assetCode.match(/^[a-zA-Z0-9]{1, 12}$/)) {
            throw new Error("Invalid Asset Code: Must be 1-12 alphanumeric characters");
        }
        if (!issuer.match(/^G[A-Z0-9]{55}$/)) {
            throw new Error("Invalid issuer public key");
        }

        return new Asset(assetCode, issuer);
    } catch (error) {
        console.error("Error creating Custom Asset:", error);
        throw error;
        
    }
}

export default  async function getOraclePrice(oracleProvider, asset) {
    try {
        if (!POOL_OPTIONS.oracleProviders.includes(oracleProvider)) {
            throw new Error("Unsupported Oracle Provider");            
        }

        const mockPrice = {
            ChainLink: { USDC: 1.0, XLM:0.1, BTC:100000 },
            MINTX: { GOLD:2000, SVLR:25 },
            "Band Protocol": { KES:0.0077, RWF:0.00075 },
        };
        const price = mockPrice[oracleProvider]?.[asset];
        if (!price) {
            throw new Error(`Price feed unavailable for ${asset} pn ${oracleProvider}`);            
        }
        return { asset, price, oracle: oracleProvider };
    } catch (error) {
        console.error("Error fetching oracle price:", error);
        return { error:error.message };
    }
}

export function isAnchorSupported(anchor, asset) {
    const anchorAssets = {
        MoneyGram : ['USDC', "ZUSD", "AUDD", "MBRL"],
        Cowire: ["NGNT"],
        Vibrant: ["KES", "RWF"],
        None: [],
    }
    return POOL_OPTIONS.anchorIntegrations.includes(anchor) && anchorAssets[anchor]?.includes(asset)
}

export function validateCollateralSettings(params) {
    const { collateralizationRatio, liquidationThreshold } = params;
    if (
        (POOL_OPTIONS.collateralizationRatios.includes(collateralizationRatio) || (collateralizationRatio >=1 && collateralizationRatio <= 3)) &&
        (POOL_OPTIONS.liquidationThresholds.includes(liquidationThreshold) || (liquidationThreshold>=0.5 && liquidationThreshold <= 0.95))
    ) {
        return true;
    }
    return false;
}

export function getDefaultParams(templateName) {
    const templates = {
    StableYield: {
      name: 'StableYield',
      imageType: 'PNG',
      assets: ['USDC', 'ZUSD', 'AUDD'],
      popularity: 'High',
      apy: 0.065,
      tvl: 5000000,
      riskFactor: 'Low',
      deploymentFrequency: 'Monthly',
      interestPercentage: { rate: 0.005, period: 'monthly' },
      allowedAssets: ['USDC', 'ZUSD', 'AUDD', 'XLM'],
      collaterals: ['USDC', 'ZUSD', 'AUDD', 'XLM', 'LiquidityPoolShares'],
      returnDuration: 'Monthly',
      deposits: 4800000,
      borrows: 2100000,
      maxPositions: 5,
      oracleProvider: 'Chainlink',
      backstopModule: 'Enabled',
      collateralizationRatio: 1.5,
      liquidationThreshold: 0.85,
      anchorIntegration: 'MoneyGram',
      poolType: 'Isolated',
      accessControl: 'Public',
      feeStructure: 0.005,
      loopingStrategy: 'Disabled',
      geographicFocus: 'Global',
    },
    GlobalFlow: {
      name: 'GlobalFlow',
      imageType: 'SVG',
      assets: ['XLM', 'MBRL', 'KES', 'RWF'],
      popularity: 'Medium',
      apy: 0.082,
      tvl: 2300000,
      riskFactor: 'Medium',
      deploymentFrequency: 'Bi-weekly',
      interestPercentage: { rate: 0.007, period: 'bi-weekly' },
      allowedAssets: ['XLM', 'MBRL', 'KES', 'RWF', 'BTC'],
      collaterals: ['XLM', 'MBRL', 'KES', 'RWF', 'LiquidityPoolShares'],
      returnDuration: 'Bi-weekly',
      deposits: 2000000,
      borrows: 1400000,
      maxPositions: 3,
      oracleProvider: 'Band Protocol',
      backstopModule: 'Enabled',
      collateralizationRatio: 1.25,
      liquidationThreshold: 0.9,
      anchorIntegration: 'Vibrant',
      poolType: 'Isolated',
      accessControl: 'Public',
      feeStructure: 0.01,
      loopingStrategy: 'Disabled',
      geographicFocus: 'Emerging Markets',
    }
};
return templates[templateName] || {};
}

export async function depositToPool(poolId, userAddress, amount, asset) {
  try {
    const contract = new Contract(blendContractAddress);
    const account = await sorobanClient.getAccount(userAddress);
    const txBuilder = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: Networks.TESTNET,
    });

    const tx = txBuilder
      .addOperation(
        contract.call(
          'deposit_to_pool',
          Buffer.from(poolId, 'hex'),
          userAddress,
          amount,
          asset
        )
      )
      .setTimeout(30)
      .build();

      return {
      pool_id: poolId,
      user: userAddress,
      deposit_amount: amount,
      borrow_amount: 0,
      collateral: [asset],
    };
  } catch (error) {
    const err = new Error('Failed to deposit to pool');
    err.name = 'StellarError';
    err.cause = error.message;
    throw err;
  }
}

export async function borrowFromPool(poolId, userAddress, amount, collateral) {
  try {
    const contract = new Contract(blendContractAddress);
    const account = await sorobanClient.getAccount(userAddress);
    const txBuilder = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: Networks.TESTNET,
    });

    const tx = txBuilder
      .addOperation(
        contract.call(
          'borrow_from_pool',
          Buffer.from(poolId, 'hex'),
          userAddress,
          amount,
          JSON.stringify(collateral)
        )
      )
      .setTimeout(30)
      .build();

        return {
      pool_id: poolId,
      user: userAddress,
      deposit_amount: 0,
      borrow_amount: amount,
      collateral,
    };
  } catch (error) {
    const err = new Error('Failed to borrow from pool');
    err.name = 'StellarError';
    err.cause = error.message;
    throw err;
  }
}