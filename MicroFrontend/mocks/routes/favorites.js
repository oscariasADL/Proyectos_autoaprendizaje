"use strict"

const express = require("express");
const resFavoritesAll = require("../responses/favorites/favorites_all.json")
const genericResponse = require("../responses/generic_response.json");

/*
 Route: /bank/pockets
*/
const api = express.Router();

api.get("/v1/favorites-transactions", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });

    if (req.header("authorization") !== undefined) {
        //res.status(200).send([])
        res.status(200).send(resFavoritesAll)
    } else {
        res.status(401).send({'msj': 'No autorizado'});
    }
    
})

api.get("/v1/favorites-transactions/detail/:keyFavorite", async (req, res) => {
    const { keyFavorite } = req.params

    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });

    if (req.header("authorization") !== undefined) {
        const favorite = resFavoritesAll.find(fav => fav.keyFavorite === keyFavorite);
        if (favorite) res.status(200).send(favorite)
        else res.status(404).send({code: 404, description: 'Favorito no encontrado'})
    } else {
        res.status(401).send({'msj': 'No autorizado'});
    }
})

api.post("/v1/favorites-transactions", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });
    res.status(200).send(genericResponse);
})

api.put("/v1/favorites-transactions/delete", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });
    res.status(200).send({
        code: "200",
        description: "La transacción se ha eliminado exitosamente en la sección de favoritos"
    });
})

api.put("/v1/favorites-transactions", async (req, res) => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    });
    res.status(200).send({
        code: "200",
        description: "La transacción se ha modificado exitosamente en la sección de favoritos"
    });
})

module.exports = api;