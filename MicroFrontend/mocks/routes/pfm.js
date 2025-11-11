"use strict";

const express = require("express");

const incomeCategoriesForCAResponse = require("../responses/pfm/income_categories_for_CA_response.json");
const incomeCategoriesForCCResponse = require("../responses/pfm/income_categories_for_CC_response.json");
const incomeCategoriesForTCResponse = require("../responses/pfm/income_categories_for_TC_response.json");
const expenseCategoriesForCAResponse = require("../responses/pfm/expense_categories_for_CA_response.json");
const expenseCategoriesForCCResponse = require("../responses/pfm/expense_categories_for_CC_response.json");
const expenseCategoriesForTCResponse = require("../responses/pfm/expense_categories_for_TC_response.json");
const balancesSummaryResponse = require("../responses/pfm/balances_summary_response.json");
const categoriesOfMovementsResponse = require("../responses/pfm/categories_of_movements_response.json");
const movementsResponse10001 = require("../responses/pfm/movements_response_10001.json");
const movementsResponse20001 = require("../responses/pfm/movements_response_20001.json");
const movementsResponse30001 = require("../responses/pfm/movements_response_30001.json");
const movementsResponse40001 = require("../responses/pfm/movements_response_40001.json");
const movementsResponse50001 = require("../responses/pfm/movements_response_50001.json");
const movementsResponse310001 = require("../responses/pfm/movements_response_310001.json");
const movementsResponse410001 = require("../responses/pfm/movements_response_410001.json");
const movementsResponse510001 = require("../responses/pfm/movements_response_510001.json");
const movementsResponse610001 = require("../responses/pfm/movements_response_610001.json");
const movementsResponse710001 = require("../responses/pfm/movements_response_710001.json");
const movementsResponse810001 = require("../responses/pfm/movements_response_810001.json");
const genericResponse = require("../responses/pfm/generic_response.json");
const budgetConfigResponse = require("../responses/pfm/budget/config.json");
const budgetPeriodResponse = require("../responses/pfm/budget/period.json");
const budgetProductsResponse = require("../responses/pfm/budget/products.json");
const budgetDetailResponse = require("../responses/pfm/budget/detail.json");
const budgetBehaviorResponse = require("../responses/pfm/budget/behavior.json");
const budgetTopExpensesResponse = require("../responses/pfm/budget/top-expenses.json");
const budgetIncomesResponse = require("../responses/pfm/budget/incomes.json");
const budgetExpensesResponse = require("../responses/pfm/budget/expenses.json");
const budgetSummaryResponse = require("../responses/pfm/budget/summary.json");
const budgetBalanceResponse = require("../responses/pfm/budget/balance.json");
const budgetIncomesMonthResponse = require("../responses/pfm/budget/month/incomes.json");
const budgetExpensesMonthResponse = require("../responses/pfm/budget/month/expenses.json");
const budgetSummaryMonthResponse = require("../responses/pfm/budget/month/summary.json");
const budgetBalanceMonthResponse = require("../responses/pfm/budget/month/balance.json");
const notInfResponse = require("../responses/pfm/budget/not_inf_response.json");
/*
 Route: /pfm
 */
const api = express.Router();
const timeout = 1000;

api.get("/v1/categories", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  switch (req.query["product_type"]) {
    case "CC":
      res
        .status(200)
        .send(
          req.query["type"] === "C"
            ? incomeCategoriesForCCResponse
            : expenseCategoriesForCCResponse
        );
      break;
    case "TC":
      res
        .status(200)
        .send(
          req.query["type"] === "C"
            ? incomeCategoriesForTCResponse
            : expenseCategoriesForTCResponse
        );
      break;
    default:
      res
        .status(200)
        .send(
          req.query["type"] === "C"
            ? incomeCategoriesForCAResponse
            : expenseCategoriesForCAResponse
        );
  }
});

api.get("/v1/:accountId/balances-summary", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  let productFiltered = [];

  balancesSummaryResponse.data.products.forEach((product) => {
    if (product.idProduct === req.params.accountId) {
      productFiltered.push(product);
    }
  });

  res.status(200).send({
    code: balancesSummaryResponse.code,
    message: balancesSummaryResponse.message,
    data: {
      lastUpdate: balancesSummaryResponse.data.lastUpdate,
      products: productFiltered,
      savings: balancesSummaryResponse.data.savings,
    },
  });
});

api.post("/v1/categories-of-movements", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  let productFiltered = [];

  categoriesOfMovementsResponse.data.products.forEach((product) => {
    if (product.idProduct === req.body.productId) {
      productFiltered.push(product);
    }
  });

  res.status(200).send(
    //{code:'SMS-404',description:'No se encontro la informacion solicitada (SMS-404)'}
    {
      code: categoriesOfMovementsResponse.code,
      message: categoriesOfMovementsResponse.message,
      data: {
        products: productFiltered,
      },
    }
  );
});

api.post("/v1/movements", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 7000);
  });

  switch (req.body.categoryId) {
    case "10001":
      res.status(200).send(movementsResponse10001);
      break;
    case "20001":
      res.status(200).send(movementsResponse20001);
      break;
    case "30001":
      res.status(200).send(movementsResponse30001);
      break;
    case "40001":
      res.status(200).send(movementsResponse40001);
      break;
    case "50001":
      res.status(200).send(movementsResponse50001);
      break;
    case "200001":
      res.status(200).send(movementsResponse310001);
      break;
    case "310001":
      res.status(200).send(movementsResponse310001);
      break;
    case "410001":
      res.status(200).send(movementsResponse410001);
      break;
    case "510001":
      res.status(200).send(movementsResponse510001);
      break;
    case "610001":
      res.status(200).send(movementsResponse610001);
      break;
    case "710001":
      res.status(200).send(movementsResponse710001);
      break;
    case "810001":
      res.status(200).send(movementsResponse810001);
      break;
    default:
      res.status(200).send(movementsResponse810001);
  }
});

api.post("/v1/movements/change-category", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(genericResponse);
});

api.post("/v1/budget/config", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetConfigResponse);
});

api.post("/v1/budget/period", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetPeriodResponse);
});

api.get("/v1/budget/products", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetProductsResponse);
});

api.post("/v1/budget/detail", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetDetailResponse);
});

api.post("/v1/budget/behavior", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetBehaviorResponse);
});

api.post("/v1/budget/top-expenses", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetTopExpensesResponse);
});

api.post("/v1/budget/incomes", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetIncomesResponse);
});

api.post("/v1/budget/incomes/month", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetIncomesMonthResponse);
});

api.post("/v1/budget/expenses", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetExpensesResponse);
});

api.post("/v1/budget/expenses/month", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetExpensesMonthResponse);
});

api.post("/v1/budget/summary", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetSummaryResponse);
});

api.post("/v1/budget/summary/month", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetSummaryMonthResponse);
});

api.post("/v1/budget/balance", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetBalanceResponse);
});

api.post("/v1/budget/balance/month", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send(budgetBalanceMonthResponse);
});

api.post("/v1/virtual-assistant/start-conversation", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send({
    accessToken:
      "eyJraWQiOiIrUk5ZV0VBZzBQNVNwVm82RW1pN3FvNDM4Z2Zsa3FlRCtiWGxqdHhoSFZRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxcXNlcWRpcHR2OHRtM3JmNzUwM3RuczhsOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiaWR3LXJzXC9yZWFkIGlkdy1yc1wvd3JpdGUgaWR3LXJzXC9nbG9iYWwiLCJhdXRoX3RpbWUiOjE3MTAzNjIzNjQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0VJbjU3am5iMyIsImV4cCI6MTcxMDM2NTk2NCwiaWF0IjoxNzEwMzYyMzY0LCJ2ZXJzaW9uIjoyLCJqdGkiOiJkMDRmN2FlYS00YzBjLTQwMWQtOTc3Yi1lODBiZDdhZGUwZDYiLCJjbGllbnRfaWQiOiIxcXNlcWRpcHR2OHRtM3JmNzUwM3RuczhsOSJ9.V3gAPp01cad7HkA0nwUoQttXQPqOyDPVn3wxJdcHNJ-UCTZuq7ZfoFU3-IRbOREcWKv9y58zjdUWF2MU_g4xCiQ1Lfj7GouhRv1iJ6R5mpWaVL0RFVyylG3tP8dzPEZz7j7YUW0FV2arICVSESYQtf2tMto0DWMKS4LXb8bZYaB_6MTjJZbEVddICcFQ37LZrkKHqEUar8L1xNrPJwmfh36brYCC2ico7BFY7UrkbUYiWo_V0DSVXyGFwEhl-ffxc_tEMfLEluP_4-UQwYkHgJoL8I7M2q8KHpdnUMNzR9scZz3bsOEnYcgo8KZ6BkOztc0Jfp3poqkQgqpGGp3x0w",
  });
});

api.post("/v1/virtual-assistant/input", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  const { userInput } = req.body;

  switch (userInput) {
    case "como están mis finanzas?":
      res.status(200).send({
        response:
          "¡Hola! ¡Qué excelente iniciativa la tuya de querer mejorar tu salud financiera! para poder asesorarte mejor, ¿podrías decirme cuál es tu objetivo o meta financiera específica y en cuánto tiempo te gustaría alcanzarla? Entre más detalles me des, mejor podré ayudarte.",
      });
      break;
    case "goodbye":
      res.status(200).send({
        response: "goodbye",
      });
      break;
    case "budget":
      res.status(200).send({
        response: "budget",
      });
      break;
    default:
      res.status(200).send({
        response:
          "!Hola Kevin! soy tu consejero virtual.<br/><br/>Estoy aquí para ayudarte a planificar tus finanzas y alcanzar tus metas de ahorro.<br/>Cuéntame, <b>¿Cómo te gustaría mejorar tu salud financiera?</b>",
      });
      break;
  }
});

api.get("/v1/budget/incomes/last-update", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

  res.status(200).send({
    lastUpdate: "2024-03-19",
  });
});

module.exports = api;
