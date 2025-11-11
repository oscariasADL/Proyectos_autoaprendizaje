"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const resLogin = require("../responses/login.json");
const basicDataResponse = require("../responses/login/basic_data.json");
const resLoginMobile1 = require("../responses/login/login_ric_1.json");
const resLoginMobile2 = require("../responses/login/login_ric_2.json");
const resLoginMobile3 = require("../responses/login/login_ric_3.json");
const resLoginMobile4 = require("../responses/login/login_ric_4.json");
const resLoginMobile5 = require("../responses/login/login_ric_5.json");
const resLoginMobile6 = require("../responses/login/login_ric_6.json");
const resLoginMobile8 = require("../responses/login/login_ric_8.json");
const resLoginMobile9 = require("../responses/login/login_ric_9.json");
const resLoginMobile10 = require("../responses/login/login_ric_10.json");
const resLoginMobile11 = require("../responses/login/login_ric_11.json");
const resLoginMobile12 = require("../responses/login/login_ric_12.json");
const resLoginMobile13 = require("../responses/login/login_ric_13.json");
const resLoginMobile14 = require("../responses/login/login_ric_14.json");
const resLoginMobile15 = require("../responses/login/login_ric_15.json");
const resLoginMobile16 = require("../responses/login/login_ric_16.json");
const resLoginMobile17 = require("../responses/login/login_ric_17.json");
const resLoginMobile18 = require("../responses/login/login_ric_18.json");
const resLoginMobile19 = require("../responses/login/login_ric_19.json");
const resLoginMobile20 = require("../responses/login/login_ric_20.json");
const resLoginMobile21 = require("../responses/login/login_ric_21.json");
const resLoginMobile22 = require("../responses/login/login_ric_22.json");
const resLoginMobile23 = require("../responses/login/login_ric_23.json");
const resLoginEdi1 = require("../responses/login/login_ed_1.json");
const resLoginEdi2 = require("../responses/login/login_ed_2.json");
const resLoginPassword = require("../responses/login/login_password.json");
const resLoginBadBasicData = require("../responses/login/login_bad_basic_data");
const resChallenge = require("../responses/challenge-2fa.json");
const genericResponse = require("../responses/generic_response.json");
const jwt = require("jwt-simple");
const pocketHelper = require("../service/pocketHelper");
const pseFile = require("../responses/base64/pse");
const moment = require("moment-timezone");

/*
 Route: /bank/auth
*/
const api = express.Router();

const idleTime = 500;

api.get("/v1/public-key", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 8000)
  // })
  const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcBlKAcr3fj2ZE1urcj/E+piAm
  OKseNaug5F6cMF3a8bfp+e/8IKIXh8zSyyuhO17XtyaBmlpCTGjFy1zqc1Ls1dqG
  rSkfwub/iyq3x5uJiDCr9UhnE/r3w1bUcnYyv4U6jdxaxvTEZXqfmN60MOqKw70z
  9lNQMRorHUdt22blrwIDAQAB
  -----END PUBLIC KEY-----
  `;
  res.status(200).send({ publicKey });
});

api.get("/v1/security/interchange", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 8000)
  // })
  const publicKey = `
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcBlKAcr3fj2ZE1urcj/E+piAm
  OKseNaug5F6cMF3a8bfp+e/8IKIXh8zSyyuhO17XtyaBmlpCTGjFy1zqc1Ls1dqG
  rSkfwub/iyq3x5uJiDCr9UhnE/r3w1bUcnYyv4U6jdxaxvTEZXqfmN60MOqKw70z
  9lNQMRorHUdt22blrwIDAQAB
  -----END PUBLIC KEY-----
  `;
  res.status(200).send({ publicKey });
});

api.post("/v1/security/interchange", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-SESSION-HASH");
  res.setHeader("Access-Control-Expose-Headers", "Content-Type,X-SESSION-HASH");
  res.set({
    "X-SESSION-HASH": "10d2f35e-f85f-476c-bfbc-a016cbc6aeff",
  });
  res.status(200).send();
});

api.post("/v1/login", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const { documentNumber } = req.body;
  const moment = require("moment-timezone");
  switch (parseInt(documentNumber)) {
    case 111:
      return res.status(400).send({
        statusCode: "103",
        description:
          "La contraseña ya expiró y debes modificarla para poder ingresar (103)",
      });
    case 222:
      return res.status(401).send({
        statusCode: "1603",
        description: "Tu usuario ha sido bloqueado (1603)",
      });
    case 333:
      return res.status(404).send({
        description: "Los datos que ingresaste no son válidos.",
      });
    case 123456:
      return res.status(403).send({
        description:
          "Por tu seguridad no puedes tener más de una sesión abierta.",
      });
    case 1013595705:
      const { password } = req.body;
      if (password === "2029") {
        resLoginMobile16.lastAuthDate = moment().subtract(1, "day").format();
        resLoginMobile16.currentDate = moment().format();
        return res.status(200).send(resLoginMobile16);
      } else {
        return res.status(400).send({
          statusCode: "103",
          description:
            "La contraseña ya expiró y debes modificarla para poder ingresar (103)",
        });
      }
    case 654321:
      return res.status(206).send(resChallenge);
    case 1013595641:
      resLoginMobile1.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile1.currentDate = moment().format();
      return res.status(200).send(resLoginMobile1);
    case 1013595642:
      resLoginMobile2.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile2.currentDate = moment().format();
      return res.status(200).send(resLoginMobile2);
    case 1013595643:
      resLoginMobile3.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile3.currentDate = moment().format();
      return res.status(200).send(resLoginMobile3);
    case 1013595644:
      resLoginMobile4.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile4.currentDate = moment().format();
      return res.status(200).send(resLoginMobile4);
    case 1013595645:
      resLoginMobile5.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile5.currentDate = moment().format();
      return res.status(200).send(resLoginMobile5);
    case 1013595646:
      resLoginMobile6.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile6.currentDate = moment().format();
      return res.status(200).send(resLoginMobile6);
    case 1013595648:
      resLoginMobile8.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile8.currentDate = moment().format();
      return res.status(200).send(resLoginMobile8);
    case 1013595649:
      resLoginMobile9.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile9.currentDate = moment().format();
      return res.status(200).send(resLoginMobile9);
    case 1013595650:
      resLoginMobile10.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile10.currentDate = moment().format();
      return res.status(200).send(resLoginMobile10);
    case 1013595651:
      resLoginMobile11.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile11.currentDate = moment().format();
      return res.status(200).send(resLoginMobile11);
    case 1013595652:
      resLoginMobile12.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile12.currentDate = moment().format();
      return res.status(200).send(resLoginMobile12);
    case 1013595653:
      resLoginMobile13.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile13.currentDate = moment().format();
      return res.status(200).send(resLoginMobile13);
    case 1013595654:
      resLoginMobile14.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile14.currentDate = moment().format();
      return res.status(200).send(resLoginMobile14);
    case 1013595655:
      resLoginMobile15.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile15.currentDate = moment().format();
      return res.status(200).send(resLoginMobile15);
    case 1013595680:
      resLoginMobile16.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile16.currentDate = moment().format();
      return res.status(200).send(resLoginMobile16);
    case 1013595681:
      resLoginMobile23.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile23.currentDate = moment().format();
      return res.status(200).send(resLoginMobile23);
    case 1013595690:
      resLoginMobile22.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile22.currentDate = moment().format();
      return res.status(200).send(resLoginMobile22);
    case 1013695655:
      resLoginEdi1.lastAuthDate = moment().subtract(1, "day").format();
      resLoginEdi1.currentDate = moment().format();
      return res.status(200).send(resLoginEdi1);
    case 1013695656:
      resLoginEdi2.lastAuthDate = moment().subtract(1, "day").format();
      resLoginEdi2.currentDate = moment().format();
      return res.status(200).send(resLoginEdi2);
    case 1019100202:
      resLoginBadBasicData.lastAuthDate = moment().subtract(1, "day").format();
      resLoginBadBasicData.currentDate = moment().format();
      return res.status(200).send(resLoginBadBasicData);
    case 1013595647:
      return res.status(404).send({
        description: "Los datos que ingresaste no son válidos.",
      });
    case 1013595700:
      resLoginMobile17.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile17.currentDate = moment().format();
      return res.status(200).send(resLoginMobile17);
    case 1013595701:
      resLoginMobile18.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile18.currentDate = moment().format();
      return res.status(200).send(resLoginMobile18);
    case 1013595702:
      resLoginMobile19.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile19.currentDate = moment().format();
      return res.status(200).send(resLoginMobile19);
    case 1013595703:
      resLoginMobile20.lastAuthDate = moment().subtract(1, "day").format();
      resLoginMobile20.currentDate = moment().format();
      return res.status(200).send(resLoginMobile20);
    case 1013595704:
      return res.status(400).send(resLoginMobile21);
    case 1111111111:
      return res.status(200).send(resLoginPassword);
    case 426:
      return res.status(426).send({
        statusCode: "426",
        description:
          "Para continuar utilizando los servicios de AV Villas App debes tener la última actualización de nuestra aplicación. <br><a href='https://www.avvillas.com.co/descarga-av-villas-app' target='_blank'> <b>Descárgala ahora en tu tienda</b></a>",
      });
    default:
      resLogin.lastAuthDate = moment().subtract(1, "day").format();
      resLogin.currentDate = moment().format();
      res.status(200).send(resLogin);
  }
});

api.post("/v1/logout", (req, res) => {
  pocketHelper.reset();
  res.status(204).send("");
});

api.post("/v1/personal-data/get-personal-data", async (req, res) => {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 3000);
  // });
  res.status(200).send({
    contact: {
      homeTypeId: "01",
      homeAddress: "CL 25 70 34",
      neighborhood: "CEDRITOS",
      cityId: "11001",
      phoneNumber: "3143804297",
      email: "tatiana.ariza@avaldigitallabs.com",
      correspondenceDeliveryType: "C",
    },
    financial: {
      occupationId: "01",
      economicActivityId: "0112",
      totalIncome: 5000000.0,
      totalLiabilities: 1450000.0,
      assets: 2000000.0,
      expenses: 1.55e7,
      internationalCurrencyTransactions: false,
    },
    other: {
      maritalStatusId: "1",
      educationalLevelId: "5",
      dependents: 0,
      professionId: "002",
      ethnicGroupId: "01",
      companyName: null,
      companyAddress: null,
      companyCityId: "00000",
      companyPhoneNumber: "8103054",
      companyCellPhoneNumber: "3167134189",
      companyDateOfEntry: "2025-09-20",
      companyContractTypeId: null,
      companyPositionId: null,
    },
    tax: {
      taxesInAnotherCountry: false,
      personalDataAuthorization: false,
      politicallyExposedPerson: false,
    },
  });
});

api.post("/v1/personal-data/update-personal-data", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  // res.status(412).send({
  //   httpStatusCode: "200",
  //   approvalId: "123455",
  //   transactionDate: "2026-09-19T10:12:01",
  // });
  res.status(200).send({
    httpStatusCode: "200",
    approvalId: "123455",
    transactionDate: "2026-09-19T10:12:01",
  });
});

api.post("/v1/identity", (req, res) => {
  return res.status(200).send(genericResponse);
});

api.post("/v1/change-expired-password", (req, res) => {
  return res.status(200).send(genericResponse);
});

api.get("/v1/ath/url-pb", (req, res) => {
  res.status(200).send({
    url: "https://www.google.com",
  });
});

api.get("/v1/config-app", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1);
  });

  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;

    if (clientId === "1013597680" || clientId === "1013595646") {
      return res
        .status(200)
        .send({ idleTime: 10, pingTime: 10, date: new Date().toISOString() });
    }
  }

  return res
    .status(200)
    .send({ idleTime, pingTime: idleTime, date: new Date().toISOString() });
});

api.route("/v1/export").post((req, res) => {
  return res.status(200).send(pseFile);
});

api.get("/v1/ping", (req, res) => {
  return res.status(202).send({ imAlive: true });
});

api.get("/v1/export/ip", async (req, res) => {
  return res.status(200).send(JSON.stringify("10.35.40.100"));
});

api.get("/v1/complementary-services", async (req, res) => {
  return res.status(200).send({
    approvalId: "0",
    hasComplementaryServices: true,
  });
});
api.post("/v1/two-factor/app-sync/token", async (req, res) => {
  return res.status(200).send({
    access_token: "token",
    expires_in: "123333",
    token_type: "tokentype",
  });
});

api.post("/v1/two-factor/app-sync/credentials", async (req, res) => {
  return res.status(200).send({
    userPool: 'us-east-2_WtR5M3YCA',
    user: '95af64b3-610f-4f39-881b-6e9268e72cfc',
    clientId: '5rp34g7o84bcfma39h5l0o2lqf',
    password: 'ChangeMe2025!'

  });
});

api.put("/v1/complementary-services", async (req, res) => {
  return res.status(200).send({
    approvalId: "5235170000",
    transactionDate: "2020-02-18T15:34:04",
  });
});

api.post("/v1/core/complementary-services", async (req, res) => {
  return res.status(200).send({
    processId: "7457d552-f748-11e9-8a77-0242ac110003",
    step: "CCS06",
    isLastAttempt: true,
    sdsPasswordValidation: "MB",
    userFirstName: "ANGIE",
    challenged: false,
    finished: false,
    success: true,
    complementary: false,
  });
});

api.post("/v1/two-factor/notification", async (req, res) => {
  // return res.status(204).send({});
  // return res.status(200).send({
  //   txId: "a63f0094-607d-4639-ba90-11b3cc45d663",
  //   qr: "12345678",
  //   status: "REJECTED"
  // });
  return res.status(200).send({
    txId: "a63f0094-607d-4639-ba90-11b3cc45d663",
    qr: "iVBORw0KGgoAAAANSUhEUgAAAQgAAAEIAQMAAACZOPi8AAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABDUlEQVRoge2VUZLDIAxDff9LqzuxJAxp9wLCaRliHj8aS6m6devfQtff5tkXH3XzCK/PeW/qPEsiqBO0m91cYkcuwSmqHqNkgiuMz24ewWw9ni+ZnEGoZCgL9aoMgidtpP6TRCRRK0kweZksjeCrQ3fl7PRcGOHztbOQYUT3hmAWsYBEomrFC6TVLlkYQZE2gEwggZKjipTkmo4KImgii4Ri1lqxLMKrTAXlTSKxwoXMmKBEQkNj7XRrd1QMIXm09iXAeBhhEooZ++mgMgh/i/VjwmB5LovgyqyFkkXTlEeo3WpZxfN2GEGRNDjqxRIt2PMud701jSDEaevpeXkugnDiojbNZK8w4tatn/UBTx5TZNr0E9gAAAAASUVORK5CYII=",
    status: "RESCUED",
  });
});

api.post("/v1/two-factor/notification/challenge", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  res.status(200).send({
    httpCode: "200",
    httpMessage: "Ok",
  });
});

api.get("/v1/basic-data", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    if (clientId === "1013595649") {
      return res.status(500).send({
        description: "No se encontro data para el usuario.",
      });
    } else if (clientId === "1013595648") {
      return res.status(502).send({
        code: "1602",
        description: "Canal bloqueado",
      });
    } else if (clientId === "1019100202") {
      return res.status(202).send({
        statusCode: "1601",
        description: null,
        additionalStatusCode: null,
        additionalDescription: null,
      });
    } else {
      return res.status(200).send(basicDataResponse);
    }
  } else {
    return res.status(200).send(basicDataResponse);
  }
});

api.get("/v1/basic-data-client", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    if (clientId === "1013595649") {
      return res.status(500).send({
        description: "No se encontró data para el usuario.",
      });
    } else if (clientId === "1013595648") {
      return res.status(502).send({
        code: "1602",
        description: "Canal bloqueado",
      });
    } else if (clientId === "1019100202") {
      return res.status(202).send({
        statusCode: "1601",
        description: null,
        additionalStatusCode: null,
        additionalDescription: null,
      });
    } else {
      return res.status(200).send({
        clientName: "KEVIN SILVA",
        documentNumber: "1019100200",
        documentType: "CC",
        phoneNumber: "3213444555",
        phoneNumberStatus: "A",
        email: "kevin.silva@avaldigitallabs.com",
        emailType: "A",
        lastAuthInfo: "1900-01-01T12:00:00",
        ip: "127.0.0.1",
        channelState: "A",
        signStatus: 0,
        adviserName: "",
        adviserPhone: "0",
        adviserEmail: "",
      });
    }
  } else {
    return res.status(200).send({
      clientName: "KEVIN SILVA",
      documentNumber: "1019100200",
      documentType: "CC",
      phoneNumber: "3213444555",
      phoneNumberStatus: "A",
      email: "kevin.silva@avaldigitallabs.com",
      emailType: "A",
      lastAuthInfo: "1900-01-01T12:00:00",
      ip: "127.0.0.1",
      channelState: "A",
      signStatus: 0,
      adviserName: "",
      adviserPhone: "0",
      adviserEmail: "",
    });
  }
});

api
  .route("/v1/password")
  .put((req, res) => {
    return res.status(200).send({
      code: "0",
      description: "¡Tu transacción se realizó con éxito! (0)",
      approvalId: "0012273413",
      transactionDate: "2021-09-23T16:15:16",
    });
  })
  .post((req, res) => {
    return res.status(202).send({
      approvalId: "5212320000",
      transactionDate: "2019-03-12T10:12:41.637",
    });
  });

api.post("/v1/password/forgot", async (req, res) => {
  if (req.body["content"]["id"] !== undefined) {
    const clientId = req.body["content"]["id"];

    if (clientId === "1013595648") {
      return res.status(200).send({
        processId: "7457d552-f748-11e9-8a77-0242ac110002",
        step: "CHA15",
        secureDataBriefQuestion: {
          length: 8,
          question:
            "Ingresa los ultimos 8 digitos de alguna de tus Tarjetas Credito Master                                                  ",
          accountType: "CCA",
          questionType: "product",
          productType: "CREDIT_CARD",
        },
        sdsPasswordValidation: "MB",
        userFirstName: "ANGIE",
        challenged: false,
        finished: false,
        success: true,
      });
    }
  }
  res.status(500).send();
  /*res.status(206).send({
    txId: "c57e9bd6-8b5d-49cb-855f-e58d4fb108cf",
    prefixUrl: "/storm/enrollment/two-factor-auth/transaction",
    challenge: "QR",
    qrCode:
      "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B/o27ByB5fyEYxuOaAOf8ZeDdR+IGsaJ4Yk1/wC332h+f/bWpfY1i8jzlWSD91uUNuCbfkJxjJxWBF8WNR8b/Efwrc6T4U332m/a/Ls/7RUfaPMhwfnZAF2hSec56V1/iD4ZeIvFPi/xj/xN/wCyNE1X7F/y7R3H2zyox/tho9jr7bs9wK6Dwx4f/wCEO8IXWpaB4H+x63dbPO0j+1vM3bZCq/vnJUYRmfgd8daAPMIvGWneHPiP4V0nVtA/4Rax8Nfa/Mi+2NfbftEO4cqpJ5IPBP3u2K6+fwT4d8HfF7wJ/YGn/Y/tX9oed++kk3bbf5fvscY3N09aNQ0/4h3n9sa/oGh/8Ixrc3kedB9rt73+1MYRfmc7YfKQMeB8+71FegeGNP8A7C+1aBZaH/Z+iWGz7BP9r837Rvy8nyklk2uSPmJznjigDoKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//2Q==",
    digitNumber: 8,
    step: "CHA00",
    success: true,
  });*/
});

api.post("/v1/password/biometrics", async (req, res) => {
  if (req.body["content"]["id"] !== undefined) {
    const clientId = req.body["content"]["id"];

    return res.status(200).send({
      processId: "fe707d25-e467-11e9-95dc-0242ac110003",
      step: "ENR25", // "ENR13"
      biometricAuthorizer:
        "eyJraWQiOiI0WGNQT3g5Z05mTWxlN0IrMG9FQ0lDajd0Y1cwRHhPeG11dmZhWUlxM3NrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2dmExY2loc3Z2YjRpc2FpZDZzMzQwdTMyNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicmItbWItc3RnLWF1dGgtYXBpXC9hdXRob3JpemF0aW9uIiwiYXV0aF90aW1lIjoxNzU0MDg0ODc3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9GNzhyTGhHbEMiLCJleHAiOjE3NTQwODg0NzcsImlhdCI6MTc1NDA4NDg3NywidmVyc2lvbiI6MiwianRpIjoiYjI0ODUzMDktZTg1ZC00YzlkLThhMWYtYTY2NDViOTUxZThkIiwiY2xpZW50X2lkIjoiNnZhMWNpaHN2dmI0aXNhaWQ2czM0MHUzMjQifQ.pQy5S0NSPEgyNxDaKhK8kHW1hKmUNqS26TXhOEdZhsXJSJIHQB93zlXv3UGK-220qsVrdzphG_dvjFPNQRAeVbO2VBZLDzuwDw_GJd_DACRDaKyYfNokUX50FLlU-_PQUrbBIVW9WF9w0vAtGBnMCS40w3PxXXyBSNKuJU2Zb24UvnG1njx62Ia4hp6YYitQKT2a8G0c0J-Ctxa9V2kkVqSXc2aO8sneyRRilxRtEPwfgwVvhEHaW1l8IXTtIr7V_XNLvBBFtCvL_EtTrgERu5XTWLg3zNjFPhkRi0zTg8XOTVPKToqo19ppveSJqm7cn3hV3vOAbJelb0tki92WvQ",
      secureDataBriefQuestion: null,
      userFirstName: "David",
      token:
        "eyJraWQiOiJUV2JaVDIrVE1ZTUZpUjNIaVJMYmZJYjdLZldqaVJ2SkxsbExCUlFKWjNnPSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiI3Y3U5MTE5MWlsYzliZzViN245cmVlbWJtayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiQURMLUFVVEgtU2VydmljZS9jcmVhdGUtdG9rZW4gQURMLUFVVEgtU2VydmljZS92YWxpZGF0ZS10b2tlbiIsImF1dGhfdGltZSI6MTU0OTk4MTkwNiwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cy1lYXN0LTJfRFEzbkt4V0JlIiwiZXhwIjoxNTQ5OTg1NTA2LCJpYXQiOjE1NDk5ODE5MDYsInZlcnNpb24iOjIsImp0aSI6ImEzNTZhOWNkLTljODEtNDcxOC1iNmJmLWUyZmQ2ZGQzYWU1ZiIsImNsaWVudF9pZCI6IjEwMTM1OTU2ODAifQ.rPNa6IzPLWkxIsKxrpKXe9HzTn1ol2WRqV-TTs_CqH0",
      lastAuthDate: moment().subtract(1, "day").format(),
      currentDate: moment().format(),
      lastIPAddress: "127.0.0.1",
      errorMessage: "hubo un error :( de nuevo",
      sdsPasswordValidation: null,
      challenged: false,
      twoFactorAuthResponse: null,
      success: true,
    });
  }
});

api.post("/v1/enrollment/biometrics", async (req, res) => {
  const moment = require("moment-timezone");

  if (
    req.body["processId"] !== undefined &&
    req.body.content["otpValue"] !== undefined
  ) {
    if (
      req.body.content["isAutomaticOtp"] !== undefined &&
      req.body.content["isAutomaticOtp"]
    ) {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR17",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    return res.status(200).send({
      processId: "fe707d25-e467-11e9-95dc-0242ac110003",
      step: "ENR25",
      secureDataBriefQuestion: null,
      userFirstName: "David",
      token:
        "eyJraWQiOiJUV2JaVDIrVE1ZTUZpUjNIaVJMYmZJYjdLZldqaVJ2SkxsbExCUlFKWjNnPSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiI3Y3U5MTE5MWlsYzliZzViN245cmVlbWJtayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiQURMLUFVVEgtU2VydmljZS9jcmVhdGUtdG9rZW4gQURMLUFVVEgtU2VydmljZS92YWxpZGF0ZS10b2tlbiIsImF1dGhfdGltZSI6MTU0OTk4MTkwNiwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cy1lYXN0LTJfRFEzbkt4V0JlIiwiZXhwIjoxNTQ5OTg1NTA2LCJpYXQiOjE1NDk5ODE5MDYsInZlcnNpb24iOjIsImp0aSI6ImEzNTZhOWNkLTljODEtNDcxOC1iNmJmLWUyZmQ2ZGQzYWU1ZiIsImNsaWVudF9pZCI6IjEwMTM1OTU2ODAifQ.rPNa6IzPLWkxIsKxrpKXe9HzTn1ol2WRqV-TTs_CqH0",
      lastAuthDate: moment().subtract(1, "day").format(),
      currentDate: moment().format(),
      lastIPAddress: "127.0.0.1",
      errorMessage: null,
      sdsPasswordValidation: null,
      challenged: false,
      twoFactorAuthResponse: null,
      success: true,
    });
  }
  if (
    req.body.content["deviceCode"] !== undefined &&
    req.body.content["deviceCode"]
  ) {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return res.status(200).send({
      processId: "fe707d25-e467-11e9-95dc-0242ac110003",
      step: "ONESPAN_ACTIVATE_INSTANCE",
      enrollmentKey:
        "0041C3E412D687ADB53FD2838A72B08A893B60E8D591588AFE552E7DA867036466AA402CE4A9C8063762EBF36F2176BAC3CD78A0B879A17DE3DFE52B3719",
      secureDataBriefQuestion: null,
      userFirstName: "Pepito",
      token:
        "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
      lastAuthDate: "2018-02-16T17:00:00Z",
      currentDate: "2019-10-01T16:31:35Z",
      lastIPAddress: "127.0.0.1",
      errorMessage: null,
      sdsPasswordValidation: null,
      challenged: false,
      twoFactorAuthResponse: null,
      success: true,
    });
  }
  if (req.body.content["id"] !== undefined) {
    const clientId = req.body.content["id"];
    if (clientId === "1013595680") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR05",
        secureDataBriefQuestion: null,
        userFirstName: "David",
        token:
          "eyJraWQiOiJUV2JaVDIrVE1ZTUZpUjNIaVJMYmZJYjdLZldqaVJ2SkxsbExCUlFKWjNnPSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiI3Y3U5MTE5MWlsYzliZzViN245cmVlbWJtayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiQURMLUFVVEgtU2VydmljZS9jcmVhdGUtdG9rZW4gQURMLUFVVEgtU2VydmljZS92YWxpZGF0ZS10b2tlbiIsImF1dGhfdGltZSI6MTU0OTk4MTkwNiwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cy1lYXN0LTJfRFEzbkt4V0JlIiwiZXhwIjoxNTQ5OTg1NTA2LCJpYXQiOjE1NDk5ODE5MDYsInZlcnNpb24iOjIsImp0aSI6ImEzNTZhOWNkLTljODEtNDcxOC1iNmJmLWUyZmQ2ZGQzYWU1ZiIsImNsaWVudF9pZCI6IjEwMTM1OTU2ODAifQ.rPNa6IzPLWkxIsKxrpKXe9HzTn1ol2WRqV-TTs_CqH0",
        lastAuthDate: moment().subtract(1, "day").format(),
        currentDate: moment().format(),
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1013595681") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR13",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1013595691") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR18",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1019100304") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR08",
        secureDataBriefQuestion: {
          length: 4,
          question:
            "Por favor ingresa la clave de tu tarjeta debito terminada en 7753                                                       ",
          accountType: "D",
          questionType: "password",
          productType: "DEBIT_CARD",
        },
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1234") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ONESPAN_ACTIVATE_LICENSE",
        enrollmentKey:
          "0000C3E412D6878D9784177A00EB3F00253D2F2CFFAC67D2BFE8D34C1F82F38A69AE67D26F595ACCDC071013FBE0BC01A6621405DA64",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
  }

  return res.status(200).send({
    processId: "fe707d25-e467-11e9-95dc-0242ac110003",
    step: "ENR25", // "ENR13"
    biometricAuthorizer:
      "eyJraWQiOiI0WGNQT3g5Z05mTWxlN0IrMG9FQ0lDajd0Y1cwRHhPeG11dmZhWUlxM3NrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2dmExY2loc3Z2YjRpc2FpZDZzMzQwdTMyNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicmItbWItc3RnLWF1dGgtYXBpXC9hdXRob3JpemF0aW9uIiwiYXV0aF90aW1lIjoxNzU0MDg0ODc3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9GNzhyTGhHbEMiLCJleHAiOjE3NTQwODg0NzcsImlhdCI6MTc1NDA4NDg3NywidmVyc2lvbiI6MiwianRpIjoiYjI0ODUzMDktZTg1ZC00YzlkLThhMWYtYTY2NDViOTUxZThkIiwiY2xpZW50X2lkIjoiNnZhMWNpaHN2dmI0aXNhaWQ2czM0MHUzMjQifQ.pQy5S0NSPEgyNxDaKhK8kHW1hKmUNqS26TXhOEdZhsXJSJIHQB93zlXv3UGK-220qsVrdzphG_dvjFPNQRAeVbO2VBZLDzuwDw_GJd_DACRDaKyYfNokUX50FLlU-_PQUrbBIVW9WF9w0vAtGBnMCS40w3PxXXyBSNKuJU2Zb24UvnG1njx62Ia4hp6YYitQKT2a8G0c0J-Ctxa9V2kkVqSXc2aO8sneyRRilxRtEPwfgwVvhEHaW1l8IXTtIr7V_XNLvBBFtCvL_EtTrgERu5XTWLg3zNjFPhkRi0zTg8XOTVPKToqo19ppveSJqm7cn3hV3vOAbJelb0tki92WvQ",
    secureDataBriefQuestion: null,
    userFirstName: "David",
    token:
      "eyJraWQiOiJUV2JaVDIrVE1ZTUZpUjNIaVJMYmZJYjdLZldqaVJ2SkxsbExCUlFKWjNnPSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiI3Y3U5MTE5MWlsYzliZzViN245cmVlbWJtayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiQURMLUFVVEgtU2VydmljZS9jcmVhdGUtdG9rZW4gQURMLUFVVEgtU2VydmljZS92YWxpZGF0ZS10b2tlbiIsImF1dGhfdGltZSI6MTU0OTk4MTkwNiwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cy1lYXN0LTJfRFEzbkt4V0JlIiwiZXhwIjoxNTQ5OTg1NTA2LCJpYXQiOjE1NDk5ODE5MDYsInZlcnNpb24iOjIsImp0aSI6ImEzNTZhOWNkLTljODEtNDcxOC1iNmJmLWUyZmQ2ZGQzYWU1ZiIsImNsaWVudF9pZCI6IjEwMTM1OTU2ODAifQ.rPNa6IzPLWkxIsKxrpKXe9HzTn1ol2WRqV-TTs_CqH0",
    lastAuthDate: moment().subtract(1, "day").format(),
    currentDate: moment().format(),
    lastIPAddress: "127.0.0.1",
    errorMessage: "hubo un error :( de nuevo",
    sdsPasswordValidation: null,
    challenged: false,
    twoFactorAuthResponse: null,
    success: true,
  });
});

api.post("/v1/enrollment", async (req, res) => {
  const moment = require("moment-timezone");

  if (
    req.body["processId"] !== undefined &&
    req.body.content["otpValue"] !== undefined
  ) {
    if (
      req.body.content["isAutomaticOtp"] !== undefined &&
      req.body.content["isAutomaticOtp"]
    ) {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR17",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    return res.status(200).send({
      processId: "fe707d25-e467-11e9-95dc-0242ac110003",
      step: "ENR13",
      secureDataBriefQuestion: null,
      userFirstName: "David",
      token:
        "eyJraWQiOiJUV2JaVDIrVE1ZTUZpUjNIaVJMYmZJYjdLZldqaVJ2SkxsbExCUlFKWjNnPSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiI3Y3U5MTE5MWlsYzliZzViN245cmVlbWJtayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiQURMLUFVVEgtU2VydmljZS9jcmVhdGUtdG9rZW4gQURMLUFVVEgtU2VydmljZS92YWxpZGF0ZS10b2tlbiIsImF1dGhfdGltZSI6MTU0OTk4MTkwNiwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cy1lYXN0LTJfRFEzbkt4V0JlIiwiZXhwIjoxNTQ5OTg1NTA2LCJpYXQiOjE1NDk5ODE5MDYsInZlcnNpb24iOjIsImp0aSI6ImEzNTZhOWNkLTljODEtNDcxOC1iNmJmLWUyZmQ2ZGQzYWU1ZiIsImNsaWVudF9pZCI6IjEwMTM1OTU2ODAifQ.rPNa6IzPLWkxIsKxrpKXe9HzTn1ol2WRqV-TTs_CqH0",
      lastAuthDate: moment().subtract(1, "day").format(),
      currentDate: moment().format(),
      lastIPAddress: "127.0.0.1",
      errorMessage: null,
      sdsPasswordValidation: null,
      challenged: false,
      twoFactorAuthResponse: null,
      success: true,
    });
  }
  if (
    req.body.content["deviceCode"] !== undefined &&
    req.body.content["deviceCode"]
  ) {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    return res.status(200).send({
      processId: "fe707d25-e467-11e9-95dc-0242ac110003",
      step: "ONESPAN_ACTIVATE_INSTANCE",
      enrollmentKey:
        "0041C3E412D687ADB53FD2838A72B08A893B60E8D591588AFE552E7DA867036466AA402CE4A9C8063762EBF36F2176BAC3CD78A0B879A17DE3DFE52B3719",
      secureDataBriefQuestion: null,
      userFirstName: "Pepito",
      token:
        "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
      lastAuthDate: "2018-02-16T17:00:00Z",
      currentDate: "2019-10-01T16:31:35Z",
      lastIPAddress: "127.0.0.1",
      errorMessage: null,
      sdsPasswordValidation: null,
      challenged: false,
      twoFactorAuthResponse: null,
      success: true,
    });
  }
  if (req.body.content["id"] !== undefined) {
    const clientId = req.body.content["id"];
    if (clientId === "1013595680") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR05",
        secureDataBriefQuestion: null,
        userFirstName: "David",
        token:
          "eyJraWQiOiJUV2JaVDIrVE1ZTUZpUjNIaVJMYmZJYjdLZldqaVJ2SkxsbExCUlFKWjNnPSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiI3Y3U5MTE5MWlsYzliZzViN245cmVlbWJtayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiQURMLUFVVEgtU2VydmljZS9jcmVhdGUtdG9rZW4gQURMLUFVVEgtU2VydmljZS92YWxpZGF0ZS10b2tlbiIsImF1dGhfdGltZSI6MTU0OTk4MTkwNiwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cy1lYXN0LTJfRFEzbkt4V0JlIiwiZXhwIjoxNTQ5OTg1NTA2LCJpYXQiOjE1NDk5ODE5MDYsInZlcnNpb24iOjIsImp0aSI6ImEzNTZhOWNkLTljODEtNDcxOC1iNmJmLWUyZmQ2ZGQzYWU1ZiIsImNsaWVudF9pZCI6IjEwMTM1OTU2ODAifQ.rPNa6IzPLWkxIsKxrpKXe9HzTn1ol2WRqV-TTs_CqH0",
        lastAuthDate: moment().subtract(1, "day").format(),
        currentDate: moment().format(),
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1013595681") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR13",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1013595691") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR18",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1019100304") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ENR08",
        secureDataBriefQuestion: {
          length: 4,
          question:
            "Por favor ingresa la clave de tu tarjeta debito terminada en 7753                                                       ",
          accountType: "D",
          questionType: "password",
          productType: "DEBIT_CARD",
        },
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
    if (clientId === "1234") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "ONESPAN_ACTIVATE_LICENSE",
        enrollmentKey:
          "0000C3E412D6878D9784177A00EB3F00253D2F2CFFAC67D2BFE8D34C1F82F38A69AE67D26F595ACCDC071013FBE0BC01A6621405DA64",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
  }

  return res.status(200).send({
    processId: "fe707d25-e467-11e9-95dc-0242ac110003",
    step: "ENR13",
    biometricAuthorizer:
      "eyJraWQiOiI0WGNQT3g5Z05mTWxlN0IrMG9FQ0lDajd0Y1cwRHhPeG11dmZhWUlxM3NrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2dmExY2loc3Z2YjRpc2FpZDZzMzQwdTMyNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicmItbWItc3RnLWF1dGgtYXBpXC9hdXRob3JpemF0aW9uIiwiYXV0aF90aW1lIjoxNzU0MDg0ODc3LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9GNzhyTGhHbEMiLCJleHAiOjE3NTQwODg0NzcsImlhdCI6MTc1NDA4NDg3NywidmVyc2lvbiI6MiwianRpIjoiYjI0ODUzMDktZTg1ZC00YzlkLThhMWYtYTY2NDViOTUxZThkIiwiY2xpZW50X2lkIjoiNnZhMWNpaHN2dmI0aXNhaWQ2czM0MHUzMjQifQ.pQy5S0NSPEgyNxDaKhK8kHW1hKmUNqS26TXhOEdZhsXJSJIHQB93zlXv3UGK-220qsVrdzphG_dvjFPNQRAeVbO2VBZLDzuwDw_GJd_DACRDaKyYfNokUX50FLlU-_PQUrbBIVW9WF9w0vAtGBnMCS40w3PxXXyBSNKuJU2Zb24UvnG1njx62Ia4hp6YYitQKT2a8G0c0J-Ctxa9V2kkVqSXc2aO8sneyRRilxRtEPwfgwVvhEHaW1l8IXTtIr7V_XNLvBBFtCvL_EtTrgERu5XTWLg3zNjFPhkRi0zTg8XOTVPKToqo19ppveSJqm7cn3hV3vOAbJelb0tki92WvQ",
    secureDataBriefQuestion: null,
    userFirstName: "David",
    token:
      "eyJraWQiOiJUV2JaVDIrVE1ZTUZpUjNIaVJMYmZJYjdLZldqaVJ2SkxsbExCUlFKWjNnPSIsImFsZyI6IkhTMjU2In0.eyJzdWIiOiI3Y3U5MTE5MWlsYzliZzViN245cmVlbWJtayIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiQURMLUFVVEgtU2VydmljZS9jcmVhdGUtdG9rZW4gQURMLUFVVEgtU2VydmljZS92YWxpZGF0ZS10b2tlbiIsImF1dGhfdGltZSI6MTU0OTk4MTkwNiwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbS91cy1lYXN0LTJfRFEzbkt4V0JlIiwiZXhwIjoxNTQ5OTg1NTA2LCJpYXQiOjE1NDk5ODE5MDYsInZlcnNpb24iOjIsImp0aSI6ImEzNTZhOWNkLTljODEtNDcxOC1iNmJmLWUyZmQ2ZGQzYWU1ZiIsImNsaWVudF9pZCI6IjEwMTM1OTU2ODAifQ.rPNa6IzPLWkxIsKxrpKXe9HzTn1ol2WRqV-TTs_CqH0",
    lastAuthDate: moment().subtract(1, "day").format(),
    currentDate: moment().format(),
    lastIPAddress: "127.0.0.1",
    errorMessage: "hubo un error :( de nuevo",
    sdsPasswordValidation: null,
    challenged: false,
    twoFactorAuthResponse: null,
    success: true,
  });
});

api.post("/v1/enrollment/silent", async (req, res) => {
  if (req.body.content["id"] !== undefined) {
    const clientId = req.body.content["id"];
    if (clientId === "1013595692") {
      return res.status(200).send({
        processId: "fe707d25-e467-11e9-95dc-0242ac110003",
        step: "MIG10",
        secureDataBriefQuestion: null,
        userFirstName: "Pepito",
        token:
          "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
        lastAuthDate: "2018-02-16T17:00:00Z",
        currentDate: "2019-10-01T16:31:35Z",
        lastIPAddress: "127.0.0.1",
        errorMessage: null,
        sdsPasswordValidation: null,
        challenged: false,
        twoFactorAuthResponse: null,
        success: true,
      });
    }
  }
  return res.status(200).send({
    processId: "fe707d25-e467-11e9-95dc-0242ac110003",
    step: "MIG08",
    secureDataBriefQuestion: null,
    userFirstName: "Pepito",
    token:
      "eyJraWQiOiJwVE9MRllPWTY0WlwvZTBKYW14d25rOUg5WG5LaThDVWF6TE1wZHl1NjVsOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxYzBlZmFhMGk4bTE2dDZqc3RqOHFuZTRwdiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYWRsLWF1dGgtc2VydmljZVwvYXV0aG9yaXphdGlvbiIsImF1dGhfdGltZSI6MTU2OTk0NzQ5NSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfV3RSNU0zWUNBIiwiZXhwIjoxNTY5OTUxMDk1LCJpYXQiOjE1Njk5NDc0OTUsInZlcnNpb24iOjIsImp0aSI6IjRhNDE3NjE2LWFlMWQtNGI1Mi05MmQ0LTA5MTI3ODQyZGFjMiIsImNsaWVudF9pZCI6IjFjMGVmYWEwaThtMTZ0NmpzdGo4cW5lNHB2In0.NLQQD4-iy-AOniKerRH3jV8cVBtIineOMBzRV_uHeWNhbhqdnFamvWcZkGVumz6Op0yRwjIgpLRVOG4pQbENT-nF-F44KuPxkBQGU9cJHaV8VmyveFazuDqJ3CPhuPHAWuiQoGeevtf6SopMtYkVAspu_UULDnMIP95x98plw166Bf76-32RphCFv-PQao3y4Kdxd9C8xoVNvPuUnztIIdKfwamKCSeiSLiRb6AcMhxX-EEBIvnGpaum17iUykbN3lWV-4LspMvmfNZDDjiQISra22ESYCoJurdHYfF0g7BKcb1xBeIfTChZx0uZAq7YGlfY7F0up9nvwcuq_rLaoA",
    lastAuthDate: "2018-02-16T17:00:00Z",
    currentDate: "2019-10-01T16:31:35Z",
    lastIPAddress: "127.0.0.1",
    errorMessage: null,
    sdsPasswordValidation: null,
    challenged: false,
    twoFactorAuthResponse: null,
    success: true,
  });
});

api.route("/v1/two-factor/type").get((req, res) => {
  return res.status(200).send({
    value: "VIRTUAL",
    state: null,
  });
});

/**
 * -----------------------------------------------------
 * TWO FACTOR AUTH
 * -----------------------------------------------------
 */
api
  .route("/v1/two-factor")
  .post((req, res) => {
    const otp = parseInt(req.headers["x-2fa-user-token"]);
    if (otp % 2 === 0) {
      return res.status(403).send({});
    }
    //return res.status(403).send(resLogin);
    return res.status(200).send(resLogin);
  })
  // Cancel OTP by the users
  .delete((req, res) => {
    return res.status(204).send({});
  });

api.post("/v1/verify-code", (req, res) => {
  res.status(207).send({
    challengeResponse: "MUST_BE_CHALLENGED",
    veriticationCode: "1234",
  });
});

api.post("/v1/two-factor/challenge", async (req, res) => {
  res.status(206).send(resChallenge);
});

api.post("/v1/two-factor/challenge-code", (req, res) => {
  const otp = parseInt(req.headers["x-2fa-user-token"]);
  if (otp % 2 === 0) {
    return res.status(403).send({});
  }
  return res.status(207).send({
    challengeResponse: "MUST_BE_CHALLENGED",
    veriticationCode: "88888",
  });
});
module.exports = api;
