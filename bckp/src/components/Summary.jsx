import React from "react";

import '../css/Summary.css'

export default function Summary({ launch, recipe, expense, balance }) {
  const vrfyBalance = (balance) => {
    if (balance > 0) {
      return "#2ecc71";
    } else if (balance < 0) {
      return "#c0392b";
    }
  };

  return (
    <div className="summary-container" style={{ display: "flex", justifyContent: "space-between" }}>
      <div>Lançamento: {launch}</div>
      <div>
        Receitas: <span style={{ color: "#2ecc71" }}> {recipe}</span>{" "}
      </div>
      <div>
        Despesas: <span style={{ color: "#c0392b" }}>{expense}</span>{" "}
      </div>
      <div>
        Saldo: <span style={{ color: vrfyBalance(balance) }}> {balance} </span>
      </div>
    </div>
  );
}
