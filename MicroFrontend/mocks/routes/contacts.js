"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const resProductsNicknames = require("../responses/products_nicknames.json");
const resContactsAll = require("../responses/contacts_all.json");
const mobileContactsAll = require("../responses/contacts/contacts_mobile_users.json");
const resContactProducts = require("../responses/contact_products.json");
const resSpiContact = require("../responses/contacts/spi_contact.json");
const updateContact = require("../responses/update_contact.json");
const mobileHelper=require('../routes/mobileHelper')
const genericResponse = require('../responses/generic_response.json');
const jwt = require('jwt-simple');

/*
 Route: /bank/contacts
*/
const api = express.Router();

api
    .route("/v1/all")
    .get((req, res) => {
        if (req.header("authorization") !== undefined) {
            const token = req.header("authorization").replace("Bearer", "");
            const clientId = jwt.decode(token, "", true).client_id;
            if (clientId === "1013595652") {
                return res.status(404).send({
                    description: "No se encontraron contactos"
                })
            } else if (clientId === "1013595653") {
                return res.status(200).send({contacts:[]})
            } else if (mobileHelper.includes(clientId)) {
                return res.status(200).send(mobileContactsAll)
            }
        }
        return res.status(200).send(resContactsAll);
    })
    .post(async (req, res) => {
        res.status(200).send(resContactsAll);
    })
    .put((req, res) => {
        res.status(200).send(updateContact);
    });

    api
    .route("/v1/all")
    .get((req, res) => {
        if (req.header("authorization") !== undefined) {
            const token = req.header("authorization").replace("Bearer", "");
            const clientId = jwt.decode(token, "", true).client_id;
            if (clientId === "1013595652") {
                return res.status(404).send({
                    description: "No se encontraron contactos"
                })
            } else if (clientId === "1013595653") {
                return res.status(200).send({contacts:[]})
            } else if (mobileHelper.includes(clientId)) {
                return res.status(200).send(mobileContactsAll)
            }
        }
        return res.status(200).send(resContactsAll);
    })
    .post(async (req, res) => {
        res.status(200).send(resContactsAll);
    })
    .put((req, res) => {
        res.status(200).send(updateContact);
    });


api.route("/v1/basic-contact").post(async (req, res) => {
    res.status(200).send(resContactsAll);
});

api.route("/v1/delete").post(async (req, res) => {
    res.status(200).send(genericResponse);
});

api.route("/v1/products/item/delete").post(async (req, res) => {
    res.status(200).send(genericResponse);
});

api.post("/v1/products", (req, res) => {
    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        if (mobileHelper.includes(clientId)) {
            if(req.body['contactId']!==undefined &&req.body['contactId']['id']!==undefined){
                if(req.body['contactId']['id']==="192837465"){
                    return res.status(500).send();
                }
            }
        }
    }
    res.status(200).send(resContactProducts);
});

api
    .route("/v1/products/item")
    .post(async (req, res) => {
        if (req.header("authorization") !== undefined) {
            const token = req.header("authorization").replace("Bearer", "");
            const clientId = jwt.decode(token, "", true).client_id;
            if (clientId === "1013595654") {
                return res.status(501).send()
            }
        }
       return res.status(200).send(resContactProducts);
    })
    .put((req, res) => {
        res.status(200).send(resProductsNicknames);
    });

api.post("/v1/spi/add-contact", (req, res) => {
    return res.status(200).send()
})

api.post("/v1/spi/get-contact", (req, res) => {
    return res.status(200).send(resSpiContact);
})

module.exports = api;
