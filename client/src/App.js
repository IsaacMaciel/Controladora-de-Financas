import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "api" });

export default function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get("/transaction?period=");
      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, []);


  return (
    <>
      {transactions.map((transaction) => {
        return <p key={transaction}> {transaction}</p>;
      })}
    </>
  );
}
