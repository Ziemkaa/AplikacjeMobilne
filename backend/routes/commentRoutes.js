const express = require('express');
const { addComment } = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// POST /api/comments/:cafeId
router.post('/:cafeId', authenticateToken, addComment);

module.exports = router;
