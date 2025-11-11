"use strict"

const express = require("express");
const walletsMock = require("../responses/wallets/wallets.json")

/*
 Route: /wallets/
*/
const api = express.Router();

api.post("/v1/create-wallet", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    res.status(200).send({})
})

api.get("/v1/card-list", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    res.status(200).send(walletsMock.cardList)
    //res.status(200).send({cardAcctId: []})
})

api.post("/v1/prepare-enrollcard", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    res.status(200).send(walletsMock.enrollmentData)
    //res.status(200).send({cardAcctId: []})
})

module.exports = api