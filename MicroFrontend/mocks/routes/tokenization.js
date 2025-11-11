"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const { faker } = require("@faker-js/faker");
const resLoginMobile16 = require("../responses/login/login_ric_16.json");
const moment = require("moment-timezone");
const resChallenge = require("../responses/challenge-2fa.json");
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
const resLoginMobile23 = require("../responses/login/login_ric_23.json");
const resLoginMobile22 = require("../responses/login/login_ric_22.json");
const resLoginEdi1 = require("../responses/login/login_ed_1.json");
const resLoginEdi2 = require("../responses/login/login_ed_2.json");
const resLoginBadBasicData = require("../responses/login/login_bad_basic_data.json");
const resLoginMobile17 = require("../responses/login/login_ric_17.json");
const resLoginMobile18 = require("../responses/login/login_ric_18.json");
const resLoginMobile19 = require("../responses/login/login_ric_19.json");
const resLoginMobile20 = require("../responses/login/login_ric_20.json");
const resLoginMobile21 = require("../responses/login/login_ric_21.json");
const resLoginPassword = require("../responses/login/login_password.json");
const resLogin = require("../responses/login.json");

let attemptsCounter = 0;

/*
 Route: /bank/tokenization
*/
const api = express.Router();

api.post("/login", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
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
      return res.status(401).send();
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
    default:
      resLogin.lastAuthDate = moment().subtract(1, "day").format();
      resLogin.currentDate = moment().format();
      res.status(200).send(resLogin);
  }
});

api.post("/activation", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return res.status(200).send({});
  // if (attemptsCounter === 4) {
  //   attemptsCounter = 0;
  //   res.status(200).send({});
  // } else {
  //   attemptsCounter++;
  //   res.status(400).send({});
  // }
});

api.post("/v1/last-token", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  res.status(200).send({
    token: '2323324fnoew',
    lastDigits: '2345'
  })
})

module.exports = api;
