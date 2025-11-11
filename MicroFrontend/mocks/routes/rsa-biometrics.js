"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");

const api = express.Router();

api.post("/product-operation-server/v1/rsa-biometrics", async (_, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send({});
  // res.status(401).send({‘msj’: ‘No autorizado’});
});
api.post("/product-operation-server/v1/rsa-spi", async (_, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send({});
  // res.status(401).send({‘msj’: ‘No autorizado’});
});



api.post("/product-operation-server/v1/rsa-spi", async (_, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send({});
  // res.status(401).send({‘msj’: ‘No autorizado’});
});

api.post("/product-operation-server/v1/rsa-spi/block", async (_, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send({});
  // res.status(401).send({‘msj’: ‘No autorizado’});
});

module.exports = api;
