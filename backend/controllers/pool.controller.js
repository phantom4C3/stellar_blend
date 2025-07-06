import Pool from "../models/pool.models.js";
import {
  generateNotifications,
  updatePoolData,
} from "../utils/apyCalculator.js";
import {
  deployLendingPool,
  getSupportedAssets,
} from "../utils/stellarUtils.js";
import { blendContractAddress } from "../config/soroban.js";
import { Contract } from "@stellar/stellar-sdk";
import { validationResult } from "express-validator";

export const getUserPositions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const address = req.query;
  try {
    const supportedAssets = await getSupportedAssets();
    const contract = new Contract(blendContractAddress);
    const positions = await contract.call("get_user_positions", address);
    const pools = await Pool.find();
    const notifications = await generateNotifications(address, pools);
    res.json({ positions, notifications, supportedAssets });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
};

export const deployPool = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { params, wallet } = req.body;
  try {
    const result = await deployLendingPool(params, wallet);
    if (result.success) {
      const newPool = new Pool({
        poolId: result.txHash,
        name: params.name,
        imageType: params.imageType,
        assets: params.assets,
        popularity: params.popularity,
        apy: params.apy,
        tvl: params.tvl,
        riskFactor: params.riskFactor,
        deploymentFrequency: params.deploymentFrequency,
        interestPercentage: params.interestPercentage,
        allowedAssets: params.allowedAssets,
        collaterals: params.collaterals,
        returnDuration: params.returnDuration,
        deposits: params.deposits,
        borrows: params.borrows,
        maxPositions: params.maxPositions,
        oracleProvider: params.oracleProvider,
        backstopModule: params.backstopModule,
        collateralizationRatio: params.collateralizationRatio,
        liquidationThreshold: params.liquidationThreshold,
        anchorIntegration: params.anchorIntegration,
        poolType: params.poolType,
        accessControl: params.accessControl,
        feeStructure: params.feeStructure,
        loopingStrategy: params.loopingStrategy,
        geographicFocus: params.geographicFocus,
        defaultRate: 0,
      });
      await newPool.save();
      res.json({
        message: "Pool deployed successfully",
        txHash: result.txHash,
      });
    } else {
      res.status(40).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to deploy pool" });
  }
};

export const getUserNotifications = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { address } = req.query;
    const pools = await Pool.find();
    const notifications = await generateNotifications(address, pools);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch User Notifications" });
  }
};

export const createPool = async (req, res) => {
  const { params } = req.body;
  const userAddress = req.user.address;

  try {
    const { isValid, errors } = validatePoolParams(params);
    if (!isValid) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid pool parameters", errors });
    }

    const result = await deployLendingPool(params, userAddress);
    if (!result.success) {
      const error = new Error("Stellar contract deployment failed");
      error.name = "StellarError";
      error.cause = result.error;
      throw error;
    }

    const newPool = new Pool({
      poolId: result.txHash,
      name: params.name,
      imageType: params.imageType,
      assets: params.assets,
      popularity: params.popularity,
      apy: params.apy,
      tvl: params.tvl,
      riskFactor: params.riskFactor,
      deploymentFrequency: params.deploymentFrequency,
      interestPercentage: params.interestPercentage,
      allowedAssets: params.allowedAssets,
      collaterals: params.collaterals,
      returnDuration: params.returnDuration,
      deposits: params.deposits,
      borrows: params.borrows,
      maxPositions: params.maxPositions,
      oracleProvider: params.oracleProvider,
      backstopModule: params.backstopModule,
      collateralizationRatio: params.collateralizationRatio,
      liquidationThreshold: params.liquidationThreshold,
      anchorIntegration: params.anchorIntegration,
      poolType: params.poolType,
      accessControl: params.accessControl,
      feeStructure: params.feeStructure,
      loopingStrategy: params.loopingStrategy,
      geographicFocus: params.geographicFocus,
      defaultRate: 0,
    });
    await newPool.save();

    const notifications = await generateNotifications(userAddress, [newPool]);

    res.status(201).json({
      status: "success",
      message: "Pool deployed successfully",
      data: { pool: newPool, txHash: result.txHash, notifications },
    });
  } catch (error) {
    throw error;
  }
};

export const getPools = async (req, res) => {
  const { assets, popularity, riskFactor, apyMin, apyMax, tvlMin, tvlMax } =
    req.query;

  try {
    const query = {};
    if (assets) query.assets = { $in: assets.split(",") };
    if (popularity) query.popularity = popularity;
    if (riskFactor) query.riskFactor = riskFactor;
    if (apyMin || apyMax) query.apy = {};
    if (apyMin) query.apy.$gte = Number(apyMin);
    if (apyMax) query.apy.$lte = Number(apyMax);
    if (tvlMin || tvlMax) query.tvl = {};
    if (tvlMin) query.tvl.$gte = Number(tvlMin);
    if (tvlMax) query.tvl.$lte = Number(tvlMax);

    const pools = await Pool.find(query).sort({ createdAt: -1 });

    const updatedPools = await updatePoolData(pools);
    const notifications = await generateNotifications(
      req.user?.address || null,
      updatedPools
    );

    res.json({
      status: "success",
      message: "Pools retrieved successfully",
      data: { pools: updatedPools, notifications },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pools" });
    throw error;
  }
};

export const getPoolById = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await Pool.findOne({ poolId: id });
    if (!pool) {
      return res
        .status(404)
        .json({ status: "error", message: "Pool not found" });
    }

    const updatedPool = (await updatePoolData([pool]))[0];
    const notifications = await generateNotifications(
      req.user?.address || null,
      [updatedPool]
    );

    res.json({
      status: "success",
      message: "Pool retrieved successfully",
      data: { pool: updatedPool, notifications },
    });
  } catch (error) {
    throw error;
    res.status(500).json({ error: "Failed to fetch pool" });
  }
};

export const updatePool = async (req, res) => {
  const { id } = req.params;
  const { params } = req.body;
  const userAddress = req.user.address;

  try {
    const { isValid, errors } = validatePoolParams(params);
    if (!isValid) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid pool parameters", errors });
    }

    const pool = await Pool.findOne({ poolId: id });
    if (!pool) {
      return res
        .status(404)
        .json({ status: "error", message: "Pool not found" });
    }

    Object.assign(pool, params);
    await pool.save();

    const notifications = await generateNotifications(userAddress, [pool]);

    res.json({
      status: "success",
      message: "Pool updated successfully",
      data: { pool, notifications },
    });
  } catch (error) {
    throw error;
  }
};

export const depositToPool = async (req, res) => {
  const userAddress = req.user.address;
  const { poolId, amount, asset } = req.body;
  try {
    const position = await depositToPool(poolId, userAddress, amount, asset);
    res.json({
      status: 'success',
      message: 'Deposit successful',
      data: { position },
    });
  } catch (error) {
    throw error;
  }
};

export const borrowFromPool = async (req, res) => {
  const userAddress = req.user.address;
  const { poolId, amount, collateral } = req.body;
  try {
    const position = await borrowFromPool(poolId, userAddress, amount, collateral);
    res.json({
      status: 'success',
      message: 'Borrow successful',
      data: { position },
    });
  } catch (error) {
    throw error;
  }
};

export const deletePool = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await Pool.findOneAndDelete({ poolId: id });
    if (!pool) {
      return res
        .status(404)
        .json({ status: "error", message: "Pool not found" });
    }

    res.json({
      status: "success",
      message: "Pool deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};
