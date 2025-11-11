"use strict";

const express = require("express");
const tourResponse = require("../responses/tour/tour-response.json");

/*
 Route: /bank/tour
*/
const api = express.Router();
const timeout = 200;

api
  .route("/v1/tour-status")
  .get(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });

    return res.status(200).send(tourResponse);
  })
  .post((req, res) => {
    return res.status(200).send(tourResponse);
  });

module.exports = api;
 