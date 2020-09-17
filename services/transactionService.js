const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const filterExpensesAndRevenue = (data) => {
  const expenses = data.filter(({ type }) => type === "-");
  const expensesValueTotal = expenses
    .map((data) => {
      return data.value;
    })
    .reduce((acumulator, currentValue) => {
      return acumulator + currentValue;
    }, 0);

  const avenue = data.filter(({ type }) => type === "+");
  const avenueValueTotal = avenue
    .map((data) => {
      return data.value;
    })
    .reduce((acumulator, currentValue) => {
      return acumulator + currentValue;
    }, 0);

  return {
    expensesValueTotal,
    avenueValueTotal,
  };
};

const index = async (req, res) => {
  const checkPeriod = (req) => {
    try {
      const { period } = req.query;
      if (!period) {
        return res.status(400).json({
          error:
            "É necessário informar o parâmetro  periodo, cujo valor deve estar no formato yyyy-mm ",
        });
      } else return period;
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  const checkData = (data) => {
    if (data.length === 0) {
      return res.status(400).json({
        error:
          "Não existe registros para essa solicitação. Lembre-se o formato deve estar yyyy-mm",
      });
    }
  };

  const periodo = checkPeriod(req);
  if (periodo) {
    const data = await TransactionModel.find({ yearMonth: periodo });
    checkData(data);
    const { expensesValueTotal, avenueValueTotal } = filterExpensesAndRevenue(
      data
    );
    return res.json({
      launch: data.length,
      transactions: data,
      expensesValueTotal,
      avenueValueTotal,
      balance: avenueValueTotal - expensesValueTotal,
    });
  }
};

const store = async (req, res) => {
  const { description, value, category, year, month, day, type } = req.body;

  const yearMonth = `${year}-${month.toString().padStart(2, "0")}`;
  const yearMonthDay = `${yearMonth}-${day.toString().padStart(2, "0")}`;

  const postTransaction = {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type
  }
  console.log(postTransaction)
  // const newTransactionMongoDB = await TransactionModel.create(postTransaction);
  // console.log(newTransactionMongoDB)

  return res.json({
    transaction: 'OI'
  })
};

const showFilter = async (req, res) => {
  try {
    const { filter } = req.params;
    const { period } = req.query;

    let data = await TransactionModel.find({ yearMonth: period });

    // const condition = filter
    //   ? { description: { $regex: new RegExp(filter), $options: "i" } }
    //   : {};

    data = data.filter(({ description }) => {
      const descriptCompare = description.toLowerCase();

      return descriptCompare.includes(filter);
    });

    const { expensesValueTotal, avenueValueTotal } = filterExpensesAndRevenue(
      data
    );

    return res.json({ data, expensesValueTotal, avenueValueTotal });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const allPeriods = async (req, res) => {
  const allPeriods = await TransactionModel.distinct("yearMonth");

  return res.json(allPeriods);
};

const acumulateBalanceYear = async (req, res) => {
  const { year } = req.params;

  const data = await TransactionModel.find({ year });
  const { expensesValueTotal, avenueValueTotal } = filterExpensesAndRevenue(
    data
  );

  res.json({
    data,
    length: data.length,
    expensesValueTotal,
    avenueValueTotal,
    totalBalance: avenueValueTotal - expensesValueTotal,
  });
};

const filterForCategory = async (req, res) => {
  const { period } = req.query;
  const { categoryFilter } = req.params;
  // console.log(categoryFilter)

  let data = await TransactionModel.find({ yearMonth: period });

  data = data.filter(({ category }) => category == categoryFilter);

  res.json({ data, length: data.length });
};

module.exports = {
  index,
  showFilter,
  allPeriods,
  acumulateBalanceYear,
  filterForCategory,
  store
};
