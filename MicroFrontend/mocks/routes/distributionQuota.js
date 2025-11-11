"use strict";

const express = require("express");
const resQuota = require("../responses/quota-response.json");
const genericResponse = require("../responses/generic_response.json");
const api = express.Router();

api
  .route("/v1/credit-line-admin")
  .get(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    res.status(200).send(resQuota);
  })
  .post((req, res) => {
    res.status(200).send(genericResponse)
  });

module.exports = api;
