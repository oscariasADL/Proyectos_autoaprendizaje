"use strict";

const express = require("express");
const genericResponse = require("../responses/generic_response.json");
const suspiciousTransactionResponse = require("../responses/block-products/suspicious-transaction-response.json");
const api = express.Router();

api.route("/v1/block/definitive")
  .post(async (req, res) => {
    await new Promise(resolve => {
    setTimeout(resolve, 1500)
  });
  res.status(200).send(genericResponse);
});

api.route("/v1/block/temporary")
  .post(async (req, res) => {
    await new Promise(resolve => {
    setTimeout(resolve, 300)
  });
  res.status(200).send(genericResponse);
});

api.route("/v1/uncommon-transactions")
  .get(async (req, res) => {
    await new Promise((resolve) => {
    setTimeout(resolve, 300)
  });
  res.status(200).send(suspiciousTransactionResponse);
  // res.status(204).send({ code: '1234', description: 'No se encontró información.' });
});

api.route("/v1/unblock/temporary")
  .post(async (req, res) => {
    await new Promise(resolve => {
    setTimeout(resolve, 300)
  });
  res.status(200).send(genericResponse);
});

api.route("/v1/unblock/preventive")
  .post(async (req, res) => {
    await new Promise(resolve => {
    setTimeout(resolve, 300)
  });
  res.status(200).send(genericResponse);
});

module.exports = api;
