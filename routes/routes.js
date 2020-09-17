const express = require("express");
const transactionRouter = express.Router();

const {
  index,
  allPeriods,
  showFilter,
  acumulateBalanceYear,
  filterForCategory,
  store
} = require("../services/transactionService");

transactionRouter.get("", index);
transactionRouter.post("", store);

transactionRouter.put("/", (req, res) => {
  try {
    throw new Error("Id inexistente");
  } catch (error) {
    res.status(400).send({ error });
  }
});

transactionRouter.delete("/", (req, res) => {
  try {
    throw new Error("Id inexistente");
  } catch (error) {
    res.status(400).send({ error });
  }
});

transactionRouter.put("/:id", (req, res) => {
  const { body, params } = req;

  try {
    if (JSON.stringify(body) === "{}") {
      throw new Error("Conteúdo inexistente");
    }
  } catch (error) {
    res.status(400).send({ error });
  }
});

transactionRouter.delete("/:id", (req, res) => {
  const { params } = req;

  try {
    throw new Error("Conteúdo inexistente");
  } catch (error) {
    res.status(400).send({ error });
  }
});
transactionRouter.get("/periods", allPeriods);
transactionRouter.get("/periods/:year", acumulateBalanceYear);
transactionRouter.get("/periods/filter/:filter", showFilter);
transactionRouter.get("/periods/category/:categoryFilter", filterForCategory);

module.exports = transactionRouter;
