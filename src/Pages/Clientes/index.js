import React, {useEffect, useState} from "react";
import "./Clientes.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalAdd from "../../components/Clientes/modalAdd";
import { AlertBasic, AlertConfirm } from "../../components/Alert";
import { get, remove } from "../../services/clientes";
// import ModalEdit from "../../components/Clientes/modalEdit";



function Clientes() {
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false);

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
    var obj = data.filter((x) => x.id === id)[0];
    setDataEdit(obj);
    setVisibleEditar(!visibleModal);
  };

  const removeCliente = async (id) => {
    const response = await AlertConfirm('Exclusão', 'Tem certeza que deseja excluir este cliente, id: ' + id + ".", 'question')
    if(response.isConfirmed){
      const result = await remove(id);
      if (result.status === 200) {
        getData();
        AlertBasic("Exclusão", "Cliente excluído com sucesso.", "success");
      }
    };
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
        </div>
      </header>
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
        // funcUpdate={() => {
        //   getData();
        // }}
      />
      {/* <ModalEdit
        visible={visibleEditar}
        obj={dataEdit}
        func={() => {
          setVisibleEditar(!visibleEditar);
        }}
        funcUpdate={() => {
          getData();
        }}
      /> */}
    </div>
  );
}

export default Clientes;
