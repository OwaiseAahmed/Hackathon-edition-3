const express = require('express');
const router = express.Router();
const {
  createModule,
  getModules,
  getModuleById,
  updateModule,
  deleteModule,
} = require('../controllers/learningModuleController');
const { protect } = require('../middleware/authMiddleware');

// All routes below are protected
router.use(protect);

router.route('/')
  .post(createModule)
  .get(getModules);

router.route('/:id')
  .get(getModuleById)
  .put(updateModule)
  .delete(deleteModule);

module.exports = router;
