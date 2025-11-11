"use strict";

const express = require("express");
const api = express.Router();
const genericResponse = require("../responses/generic_response.json");

api
  .route("/v1/exemption")
  .get(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    res.status(200).send({
      accounts: [
        {
          productId: "8942703",
          relativeId:
            "2",
          status: "INACTIVE",
        },
        {
          productId: "8942786",
          relativeId:
            "3",
          status: "INACTIVE",
        },
        {
          productId: "8942828",
          relativeId:
            "1",
          status: "ACTIVE",
        },
        {
          productId: "8962651",
          relativeId:
            "4",
          status: "ACTIVE",
        },
      ],
    });
  })
  .post(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    res.status(200).send(genericResponse);
  });

module.exports = api;
