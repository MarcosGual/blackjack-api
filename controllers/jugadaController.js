const db = require("../models/index.js");
const { crearServicio } = require("../services/crear");
const Usuario = db.models.Usuario;
const Jugada = db.models.Jugada;

const nuevaJugada = async (req, res) => {
  try {
    const { UsuarioId, cantMazos } = req.body;

    const findUsuario = await Usuario.findOne({ where: { id: UsuarioId } });
    if (!findUsuario) {
      return res.status(404).json({
        error: "El usuario no existe",
      });
    }

    const nuevaJugada = await Jugada.create({
      puntajeCroupier: 0,
      puntajeUsuario: 0,
      UsuarioId: UsuarioId,
      cartasCroupier: [],
      cartasUsuario: [],
      gano: false,
      terminada: false,
    });

    console.log(nuevaJugada);

    const mazo = await crearServicio(cantMazos, nuevaJugada.id);

    //console.log(mazo);

    if (mazo) {
      return res.status(200).json({
        jugada: nuevaJugada,
        mazo: mazo,
      });
    }
  } catch (err) {
    console.log("Error: ", err.message);
  }
};

module.exports = { nuevaJugada };
