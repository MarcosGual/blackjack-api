const { pick } = require("ramda");
const db = require("../models/index.js");
const Mazo = db.models.Mazo;
const { generarMazo } = require("../utils/mazo");

const crearService = async (mazos, jugadaId) => {
  try {
    const cards = generarMazo(mazos);
    const mazo = new Mazo({
      cartasDisponibles: cards,
      cartasRetiradas: [],
      JugadaId: jugadaId,
    });

    const nuevoMazo = await Mazo.create({
      cartasDisponibles: mazo.cartasDisponibles,
      cartasRetiradas: mazo.cartasRetiradas,
    });

    const construirRespuesta = pick(["id", "cartasDisponibles"]);

    return construirRespuesta(nuevoMazo);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { crearService };
