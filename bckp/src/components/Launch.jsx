import React from "react";

import "../css/Launch.css";
import Modal from "./ModalComponent";

export default function Launch({ type, day, category, description, value,date,id }) {
  const checkType = (type) => {
    if (type === "-") return "#e74c3c";
    if (type === "+") return "#27ae60";
  };

  return (
    <div
      className="launch-container input-field "
      style={{ backgroundColor: checkType(type) }}
    >
      <div className="infos">
        <div className="day">{day}</div>
        <div className="info-launch">
          <div>
            {category} <br />
            {description}
          </div>
        </div>
      </div>
      <div className="actions-value">
        <div>{value}</div>
        <div className="action">
          <button>Excluir</button>
          <Modal
            id={id}
            buttonName={"Editar"}
            header={"Edição de Lançamento"}
            type={type}
            category={category}
            description={description}
            value={value}
            date={date}
          />
        </div>
      </div>
    </div>
  );
}
