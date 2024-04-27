import axios from "axios";
import { api, linkApi } from "./api";

//GET
async function get() {
  return await api.get("/Clientes");
}

//GET FILTER
async function getFilter(id, cpf, nome, email) {
  const response = await api.get("/Clientes/filtro", {
    params: {
      id,
      cpf,
      nome,
      email,
    },
  });
  return response;
}

//POST
async function post(clientes) {
  const response = await api.post("/Clientes", clientes);
  return response;
}

//PUT
async function put(id, clientes) {
  const response = await api.put("/Clientes/" + id, clientes);
  return response;
}

//Delete
async function remove(id) {
  const response = await api.delete("/Clientes/" + id);
  return response;
}

//GetPdf
async function getPdf() {
  const data = {};
  return axios({
    url: linkApi.link + "/Clientes/pdf",
    method: "GET",
    responseType: "blob",
    params: data,
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio.pdf");
    document.body.appendChild(link);
    link.click();
  });
}

export { get, getFilter, post, put, remove, getPdf };
