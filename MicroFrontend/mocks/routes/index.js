"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const auth = require("../middlewares/auth");

const api = express.Router();

api.use("/bank/auth", require("./auth"));
api.use("/bank/contacts", require("./contacts"));
api.use("/bank/pockets", require("./pockets"));
api.use("/bank/product", require("./product"));
api.use("/bank/payments", require("./payments"));
api.use("/bank/transfers", require("./transfers"));
api.use("/bank/statements", require("./statements"));
api.use("/bank/caps", require("./caps"));
api.use("/bank/fees", require("./fees"));
api.use("/bank/parameterization", require("./parameterization"));
api.use("/bank/pse", require("./pse"));
api.use("/bank/pse-api", require("./pse"));
api.use("/bank/aval-pay", require("./aval-pay"));
api.use("/bank/transfiya", require("./transfiya"));
api.use("/bank/tour", require("./tour"));
api.use("/bank/qr", require("./qr"));
api.use("/bank/quota", require("./distributionQuota"));
api.use("/bank/checkbooks", require("./checkbooks"));
api.use("/bank/gmf", require("./gmf"));
api.use("/bank/traveler-customer", require("./traveler-customer"));
api.use("/bank/security-app", require("./security-app"));
api.use("/bank/block-products", require("./block-products"));
api.use("/bank/block-account", require("./blocking-product"));
api.use("/bank/vip-customer", require("./vip-customer"));
api.use("/bank/mortgage", require("./mortgage"));
api.use("/bank/notifications", require("./notifications"));
api.use("/bank/cdt-renewal", require("./cdt"));
api.use("/bank/donations", require("./donations"));
api.use("/bank/digital-debit-card", require("./digital-debit-card"));
api.use("/bank/digital-credit-card", require("./digital-credit-card"));
api.use("/bank/pfm", require("./pfm"));
api.use("/bank/bavv-contacts-service", require("./favorites"));
api.use("/bank/covered-credit-card", require("./covered-credit-card"));
api.use("/bank/wallets", require("./wallets"));
api.use("/bank/tokenization", require("./tokenization"));
api.use("/bank/tokenization-manager", require("./tokenization-manager"));
api.use("/bank/2fa-server", require("./2fa-server"));
api.use("/bank/rsa-biometrics", require("./rsa-biometrics"));

module.exports = api;
