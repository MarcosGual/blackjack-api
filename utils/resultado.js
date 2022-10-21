const tieneAs = (carta) => {
  if (carta.valor === "as") {
    return true;
  }
  return false;
};

const totalPuntos = (cartas) => {
  let puntos = 0;

  for (i = 0; i < cartas.length; i++) {
    puntos += cartas[i].valorJuego;
  }

  if (cartas.find((item) => item.valor === "as") !== undefined) {
    const cartasConAses = cartas.filter(tieneAs);
    cartasConAses.forEach((i) => {
      if (puntos > 21) {
        puntos -= 10;
      }
    });
  }
  return puntos;
};

const perdio = (puntaje) => {
  return puntaje > 21;
};

const obtenerResultado = (participante, cartasCroupier, cartasJugador) => {
  let puntajeCroupier = 0;
  let puntajeUsuario = 0;
  let quienPerdio = "";

  if (cartasCroupier.length > 0) {
    puntajeCroupier = totalPuntos(cartasCroupier);
  }
  if (cartasJugador.length > 0) {
    puntajeUsuario = totalPuntos(cartasJugador);
  }

  if (participante === "jugador") {
    perdio(puntajeUsuario) ? (quienPerdio = "jugador") : (quienPerdio = "");
  } else if (participante === "croupier") {
    perdio(puntajeCroupier) ? (quienPerdio = "croupier") : (quienPerdio = "");
  }

  return { puntajeCroupier, puntajeUsuario, quienPerdio };
};

module.exports = { obtenerResultado };
