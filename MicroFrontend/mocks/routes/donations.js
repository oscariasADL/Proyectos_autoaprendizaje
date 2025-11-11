"use strict";

const express = require("express");
const genericResponse = require("../responses/generic_response.json");

/*
 Route: /notifications
 */
const api = express.Router();
const timeout = 1;

api.get("/v1/send", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  res.status(200).send(
    [
      {
        "type": "SDA",
        "productId": "8942703",
        "productRelativeId": "2"
      },
      {
        "type": "SDA",
        "productId": "8942786",
        "productRelativeId": "3"
      },
    ]
  );
});

api.post("/v1/send", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(genericResponse);
});

module.exports = api;
