const { assoc, concat, drop, pick, pipe, take } = require("ramda");
const { NotFoundError, BadRequestError } = require("../utils/errores");
const { obtenerResultado } = require("../utils/resultado.js");
const db = require("../models/index.js");
const Jugada = db.models.Jugada;

const procesarService = async (idJugada, participante, cantCartas) => {
  try {
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

    const { puntajeCroupier, puntajeUsuario, quienPerdio } = obtenerResultado(
      participante,
      jugada.cartasCroupier,
      jugada.cartasUsuario
    );

    if (quienPerdio !== "") {
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
      assoc("cantDisponible", cantidadDisp),
      assoc("perdio", quienPerdio)
    );

    return construirRespuesta(nuevaJugada);
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = { procesarService };
