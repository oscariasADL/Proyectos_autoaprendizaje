"use strict";

const express = require("express");
const resLogin = require("../responses/pse-login.json");
const resPaymentAccounts = require("../responses/pse/payment_accounts.json");
const resPseTransaction = require("../responses/pse/pse_transaction.json");
const deleteRecordResponse = require("../responses/pse/pse_recurring_delete.json");
const resPsePay = require("../responses/pse/pse_pay.json");
const recordsPseRecurring = require("../responses/pse/pse_recurring_commerce.json");
const resPseBasicDaxta = require("../responses/pse/pse_basic_data.json");
const pseFile = require("../responses/base64/pse");
const pseBanks = require("../responses/pse/bank-pse.json");
const resChallenge = require("../responses/challenge-2fa.json");


/*
 Route: /bank/pse
*/
const api = express.Router();

const idleTime = 50;
const timeout = 2000;

api
  .route("/v1/pse-token")
  .post((req, res) => {
    //return res.status(200).send(resLogin);
    return res.status(412).send({
      statusCode: "1603",
      description: "Tu usuario ha sido bloqueado (1603)",
    });
  })
  .delete((req, res) => {
    return res.status(204).send("");
  });

api.get("/v1/basic-data", (req, res) => {
  return res.status(200).send(resPseBasicData);
});

api.get("/v1/config", (req, res) => {
  return res.status(200).send({
    idleTime,
    pingTime: idleTime,
    date: new Date().toISOString(),
  });
});

api.get("/v1/config/external", (req, res) => {
  return res.status(200).send({
    idleTime,
    pingTime: idleTime,
    date: new Date().toISOString(),
  });
});

api.get("/v1/ping/pse", (req, res) => {
  return res.status(202).send({ imAlive: true });
});

api.route("/v1/products/:transactionId").get((req, res) => {
  return res.status(200).send(resPaymentAccounts);
});

api.route("/v1/pse-private-transaction/companies").get((req, res) => {
  return res.status(200).send(pseBanks);
});

api.route("/v1/pse-private-transaction").get((req, res) => {
  //return res.status(500).send({"code":"404","description":"Â¡Oh no! Ha ocurrido un error que no esperÃ¡bamos. ComunÃ­cate con nosotros (999)"})
  const test = {
    status: "APPROVED",
    traceabilityCode: "6284495352",
    paymentDescription: "",
    amount: "2000",
    ip: "3.13.132.40",
    transactionDate: "2023-06-28T10:49:46",
    product: "12345871663",
  };
  const approved = {
    status: "APPROVED",
    traceabilityCode: "5066129432",
    paymentDescription: "PAGO BANCO AV VILLAS - TARJETA DE CREDITO",
    amount: "2000000",
    ip: "8.8.8.8",
    transactionDate: "2020-09-08T11:07:09",
    product: "****4647",
  };

  const pending = {
    status: "PENDING",
    traceabilityCode: "6204594829",
    paymentDescription: "",
    amount: "20000",
    ip: "3.13.132.40",
    transactionDate: "2023-06-20T14:17:06",
    product: "****6800",
  };
  return res.status(200).send(approved);
});

api.route("/v1/pse-private-transaction").post((req, res) => {
  return res.status(200).send({
    paymentDescription: "PAGO BANCO AV VILLAS - TARJETA DE CREDITO",
    urlPse: "http://localhost:4200/bancadigital/zona-privada-pse/",
  });
});

api
  .route("/v1/transaction/:transactionId")
  .get((req, res) => {
    return res.status(200).send(resPseTransaction);
  })
  .delete((req, res) => {
    return res.status(204).send("");
  });

  api.route("/v1/delete-transaction").post(async (req, res) => {
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 2000);
    // });
    //return res.status(200).send("");
    //return res.status(412).send({ code: '1234', description: 'La cuenta que estas seleccionando no permite realizar esta transacción.' });
    //return res.status(412).send({ code: '1234', description: 'El valor del pago excede el máximo permitido, ingresa un nuevo monto (00011)' });
    return res.status(412).send({ code: '1234', description: 'Causal 16(00016)' });
  
  });

api.route("/v1/transaction-process/:transactionId").delete((req, res) => {
  return res.status(204).send("");
});

api.route("/v1/recurring/admin/consult-commerce-risk").post((req, res) => {
  if (req.body["beneficiaryCode"] === "812345678") {
    return res.status(200).send(
      {
        recurringPaymentDto: {
          beneficiaryCode: "beneficiaryCode01",
          nameGeneric: "Acueducto",
          nameTrade: "Agua Casa",
          active: true,
          createdDate: "1",
          lastUpdateDate: "123456789",
        },
        commerceRisk: false,
      }
    );
  }
  return res.status(200).send(
    {
      recurringPaymentDto: {
        beneficiaryCode: "beneficiaryCode01",
        nameGeneric: "Acueducto",
        nameTrade: "Agua Casa",
        active: false,
        createdDate: "1",
        lastUpdateDate: "123456789",
      },
      commerceRisk: true,
    }
  );

});

api.route("/v1/transaction").post((req, res) => {
  req.body = req;
  //return res.status(200).send(resPsePay);
  return res.status(400).send({ code: '1234', description: 'Error X' });
});

api.route("/v1/recurring/transaction").post(async(req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  if(req.body["createRecurring"] === true){
    return res.status(200).send(resPsePay);
  }
  return res.status(200).send({  authorizationNumber: "98754837492384",
  transactionDate: "2020-05-07 20:06:58",
  recurringUpdatedOk: false,
  recurringErrorExist: false,
  recurringCreatedOk: true
  });
  
  //return res.status(400).send({ code: '1234', description: 'Error X' });
  //return res.status(412).send({ code: '1234', description: 'La cuenta que estas seleccionando no permite realizar esta transacción.' });
});

api.route("/v1/recurring/admin/read").post(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  return res.status(200).send(recordsPseRecurring);
  // return res.status(400).send({ code: '1234', description: 'Error X' });
});
api.route("/v1/recurring/admin/edit_payment").post(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  return res.status(200).send({
    "recurringUpdatedOk": true,
    "recurringErrorExist ": false
  });
  // return res.status(400).send({ code: '1234', description: 'Error X' });
});

api.route("/v1/recurring/admin/delete").post(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  // return res.status(200).send(deleteRecordResponse);
  return res.status(400).send({ code: '1234', description: 'Error X' });

});

api.route("/v1/export").post((req, res) => {
  return res.status(200).send(pseFile);
});

api.get("/v1/ip", async (req, res) => {
  return res.status(200).send(JSON.stringify("10.35.40.100"));
});

module.exports = api;
