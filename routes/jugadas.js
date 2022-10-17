const express = require("express");
const router = express.Router();
const jugadaController = require("../controllers/jugadaController");
const AuthMiddleware = require("../middleware/auth");
const jugada = require("../models/jugada");

router.get("/:id", jugadaController.consultaJugada);
router.post("/nueva", AuthMiddleware, jugadaController.nuevaJugada);
router.put("/actualizar", jugadaController.actualizarJugada);

module.exports = router;