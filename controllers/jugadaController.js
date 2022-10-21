const db = require("../models/index.js");
const jugada = require("../models/jugada.js");
const { crearService } = require("../services/crear");
const { procesarService } = require("../services/procesar.js");
const { generarMazo } = require("../utils/mazo");
const { obtenerPuntos } = require("../utils/resultado");
const Usuario = db.models.Usuario;
const Jugada = db.models.Jugada;

const consultaJugada = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (id === null) {
      res.status(501).send("Debe haber un parámetro id");
    } else {
      const jugada = await Jugada.findOne({ where: { id: id } });
      res.status(200).send({ jugada });
    }
  } catch (error) {
    res.status(501).send({ Error: error.message });
  }
};

// const nuevaJugada = async (req, res) => {
//   try {
//     const { UsuarioId, cantMazos } = req.body;

//     const findUsuario = await Usuario.findOne({ where: { id: UsuarioId } });
//     if (!findUsuario) {
//       return res.status(404).json({
//         error: "El usuario no existe",
//       });
//     }

//     const nuevaJugada = await Jugada.create({
//       puntajeCroupier: 0,
//       puntajeUsuario: 0,
//       UsuarioId: UsuarioId,
//       cartasCroupier: [],
//       cartasUsuario: [],
//       gano: false,
//       terminada: false,
//     });

//     const mazo = await crearService(cantMazos, nuevaJugada.id);

//     if (mazo) {
//       return res.status(200).json({
//         jugada: nuevaJugada,
//         mazo: mazo,
//       });
//     }
//   } catch (err) {
//     console.log("Error: ", err.message);
//   }
// };

const nuevaJugada = async (req, res) => {
  try {
    const { UsuarioId, cantMazos } = req.body;

    const findUsuario = await Usuario.findOne({ where: { id: UsuarioId } });
    if (!findUsuario) {
      return res.status(404).json({
        error: "El usuario no existe",
      });
    }

    const mazo = generarMazo(cantMazos);

    const nuevaJugada = await Jugada.create({
      puntajeCroupier: 0,
      puntajeUsuario: 0,
      UsuarioId: UsuarioId,
      cartasCroupier: [],
      cartasUsuario: [],
      mazo: mazo,
      gano: false,
      terminada: false,
    });

    if (nuevaJugada) {
      return res.status(200).json({
        jugada: nuevaJugada,
      });
    }
  } catch (err) {
    console.log("Error: ", err.message);
  }
};

// const actualizarJugada = async (req, res) => {
//   try {
//     const {
//       JugadaId,
//       puntajeCroupier,
//       puntajeUsuario,
//       cartasCroupier,
//       cartasUsuario,
//       gano,
//       terminada,
//     } = req.body;

//     const jugada = await Jugada.findOne({ where: { id: JugadaId } });

//     if (!jugada) {
//       return res.status(404).json({
//         error: "La jugada no existe",
//       });
//     } else {
//       jugada.puntajeCroupier = puntajeCroupier;
//       jugada.puntajeUsuario = puntajeUsuario;
//       jugada.cartasCroupier = cartasCroupier;
//       jugada.cartasUsuario = cartasUsuario;
//       jugada.gano = gano;
//       jugada.terminada = terminada;

//       const nuevaJugada = await jugada.save();

//       res.status(200).send(nuevaJugada);
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// };

const procesarJugada = async (req, res) => {
  try {
    const { JugadaId, participante, cantCartas } = req.body;

    const jugadaProcesada = await procesarService(
      JugadaId,
      participante,
      cantCartas
    );

    console.log(jugadaProcesada)

    res.status(200).send(jugadaProcesada);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { nuevaJugada, procesarJugada, consultaJugada };
