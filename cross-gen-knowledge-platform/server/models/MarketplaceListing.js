import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: Number,
    image: String,
    category: String,
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MarketplaceListing", listingSchema);
