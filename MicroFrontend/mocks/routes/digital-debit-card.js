"use strict";

const express = require("express");
const genericResponse = require("../responses/generic_response.json");
const cardsResponse = require("../responses/digital-debit-card/cards.json");
const cardDetailResponse1 = require("../responses/digital-debit-card/card_detail_1.json");
const cardDetailResponse2 = require("../responses/digital-debit-card/card_detail_2.json");
const cardDetailResponse12 = require("../responses/digital-debit-card/card_detail_12.json");
const resChallenge = require("../responses/challenge-2fa.json");

/*
 Route: /digital-debit-card
 */
const api = express.Router();
const timeout = 2000;

api.post("/v1/action", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  //res.status(200).send(genericResponse);
  res.status(200).send({ code: '1234', description: 'Te queda una reexpedición' });
});

api.get("/v1/consult-by-document", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(cardsResponse);
  //res.status(401).send({code: 401, description: 'No autorizado'});
});

api.post("/v1/detail", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  switch (req.body.relativeParentId) {
    case '1':
      res.status(206).send(resChallenge);
      //res.status(400).send({ code: '1206234', description: 'No fue posible obtener el detalle' });
      break;
    case '2':
      res.status(206).send(resChallenge);
      break;
    case '12':
      res.status(206).send(resChallenge);
      break;
    default:
      res.status(206).send(resChallenge);
  }
});

api.post("/v1/edit", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(genericResponse);
  //res.status(400).send({ code: '1234', description: 'No fue posible modificar la TDD' });
});

module.exports = api;
