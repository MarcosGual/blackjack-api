const express = require('express');
const router = express.Router();
const jugadaController = require('../controllers/jugadaController');
const AuthMiddleware = require('../middleware/auth');

router.post("/nueva", AuthMiddleware, jugadaController.nuevaJugada);
module.exports = router;