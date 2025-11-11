"use strict";

const express = require("express");
const resLogin = require("../responses/aval-pay-login.json");
const resPaymentAccounts = require("../responses/aval-pay/payment-accounts.json");
const avalPayPaymentTransaction = require("../responses/aval-pay/aval-pay-payment-transaction.json");
const avalPayPaymentResponse = require("../responses/aval-pay/aval-pay-payment-response.json");
const noBillerPaymentResponse = require("../responses/aval-pay/no-biller-payment-response.json");
const avalPayBasicDataResponse = require("../responses/aval-pay/aval-pay-basic-data-response.json");
const avalPayFile = require("../responses/base64/aval-pay");
const commerceReturnUrl = 'https://stg.pasareladepagosaval-cloud.com/wps/portal/pasarela/resultado/?token=89a81b134bc767be219b904ea83e5f61';

/*
 Route: /bank/aval-pay
*/
const api = express.Router();

const idleTime = 50;

api
  .route("/v1/aval-pay-token")
  .post((req, res) => {
    return res.status(200).send(resLogin);
  })
  .delete((req, res) => {
    return res.status(204).send("");
  });

api.get("/v1/config", (req, res) => {
  return res.status(200).send({
    idleTime,
    pingTime: idleTime,
    date: new Date().toISOString(),
  });
});

api.get("/v1/basic-data", (req, res) => {
  return res.status(200).send(avalPayBasicDataResponse);
});

api.get("/v1/config/external", (req, res) => {
  return res.status(200).send({
    idleTime,
    pingTime: idleTime,
    date: new Date().toISOString(),
  });
});

api.get("/v1/ping/avalpay", (req, res) => {
  return res.status(202).send({ imAlive: true });
});

api.route("/v1/products").get((req, res) => {
  return res.status(200).send(resPaymentAccounts);
});

api.route("/v1/transaction")
  .get((req, res) => {
    const trnRqUID = req.query['trnRqUID'];
    const serviceCode = req.query['serviceCode'];
    return res.status(200).send(avalPayPaymentTransaction);
    // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
  })
  .put((req, res) => {
      return res.status(200).send({
        "requestId": "0",
        "transactionDate": "2021-07-14T15:51:23"
      });
  });

api.route("/v1/transaction/cancel")
  .put((req, res) => {
    setTimeout(() => {
      return res.status(200).send({
        "commerceReturnUrl": commerceReturnUrl
      });
    }, 2000);
  });

api.route("/v1/transaction/cancel/user")
  .put((req, res) => {
    setTimeout(() => {
      return res.status(200).send({
        "commerceReturnUrl": commerceReturnUrl
      });
    }, 2000);
  });

api.route("/v1/payment").post((req, res) => {
  req.body = req;
  return res.status(200).send(avalPayPaymentResponse);
  // return res.status(400).send({ code: '1234', description: 'Error Técnico en 2FA CONFIRMED_NA' });
});

api.route("/v1/bills/payment").post((req, res) => {
  req.body = req;
  return res.status(200).send(noBillerPaymentResponse);
  // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.route("/v1/export").post((req, res) => {
  return res.status(200).send(avalPayFile);
});

api.get("/v1/ip", async (req, res) => {
  return res.status(200).send(JSON.stringify("10.35.40.100"));
});

module.exports = api;
