"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const genericResponse = require("../responses/generic_response.json");
const recordsResponse = require("../responses/records_response.json");
const scheduleListResponse = require("../responses/transfers/schedule_list_response.json");
const cel2celFindProductsByPhoneNumber = require("../responses/transfers/cel2cel/response_find_products_by_phone_number.json");
const avalKeyFindProductsByAvalKey = require("../responses/transfers/spi/account-aval-key.json");
const jwt = require("jwt-simple");
const mobileHelper = require("../routes/mobileHelper");
const moment = require("moment-timezone");
/*
 Route: /bank/transfers
*/
const api = express.Router();

api.post("/v1/transfer", (req, res) => {
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

api.post("/v1/transfers/own", (req, res) => {
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

api.post("/v1/transfers/fast", (req, res) => {
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

api.post("/v1/transfers/contacts", (req, res) => {
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

api.get("/v1/records", async (req, res) => {
  return res.status(200).send(recordsResponse);
  // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/advances", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(500).send({
        description: "Ocurrio un error al realizar el avance",
      });
    }
  }
  return res.status(500).send({
    path: "/2fa-server/v1/transaction",
    error: "Internal Server Error",
    message: "",
    timestamp: "2024-05-02T14:51:43.228+00:00",
    status: 500,
  });
});

api.post("/v1/use-quota", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 10000);
  });

  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(500).send({
        description: "Ocurrio un error al realizar la transacción",
      });
    }
  }

  return res.status(200).send(genericResponse);
});

api.post("/v1/cashout-otp", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 3000)
  // })
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(412).send({
        code: "2080",
        description: "Número de identificación no valido (2080)",
      });
    } else if (mobileHelper.includes(clientId)) {
      moment.tz.setDefault("America/Bogota");
      const offset = moment().utcOffset();
      return res.status(200).send({
        otp: "234234234",
        approvalId: "2846299",
        transactionDate: moment().utc(offset).format(),
      });
    }
  }
  if (parseInt(req.body["amount"]) > 100000) {
    return res.status(412).send({
      code: "2080",
      description: "Número de identificación no valido (2080)",
    });
  } else {
    return res.status(200).send({
      otp: "234234234",
      approvalId: "2846299",
      transactionDate: "2019-02-20T14:21:53",
    });
  }
});

api.post("/v1/withdraw/:type", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 3000)
  // })
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(412).send({
        code: "2080",
        description: "Número de identificación no valido (2080)",
      });
    } else if (mobileHelper.includes(clientId)) {
      moment.tz.setDefault("America/Bogota");
      const offset = moment().utcOffset();
      return res.status(200).send({
        otp: "234234234",
        approvalId: "2846299",
        transactionDate: moment().utc(offset).format(),
      });
    }
  }
  if (parseInt(req.body["amount"]) > 100000) {
    return res.status(412).send({
      code: "2080",
      description: "Número de identificación no valido (2080)",
    });
  } else {
    return res.status(200).send({
      otp: "234234234",
      approvalId: "2846299",
      transactionDate: "2019-02-20T14:21:53",
    });
  }
});

api
  .route("/v1/schedule")
  .get((req, res) => {
    return res.status(200).send(scheduleListResponse);
  })
  .put((req, res) => {
    return res.status(200).send(genericResponse);
  });

api.delete("/v1/schedule/:scheduleId", async (req, res) => {
  return res.status(200).send(genericResponse);
});

api.post("/v1/schedule/own", async (req, res) => {
  return res.status(200).send(genericResponse);
});

api.post("/v1/schedule/contacts", async (req, res) => {
  return res.status(200).send(genericResponse);
});

api.post("/v1/cel", async (req, res) => {
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

api.post("/v1/transfers/afc", (req, res) => {
  res.status(200).send(genericResponse);
});

api.post("/v1/cel2cel", async (req, res) => {
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
api.post("/v1/remittance/customer-validate", async (req, res) => {
  const hasAccountForeign = {
    httpCode: "201",
    approvalId: "52fcf7e3-d745-48df-93be-ee1178dc4d13",
    tokenInfo: {
      accessToken:
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhlZnRBOER6RmRwTjRkVWF5WnVMaEEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3NTA5NDg2MDgsImV4cCI6MTc1MDk1MDIwOCwiaXNzIjoiaHR0cDovLzEwLjIyMC4xMDUuMTE6MTk4NCIsImF1ZCI6ImNsaWVudGVzIiwiY2xpZW50X2lkIjoiQVZWSUxMQVMiLCJTeXN0ZW1Db2RlIjoiMzYiLCJEYXRhQWRpY2lvbmFsIjoiIiwic2NvcGUiOlsiY2xpZW50ZXMuVW5pMDEiXX0.dNtws4fH9ZDOnhwyoW91wcyxlXzduoKMxZdOrfMhh8XuANMBEuQ_3qaAOqOjIDpqtgW1Tya7jYyzjLSlaUY8YY8DXGH3scA-L9yuMZth9k8aBp1EEqwRF8ean8B9X0qIk-TRljwuB25GhIkgfPWGkZ7p_sAN_3SsBvWSGSHLKVuR_Nm2jt2WPpw2D8fOWDqZzJH5GjIK6gMNo9NKLdyRl-TuSc6rHs-PAcELAXlrhoynxT9jpwOyMWZChFrfVoISZmp-wb3Kre29ltKheMTUOdJdyobh7RN5_mdWrdSOEjS6r_cNnmpFO7ybwVTXs_k9u34iX5CFQUOjCZaSqXtWMQ",
    },
    customer: "F",
    athResponseError: false,
  };
  const hasAccountForeigntrue = {
    httpCode: "201",
    approvalId: "5adff293-0aeb-4fcb-8ce6-305133d80466",
    tokenInfo: {
      accessToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IklueVRCdVVaTUxCUUFETllFM0ZNS1EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE3NTIyNDY1MjQsImV4cCI6MTc1MjI0ODEyNCwiaXNzIjoiaHR0cDovLzEwLjIyMC4xMDUuMTE6MTk4NCIsImF1ZCI6ImNsaWVudGVzIiwiY2xpZW50X2lkIjoiQVZWSUxMQVMiLCJTeXN0ZW1Db2RlIjoiMzYiLCJEYXRhQWRpY2lvbmFsIjoiIiwic2NvcGUiOlsiY2xpZW50ZXMuVW5pMDEiXX0.em60-obIe62_IdJ7di6z8MvFBdr-f3aC6S28gsFu0AEyw4sC4Mjmz_Xm4zZprxQFk7S_RTBZ32LoTGCV-1lp7VBOm-CrlRyzEc9DyARMZuUk2aNPCZdWKy-liP8Ywr8RF05R925A1C0ywRqBlFsdf89v14bwbJ94UWk9j-7WbzHT-kdn0TThQxLS5LjSaKTxp3QmHf87kvLJXBwAQ7Ji_dpmM2ErLTKN5pvIxcKVUBTN-_JUPPBE9UyK5FVmUAN3Z7wv-owmxtAnwxIQoccFqKG4MPsRZ0Zf28-lUPZ4VnitXrxs2BUYvXZjGJTG8NGfCvZpYLSOBT2KsIh7302C5g",
    },
    infoAccount: {
      document: "1019100206",
      documentType: "CC",
      cellphone: "****12324",
      numberAccount: "****23123",
      clientName: "PABLO PELAEZ",
      nameWallet: "AV Villas",
    },
    customer: "R",
    athResponseError: false,
  };

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
  // return res.status(200).send(hasAccountForeign);
  return res.status(200).send(hasAccountForeigntrue);
});
api.post("/v1/remittance/register-account", async (req, res) => {
  const hasAccountForeign = {
    document: "621345",
    documentType: "CC",
    numberAccount: "45345346",
    typeAccount: "SDA",
    cellphone: "3167433611",
    clientName: "PAULA PINEROS",
    registerDate: "11/07/2025",
    registerIp: "127.0.0.1",
    approvalId: "5261300002",
    nameWallet: "AV Villas",
  };
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
  return res.status(200).send(hasAccountForeign);
  // return res.status(500);
});

api.post("/v1/find-products-by-phone-number", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
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

  let data = cel2celFindProductsByPhoneNumber[req.body?.phone] ?? { data: [] };
  return res.status(200).send(data);
});

api.post("/v1/spi/account-keys-user", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });
  const spiKey = req.body?.spiKey;
  const objData = avalKeyFindProductsByAvalKey;
  let data = null;

  if (objData.hasOwnProperty(spiKey)) {
    data = objData[spiKey];
  } else {
    const primeraClave = Object.keys(objData)[0]; // Obtiene la primera clave
    data = objData[primeraClave];
  }

  return res.status(200).send(data);
});

module.exports = api;
