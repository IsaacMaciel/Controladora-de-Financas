import React, { useState, useEffect } from "react";

import TransactionService from "../services/TransactionService";

export default function Periods({ getPeriod }) {
  const [allOptions, setAllOptions] = useState([]);

  useEffect(() => {
    TransactionService.allPeriod()
      .then((response) => {
        setAllOptions(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSelect = (event) => {
    const period = event.target.value;
    getPeriod(period);
  };

  return (
    <div className="input-field">
      <select style={{ display: "block" }} onChange={handleSelect}>
        {allOptions.map((periods) => {
          return <option value={periods}>{periods}</option>;
        })}
      </select>
    </div>
  );
}
