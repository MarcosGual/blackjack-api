const { assoc, concat, drop, pick, pickAll, pipe, take } = require("ramda");
const db = require("../models/index.js");
const Jugada = db.models.Jugada;
const { NotFoundError, BadRequestError } = require("../utils/errores");
const { obtenerPuntos } = require("../utils/obtenerPuntos.js");

const procesarService = async (idJugada, participante, cantCartas) => {
  try {
    console.log(idJugada);
    const jugada = await Jugada.findOne({ where: { id: idJugada } });

    if (!jugada) {
      throw new NotFoundError();
    }

    const { cartasUsuario, cartasCroupier, mazo } = jugada;

    const retiradas = take(cantCartas, mazo);
    jugada.mazo = drop(cantCartas, mazo);

    if (participante === "jugador") {
      jugada.cartasUsuario = concat(retiradas, cartasUsuario);
    } else if (participante === "croupier") {
      jugada.cartasCroupier = concat(retiradas, cartasCroupier);
    } else {
      throw new BadRequestError();
    }

    const { puntajeCroupier, puntajeUsuario, perdio } = obtenerPuntos(
      participante,
      cartasCroupier,
      cartasUsuario
    );

    if (perdio) {
      jugada.terminada = true;
    }

    jugada.puntajeCroupier = puntajeCroupier;
    jugada.puntajeUsuario = puntajeUsuario;

    const cantidadDisp = mazo.length;

    const nuevaJugada = await jugada.save();

    const construirRespuesta = pipe(
      pick([
        "puntajeCroupier",
        "puntajeUsuario",
        "cartasCroupier",
        "cartasUsuario",
        "terminada",
      ]),
      assoc("cantDisponible", cantidadDisp)
    );

    console.log(construirRespuesta(nuevaJugada));

    return construirRespuesta(nuevaJugada);
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = { procesarService };
