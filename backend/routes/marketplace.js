const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
// Optional: restrictTo middleware (see below)
// const { restrictTo } = require('../middleware/restrictTo');

// Public
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected
router.post('/', protect, /* restrictTo('mentor', 'seller'), */ createProduct);

module.exports = router;
