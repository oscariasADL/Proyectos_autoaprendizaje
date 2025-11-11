"use strict";

const express = require("express");
const genericResponse = require("../responses/generic_response.json");
const api = express.Router();

api.route("/v1/blocking-product")
    .post(async (req, res) => {
        await new Promise(resolve => {
            setTimeout(resolve, 1500)
        });
        /*return res.status(503).send({
            description: "Ocurrió un error al realizar el bloqueo. (503)"
        });*/
        return res.status(200).send(genericResponse);
    });

module.exports = api;
