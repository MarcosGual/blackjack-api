const db = require('../models/index.js');
const generarJWT = require('../helpers/generarJwt');
const bcrypt = require('bcrypt');
const Usuario = db.models.Usuario;

const Register = async (req, res) => {
    try{
        const {usuario, password} = req.body;
        const pass = bcrypt.hashSync(password,10);
        const findUsuario = await Usuario.findOne({where:{usuario: usuario}});
        if(findUsuario){
            return res.status(404).json({
                error: 'El usuario ya existe'
            });
        }
        const newUsuario = await Usuario.create({
            usuario: usuario,
            password: pass
        });
        return res.status(200).json({
            usuario: newUsuario
        });
    }
    catch(err){
        console.log(err);
    }
}

const Authentication = async (req, res) => {
    try{
        const {usuario, password} = req.body;
        const user = await Usuario.findOne({where:{usuario: usuario}});
        if(!user){
            res.status(404).json({"error:":"El usuario no existe"});
        } else{
            if(bcrypt.compareSync(password, user.password)){
                res.json({
                    usuario: user,
                    JWT:generarJWT(user.id)
                });
            } else{
                res.json({
                    error: "Usuario o contraseña incorrecta"
                })
            }
        }        
    }
    catch(err){
        console.log(err);
    }
}
module.exports= {Register, Authentication}