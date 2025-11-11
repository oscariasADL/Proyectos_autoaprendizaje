"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const createResponse = require("../responses/push-notification/push_notification_approved.json");

/*
 Route: /bank/auth
*/
const api = express.Router();

const idleTime = 5000;
api.post("/v1/push/approve", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send({});
  // res.status(401).send({‘msj’: ‘No autorizado’});
});

api.post("/v1/push/reject", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send({});
  // res.status(401).send({‘msj’: ‘No autorizado’});
});

module.exports = api;
