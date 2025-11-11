"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const resPocketDetail = require("../responses/pockets/pocket_detail.json");
const resPocketWithReturnsDetail = require("../responses/pockets/pocket_with_returns_detail.json");
const resPocketsAllOrganize = require('../responses/pockets/pockets_only_organize.json');
const resPocketsAll = require("../responses/pockets/pockets_all.json");
const movementsResponse = require("../responses/pockets/movements.json");
const jwt = require("jwt-simple");
const helper = require("../service/pocketHelper");
const moment = require("moment-timezone");
const resPocketsAllV2 = require("../responses/pockets/pockets_allV2.json");

/*
 Route: /bank/pockets
*/
const api = express.Router();
api.get(
    "/v1/product/:parent_account_type/:parent_account_id/pocket/:pocket_id/:pocket_type",
    async (req, res) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        if (req.header("authorization") !== undefined) {
            const token = req.header("authorization").replace("Bearer", "");
            const clientId = jwt.decode(token, "", true).client_id;
            if (
                clientId === "1013595641" ||
                clientId === "1013595701" ||
                clientId === "1013595702" ||
                clientId === "1013595703"
            ) {
                const id = parseInt(req.params["pocket_id"]);
                return res.status(200).send(helper.getPocketDetail(id));
            } else if (clientId === "1013595680") {
                return res.status(412).send({
                    code: "100",
                    description: "No se pueden cargar tus bolsillos",
                });
            }
        }
        return res.status(200).send(resPocketDetail);
    }
);

api.delete(
    "/v1/product/:parent_account_type/:parent_account_id/pocket/:pocket_id/:pocket_type",
    async (req, res) => {
        if (req.header("authorization") !== undefined) {
            const token = req.header("authorization").replace("Bearer", "");
            const clientId = jwt.decode(token, "", true).client_id;
            const id = parseInt(req.params["pocket_id"]);
            moment.tz.setDefault("America/Bogota");
            const offset = moment().utcOffset();
            if (clientId === "1013595703") {
                helper.deletePocket(id - 1);
                return res.status(200).send({
                    approvalId: "5212320000",
                    transactionDate: moment().utc(offset).format(),
                    name: "PocketDeleted",
                });
            } else if (clientId === "1013595701") {
                return res.status(412).send({
                    code: "100",
                    description: "Ha ocurrido un error actualizando tu bolsillo",
                });
            }
        }
        if (parseInt(req.params["pocket_id"]) > 10) {
            return res.status(412).send({
                code: "100",
                description: "El nombre de tu bolsillo contiene caracteres invalidos",
            });
        } else {
            return res.status(200).send({
                approvalId: "5212320000",
                transactionDate: "2019-03-12T10:12:41.637",
                name: "TestUpdate",
            });
        }
    }
);

api.post("/v1/list-with-collection", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });

    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        if (clientId === "1013595641" || clientId === "1013595701") {
            helper.generateAllPockets();
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595702") {
            helper.generateAllPockets(1);
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595703") {
            helper.generateAllPockets(15, true);
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595655") {
            return res.status(412).send({
                code: "100",
                description: "Ha ocurrido un error",
            });
        } else if (clientId === "1013595700") {
            return res.status(200).send(helper.getPockets());
        } else {
            return res.status(200).send(resPocketsAll);
        }
    }
    res.status(200).send(resPocketsAll);
});
api.post("/v1/detail", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });

    res.status(200).send(resPocketWithReturnsDetail);
});


api.get("/v1/all", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });

    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        if (clientId === "1013595641" || clientId === "1013595701") {
            helper.generateAllPockets();
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595702") {
            helper.generateAllPockets(1);
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595703") {
            helper.generateAllPockets(15, true);
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595655") {
            return res.status(412).send({
                code: "100",
                description: "Ha ocurrido un error"
            });
        } else if (clientId === "1013595700") {
            return res.status(200).send(helper.getPockets());
        } else {
            return res.status(200).send(resPocketsAllOrganize);
        }
    }
    res.status(200).send(resPocketsAllOrganize);
    // res.status(401).send({'msj': 'No autorizado'});
});


api.post("/v1/transfer", (req, res) => {
    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        if (clientId === "1013595701") {
            return res.status(412).send({
                code: "100",
                description: "Ha ocurrido un error",
            });
        } else {
            return res.status(200).send({
                approvalId: "2846299",
                transactionDate: "2019-02-20T14:21:53",
            });
        }
    }
    return res
        .status(200)
        .send({ approvalId: "2846299", transactionDate: "2019-02-20T14:21:53" });
});

api.post("/v1/product/pocket", (req, res) => {
    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientsIdToFailTransfer = [
            "1013595651",
            "1013595652",
            "1013595655",
            "1013595650",
        ];
        const clientId = jwt.decode(token, "", true).client_id;
        if (clientsIdToFailTransfer.includes(clientId)) {
            return res.status(412).send({
                code: "100",
                description: "Ha ocurrido un error",
            });
        }
        if (clientId === "1013595700") {
            const goal = req.body["goal"];
            const initialAmount = req.body["openAmount"];
            const pocketQuota = req.body["quota"];
            const progress = Math.floor((initialAmount * 100) / goal);
            const quotas = Math.ceil((goal - initialAmount) / pocketQuota);
            helper.addPocket({
                type: "SPA",
                typeName: "Bolsillo de Ahorro",
                numberProduct: "1",
                description: req.body["name"],
                progress: `${progress}`,
                goal: goal,
                amountSaved: initialAmount,
                period: req.body["period"],
                instalmentAmount: req.body["quota"],
                totalInstalments: `${quotas}`,
                productTypeParent: req.body["productTypeParent"],
                productTypeParentDesc: "Cuenta de Ahorros",
                productIdParent: req.body["productIdParent"],
                pocketCategory: req.body["pocketCategory"],
                status: 1,
                remainingInstalments: `${quotas}`,
            });
            moment.tz.setDefault("America/Bogota");
            const offset = moment().utcOffset();
            return res.status(200).send({
                approvalId: "5212320000",
                transactionDate: moment().utc(offset).format(),
                name: "Bolsillo",
            });
        } else {
            moment.tz.setDefault("America/Bogota");
            const offset = moment().utcOffset();
            return res.status(200).send({
                approvalId: "5212320000",
                transactionDate: moment().utc(offset).format(),
                name: "Bolsillo",
            });
        }
    }
    if (parseInt(req.body["openAmount"]) > 2000) {
        return res.status(412).send({
            code: "100",
            description: "El nombre de tu bolsillo contiene caracteres invalidos",
        });
    } else {
        return res.status(200).send({
            approvalId: "5212320000",
            transactionDate: "2019-03-12T10:12:41.637",
            name: "Bolsillo",
        });
    }
});

api.put("/v1/product/pocket", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        const pocketId = req.body["id"];
        moment.tz.setDefault("America/Bogota");
        const offset = moment().utcOffset();
        if (clientId === "1013595641" || clientId === "1013595703") {
            helper.updatePocket(pocketId - 1, req.body);
            return res.status(200).send({
                approvalId: "5212320000",
                transactionDate: moment().utc(offset).format(),
                name: "Bolsillo",
            });
        } else if (clientId === "1013595701") {
            return res.status(412).send({
                code: "100",
                description: "Ha ocurrido un error actualizando tu bolsillo",
            });
        }
    }
    if (parseInt(req.body["id"]) > 10) {
        return res.status(412).send({
            code: "100",
            description: "El nombre de tu bolsillo contiene caracteres invalidos",
        });
    } else {
        return res.status(200).send({
            approvalId: "5212320000",
            transactionDate: "2019-03-12T10:12:41.637",
            name: "Viajes",
        });
    }
});

api.post("/v1/product/create", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        const pocketId = req.body["id"];
        moment.tz.setDefault("America/Bogota");
        const offset = moment().utcOffset();
        if (clientId === "1013595641" || clientId === "1013595703") {
            helper.updatePocket(pocketId - 1, req.body);
            return res.status(200).send({
                approvalId: "5212320000",
                transactionDate: moment().utc(offset).format(),
                name: "Bolsillo",
            });
        } else if (clientId === "1013595701") {
            return res.status(412).send({
                code: "100",
                description: "Ha ocurrido un error actualizando tu bolsillo",
            });
        }
    }
    if (parseInt(req.body["id"]) > 10) {
        return res.status(412).send({
            code: "100",
            description: "El nombre de tu bolsillo contiene caracteres invalidos",
        });
    } else {
        return res.status(200).send({
            approvalId: "5212320000",
            transactionDate: "2019-03-12T10:12:41.637",
            name: "Viajes",
        });
    }
});


api.post("/v1/create", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    console.log("movem");
    return res.status(200).send(movementsResponse);
});

api.put("/v1/pocket/update", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    return res.status(200).send({
        approvalId: "5238330000",
        transactionDate: "2024-11-20T10:38:33.378429",
        name: "rentabilidad22",
    });
});

api.post("/v1/pocket/update", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    return res.status(200).send({
        approvalId: "5238330000",
        transactionDate: "2024-11-20T10:38:33.378429",
        name: "rentabilidad22",
    });
});

api.post("/v1/movements", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    return res.status(200).send(movementsResponse);
});

api.post("/v1/pocket/detail", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

    return res.status(200).send(resPocketWithReturnsDetail);
});

api.post("/v2/all", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });
    if (req.header("authorization") !== undefined) {
        const token = req.header("authorization").replace("Bearer", "");
        const clientId = jwt.decode(token, "", true).client_id;
        if (clientId === "1013595641" || clientId === "1013595701") {
            helper.generateAllPockets();
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595702") {
            helper.generateAllPockets(1);
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595703") {
            helper.generateAllPockets(15, true);
            return res.status(200).send(helper.getPockets());
        } else if (clientId === "1013595655") {
            return res.status(412).send({
                code: "100",
                description: "Ha ocurrido un error"
            });
        } else if (clientId === "1013595700") {
            return res.status(200).send(helper.getPockets());
        } else {
            return res.status(200).send(resPocketsAllV2);
        }
    }
    res.status(200).send(resPocketsAllV2);
    // res.status(401).send({‘msj’: ‘No autorizado’});
});

module.exports = api;
