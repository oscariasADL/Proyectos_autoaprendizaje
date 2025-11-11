"use strict";

const express = require("express");
const genericResponse = require("../responses/generic_response.json");
const travelerCustomer = require("../responses/traveler-customer/traveler-customer-response.json");

/*
 Route: /bank/traveler-customer
*/
const api = express.Router();

api.route("/v1/travel-assistance")
    .get((req, res) => {
        return res.status(200).send(travelerCustomer);
        // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
    })
    .post((req, res) => {
        return res.status(200).send(genericResponse);
        // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
    });

api.delete("/v1/travel-assistance/:productId", async (req, res) => {
    return res.status(200).send(genericResponse);
    // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

module.exports = api;
