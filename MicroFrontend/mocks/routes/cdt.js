"use strict";

const express = require("express");

/*
 Route: /bank/cdt-renewal
 */
const api = express.Router();

api.post("/v1/details", (req, res) => {
  res.status(200).send({
    "productId": "7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451",
    "numberProduct": "6402009300152",
    "expDate": "2023-09-15",
    "reInvest": "N"
  });
});

api.post("/v1/active", (req, res) => {
  res.status(200).send({
    approvalId: "12345",
    transactionDate: "2020-05-07 20:06:58",
  });
});


api.post("/v1/cancel", (req, res) => {
  res.status(200).send({
    approvalId: "12345",
    transactionDate: "2020-05-07 20:06:58",
  });
});


module.exports = api;
