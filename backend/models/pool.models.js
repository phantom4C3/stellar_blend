import mongoose from "mongoose";

const POOL_OPTIONS = {
  names: [
    "StableYield",
    "GlobalFlow",
    "AssetVault",
    "CryptoBoost",
    "InclusiveLend",
    "Custom",
  ],
  imageTypes: ["PNG", "SVG", "JPEG", "GIF", "WebP"],
  assets: [
    "XLM",
    "USDC",
    "ZUSD",
    "AUDD",
    "MBRL",
    "KES",
    "RWF",
    "NGNT",
    "BTC",
    "ETH",
    "REToken",
    "GOLD",
    "SVLR",
    "LiquidityPoolShares",
    "Custom",
  ],
  popularity: ["Low", "Medium", "High", "Very High"],
  apy: [0.02, 0.035, 0.05, 0.065, 0.078, 0.082, 0.1, 0.12],
  tvl: [100000, 500000, 800000, 1000000, 2300000, 3500000, 5000000, 6000000],
  riskFactors: ["Low", "Medium", "Medium-High", "High", "Very High"],
  deploymentFrequencies: [
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Quarterly",
    "One-Time",
    "Custom",
  ],
  interestPeriods: ["weekly", "bi-weekly", "monthly", "quarterly"],
  returnDurations: [
    "Daily",
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Quarterly",
    "Custom",
  ],
  deposits: [
    10000, 100000, 500000, 700000, 1000000, 2000000, 3200000, 4800000, 5500000,
  ],
  borrows: [
    5000, 50000, 200000, 400000, 1000000, 1400000, 1800000, 2100000, 3200000,
  ],
  maxPositions: [1, 2, 3, 4, 5, "Unlimited"],
  oracleProviders: ["Chainlink", "MINTX", "Band Protocol", "Custom"],
  backstopModules: ["Enabled", "Disabled"],
  collateralizationRatios: [1, 1.25, 1.5, 2],
  liquidationThresholds: [0.8, 0.85, 0.9],
  anchorIntegrations: ["MoneyGram", "Cowrie", "Vibrant", "None"],
  poolTypes: ["Isolated", "Cross-Pool"],
  accessControls: ["Public", "Whitelisted", "KYC-Required"],
  feeStructures: [0.001, 0.005, 0.01],
  loopingStrategies: ["Enabled", "Disabled"],
  geographicFocuses: [
    "Global",
    "Emerging Markets",
    "Specific Region",
    "Custom",
  ],
};

const poolSchema = new mongoose.Schema(
  {
    poolId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (v) =>
          POOL_OPTIONS.names.includes(v) ||
          v === "Custom" ||
          /^[a-zA-Z0-9\s]{1,50}$/.test(v),
        message: "Invalid pool name",
      },
    },
    imageType: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.imageTypes,
      message: "Invalid image type",
    },
    asets: {
      type: [{ tyoe: String }],
      required: true,
      validate: {
        validator: (v) =>
          v.every(
            (asset) => POOL_OPTIONS.assets.includes(asset) || asset === "Custom"
          ),
        message: "Invalid Assets",
      },
    },
    popularity: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.popularity,
      message: "Invalid popularity setting",
    },
    apy: {
      type: Number,
      required: true,
      validate: {
        validate: (v) =>
          POOL_OPTIONS.apy.includes(v) || (v >= 0.001 && v <= 0.2),
        message: "APY must be between 0.1% and 20%",
      },
    },
    tvl: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => POOL_OPTIONS.tvl.includes(v) || v >= 10000,
        message: "TVL must be at least $10,000",
      },
    },
    riskFactor: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.riskFactors,
      message: "Invalid risk factor",
    },
    deploymentFrequency: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.deploymentFrequencies,
      message: "Invalid deployment frequency",
    },
    interestPercentage: {
      rate: {
        type: Number,
        required: true,
        validate: {
          validator: (v) => v >= 0.0001 && v <= 0.02,
          message: "Interest rate must be between 0.01% and 2%",
        },
      },
      period: {
        type: String,
        required: true,
        enum: POOL_OPTIONS.interestPeriods,
        message: "Invalid interest period",
      },
    },
    allowedAssets: {
      type: [{ type: String }],
      required: true,
      validate: {
        validator: (v) =>
          v.every(
            (asset) => POOL_OPTIONS.assets.includes(asset) || asset === "Custom"
          ),
        message: "Invalid allowed assets",
      },
    },
    collaterals: {
      type: [{ type: String }],
      required: true,
      validate: {
        validator: (v) =>
          v.every(
            (collateral) =>
              POOL_OPTIONS.assets.includes(collateral) ||
              collateral === "Custom" ||
              collateral === "None"
          ),
        message: "Invalid collaterals",
      },
    },
    returnDuration: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.returnDurations,
      message: "Invalid return duration",
    },
    deposits: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => POOL_OPTIONS.deposits.includes(v) || v >= 10000,
        message: "Deposits must be at least $10,000",
      },
    },
    borrows: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => POOL_OPTIONS.borrows.includes(v) || v >= 5000,
        message: "Borrows must be at least $5,000",
      },
    },
    maxPositions: {
      type: mongoose.Mixed,
      required: true,
      validate: {
        validator: (v) => POOL_OPTIONS.maxPositions.includes(v),
        message: "Invalid maximum positions",
      },
    },
    oracleProvider: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.oracleProviders,
      message: "Invalid oracle provider",
    },
    backstopModule: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.backstopModules,
      message: "Invalid backstop module setting",
    },
    collateralizationRatio: {
      type: Number,
      required: true,
      validate: {
        validator: (v) =>
          POOL_OPTIONS.collateralizationRatios.includes(v) ||
          (v >= 1 && v <= 3),
        message: "Collateralization ratio must be between 100% and 300%",
      },
    },
    liquidationThreshold: {
      type: Number,
      required: true,
      validate: {
        validator: (v) =>
          POOL_OPTIONS.liquidationThresholds.includes(v) ||
          (v >= 0.5 && v <= 0.95),
        message: "Liquidation threshold must be between 50% and 95%",
      },
    },
    anchorIntegration: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.anchorIntegrations,
      message: "Invalid anchor integration",
    },
    poolType: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.poolTypes,
      message: "Invalid pool type",
    },
    accessControl: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.accessControls,
      message: "Invalid access control",
    },
    feeStructure: {
      type: Number,
      required: true,
      validate: {
        validator: (v) =>
          POOL_OPTIONS.feeStructures.includes(v) || (v >= 0.0005 && v <= 0.02),
        message: "Fee structure must be between 0.05% and 2%",
      },
    },
    loopingStrategy: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.loopingStrategies,
      message: "Invalid looping strategy",
    },
    geographicFocus: {
      type: String,
      required: true,
      enum: POOL_OPTIONS.geographicFocuses,
      message: "Invalid geographic focus",
    },
    defaultRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
  },
  { timestamps: true }
);

poolSchema.index({ poolId: 1 });
poolSchema.index({ name: 1 });
poolSchema.index({ assets: 1 });

const Pool = mongoose.model("Pool", poolSchema);
