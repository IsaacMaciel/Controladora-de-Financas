import React from "react";

import * as yup from "yup";
import { Formik, ErrorMessage, Field, Form } from "formik";

import "../../../components/validator.css";

import validations from "../../../validators/validatorInspection";

function CardInspection(props) {
    const {
        cod_inspecao,
        descr_inspecao,
        obs_inspecao,
        numero_registro,
    } = props.data;

    console.log(props.data);
    return (
        <div className="card card-secondary">
            <div className="card-header">
                <h3 className="card-title">
                    Edição de Inspeções de Ensaios e Testes
                </h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <Formik
                initialValues={{
                    descr_inspecao,
                    obs_inspecao,
                    numero_registro,
                }}
                role="form"
                onSubmit={props.edit}
                validationSchema={validations}
                id="createInspection"
            >
                <Form>
                    <div className="card-body">
                        <div className="row">
                            <div className="form-group col-md-2">
                                <label htmlFor="numero_regitro">
                                    Nº do registro
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="numero_registro"
                                    placeholder="Informe o nº de registro"
                                    name="numero_registro"
                                />
                                <ErrorMessage
                                    className="is-invalid"
                                    component="span"
                                    name="numero_registro"
                                />
                            </div>
                            <div className="form-group col-md-10">
                                <label htmlFor="descr_inspecao">
                                    Descrição da inspeção
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="descr_inspecao"
                                    // value={props.data.descr_inspecao}
                                    // onChange={props.setValues("descr_inspecao")}
                                    placeholder="Digite a descrição da inspeção"
                                    name="descr_inspecao"
                                />
                                <ErrorMessage
                                    className="is-invalid"
                                    component="span"
                                    name="descr_inspecao"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="obs">Observação</label>
                            <Field
                                type="text"
                                className="form-control"
                                placeholder="Observação"
                                // value={props.data.obs_inspecao}
                                // onChange={props.setValues("obs_inspecao")}
                                name="obs_inspecao"
                                id="obs"
                            />
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button className="btn btn-secondary" type="submit">
                            Salvar
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
export default CardInspection;