'use strict' // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const qrData = require("../responses/qr_data.json");
const qrPaymentMethod = require("../responses/qr_payment_method.json");
const genericResponse = require("../responses/generic_response.json");

/*
 Route: /bank/qr
*/
const api = express.Router();

api.post("/v1/qr-code", (req, res) => {
    setTimeout(() => {
        res.status(200).send(qrData);
    }, 2000)
});

api.put("/v1/qr-payment", (req, res) => {
    res.status(200).send(genericResponse);
});

api.post("/v1/qr-payment", (req, res) => {
    res.status(200).send(genericResponse);
});

api.get("/v1/qr-payment-method/:reference_label", (req, res) => {
    res.status(200).send(qrPaymentMethod);
});

api.post("/v1/search_business", (req, res) => {
    setTimeout(() => {
        res.status(200).send({"code":"421","description":"¡Oh no! Ha ocurrido un error que no esperábamos. Comunícate con nosotros (999)"});
    }, 1000)
});

api.post("/v1/qr-payment-dale", (req, res) => {
    setTimeout(() => {
        res.status(200).send(genericResponse);
    }, 2000)
});

module.exports = api;
