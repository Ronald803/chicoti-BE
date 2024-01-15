const { response,request } = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../components/users/users.model');

const validateJWT = (rolArray) => {
    return async (req=request,res=response,next)=>{
        const token = req.header('xtoken')
        try{
            if(!token && rolArray[0]=='everybody'){return next()}
            if(!token){return res.status(401).json({msg:'No hay token'})}
            const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
            const user = await userModel.findById(uid);
            if(!user || user.characteristic === 'deleted'){
                return res.status(401).json({
                    msg: 'Token inhabilitado o usuario inhabilitado'
                })
            }
            if(rolArray.length>0){
                if(rolArray[0]=='everybody'){
                    req.user = user;
                    return next();
                }
            }
            let permission = false;
            if(rolArray.length>0){
                rolArray.map(rol=>{
                    if(rol===user.rol){
                        permission=true
                    }
                })
            } else {permission = true}
            if(!permission){
                return res.status(401).json({
                    msg: 'No tienes permiso para esta operación'
                })
            }
            req.user = user;
            next();
        } catch (error){
            res.status(401).json({
                error,
                msg: 'Algo salió mal'
            })
        }

    }
}

module.exports = { validateJWT }