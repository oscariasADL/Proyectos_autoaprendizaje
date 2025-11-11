"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const resMovementsAll = require("../responses/movements_all.json");
const resMovementsDetail = require("../responses/movements_detail.json");
const resProductsAll = require("../responses/products.json");
const resProductsWithoutDetail = require("../responses/products-without-detail.json");
const balanceOnlyCat1 = require("../responses/balance/products_only_cat_1");
const balanceOnlyCat2 = require("../responses/balance/products_only_cat_2");
const balanceOnlyCat3 = require("../responses/balance/products_only_cat_3");
const balanceOnlyCat4 = require("../responses/balance/products_only_cat_4");
const balanceOnlyCat5 = require("../responses/balance/products_only_cat_5");
const productsAllCategoriesMobile = require("../responses/balance/products_all_categories_mobile.json");
const balanceEdi1 = require("../responses/balance/products_edison_1.json");
const balanceEdi2 = require("../responses/balance/products_edison_2.json");
const resActivations = require("../responses/activation.json");
const resActivationsProduct = require("../responses/activation_by_product.json");
const balanceOnlyCatNeg = require("../responses/balance/products_only_cat_negativos");
const resProductsNicknames = require("../responses/products_nicknames.json");
const resAvalProductsAll = require("../responses/aval_products.json");
const resAvalStocks = require("../responses/aval_stock_detail.json");
const resAvalProvenirProductsAll = require("../responses/aval_porvenir_products.json");
const resAvalFacilpassProductsAll = require("../responses/aval_facilpass_products.json");
const resAvalDaleProductsAll = require("../responses/aval_dale_products.json");
const resProductsDetail = require("../responses/products_detail.json");
const coveredCardsResponse = require("../responses/covered-cards.json");
const genericResponse = require("../responses/generic_response.json");
const tuPlusMovements = require("../responses/tuplus/tuplus_movements.json");
const tuPlusRate = require("../responses/tuplus/tuplus_rate.json");
const tuPlusRedemention = require("../responses/tuplus/tuplus_redemption.json");
const tuPlusRedemention2fa = require("../responses/tuplus/tuplus_redemption_2fa.json");
const spiConsultKeysUser = require("../responses/transfers/spi/consult-keys-user.json");

const mobileHelper = require("../routes/mobileHelper");
const jwt = require("jwt-simple");
const fs = require("fs");
const resPreApprovedOffer = require("../responses/pre-approved/offer");
const resPreApprovedAcceptTyc = require("../responses/pre-approved/accept-tyc");
const resPreApprovedUrlToRedirect = require("../responses/pre-approved/url-redirect");
const resConsultSpi = require("../responses/spi-consent/consult-spi.json");
/*
 Route: /bank/product
*/
const api = express.Router();

api.get("/rest/v1/movements/all", async (req, res) => {
  // await new Promise(resolve => {
  //     setTimeout(resolve, 5000)
  // })
  res.status(200).send(resMovementsAll);
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.get("/:id/movements", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    if (clientId === "1013595681") {
      return res.status(412).send({
        code: "106",
        description: "No se pueden cargar tus movimientos(106)",
      });
    } else if (clientId === "1013595650") {
      return res.status(202).send({
        results: [],
        totalResults: 0,
      });
    } else if (mobileHelper.includes(clientId)) {
      const moment = require("moment-timezone");
      moment.tz.setDefault("America/Bogota");
      const offset = moment().utcOffset();
      let movements = JSON.parse(
        fs.readFileSync("responses/movements_detail.json", "utf8")
      ).results;
      movements.forEach((element, i) => {
        element.category = `${(i % 16) + 1}`;
        if (i < 25) {
          const daysToSubtract = ~~(i / 5);
          const minutesToSubtract = (i % 5) * 5;
          element.date = moment()
            .utc(offset)
            .subtract(daysToSubtract, "days")
            .subtract(minutesToSubtract, "minutes")
            .format();
        } else {
          const monthsToSubtract = ~~(i / 25);
          const daysToAdd = (i % 5) * 3;
          element.date = moment()
            .utc(offset)
            .subtract(monthsToSubtract, "months")
            .add(daysToAdd, "days")
            .format();
        }
      });
      const startDate = moment(req.query["startDate"]);
      const endDate = moment(req.query["endDate"]);
      const lastWeek = moment().subtract(7, "days").startOf("day");
      if (startDate.isBefore(lastWeek) && clientId === "1013595651") {
        return res.status(200).send({
          results: [],
          totalResults: 0,
        });
      }
      movements = movements
        .filter((element) => {
          const date = moment(element.date);
          return date.isBetween(startDate, endDate, "date", "[]");
        })
        .sort((a, b) => moment(b.date) - moment(a.date));
      const state = req.query["state"];
      if (state) {
        movements = movements.filter((element) => element.state === state);
      }
      const page = parseInt(req.query["page"] || 1);
      const pageSize = parseInt(req.query["pageSize"] || 15);
      const initialIndex = (page - 1) * pageSize;
      const limitSize = initialIndex + pageSize;
      const movementsResponse = movements.slice(initialIndex, limitSize);
      return res.status(200).send({
        results: movementsResponse,
        totalResults: movements.length,
      });
    } else {
      setTimeout(() => {
        return res.status(200).send(resMovementsDetail);
        //return res.status(203).send({ code: '1234', description: 'No se encontró información.' });
      }, 1000);
    }
  } else {
    res.status(200).send(resMovementsDetail);
    // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
  }
});

api.get("/rest/v1/customers/products", (req, res) => {
  const token = req.header("authorization").replace("Bearer", "");
  const clientId = jwt.decode(token, "", true).client_id;
  switch (clientId) {
    case "1013595641":
      res.status(200).send(balanceOnlyCat1);
      break;
    case "1013595642":
      res.status(200).send(balanceOnlyCat2);
      break;
    case "1013595643":
      res.status(200).send(balanceOnlyCat3);
      break;
    case "1013595644":
      res.status(200).send(balanceOnlyCat4);
      break;
    case "1013595645":
      res.status(200).send(balanceOnlyCat5);
      break;
    case "1013695655":
      res.status(200).send(balanceEdi1);
      break;
    case "1013695656":
      res.status(200).send(balanceEdi2);
      break;
    case "1013595646":
      res.status(500).send();
      break;
    case "1013595648":
      res.status(200).send(balanceOnlyCatNeg);
      break;
    case "1013595680":
      res.status(200).send(productsAllCategoriesMobile);
      break;
    case "1013595681":
      res.status(200).send(productsAllCategoriesMobile);
      break;
    case "1013595655":
      res.status(200).send(productsAllCategoriesMobile);
      break;
    case "1013595700":
      res.status(200).send(productsAllCategoriesMobile);
      break;
    case "1013595701":
      res.status(200).send(balanceOnlyCat1);
      break;
    case "1013595702":
      res.status(200).send(balanceOnlyCat1);
      break;
    case "1013595703":
      res.status(200).send(productsAllCategoriesMobile);
      break;
    case "1013595690":
      res.status(502).send({
        code: "100",
        description: "Canal bloqueado",
      });
      break;
    default:
      res.status(200).send(resProductsAll);
    // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
  }
});

api.get(
  "/product-information-server/v1/products/balance-without-detail",
  async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    switch (clientId) {
      case "1013595641":
        res.status(200).send(balanceOnlyCat1);
        break;
      case "1013595642":
        res.status(200).send(balanceOnlyCat2);
        break;
      case "1013595643":
        res.status(200).send(balanceOnlyCat3);
        break;
      case "1013595644":
        res.status(200).send(balanceOnlyCat4);
        break;
      case "1013595645":
        res.status(200).send(balanceOnlyCat5);
        break;
      case "1013695655":
        res.status(200).send(balanceEdi1);
        break;
      case "1013695656":
        res.status(200).send(balanceEdi2);
        break;
      case "1013595646":
        res.status(500).send();
        break;
      case "1013595648":
        res.status(200).send(balanceOnlyCatNeg);
        break;
      case "1013595680":
        res.status(200).send(productsAllCategoriesMobile);
        break;
      case "1013595681":
        res.status(200).send(productsAllCategoriesMobile);
        break;
      case "1013595655":
        res.status(200).send(productsAllCategoriesMobile);
        break;
      case "1013595700":
        res.status(200).send(productsAllCategoriesMobile);
        break;
      case "1013595701":
        res.status(200).send(balanceOnlyCat1);
        break;
      case "1013595702":
        res.status(200).send(balanceOnlyCat1);
        break;
      case "1013595703":
        res.status(200).send(productsAllCategoriesMobile);
        break;
      case "1013595690":
        res.status(502).send({
            code: "100",
            description: "Canal bloqueado",
          });
          break;
        default:
        res.status(200).send(resProductsWithoutDetail);
        //res.status(404).send({ code: '404', description: 'No se encontró información.' });
    }
  }
);

// /product-information-server/v1/nickname
api
  .route("/product-information-server/v1/nickname")
  .get(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    res.status(200).send(resProductsNicknames);
  })
  .post(async (req, res) => {
    res.status(200).send(resProductsNicknames);
  })
  .put((req, res) => {
    res.status(200).send(resProductsNicknames);
  });

api.post("/product-information-server/v1/spi/consult-keys-user", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return res.status(200).send(spiConsultKeysUser);
})

api.post("/product-information-server/v1/consent/consult", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return res.status(200).send({
    approvalId: '0',
    transactionDate: "2019-07-16T13:59:14",
    statusConsent: false
  });
})

api.post("/product-information-server/v1/consent/accept", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return res
    .status(200)
    .send({ approvalId: "", transactionDate: "", name: "" });
});

api.get("/product-detail-server/v1/products/balance/aval", (req, res) => {
  const { bankCode } = req.query;
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    switch (clientId) {
      case "1013595641":
        if (!!bankCode && bankCode === "0098") {
          return res.status(202).send({
            code: "102",
            description: "No se pueden cargar tus productos",
          });
        }
        if (!!bankCode && bankCode === "0160") {
          return res.status(200).send(resAvalFacilpassProductsAll);
        }
        return res.status(200).send(resAvalProductsAll);
      case "1013595655":
        return res.status(500).send({
          code: "100",
          description: "No se pueden cargar tus productos",
        });
    }
  }

  if (!!bankCode && bankCode === "0098") {
    return res.status(200).send(resAvalProvenirProductsAll);
  }
  if (!!bankCode && bankCode === "0160") {
    return res.status(200).send(resAvalFacilpassProductsAll);
  }
  if (!!bankCode && bankCode === "0097") {
    return res.status(200).send(resAvalDaleProductsAll);
  }
  return res.status(200).send(resAvalProductsAll);
  // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.get("/rest/v1/customers/products/tuplus", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    switch (clientId) {
      case "1013595655":
        return res.status(500).send({
          code: "100",
          description: "No se pueden cargar tus puntos tuplús",
        });
      case "1013595641":
        return res.status(200).send({
          activeAfilliation: false,
          totalPoints: "0",
          pointsPerBank: [],
        });
      default:
        return res.status(200).send({
          activeAfilliation: true,
          totalPoints: "82564",
          pointsPerBank: [
            {
              bankName: "Banco AV Villas",
              bankCode: "0052",
              bankPoints: "57000",
              status: "Activo",
            },
            {
              bankName: "Banco de Occidente",
              bankCode: "0023",
              bankPoints: "23000",
            },
            {
              bankName: "Banco de Bogotá",
              bankCode: "0001",
              bankPoints: "2000",
            },
            {
              bankName: "Banco Popular",
              bankCode: "0002",
              bankPoints: "564",
            },
          ],
        });
    }
  }
  return res.status(200).send({
    activeAfilliation: true,
    totalPoints: "82564",
    pointsPerBank: [
      {
        bankName: "Banco AV Villas",
        bankCode: "0052",
        bankPoints: "57000",
      },
      {
        bankName: "Banco de Occidente",
        bankCode: "0023",
        bankPoints: "23000",
      },
      {
        bankName: "Banco de Bogotá",
        bankCode: "0001",
        bankPoints: "2000",
      },
      {
        bankName: "Banco Popular",
        bankCode: "0002",
        bankPoints: "564",
      },
    ],
  });
});

api.get("/rest/v1/customers/products/tuplus/transactions", (req, res) => {
  return res.status(200).send(tuPlusMovements);
});

api.get("/rest/v1/customers/products/tuplus/rate", (req, res) => {
  return res.status(200).send(tuPlusRate);
});

api.post("/rest/v1/customers/products/tuplus/redeem", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return res.status(206).send(tuPlusRedemention);
});
api.post("/rest/v1/customers/products/tuplus/redeem/2fa", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return res.status(206).send(tuPlusRedemention2fa);
});

api.post("/rest/v1/customers/products/tuplus/logout", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  return res.status(204).send(null);
});

api.get("/product-information-server/v1/stocks", (req, res) => {
  return res.status(200).send({
    stockType: ["O", "P"],
  });
});

api.post("/product-information-server/v1/stocks", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    if (clientId === "1013595655") {
      return res.status(204).send();
    }
  }
  return res.status(200).send(resAvalStocks);
});

api.get("/rest/v1/customers/products/activation", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const { id_product_parent } = req.query;

  if (!!id_product_parent) {
    return res.status(200).send(resActivationsProduct);
  }

  return res.status(200).send(resActivations);
});

api.post("/rest/v1/customers/products/activation", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(412).send({
        description: "El producto no puede ser activado",
      });
    }
  }
  return res.status(200).send(genericResponse);
});

api.get("/:id/detail", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send(resProductsDetail[req.params.id]);
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api
  .route("/rest/v1/covered-debit-cards")
  .get(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });
    res.status(200).send(coveredCardsResponse);
    // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
  })
  .post((req, res) => {
    res.status(200).send(genericResponse);
  });

api.post("/lock-account", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1);
  });
  return res.status(200).send(genericResponse);
});

api.post("/cancel-account", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1);
  });
  return res.status(200).send(genericResponse);
});

api
  .route("/product-information-server/v1/pre-approved/offer")
  .get(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    /*res.status(404).send({
      description: "Los datos que ingresaste no son válidos.",
    });*/
    res.status(200).send(resPreApprovedOffer);
  });

api
  .route("/product-information-server/v1/pre-approved/accept-tyc")
  .get(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    res.status(200).send(resPreApprovedAcceptTyc);
  });

api
  .route("/product-information-server/v1/pre-approved/redirect-preapproved")
  .post(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    res.status(200).send(resPreApprovedUrlToRedirect);
  });

api.post(
  "/product-information-server/v1/spi/modify-tag-aval",
  async (req, res) => {
    const { newKeyId, accountId, accountType } = req.body;
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    res.status(200).send({ newKeyId, accountId, accountType });
    //res.status(400).send({ code: '5', description: 'Hello'  });
  }
);


api
  .route("/product-information-server/v1/consent/consult")
  .post(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

   // res.status(412).send({});
    res.status(200).send(resConsultSpi);
  });

api
  .route("/product-information-server/v1/consent/accept")
  .post(async (req, res) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    res.status(200).send({});
  });

module.exports = api;
