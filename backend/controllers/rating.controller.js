import { validationResult } from "express-validator";
import Rating from "../models/rating.models.js";
import Template from "../models/template.models.js";

export const createRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { templateId, rating, review } = req.body;
  const userAddress = req.user.address;

  try {
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(400).json({ error: "Template not found" });
    }

    const existingRating = await Rating.findOne({ templateId, userAddress });
    if (existingRating) {
      return res
        .status(400)
        .json({ error: "User has already rated this Template" });
    }

    const newRating = new Rating({ templateId, userAddress, rating, review });
    await newRating.save();

    const notifications = await generateNotifications(
      userAddress,
      [template],
      [{ type: "rating", message: `New rating submitted for ${template.name}` }]
    );

    res.status(201).json({
      status: "success",
      message: "Rating created successfully",
      data: { rating: newRating, notifications },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Rating" });
  }
};

export const getUserRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userAddress, templateId } = req.params;

  try {
    const rating = await Rating.findOne({ userAddress, templateId });
    if (!rating) return null;
    return res.json(rating);
  } catch (error) {
    return res.status(500).json({ errors: "Failed to fetch User Ratings" });
  }
};

export const getRatingsByTemplate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { templateId } = req.params;

  try {
    const template = await Template.findById(templateId);
    if (!template) {
      return res
        .status(404)
        .json({ status: "error", message: "Template not found" });
    }

    const ratings = await Rating.findById(templateId).sort({ createdAt: -1 });
    const notifications = await generateNotifications(
      req.user?.address || null,
      [template]
    );

    res.json({
      status: "success",
      message: "Ratings retrieved successfully",
      data: { ratings, notifications },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Ratings by Template" });
  }
};

export const updateRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { templateId, userAddress, rating, review } = req.body;

  try {
    const existingRating = await Rating.findById(id);
    if (!existingRating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    if (existingRating.userAddress !== userAddress) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this Rating" });
    }

    existingRating.rating = rating;
    existingRating.review = review;
    existingRating.updatedAt = new Date();
    await existingRating.save();

    const template = await Template.findById(existingRating.templateId);
    const notifications = await generateNotifications(
      userAddress,
      [template],
      [{ type: "rating", message: `Rating updated for ${template.name}` }]
    );

    res.json({
      status: "success",
      message: "Rating updated successfully",
      data: { rating: existingRating, notifications },
    });
  } catch (error) {
    return res.status(500).json({ errors: "Failed to update User Ratings" });
  }
};

export const deleteRating = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const rating = await Rating.findById(id);
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    if (rating.userAddress !== userAddress) {
      return res
        .status(403)
        .json({
          status: "error",
          message: "Unauthorized to delete this rating",
        });
    }

    await rating.delelOne();
    return { message: "Rating deleted successfully" };
  } catch (error) {
    return res.status(500).json({ errors: "Failed to delete User Ratings" });
    throw error;
  }
};

export const getAggregatedRatings = async (req, res, sendResponse = true) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const aggregated = await Rating.aggregate([
      {
        $group: {
          _id: "$templateId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "templates",
          localField: "_id",
          foreignField: "_id",
          as: "template",
        },
      },
      {
        $unwind: "$template",
      },
      {
        $project: {
          templateId: "$_id",
          templateName: "$template.name",
          averageRating: { $round: ["$averageRating", 1] },
          totalReviews: 1,
        },
      },
    ]);

    const templates = await Template.find({
      _id: { $in: aggregated.map((r) => r.templateId) },
    });
    const notifications = await generateNotifications(
      req.user?.address || null,
      templates
    );

    if (sendResponse) {
      res.json({
        status: "success",
        message: "Aggregated ratings retrieved successfully",
        data: { ratings: aggregated, notifications },
      });
    } else {
      return aggregated;
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch aggregated ratings" });
  }
};
