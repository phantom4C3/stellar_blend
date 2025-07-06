import { Router } from 'express';
import { createRating, getRatingsByTemplate, getUserRating, updateRating, deleteRating, getAggregatedRatings } from "../controllers/rating.controller.js";
import authMiddleware from '../middlewares/auth.middlewares.js';
import templateMiddleware from '../middlewares/validateTemplate.middlewares.js'

const ratingRouter = Router();

const ratingValidation = [
    body('templateId').isMongoId().withMessage("Invalid Template Id"),
    body('userAddress').isString().matches(/^G[A-Z0-9]{55}$/).withMessage("Invalid Stellar Wallet Address"),
    body('rating').isInt({ min:1, max:5 }).withMessage("Rating must be between 1 and 5"),
    body('review').optional().isString().trim().isLength({ max:500 }).withMessage("Review must be 500 characters or less"),
];

ratingRouter.post("/", [...authMiddleware, ...ratingValidation], createRating);
ratingRouter.get("/:id", templateMiddleware, getRatingsByTemplate);
ratingRouter.get("/user/:id", authMiddleware, getUserRating);
ratingRouter.post("/user/:id", [...authMiddleware, ...ratingValidation], updateRating);
ratingRouter.put("/user/:id", authMiddleware, deleteRating);
ratingRouter.get("/user/:id", authMiddleware, getAggregatedRatings);

export default ratingRouter;