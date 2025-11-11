"use strict";

const express = require("express");

/*
 Route: /bank/mortgage
 */
const api = express.Router();

api.get("/v1/payment", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  res.status(200).send({
    loansList: [
      {
        loanName: "CREDITO HIPOTECARIO",
        loanId: "12345872724",
        loanRelativeId:
          "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
        loanType: "MORTGAGE_CREDIT",
        bank: "0052",
      },
      {
        loanName: "MI CASA",
        loanId: "57777556432",
        loanRelativeId:
          "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
        loanType: "MORTGAGE_CREDIT",
        bank: "0052",
      },
      {
        loanName: "MI OTRO CREDITO      ",
        loanId: "98032256562",
        loanRelativeId:
          "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
        loanType: "MORTGAGE_CREDIT",
        bank: "0052",
      },
    ],
  });
});

api.post("/v1/payment", (req, res) => {
  res.status(200).send({
    approvalId: "12345",
    checkNum: "",
    transactionDate: "2020-05-07 20:06:58",
  });
});

api.post("/v1/schedule", (req, res) => {
  res.status(200).send({
    approvalId: "12345",
    checkNum: "",
    transactionDate: "2020-05-07 20:06:58",
  });
});

api.get("/v1/schedule/list", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  res.status(200).send(
    {
      creditInfo: [
        {
          numberProduct: "12345874742",
          idRelative: "5",
          typeProduct: "6",
          status: "A",
          percentage: '50'
        }
      ],
    }
  )
  ;
});

module.exports = api;




