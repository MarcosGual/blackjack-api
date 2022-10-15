const { pick } = require('ramda')
const db = require('../models/index.js');
const Mazo=db.models.Mazo;
const { generarMazo } = require('../utils/mazo')

const crearServicio = async (mazos) => {
  const cards = generarMazo(mazos);

  const mazo = new Mazo({ cartasDisponibles: cards,
cartasRetiradas: [] })
  //await mazo.save()
  console.log(mazo)
  const nuevoMazo = await Mazo.create({
    cartasDisponibles: mazo.cartasDisponibles,
cartasRetiradas:mazo.cartasRetiradas
});

  const respuesta = pick(['id', 'cartasDisponibles']);

  return respuesta(nuevoMazo);
}

module.exports = {crearServicio};