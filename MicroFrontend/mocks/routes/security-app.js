"use strict";

const express = require("express");
const genericResponse = require("../responses/generic_response.json");
const base64Qr = require("../responses/base64/qr-code");
const api = express.Router();

api.route("/v1/activate").put(async (req, res) => {

  await new Promise(resolve => {
    setTimeout(resolve, 1500)
  })
  res.status(200).send(genericResponse);
  // res.status(500).send({})
});

api.route("/v1/deactivate")
  .get(async (req, res) => {
    await new Promise(resolve => {
      setTimeout(resolve, 1500)
    })
    res.status(200).send(base64Qr);
    // res.status(500).send({})
  })
  .put(async (req, res) => {
    await new Promise(resolve => {
      setTimeout(resolve, 1500)
    })
    // res.status(200).send(genericResponse);
    res.status(500).send({})
  });

api.route("/v1/status").get(async (req, res) => {

  await new Promise(resolve => {
    setTimeout(resolve, 1500)
  })

  res.status(200).send({status: 'INACTIVE'});
  // res.status(500).send({})
});

api.route("/v1/request-code")
  .get(async (req, res) => {
    await new Promise(resolve => {
      setTimeout(resolve, 2500)
    })
    res.status(200).send(genericResponse);
    // res.status(500).send({})
  })
  .post(async (req, res) => {
    await new Promise(resolve => {
      setTimeout(resolve, 2500)
    })
    res.status(200).send(base64Qr);
    // res.status(500).send({})
  });

api.route("/v1/request-qr")
  .post(async (req, res) => {
    await new Promise(resolve => {
      setTimeout(resolve, 1500)
    })
    res.status(200).send(base64Qr);
    // res.status(500).send({})
  });


module.exports = api;
