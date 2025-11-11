"use strict";

const express = require("express");

const requestViabilityResponse = require("../responses/covered-credit-card/request-viability-response.json");

/*
 Route: /pfm
 */
const api = express.Router();
const timeout = 1000;

api.get("/v1/request-viability", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(requestViabilityResponse);
});

api.post("/v1/acquire", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(201).send({
    httpCode: "201",
    approvalId: "123456786543",
    curAmt: {
      amt: 0.0,
    },
    athResponseError: false,
    transactionDate: "2019-07-16T13:59:14",
  });
});

module.exports = api;
