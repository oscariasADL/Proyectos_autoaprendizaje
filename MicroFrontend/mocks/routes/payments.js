"use strict"; // palabra reservada que nos permite usar las Funciones de ES6

const express = require("express");
const { faker } = require("@faker-js/faker");
const resPaymentsCreditCards = require("../responses/payments_credit-cards.json");
const resPaymentsMobileContacts = require("../responses/payments_mobile_contacts.json");
const resPaymentsAvalList = require("../responses/payments_aval.json");
const resPaymentsMobileOwn = require("../responses/payments_mobile_aval.json");
const resLoansPay = require("../responses/loans_pay.json");
const resLoansMultiplePay = require("../responses/loans_multiple_pay.json");
const resLoansOwn = require("../responses/loans_own.json");
const resLoansContacts = require("../responses/loans_contacts.json");
const paymentServices = require("../responses/payment-services.json");
const paymentCities = require("../responses/payment-cities.json");
const paymentAgreements = require("../responses/payment-agreements.json");
const paymentAgreementDetail = require("../responses/payment-agreement-detail.json");
const searchContributors = require("../responses/search_contributor.json");
const searchBills = require("../responses/search_bills.json");
const directedPayments = require("../responses/directed_payments.json");
const paymentMethods = require("../responses/payment_methods.json");
const qrPaymentMethod = require("../responses/qr_payment_method.json");
const paymentHistory = require("../responses/payment_records.json");
const genericResponse = require("../responses/generic_response.json");
const socialResponse = require("../responses/social_security_response.json");
const billDetail = require("../responses/bill_detail.json");
const billDetailBarcode = require("../responses/bill_detail_barcode.json");
const schedulePaymentResponse = require("../responses/schedule_payment.json");
const debtPurchaseInstallments = require("../responses/debt_purchase_installments.json");
const debtPurchaseRate = require("../responses/debt_purchase_rate.json");
const registerReponse = require("../responses/register_service.json");
const directedPaymentResponse = require("../responses/directed_payment_response.json");
const resChallenge = require("../responses/challenge-2fa.json");

const jwt = require("jwt-simple");
const mobileHelper = require("../routes/mobileHelper");
const moment = require("moment-timezone");
/*
 Route: /bank/payments
*/
const api = express.Router();

api.get("/v1/loans", (req, res) => {
  const { loanFilter } = req.query;
  const creditsFilter = "CREDITS_AVAL";
  if (loanFilter === creditsFilter) res.status(200).send(resPaymentsAvalList);
  else res.status(200).send(resPaymentsCreditCards);
});

api.get("/v2/loans", (req, res) => {
  const { own } = req.query;
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    if (clientId === "1013595641") {
      return res.status(200).send({
        loansVillas: [],
        loansOtherBanks: [],
        loansContacts: [],
      });
    } else if (clientId === "1013595701") {
      return res.status(500).send();
    } else {
      const moment = require("moment-timezone");
      moment.tz.setDefault("America/Bogota");
      const offset = moment().utcOffset();
      if (own === "true") {
        let loanVillas = resPaymentsMobileOwn.loansVillas;
        loanVillas.forEach((element, i) => {
          const date = moment().add(i + 1, "days");
          element.maxPaymentDate = date.format("DD/MM/YYYY");
        });
        return res.status(200).send({
          loansVillas: loanVillas,
          loansOtherBanks: resPaymentsMobileOwn.loansOtherBanks,
          loansContacts: resPaymentsMobileOwn.loansContacts,
        });
      } else {
        return res.status(200).send(resPaymentsMobileContacts);
      }
    }
  }
  if (own === "true") {
    res.status(200).send(resLoansOwn);
  } else {
    res.status(200).send(resLoansContacts);
  }
});

api.post("/v1/loans/pay", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(412).send({
        description: "Ocurrio un error al realizar el pago",
      });
    }
  }
  return res.status(200).send(resLoansPay);
});

api.get("/v1/bills", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    if (clientId === "1013595655") {
      return res.status(412).send({
        code: "412",
        description: "No fue posible cargar tus servicios",
      });
    }
    if (clientId === "1013595641") {
      return res.status(200).send({
        biller: [],
        noBiller: [],
      });
    }
    if (clientId === "1013595680") {
      const moment = require("moment-timezone");
      moment.tz.setDefault("America/Bogota");
      const offset = moment().utcOffset();
      let bills = { ...paymentServices };
      bills.biller.forEach((bill, i) => {
        const date = moment().add(i + 1, "days");
        bill.maxPaymentDate = date.format("DD/MM/YYYY");
      });
      bills.noBiller.forEach((bill, i) => {
        const date = moment().add(i + 1, "days");
        bill.maxPaymentDate = date.format("DD/MM/YYYY");
      });
      return res.status(200).send(bills);
    }
  }
  setTimeout(() => {
    return res.status(200).send(paymentServices);
  }, 800);
});

api.delete("/v1/bills", async (req, res) => {
  return res.status(200).send({
    approvalId: "5212320000",
    transactionDate: "2019-03-12T10:12:41.637",
  });
});

api.get("/v1/city", (req, res) => {
  setTimeout(() => {
    res.status(200).send(paymentCities);
  }, 200);
});

api.get("/v1/agreement", (req, res) => {
  setTimeout(() => {
    res.status(200).send(paymentAgreements);
  }, 200);
});

api.get("/v1/agreement/detail", (req, res) => {
  res.status(200).send(paymentAgreements.agreements[0]);
});

api.post("/v1/tax/detail", (req, res) => {
  setTimeout(() => {
    res.status(200).send(paymentAgreementDetail);
    // res.status(203).send({"code":"010","description":"Documento no existe (010)"});
    // res.status(400).send({"code":"010","description":"Documento no existe (200)"});
  }, 200);
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/pila/pin", async (req, res) => {
  res.status(200).send(billDetail);
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.get("/v1/pila", (req, res) => {
  res.status(200).send(searchContributors);
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/pila", (req, res) => {
  res.status(200).send(socialResponse);
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/pila/admin", (req, res) => {
  res.status(200).send(genericResponse);
});

api.put("/v1/pila/admin", (req, res) => {
  res.status(200).send(genericResponse);
});

api.post("/v1/tax/payment", (req, res) => {
  res.status(200).send(genericResponse);
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/bills/payment", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(412).send({
        description: "Ocurrio un error al realizar el pago",
      });
    }
  }
  setTimeout(() => {
    return res.status(200).send(resLoansPay);
  }, 900);
  // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/bills/payment/multiple", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransfer = ["1013595651", "1013595652", "1013595655"];
    if (clientsIdToFailTransfer.includes(clientId)) {
      return res.status(412).send({
        description: "Ocurrio un error al realizar el pago",
      });
    }
  }
  setTimeout(() => {
    return res.status(200).send(resLoansMultiplePay);
  }, 900);
  // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v2/bills/payment/multiple", (req, res) => {
    const { body } = req
    const { paymentBillList } = body

    const response = paymentBillList.map((paymentBill, index) => {
        const paymentBillResponse = {
            ...paymentBill,
            approvalId: faker.string.numeric(10),
            statusPayment: true,
            transactionDate: faker.date.anytime(),
            codeError: null,
            messageError: null
        }

        // if ([1].includes(index)) {
        //     return {
        //         ...paymentBill,
        //         statusPayment: false,
        //         transactionDate: faker.date.anytime(),
        //         messageError: "¡Oh no! Ha ocurrido un error que no esperábamos. Comunícate con nosotros (999)",
        //         codeError: "1045"
        //     }
        // }

        return paymentBillResponse;
    })
    setTimeout(() => {
        return res.status(200).send({paymentBillList: response});
    }, 900)
    // return res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/bills/search", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  res.status(200).send(searchBills);
});

api.post("/v1/bills/register", (req, res) => {
  res.status(200).send(registerReponse);
});

api.post("/v1/bills/reference", async (req, res) => {
  const { nie } = req.body;
  const amount =
    nie === "1234" || nie === "0108799930" ? 100000 : billDetail.amount;
  res.status(200).send({ ...billDetail, amount });
  // res.status(404).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/bills/barcode", async (req, res) => {
  res.status(200).send(billDetailBarcode);
});

api.post("/v1/portfolio-purchase", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransaction = [
      "1013595651",
      "1013595652",
      "1013595655",
    ];
    if (clientsIdToFailTransaction.includes(clientId)) {
      return res.status(412).send({
        code: "412",
        description: "No fue posible realizar la compra de cartera",
      });
    } else if (mobileHelper.includes(clientId)) {
      moment.tz.setDefault("America/Bogota");
      const offset = moment().utcOffset();
      return res.status(200).send({
        approvalId: "5259110000",
        transactionDate: moment().utc(offset).format(),
      });
    }
  }
  return res.status(200).send(genericResponse);
});

api.post("/v1/recharge-phone", (req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransaction = [
      "1013595651",
      "1013595652",
      "1013595655",
    ];
    if (clientsIdToFailTransaction.includes(clientId)) {
      return res.status(412).send({
        code: "2080",
        description: "Número de identificación no valido (2080)",
      });
    } else if (mobileHelper.includes(clientId)) {
      moment.tz.setDefault("America/Bogota");
      const offset = moment().utcOffset();
      return res.status(200).send({
        approvalId: "5259110000",
        transactionDate: moment().utc(offset).format(),
      });
    }
  }
  //return res.status(200).send(genericResponse);
  return res.status(206).send(resChallenge);
});

api.post("/v1/directed-payment", (req, res) => {
  res.status(200).send(genericResponse);
});

api.post("/v1/directed-payment/multiple", (req, res) => {
  res.status(200).send(directedPaymentResponse);
});

api.post("/v2/directed-payment/multiple", (req, res) => {
    const { body } = req
    const { directedPaymentList } = body
    const response = directedPaymentList.map((movement, index) => {
        const movementResponse = {
            ...movement,
            approvalId: faker.string.numeric(10),
            approvalIdOld: movement.approvalId,
            directedPaymentStatus: true,
            
        }

    // if ([1].includes(index)) {
    //     return {
    //         ...movementResponse,
    //         approvalIdOld: movement.approvalId,
    //         directedPaymentStatus: false,
    //         messageError: "¡Oh no! Ha ocurrido un error que no esperábamos. Comunícate con nosotros (999)",
    //         codeError: "1045"
    //     }
    // }

    return movementResponse;
  });
  res.status(200).send({ directedPaymentList: response });
});

api.get("/v1/purchase-term/id/:id", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  res.status(200).send(directedPayments);
});

api.get("/v1/payment-methods", (req, res) => {
    res.status(200).send(paymentMethods);
    //res.status(404).send({code: "22", description:"No tienes tarjetas o manillas pendientes por activar (22)"});
});

api.put("/v1/update-installments", (req, res) => {
  res.status(200).send(genericResponse);
});

api.post("/v1/recurring", (req, res) => {
  res.status(200).send(schedulePaymentResponse);
  // return res.status(409).send({ code: '1234', description: 'No se encontró información.' });
});

api.put("/v1/recurring", (req, res) => {
  res.status(204).end();
  // return res.status(409).send({ code: '1234', description: 'No se encontró información.' });
});

api.post("/v1/recurring/delete", (req, res) => {
  res.status(204).end();
  // return res.status(409).send({ code: '1234', description: 'No se encontró información.' });
});

api.route("/v1/admin-credit/id/:accountId").get((req, res) => {
  if (req.header("authorization") !== undefined) {
    const token = req.header("authorization").replace("Bearer", "");
    const clientId = jwt.decode(token, "", true).client_id;
    const clientsIdToFailTransaction = [
      "1013595651",
      "1013595652",
      "1013595655",
    ];
    if (clientsIdToFailTransaction.includes(clientId)) {
      return res.status(412).send({
        code: "404",
        description: "No fue posible encontrar un valor de cuotas",
      });
    }
  }
  return res.status(200).send(debtPurchaseInstallments);
});

api.get("/v1/portfolio-purchase/rate/id/:relativeId", (req, res) => {
  return res.status(200).send(debtPurchaseRate);
});

api.post("/v1/records", async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  res.status(400).send(paymentHistory);
});

module.exports = api;
