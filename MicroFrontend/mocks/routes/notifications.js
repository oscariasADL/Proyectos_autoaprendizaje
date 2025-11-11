"use strict";

const express = require("express");
const groupsResponse = require('../responses/notifications/groups-response.json');
const creditCardsGroupResponse = require('../responses/notifications/credit-cards-group-response.json');
const accountsGroupResponse = require('../responses/notifications/accounts-group-response.json');
const creditsGroupResponse = require('../responses/notifications/credits-group-response.json');
const servicesGroupResponse = require('../responses/notifications/services-group-response.json');
const userDestinationsResponse = require('../responses/notifications/user-destinations-response.json');
const activeNotificationsResponse = require('../responses/notifications/active-notifications-response.json');
const latiniaResponse = require('../responses/notifications/latinia-response.json');
const genericResponse = require("../responses/generic_response.json");

/*
 Route: /notifications
 */
const api = express.Router();
const timeout = 1;

api.get("/v1/groups", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(groupsResponse);
});

api.get("/v1/group-items", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  let response = '';
  switch (req.query['alertGroupKey']) {
    case '1':
      response = creditCardsGroupResponse;
      break;
    case '2':
      response = servicesGroupResponse;
      break;
    case '3':
      response = creditsGroupResponse;
      break;
    case '4':
      response = accountsGroupResponse;
      break;
  }
  res.status(200).send(response);
});

api.get("/v1/active-notifications", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(activeNotificationsResponse);
});

api.get("/v1/user-destinations", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(userDestinationsResponse);
});

api.post("/v1/save", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(genericResponse);
});

api.put("/v1/delete", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(genericResponse);
});

api.post("/v1/latinia", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(latiniaResponse);
});

api.post("/v1/latinia/customer", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(genericResponse);
});

api.delete("/v1/latinia/customer", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
  res.status(200).send(genericResponse);
});

module.exports = api;
