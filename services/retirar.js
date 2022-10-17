const { assoc, concat, drop, pick, pipe, take } = require("ramda");
const db = require("../models/index.js");
const Mazo = db.models.Mazo;
const { NotFoundError } = require("../utils/errores");

const retirarService = async (idMazo, cartas) => {
  try {
    const mazo = await Mazo.findOne({ where: { id: idMazo } });

    if (!mazo) {
      throw new NotFoundError();
    }

    const { cartasDisponibles, cartasRetiradas } = mazo;

    const retiradas = take(cartas, cartasDisponibles);

    mazo.cartasDisponibles = drop(cartas, cartasDisponibles);
    mazo.cartasRetiradas = concat(retiradas, cartasRetiradas);

    const cantidadDisp = mazo.cartasDisponibles.length;

    await mazo.save();

    const construirRespuesta = pipe(
      pick(["cartasDisponibles"]),
      assoc("cartasRetiradas", retiradas),
      assoc("cantDisponible", cantidadDisp)
    );

    return construirRespuesta(mazo);
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = { retirarService };
