"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const resExtracts = require("../responses/extracts.json");
const base64Extracts = require("../responses/base64/extracts");
/*
 Route: /bank/statements
*/
const api = express.Router();

api.get("/v1/:id/periods", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.status(200).send(resExtracts);
});

api.post("/v1/statements/file", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Disposition"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Content-Type,Content-Disposition"
  );
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=ENE_MAR-20.pdf",
  });
  res.status(200).send(base64Extracts);
});

api.get("/v1/statements/file", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Disposition"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Content-Type,Content-Disposition"
  );
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=CERTIFICADO TRIBUTARIO.pdf",
  });
  res.status(200).send({ result: base64Extracts });
});

api.get("/v1/certificate/tax", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Disposition"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Content-Type,Content-Disposition"
  );
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=CERTIFICADO TRIBUTARIO.pdf",
  });
  res.status(200).send({ result: base64Extracts });
});

api.post("/v1/certificate/account", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Disposition"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Content-Type,Content-Disposition"
  );
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=ENE_MAR-20.pdf",
  });
  res.status(202).send(base64Extracts);
});

api.post("/v1/certificate/cdt", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Disposition"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Content-Type,Content-Disposition"
  );
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=ENE_MAR-20.pdf",
  });
  res.status(200).send(base64Extracts);
});

api.post("/v1/certificate/travel-assistance", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Disposition"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "Content-Type,Content-Disposition"
  );
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=ENE_MAR-20.pdf",
  });
  res.status(200).send(base64Extracts);
});

module.exports = api;
