javascript
import { body, param, validationResult } from 'express-validator';
import { validatePoolParams } from '../utils/stellarUtils.js';
import { TEMPLATE_OPTIONS } from '../../frontend/lib/constants.js'

const validateTemplate = [
  body('name')
    .notEmpty()
    .withMessage('Template name is required')
    .isString()
    .trim()
    .custom((v) => TEMPLATE_OPTIONS.names.includes(v) || v === 'Custom' || /^[a-zA-Z0-9\s]{1,50}$/.test(v))
    .withMessage('Invalid template name'),
  body('imageType')
    .notEmpty()
    .withMessage('Image type is required')
    .isIn(TEMPLATE_OPTIONS.imageTypes)
    .withMessage('Invalid image type'),
  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be 1000 characters or less'),
  body('parameters.assets')
    .isArray({ min: 1 })
    .withMessage('At least one asset is required')
    .custom((v) => v.every((asset) => TEMPLATE_OPTIONS.assets.includes(asset) || asset === 'Custom'))
    .withMessage('Invalid assets'),
  body('parameters.popularity')
    .notEmpty()
    .withMessage('Popularity is required')
    .isIn(TEMPLATE_OPTIONS.popularity)
    .withMessage('Invalid popularity setting'),
  body('parameters.apy')
    .isFloat({ min: 0.001, max: 0.2 })
    .withMessage('APY must be between 0.1% and 20%')
    .custom((v) => TEMPLATE_OPTIONS.apy.includes(v) || (v >= 0.001 && v <= 0.2))
    .withMessage('Invalid APY value'),
  body('parameters.tvl')
    .isFloat({ min: 10000 })
    .withMessage('TVL must be at least $10,000')
    .custom((v) => TEMPLATE_OPTIONS.tvl.includes(v) || v >= 10000)
    .withMessage('Invalid TVL value'),
  body('parameters.riskFactor')
    .notEmpty()
    .withMessage('Risk factor is required')
    .isIn(TEMPLATE_OPTIONS.riskFactors)
    .withMessage('Invalid risk factor'),
  body('parameters.deploymentFrequency')
    .notEmpty()
    .withMessage('Deployment frequency is required')
    .isIn(TEMPLATE_OPTIONS.deploymentFrequencies)
    .withMessage('Invalid deployment frequency'),
  body('parameters.interestPercentage.rate')
    .isFloat({ min: 0.0001, max: 0.02 })
    .withMessage('Interest rate must be between 0.01% and 2%'),
  body('parameters.interestPercentage.period')
    .notEmpty()
    .withMessage('Interest period is required')
    .isIn(TEMPLATE_OPTIONS.interestPeriods)
    .withMessage('Invalid interest period'),
  body('parameters.allowedAssets')
    .isArray({ min: 1 })
    .withMessage('At least one allowed asset is required')
    .custom((v) => v.every((asset) => TEMPLATE_OPTIONS.assets.includes(asset) || asset === 'Custom'))
    .withMessage('Invalid allowed assets'),
  body('parameters.collaterals')
    .isArray({ min: 1 })
    .withMessage('At least one collateral is required')
    .custom((v) => v.every((collateral) => TEMPLATE_OPTIONS.assets.includes(collateral) || collateral === 'Custom' || collateral === 'None'))
    .withMessage('Invalid collaterals'),
  body('parameters.returnDuration')
    .notEmpty()
    .withMessage('Return duration is required')
    .isIn(TEMPLATE_OPTIONS.returnDurations)
    .withMessage('Invalid return duration'),
  body('parameters.deposits')
    .isFloat({ min: 10000 })
    .withMessage('Deposits must be at least $10,000')
    .custom((v) => TEMPLATE_OPTIONS.deposits.includes(v) || v >= 10000)
    .withMessage('Invalid deposits value'),
  body('parameters.borrows')
    .isFloat({ min: 5000 })
    .withMessage('Borrows must be at least $5,000')
    .custom((v) => TEMPLATE_OPTIONS.borrows.includes(v) || v >= 5000)
    .withMessage('Invalid borrows value'),
  body('parameters.maxPositions')
    .notEmpty()
    .withMessage('Maximum positions is required')
    .custom((v) => TEMPLATE_OPTIONS.maxPositions.includes(v))
    .withMessage('Invalid maximum positions'),
  body('parameters.oracleProvider')
    .notEmpty()
    .withMessage('Oracle provider is required')
    .isIn(TEMPLATE_OPTIONS.oracleProviders)
    .withMessage('Invalid oracle provider'),
  body('parameters.backstopModule')
    .notEmpty()
    .withMessage('Backstop module is required')
    .isIn(TEMPLATE_OPTIONS.backstopModules)
    .withMessage('Invalid backstop module'),
  body('parameters.collateralizationRatio')
    .isFloat({ min: 1, max: 3 })
    .withMessage('Collateralization ratio must be between 100% and 300%')
    .custom((v) => TEMPLATE_OPTIONS.collateralizationRatios.includes(v) || (v >= 1 && v <= 3))
    .withMessage('Invalid collateralization ratio'),
  body('parameters.liquidationThreshold')
    .isFloat({ min: 0.5, max: 0.95 })
    .withMessage('Liquidation threshold must be between 50% and 95%')
    .custom((v) => TEMPLATE_OPTIONS.liquidationThresholds.includes(v) || (v >= 0.5 && v <= 0.95))
    .withMessage('Invalid liquidation threshold'),
  body('parameters.anchorIntegration')
    .notEmpty()
    .withMessage('Anchor integration is required')
    .isIn(TEMPLATE_OPTIONS.anchorIntegrations)
    .withMessage('Invalid anchor integration'),
  body('parameters.poolType')
    .notEmpty()
    .withMessage('Pool type is required')
    .isIn(TEMPLATE_OPTIONS.poolTypes)
    .withMessage('Invalid pool type'),
  body('parameters.accessControl')
    .notEmpty()
    .withMessage('Access control is required')
    .isIn(TEMPLATE_OPTIONS.accessControls)
    .withMessage('Invalid access control'),
  body('parameters.feeStructure')
    .isFloat({ min: 0.0005, max: 0.02 })
    .withMessage('Fee structure must be between 0.05% and 2%')
    .custom((v) => TEMPLATE_OPTIONS.feeStructures.includes(v) || (v >= 0.0005 && v <= 0.02))
    .withMessage('Invalid fee structure'),
  body('parameters.loopingStrategy')
    .notEmpty()
    .withMessage('Looping strategy is required')
    .isIn(TEMPLATE_OPTIONS.loopingStrategies)
    .withMessage('Invalid looping strategy'),
  body('parameters.geographicFocus')
    .notEmpty()
    .withMessage('Geographic focus is required')
    .isIn(TEMPLATE_OPTIONS.geographicFocuses)
    .withMessage('Invalid geographic focus'),

  body('parameters').custom((params) => {
    const { isValid, errors } = validatePoolParams({
      name: params.name || 'Custom',
      assets: params.assets,
      apy: params.apy,
      collateralizationRatio: params.collateralizationRatio,
    });
    if (!isValid) {
      throw new Error(`Invalid template parameters: ${errors.join(', ')}`);
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }
    next();
  },
];

const validateTemplateId = [
  param('id').isMongoId().withMessage('Invalid template ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array(),
      });
    }
    next();
  },
];

const templateMiddleware = [...validateTemplate, ...validateTemplateId];
export default templateMiddleware ;
