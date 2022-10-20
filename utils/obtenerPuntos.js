const tieneAs = (carta) => {
  if (carta.valor === "as") {
    return true;
  }
  return false;
};

const obtenerPuntos = (jugador, cartasCroupier, cartasJugador) => {
  let puntos = 0;
  let perdio = false;
  let puntajeCroupier = 0;
  let puntajeUsuario = 0;

  if (jugador === "croupier") {
    cartasCroupier.forEach((carta) => {
      puntos += carta.valorJuego;
    });

    if (cartasCroupier.find((element) => element.valor === "as") != undefined) {
      const cartasConAses = cartasCroupier.filter(tieneAs);
      //console.log(cartasConAses);
      cartasConAses.forEach((i) => {
        if (puntos > 21) {
          puntos -= 10;
        }
      });
    }

    puntajeCroupier = puntos;
  } else if (jugador === "jugador") {
    cartasJugador.forEach((carta) => {
      puntos += carta.valorJuego;
    });

    if (cartasJugador.find((element) => element.valor === "as") != undefined) {
      const cartasConAses = cartasJugador.filter(tieneAs);
      //console.log(cartasConAses);
      cartasConAses.forEach((i) => {
        if (puntos > 21) {
          puntos -= 10;
        }
      });
    }

    puntajeUsuario = puntos;

    if (puntajeUsuario > 21) {
      perdio = true;
    }
  }

  return { puntajeCroupier, puntajeUsuario, perdio };
};

module.exports = { obtenerPuntos };
