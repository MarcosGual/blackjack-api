const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');

router.post('/registro', usuarioController.Register);
router.post('/login', usuarioController.Authentication);
module.exports = router;