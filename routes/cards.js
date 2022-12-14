const express = require('express');
const router = express.Router();
const cartaController = require('../controllers/cardController');
const AuthMiddleware = require('../middleware/auth');

router.get("/", AuthMiddleware, cartaController.GetCartas);
module.exports = router;