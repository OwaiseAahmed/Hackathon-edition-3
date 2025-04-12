const express = require('express');
const router = express.Router();
const {
  createDocumentation,
  getMyDocs,
  getDocById,
  updateDoc,
  deleteDoc,
} = require('../controllers/documentationController');
const { protect } = require('../middleware/authMiddleware');

// Only logged-in users can access
router.post('/', protect, createDocumentation);
router.get('/', protect, getMyDocs);
router.get('/:id', protect, getDocById);
router.put('/:id', protect, updateDoc);
router.delete('/:id', protect, deleteDoc);

module.exports = router;
