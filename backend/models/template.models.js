import mongoose from 'mongoose';
import {TEMPLATE_OPTIONS} from '../../frontend/lib/constants.js';

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => TEMPLATE_OPTIONS.names.includes(v) || v === 'Custom' || /^[a-zA-Z0-9\s]{1,50}$/.test(v),
      message: 'Invalid template name',
    },
  },
  imageType: {
    type: String,
    required: true,
    enum: TEMPLATE_OPTIONS.imageTypes,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description must be 1000 characters or less'],
    default: '',
  },
  parameters: {
    assets: {
      type: [{ type: String }],
      required: true,
      validate: {
        validator: (v) => v.every((asset) => TEMPLATE_OPTIONS.assets.includes(asset) || asset === 'Custom'),
        message: 'Invalid assets',
      },
    },
    popularity: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.popularity,
    },
    apy: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.apy.includes(v) || (v >= 0.001 && v <= 0.2),
        message: 'APY must be between 0.1% and 20%',
      },
    },
    tvl: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.tvl.includes(v) || v >= 10000,
        message: 'TVL must be at least $10,000',
      },
    },
    riskFactor: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.riskFactors,
    },
    deploymentFrequency: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.deploymentFrequencies,
    },
    interestPercentage: {
      rate: {
        type: Number,
        required: true,
        validate: {
          validator: (v) => v >= 0.0001 && v <= 0.02,
          message: 'Interest rate must be between 0.01% and 2%',
        },
      },
      period: {
        type: String,
        required: true,
        enum: TEMPLATE_OPTIONS.interestPeriods,
      },
    },
    allowedAssets: {
      type: [{ type: String }],
      required: true,
      validate: {
        validator: (v) => v.every((asset) => TEMPLATE_OPTIONS.assets.includes(asset) || asset === 'Custom'),
        message: 'Invalid allowed assets',
      },
    },
    collaterals: {
      type: [{ type: String }],
      required: true,
      validate: {
        validator: (v) => v.every((collateral) => TEMPLATE_OPTIONS.assets.includes(collateral) || collateral === 'Custom' || collateral === 'None'),
        message: 'Invalid collaterals',
      },
    },
    returnDuration: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.returnDurations,
    },
    deposits: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.deposits.includes(v) || v >= 10000,
        message: 'Deposits must be at least $10,000',
      },
    },
    borrows: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.borrows.includes(v) || v >= 5000,
        message: 'Borrows must be at least $5,000',
      },
    },
    maxPositions: {
      type: mongoose.Mixed,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.maxPositions.includes(v),
        message: 'Invalid maximum positions',
      },
    },
    oracleProvider: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.oracleProviders,
    },
    backstopModule: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.backstopModules,
    },
    collateralizationRatio: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.collateralizationRatios.includes(v) || (v >= 1 && v <= 3),
        message: 'Collateralization ratio must be between 100% and 300%',
      },
    },
    liquidationThreshold: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.liquidationThresholds.includes(v) || (v >= 0.5 && v <= 0.95),
        message: 'Liquidation threshold must be between 50% and 95%',
      },
    },
    anchorIntegration: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.anchorIntegrations,
    },
    poolType: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.poolTypes,
    },
    accessControl: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.accessControls,
    },
    feeStructure: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => TEMPLATE_OPTIONS.feeStructures.includes(v) || (v >= 0.0005 && v <= 0.02),
        message: 'Fee structure must be between 0.05% and 2%',
      },
    },
    loopingStrategy: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.loopingStrategies,
    },
    geographicFocus: {
      type: String,
      required: true,
      enum: TEMPLATE_OPTIONS.geographicFocuses,
    },
  }}, { timestamps:true });

  templateSchema.index({ name:1 });
  templateSchema.index({ "parameters.asset" : 1 });

  templateSchema.pre("save", function (next) {
    if (this.isModified()) {
      this.updatedAt() = Date.now()
    }
  })

const Template = mongoose.model("Template", templateSchema);

export default Template;