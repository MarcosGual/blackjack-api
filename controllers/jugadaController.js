const db = require('../models/index.js');
const Usuario = db.models.Usuario;
const Jugada = db.models.Jugada;

const postJugada = async (req, res) => { 
    try{
        const {puntajeCroupier, puntajeUsuario, UsuarioId, cartasCroupier, cartasUsuario, terminada} = req.body;
        const findUsuario = await Usuario.findOne({where:{id: UsuarioId }});
        if(!findUsuario){
            return res.status(404).json({
                error: 'El usuario no existe'
            });
        }
        const nuevaJugada = await Jugada.create({
            puntajeCroupier: puntajeCroupier,
            puntajeUsuario: puntajeUsuario,
            UsuarioId: UsuarioId,
            cartasCroupier: cartasCroupier,
            cartasUsuario: cartasUsuario,
            terminada: terminada

        });

        return res.status(200).json({
            jugada: nuevaJugada
        });
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {postJugada}