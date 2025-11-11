"use strict";

const cardsResponse = require("../responses/tokenization-manager/cards.json");
const deleteTokenResponse = require("../responses/tokenization-manager/delete_token.json");
const suspendTokenResponse = require("../responses/tokenization-manager/inactive_token.json");
const resumeTokenResponse = require("../responses/tokenization-manager/active_token.json");
const express = require("express");
const api = express.Router();

api.route("/v1/list").post(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send(cardsResponse);
});

api.route("/v1/delete").post(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send(deleteTokenResponse);
});

api.route("/v1/suspend").put(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send(suspendTokenResponse);
});

api.route("/v1/resume").post(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send(resumeTokenResponse);
});

module.exports = api;
