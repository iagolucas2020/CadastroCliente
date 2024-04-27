import React, { useEffect, useState } from "react";
import "./Clientes.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalAdd from "../../components/Clientes/modalAdd";
import { AlertBasic, AlertConfirm } from "../../components/Alert";
import { get, getFilter, getPdf, remove } from "../../services/clientes";
import ModalEdit from "../../components/Clientes/modalEdit";

function Clientes() {
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false);

  //Dados Filtro
  const [id, setId] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let result = await get();
    if (result.status === 200) {
      setData(result.data);
    }
  };

  const openModal = () => {
    setVisibleModal(!visibleModal);
  };

  const openModalEdit = (id) => {
    var obj = data.filter((x) => x.clienteId === id)[0];
    setDataEdit(obj);
    setVisibleEditar(!visibleModal);
  };

  const removeCliente = async (id) => {
    const response = await AlertConfirm(
      "Exclusão",
      "Tem certeza que deseja excluir este cliente, id: " + id + ".",
      "question"
    );
    if (response.isConfirmed) {
      const result = await remove(id);
      if (result.status === 200) {
        getData();
        AlertBasic("Exclusão", "Cliente excluído com sucesso.", "success");
      }
    }
  };

  const filter = async () => {
    const response = await getFilter(id, cpf, nome, email);
    setData(response.data);
  };

  return (
    <div className="container-sm container">
      <br />
      <header>
        <h2>Lista de Clientes</h2>
        <div>
          <button
            className="btn btn-success"
            onClick={() => {
              openModal();
            }}
          >
            Novo
          </button>
          <button
            className="btn btn-dark"
            onClick={() => {
              getPdf();
            }}
          >
            Download
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              filter();
            }}
          >
            Pesquisar
          </button>
        </div>
      </header>
      <br />
      <div className="panel-body">
        <div className="row">
          <div className="form-group col-sm-2">
            <label>ID</label>
            <input
              className="form-control"
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-group col-sm-3">
            <label>CPF</label>
            <input
              className="form-control"
              type="number"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className="form-group col-sm-3">
            <label>NOME</label>
            <input
              className="form-control"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>E-MAIL</label>
            <input
              className="form-control"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <br />
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Data Nascimento</th>
            <th>Ocupação</th>
            <th>E-mail</th>
            <th>Logradouro</th>
            <th>Nº</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cl) => (
            <tr key={cl.clienteId}>
              <td>{cl.clienteId}</td>
              <td>{cl.nome}</td>
              <td>{cl.cpf}</td>
              <td>{cl.rg}</td>
              <td>{cl.dataNascimento}</td>
              <td>{cl.ocupacao}</td>
              <td>{cl.email}</td>
              <td>{cl.endereco.logradouro}</td>
              <td>{cl.endereco.numero}</td>
              <td>{cl.endereco.cidade}</td>
              <td>{cl.endereco.estado}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    openModalEdit(cl.clienteId);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeCliente(cl.clienteId);
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAdd
        visible={visibleModal}
        func={() => {
          setVisibleModal(!visibleModal);
        }}
        funcUpdate={() => {
          getData();
        }}
      />
      <ModalEdit
        visible={visibleEditar}
        obj={dataEdit}
        func={() => {
          setVisibleEditar(!visibleEditar);
        }}
        funcUpdate={() => {
          getData();
        }}
      />
    </div>
  );
}

export default Clientes;
