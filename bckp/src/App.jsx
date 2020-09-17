import React, { useState } from "react";
import Summary from "./components/Summary";
import Launch from "./components/Launch";
import Periods from "./components/Periods";

import TransactionService from "./services/TransactionService";
import { useEffect } from "react";
import ModalComponent from "./components/ModalComponent";

export default function App() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setPeriod("2019-01");
  }, []);

  useEffect(() => {
    if (data.transactions) {
      setRender(true);
    } else {
      setRender(false);
    }
  }, [data]);

  const setPeriod = (period) => {
    TransactionService.getAll(period)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };



  const wait = () => {
    return <div> Carregando...</div>;
  };

  return (
    <div className="container">
      <h1>CFP IGTI</h1>
      <Periods getPeriod={setPeriod} />
      <Summary
        launch={data.launch}
        recipe={data.avenueValueTotal}
        expense={data.expensesValueTotal}
        balance={data.balance}
      />
      <ModalComponent
        css={"btn"}
        buttonName={"+ Novo Lançamento"}
        header={"Inclusão de Lançamento"}
      />

      {console.log(data.transactions)}
      {render
        ? data.transactions.map((transaction) => {
            return (
              <Launch
                id={transaction._id}
                type={transaction.type}
                day={transaction.day}
                date={transaction.yearMonthDay}
                category={transaction.category}
                description={transaction.description}
                value={transaction.value}
              />
            );
          })
        : wait()}
    </div>
  );
}
