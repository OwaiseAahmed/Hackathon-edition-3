import express from "express";
import MarketplaceListing from "../models/MarketplaceListing.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const listings = await MarketplaceListing.find().populate("seller", "name");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, price, image, category } = req.body;
    const newListing = new MarketplaceListing({
      title,
      description,
      price,
      image,
      category,
      seller: req.userId,
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const listing = await MarketplaceListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    if (listing.seller.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await listing.remove();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
