const Mazo = require("../models/mazo");
const { crearServicio } = require("../services/crear");

const generarMazo = async (req, res) => {
  try {
    const { cantMazos } = req.body;
    const respuesta = await crearServicio(cantMazos);
    res.status(201).send(respuesta);
  } catch (err) {
    res.status(501).send(`Error: ${err.message}`);
  }
};

// const retirarCarta = async (req, res) => {
//   try {
//     const findMazo = await Mazo.findOne({ where: { id: req.body.mazoId } });
//     if (!findMazo) {
//       return res.status(404).json({
//         error: "El mazo no existe",
//       });
//     }
//     const carta = req.body.cartaId;

//   } catch (err) {
//     console.log(errr);
//   }
// };

module.exports = { generarMazo };
