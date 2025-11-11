"use strict";

const express = require("express");
const cardsResponse = require("../responses/digital-credit-card/cards.json");
const createResponse = require("../responses/digital-credit-card/create.json");
const resChallenge = require("../responses/challenge-2fa.json");
const cardDetailResponse = require("../responses/digital-credit-card/card_detail_1.json");
const cancelResponse = require("../responses/digital-credit-card/cancel_response.json");
const forwardResponse = require("../responses/digital-credit-card/forward_response.json");

/*
 Route: /digital-credit-card
 */
const api = express.Router();
const timeout = 2000;

api.post("/v1/consult", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  if (!req) {
    res.status(500).send();
  } else {
    res.status(200).send(cardsResponse);
  }
});

api.post("/v1/retrive", async (req, res) => {
  const { body } = req;
  // const firstDigit = body.numberProductTCV.at(0)

  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(cardDetailResponse);
});

api.post("/v1/create", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(createResponse);
});

api.post("/v1/modify", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(createResponse);
});
api.post("/v1/cancel", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(cancelResponse);
});

api.post("/v1/forward", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(forwardResponse);
});

module.exports = api;
