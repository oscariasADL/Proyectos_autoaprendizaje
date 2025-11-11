'use strict'
const services = require('../service/index');
const config = require('../config');

function isAuth(req, res, next) {
    console.log(req.headers.authorization.split(' ')[1]);
    if (!req.headers.authorization || req.headers.authorization.split(' ')[1] == 'null'
        || req.headers.authorization.split(' ')[1] == undefined) {
        return res.status(403).send({ message: `No tienes autorizacion` });
    }
    const token = req.headers.authorization.split(' ')[1];
    services.decodeToken(token)
        .then(response => {
            if (response.status == 401) {
                return res.status(401).send({ message: `token expirado` });
            }
            let userID;
            userID = req.headers['header.systemuserinfo.userid'];
            res.setHeader("Access-Control-Allow-Headers", "Content-Type,Stone");
            res.setHeader("Access-Control-Expose-Headers", "Stone");
            res.setHeader(config.tokenName, services.createToken(userID));
            next();
        })
        .catch(response => {
            res.status(response.status)
        })
}
 
module.exports = isAuth