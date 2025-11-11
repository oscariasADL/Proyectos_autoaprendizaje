"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const resLimits = require("../responses/caps-response.json");
const genericResponse = require("../responses/generic_response.json");

const api = express.Router();

api
  .route("/v1/limits")
  .post(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    res.status(200).send(resLimits);
  })
  .put((req, res) => {
    return res.status(201).send({
      transactionDate: "2020-09-08T11:07:09",
    });
  });

api
  .route("/v1/limits/credit-card")
  .post(async (req, res) => {
    res.status(200).send(genericResponse);
  });

module.exports = api;
