import { validationResult } from "express-validator";
import Template from "../models/template.models.js";
import { getAggregatedRatings } from "./rating.controller.js";
import { validatePoolParams } from "../utils/stellarUtils.js";
import { generateNotifications } from "../utils/apyCalculator.js";

export const createTemplate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, imageType, description, parameters } = req.body;
  const userAddress = req.user.address;

  try {
    const { isValid, errors } = validatePoolParams({
      name,
      assets: parameters.assets,
      apy: parameters.apy,
      collateralizationRatio: parameters.collateralizationRatio,
    });
    if (!isValid) {
      return res.status(400).json({
        status: "error",
        message: "Invalid template parameters",
        errors,
      });
    }

    const existingTemplate = Template.findOne({ name });
    if (existingTemplate) {
      const error = new Error("Template name already exists");
      error.name = "MongoServerError";
      error.code = 11000;
      error.keyValue = { name };
      throw error;
    }

    // Create and save template
    const newTemplate = new Template({
      name,
      imageType,
      description,
      parameters,
    });
    await newTemplate.save();

    const notifications = await generateNotifications(userAddress, [
      newTemplate,
    ]);

    res.status(201).json({
      status: "success",
      message: "Template created successfully",
      data: { template: newTemplate, notifications },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create template" });
    throw new Error("Failed to create template");
  }
};

export const getTemplates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { assets, popularity, riskFactor, apyMin, apyMax, tvlMin, tvlMax } =
    req.query;

  try {
    const query = {};
    if (assets) query["parameters.assets"] = { $in: assets.split(",") };
    if (popularity) query["parameters.popularity"] = popularity;
    if (riskFactor) query["parameters.riskFactor"] = riskFactor;
    if (apyMin || apyMax) query["parameters.apy"] = {};
    if (apyMin) query["parameters.apy"].$gte = Number(apyMin);
    if (apyMax) query["parameters.apy"].$lte = Number(apyMax);
    if (tvlMin || tvlMax) query["parameters.tvl"] = {};
    if (tvlMin) query["parameters.tvl"].$gte = Number(tvlMin);
    if (tvlMax) query["parameters.tvl"].$lte = Number(tvlMax);

    const templates = await Template.find().sort({ createdAt: -1 });
    const aggregatedRatings = await getAggregatedRatings(req, res);

    const templatesWithRatings = templates.map((template) => {
      const ratingData = aggregatedRatings.find(
        (r) => r.templateId.toString() === template._id.toString()
      );
      return {
        ...template.toObject(),
        averageRating: ratingData ? ratingData.averageRating : null,
        totalReviews: ratingData ? ratingData.totalReviews : 0,
      };
    });

    const notifications = await generateNotifications(
      req.user?.address || null,
      templatesWithRatings
    );

    res.json({
      status: "success",
      message: "Templates retrieved successfully",
      data: { templates: templatesWithRatings, notifications },
    });
  } catch (error) {
    res.status(500).json("Failed to fetch Templates");
    throw new Error("Failed to fetch Templates");
  }
};

export const getTemplateById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    const aggregatedRatings = await getAggregatedRatings(req, res, false);
    const ratingData = aggregatedRatings.find(
      (r) => r.templateId.toString() === template._id.toString()
    );
    const templateWithRating = {
      ...template.toObject(),
      averageRating: ratingData ? ratingData.averageRating : null,
      totalReviews: ratingData ? ratingData.totalReviews : 0,
    };

    // Generate notifications
    const notifications = await generateNotifications(
      req.user?.address || null,
      [templateWithRating]
    );

    res.json({
      status: "success",
      message: "Template retrieved successfully",
      data: { template: templateWithRating, notifications },
    });
  } catch (error) {
    res.status(500).json("Failed to get Template");
    throw new Error("Failed to fetch template");
  }
};

export const updateTemplate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, imageType, description, params } = req.body;
  const userAddress = req.user.address;

  try {
    const { isValid, errors } = validatePoolParams({
      name,
      assets: parameters.assets,
      apy: parameters.apy,
      collateralizationRatio: parameters.collateralizationRatio,
    });
    if (!isValid) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Invalid template parameters",
          errors,
        });
    }

    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    if (name !== template.name) {
      const existingTemplate = await Template.findOne({ name });
      if (existingTemplate) {
        const error = new Error("Template name already exists");
        error.name = "MongoServerError";
        error.code = 11000;
        error.keyValue = { name };
        throw error;
      }
    }

    template.name = name;
    template.imageType = imageType;
    template.description = description;
    template.parameters = parameterss;
    template.updatedAt = new Date();
    await template.save();

    const notifications = await generateNotifications(userAddress, [template]);

    res.json({
      status: 'success',
      message: 'Template updated successfully',
      data: { template, notifications },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update template" });
  }
};

export const deleteTemplate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    const template = await Template.findById(id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    await template.deleteOne();
    res.json({
      status: 'success',
      message: 'Template deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: "Template not found" });
    throw new Error("Failed to delete template");
  }
};
