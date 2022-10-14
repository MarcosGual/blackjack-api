const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const AuthMiddleware = async (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            let token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //req.usuario= await Usuario.findOne({ where: { id: decoded.id } });
            return next();
        }
        catch(error){
            return res.status(403).json({msg: 'Token no válido'});
        }
    } 
    res.status(403).json({msg:"Token no válido"});
    next();
}

module.exports= AuthMiddleware;