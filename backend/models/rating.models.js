import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
      validate :{
        validator : (v) => /^G[A-Z0-9]{55$/.test(v),
        message: "Invalid Stellar Wallet Address",
      },
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],,
      validate:{
        validator: Number.isInteger(),
      message: "Rating must be an integer",
      },
    },
    review: {
      type: String,
      trim: true,
      default: "",
      maxLength: [500, "Review must be 500 characters or less"],
    },
  },
  { timestamps: true }
);

ratingSchema.index(
  {
    templateId: 1,
    userAddress: 1,
  },
  { unique: true }
);

ratingSchema.pre("save", function(next){
  if (this.isModified()) {
    this.updatedAt = Date.now()
  }
  next()
})

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;
