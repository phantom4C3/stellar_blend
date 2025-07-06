import { Router } from "express";
import { body } from "express-validator";
import { getPools, getUserPositions, deployPool, getUserNotifications, getPoolById, updatePool, deletePool } from "../controllers/pool.controller.js";
import { borrowFromPool, depositToPool, validatePoolParams } from "../utils/stellarUtils.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import templateMiddleware from "../middlewares/validateTemplate.middlewares.js";

const poolRouter = Router();

const deployPoolValidation = [
    body('params.name').notEmpty().withMessage("Pool name is required"),
    body('params.assets').isArray({ min:1 }).withMessage("At least one asset is required"),
    body('params.apy').isFloat({ min:0.001, max:0.2 }).withMessage("APY must be between 0.1% and 20%"),
    body('params.tvl').isFloat({ min:10000 }).withMessage("TVL must be at least $10,000"),
    body('params.collateralizationRatio').isFloat({ min:1, max:3 }).withMessage("Collateralization Ratio must be between 100% and 300%"),
    body('params.tvl').isFloat({ min:10000 }).withMessage("TVL must be at least $10,000"),
    body('params.deposits').isFloat({ min:10000 }).withMessage("Deposits must be at least $10,000"),
    body('params.borrows').isFloat({ min:5000 }).withMessage("Borrows must be at least $5,000"),
    body('params.maxPositions').isInt({ min:1 }).withMessage("Maximum Positions must be at least 1"),
    body('wallet.address').isString().matches(/^G[A-Z0-9]{55}$/).withMessage("Invalid Stellar Wallet Address"),
    body('params').custom(async (params) => {
        const { isValid, errors } = validatePoolParams(params);
        if (!isValid) {
            throw new Error(`Invalid Pool Parameters: ${errors.join(", ")}`);
        }
        return true;
    })
];


poolRouter.get("/", getPools);
poolRouter.get("/:id", getPoolById);
poolRouter.get("/user/positions", authMiddleware , getUserPositions);
poolRouter.post("/deploy", [authMiddleware, deployPoolValidation], deployPool);
poolRouter.get("/notifications", authMiddleware, getUserNotifications);
poolRouter.put('/:id', [authMiddleware, templateMiddleware], updatePool);
poolRouter.post('/positions/deposit', authMiddleware, depositToPool);
poolRouter.post('/positions/borrow', authMiddleware, borrowFromPool);
poolRouter.delete('/:id', authMiddleware, deletePool);

export default poolRouter;