const express = require('express');
const {
  getCafes,
  getCafeById,
  createCafe,
  updateCafe,
  deleteCafe
} = require('../controllers/cafeController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRole = require('../middlewares/authorizeRole');

const router = express.Router();

// Lista wszystkich kawiarni
router.get('/', getCafes);

// Szczegóły pojedynczej kawiarni (z komentarzami)
router.get('/:id', getCafeById);

// Dodawanie kawiarni (tylko admin)
router.post('/', authenticateToken, authorizeRole('admin'), createCafe);

// Edycja kawiarni (tylko admin)
router.put('/:id', authenticateToken, authorizeRole('admin'), updateCafe);

// Usuwanie kawiarni (tylko admin)
router.delete('/:id', authenticateToken, authorizeRole('admin'), deleteCafe);

module.exports = router;
