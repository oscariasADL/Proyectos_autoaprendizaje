'use strict'
 
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(userID = 'noConnet') {
    const payload = {
        sub: userID,
        iat: moment().format(config.formatDate),
        exp: moment().add(config.durationToken, config.durationDes).format(config.formatDate)
    }
    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decode = new Promise((resolve, reject) => {
        try {
            const playload = jwt.decode(token, config.SECRET_TOKEN);
            if (playload.exp < moment().format(config.formatDate)) {
                resolve({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
            resolve(playload.sub);
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            });
        }
    })
    return decode;
}

module.exports = { createToken, decodeToken }