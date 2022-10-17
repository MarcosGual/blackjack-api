const { crearServicio } = require("../services/crear");
const { retirarService } = require("../services/retirar");

const generarMazo = async (req, res) => {
  try {
    const { cantMazos } = req.body;
    const respuesta = await crearServicio(cantMazos);

    res.status(201).send(respuesta);
  } catch (err) {
    res.status(501).send(`Error: ${err.message}`);
  }
};

const retirarCartas = async (req, res) => {
  try {
    const { id, cartas } = req.body;

    const mazo = await retirarService(id, cartas);

    res.status(200).send(mazo);
  } catch (err) {
    res.status(501).send("Error: " + err.message);
  }
};

module.exports = { generarMazo, retirarCartas };