import http from "../http-common";

const getAll = (period) => {
  return http.get(`?period=${period}`);
};

const findById = (id) => {
  return http.get(`/:${id}`);
};

const allPeriod = () => {
  return http.get("/periods");
};

const create = (data) => {
  return http.post("", data);
};

const update = (id, data) => {
  return http.put(`/:${id}`, data);
};

const destroy = (id) => {
  return http.delete(`/:${id}`);
};

export default {
  getAll,
  allPeriod,
  findById,
  create,
  update,
  destroy,
};
