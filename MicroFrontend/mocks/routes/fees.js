"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const mobileHelper=require('../routes/mobileHelper');
const jwt = require('jwt-simple');

const resFees = require('../responses/fees.json');
/*
 Route: /bank/fees
*/
const api = express.Router();

// api.post('/fees', (req, res) => {
//   res.status(200).send(resFees);
// });

api.post('/cost/transaction', async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        if (mobileHelper.includes(clientId)) {
            return res.status(200).send({
                    currentAmount: {
                        currencyCode: "COP",
                        amount: 4500
                    }
                }
            );
        }
    }
    let max = 5000;
    let min = 200;
    const { transactionId } = req.body;
    const feeItem = resFees.find(item => item.id === transactionId)

    if (!!feeItem) {
        return res.status(200).send({
            "currentAmount": {
                "currencyCode": "COP",
                "amount": feeItem.value
            }
        });
    }

    res.status(200).send({
        "currentAmount": {
            "currencyCode": "COP",
            "amount": Math.round(Math.random() * (max - min) + min)
        }
    });
});

module.exports = api;
