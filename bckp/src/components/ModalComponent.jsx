import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import TransactionService from "../services/TransactionService";


import "../css/Modal.css";
import Input from "./Input";

export default function ModalComponent(props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [yearMonth, setYearMonth] = useState("");

  useEffect(() => {
    setType(props.type);
    setCategory(props.category);
    setDescription(props.description);
    setValue(props.value);
    setYearMonth(props.date);
  }, []);

  const update = (id,data) => {
    TransactionService.update(id,data);
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  function closeModal() {
    setIsOpen(false);
  }
  

  return (
    // <div className="center">
    <>
      <button className={props.css || ""} onClick={openModal}>
        {props.buttonName}
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="header-modal">
          <span className="text-header">{props.header}</span>
          <a
            onClick={closeModal}
            className="waves-effect red accent-4 btn-small"
          >
            X
          </a>
        </div>
        <form onSubmit={()=> {
          update(props.id,props.data)
        } }>
          <div className="modal-content center">
            <label className="modal-type">
              <input
                name="type"
                type="radio"
                checked={type === "+" ? true : false}
                value="+"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <span>Receita</span>
            </label>

            <label className="modal-type">
              <input
                name="type"
                type="radio"
                value="-"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                checked={type === "-" ? true : false}
              />
              <span>Despesa</span>
            </label>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                className="validate"
                name="description"
              />
              <label className="active" htmlFor="description">
                Descrição
              </label>
            </div>

            <div className="input-field col s12">
              <input
                id="category"
                value={category || ""}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                type="text"
                className="validate"
                name="category"
              />
              <label className="active" htmlFor="category">
                Categoria
              </label>
            </div>
            <div className="input-field col s6">
              <input
                id="value"
                value={value || 0}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                type="number"
                className="validate"
                name="value"
              />
              <label className="active" htmlFor="value">
                Valor
              </label>
            </div>

            <div className="input-field col s6">
              <input
                id="date"
                value={yearMonth || ""}
                onChange={(e) => {
                  setYearMonth(e.target.value);
                }}
                type="date"
                className="validate"
                name="date"
              />
              <label className="active" htmlFor="date">
                Data
              </label>
            </div>

            <div className="col s12">
              <button className="waves-effect waves-light btn col s12">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </Modal>
      {/* </div> */}
    </>
  );
}
