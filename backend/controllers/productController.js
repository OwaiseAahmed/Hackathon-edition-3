const Product = require('../models/Product');

// Create product (for seller/mentor)
const createProduct = async (req, res) => {
  const { title, description, price, image, category } = req.body;

  const product = await Product.create({
    title,
    description,
    price,
    image,
    category,
    createdBy: req.user._id,
  });

  res.status(201).json(product);
};

// Get all products
const getAllProducts = async (req, res) => {
  const products = await Product.find().populate('createdBy', 'name role');
  res.json(products);
};

// Get single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('createdBy', 'name role');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

module.exports = { createProduct, getAllProducts, getProductById };
