"use strict";

const express = require("express");
const vipCustomer = require("../responses/vip-customer/vip-customer-response.json");

/*
 Route: /bank/vip-customer
*/
const api = express.Router();

api.route("/v1/vip-customer")
    .get((req, res) => {
        return res.status(200).send(vipCustomer);
    });


module.exports = api;
