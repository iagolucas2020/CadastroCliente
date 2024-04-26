import React, {useState} from "react";
import "./Clientes.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { get, remove } from "../../services/clientes";
import ModalAdd from "../../components/Clientes/modalAdd";
// import ModalEdit from "../../components/Clientes/modalEdit";
// import { AlertBasic, AlertConfirm } from "../../components/Alert";


function Clientes() {
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleEditar, setVisibleEditar] = useState(false);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   let result = await get();
  //   if (result.status === 200) {
  //     setData(result.data);
  //   }
  // };

  const openModal = () => {
    setVisibleModal(!visibleModal);
  };

  const openModalEdit = (id) => {
    var obj = data.filter((x) => x.id === id)[0];
    setDataEdit(obj);
    setVisibleEditar(!visibleModal);
  };

  // const removeMc = async (id) => {
  //   const response = await AlertConfirm('Exclusão', 'Tem certeza que deseja excluir esta mercadoria, id: ' + id + ".", 'question')
  //   if(response.isConfirmed){
  //     const result = await remove(id);
  //     if (result.status === 200) {
  //       updateTabela(id);
  //       AlertBasic("Exclusão", "Mercadoria excluída com sucesso.", "success");
  //     }
  //   };
  // };

  // const updateTabela = (id) => {
  //   var dataUpdate = data.filter((x) => x.id !== id);
  //   setData(dataUpdate);
  // };

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
          </tr>
        </thead>
        {/* <tbody>
          {data.map((mc) => (
            <tr key={mc.id}>
              <td>{mc.id}</td>
              <td>{mc.name}</td>
              <td>{mc.registerNumber}</td>
              <td>{mc.manufacturer}</td>
              <td>{mc.type}</td>
              <td>{mc.description}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    openModalEdit(mc.id);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeMc(mc.id);
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}
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
