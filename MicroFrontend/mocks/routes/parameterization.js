"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const csv = require("csvtojson");
const fs = require('fs');
/*
 Route: /bank/parameterization
*/
const api = express.Router();

api.get("/", async (req, res) => {
  const { entity, extension } = req.query;
  const ext = extension || "csv";
  try {
    const filePath = `responses/parameterization/${entity}.${ext}`;
    let jsonObj;
    if (ext === "json") {
      jsonObj = fs.readFileSync(filePath);
    } else {
      jsonObj = await csv({ delimiter: "," }).fromFile(filePath);
    }
    return res.status(200).send(jsonObj);
  } catch (err) {
    const { statusCode, message } = err;
    return res.status(500).send({
      description: "No se encontro data.",
    });
  }
});

// TODO Remove on create feature toggles endpoint
const configcat = require("configcat-node");
api.get("/features-available", async (req, res) => {
  let configCatClient = configcat.createClient(
    "w0PYCEJw2k6PEw9TWTY2pQ/4RB6GiPnTka1BXErogLUOw"
  );
  var servicesArray = [];

  const keys = await configCatClient.getAllKeysAsync();
  for (var key of keys) {
    const enabled = await test(configCatClient, key);
    servicesArray.push(new Service(key.replace(/_/g, "-"), enabled));
  }
  return res.status(200).send({
    featureToggles: servicesArray,
  });
});

const LaunchDarkly = require("launchdarkly-node-client-sdk");
api.get("/launch-darkly", async (req, res) => {
  const user = {
    key: "aa0ceb",
    name: "Grace Hopper",
    email: "gracehopper@example.com",
  };

  const ldClient = LaunchDarkly.initialize("5f92130154380f09e1cd0b3d", user);

  ldClient.on("ready", () => {
    console.log("It's now safe to request feature flags");

    const flags = ldClient.allFlags();

    return res.status(200).send({
      featureToggles: Object.keys(flags).map((key) => ({
        name: key,
        enabled: flags[key],
      })),
    });
  });
});

// TODO Remove on create feature toggles endpoint

async function test(configCatClient, key) {
  return configCatClient.getValueAsync(key, false);
}

var Service = function (name, enabled) {
  this.name = name;
  this.enabled = enabled;
};
// TODO Remove on create feature toggles endpoint

module.exports = api;
