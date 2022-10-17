const express = require('express');
const router = express.Router();
const mazoController = require('../controllers/mazoController');
const AuthMiddleware = require('../middleware/auth');

router.post("/", mazoController.generarMazo);
router.put("/retirar/", mazoController.retirarCartas);

module.exports = router;