const db = require('../models/index.js');
const Carta = db.models.Carta;

const GetCartas = async (req, res) => {
    try{
        const cards= await Carta.findAll();
        if(!cards){
            res.json({
                error: "No hay cartas"
            })
        }else{
            res.json({
                cartas: cards
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {GetCartas}