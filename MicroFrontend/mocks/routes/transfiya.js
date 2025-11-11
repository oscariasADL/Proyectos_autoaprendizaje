"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const genericResponse = require("../responses/generic_response.json");
const consignmentsList = require("../responses/transfiya/auth-consignments-list.json");
const requestsList = require("../responses/transfiya/auth-requests-list.json");
const trustRelationshipList = require("../responses/transfiya/trust-relationship-list.json");
const jwt = require("jwt-simple");
/*
 Route: /bank/transfiya
*/
const api = express.Router();

api.post("/v1/debit-transfer", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(500).send({
        description: "Ocurrio un error al realizar la transferencia",
      });
    }
  }
  return res.status(200).send(genericResponse);
});

api.post("/v1/require-transfer", (req, res) => {
  return res.status(200).send(genericResponse);
});

api.get("/v1/authorization/consignments", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    switch (clientId) {
      case "1013595646":
        return res.status(200).send({authorizations: []});
      default:
        return res.status(200).send(consignmentsList);
    }
  }
  return res.status(200).send(consignmentsList);
});

api.get("/v1/authorization/requests", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    switch (clientId) {
      case "1013595646":
        return res.status(200).send({authorizations: []});
      default:
        return res.status(200).send(requestsList);
    }
  }
  return res.status(200).send(requestsList);
});

api.post("/v1/authorization/consignments/allow", (req, res) => {
    const { nickname } = req.body;

    if (nickname == 'falla') {
        return res.status(400).json({
            message: 'Error para prueba de escenario de falla',
        });
    } else {
    return res.status(200).send(genericResponse);
    }
});

api.post("/v1/authorization/requests/allow", (req, res) => {
  return res.status(200).send(genericResponse);
});

api.post("/v1/authorization/refuse-transfer", (req, res) => {
  return res.status(200).send(genericResponse);
});

api.post("/v1/trust-relationship/create", (req, res) => {
  const {amount} = req.body;

  if (amount == 70000) {
    return res.status(400).json({
      message: 'Error para prueba de escenario de falla',
    });
  } else {
    return res.status(200).send(genericResponse);
  }
});

api.post("/v1/trust-relationship/get-all", (req, res) => {
  return res.status(200).send(trustRelationshipList);
});

api.post("/v1/trust-relationship/delete", (req, res) => {
  return res.status(200).send(genericResponse);
});

api.delete("/v1/v1/trust-relationship", (req, res) => {
  return res.status(200).send(genericResponse);
});

api.post("/v1/account-default/query", (req, res) => {
  return res.status(200).send({
    accountId: "334434343",
    accountType: "DDA",
    accountStatus: true
  })
})

api.post("/v1/account-default/delete", (req, res) => {
  return res.status(200).send(genericResponse)
})

module.exports = api;
