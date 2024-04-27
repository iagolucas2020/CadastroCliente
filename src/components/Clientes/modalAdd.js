import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { post } from "../../services/clientes";
import { AlertBasic } from "../Alert";
import "./Modal.css";

function ModalAdd(props) {
  const [data, setData] = useState({
    id: "",
    name: "",
    registerNumber: "",
    manufacturer: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const postCliente = async () => {
    let obj = {
      nome: data.nome,
      cpf: data.cpf,
      rg: data.rg,
      dataNascimento: data.dataNascimento,
      ocupacao: data.ocupacao,
      email: data.email,
      dataCadastro: new Date(),
      endereco: {
        logradouro: data.logradouro,
        numero: data.numero,
        cidade: data.cidade,
        estado: data.estado,
      },
    };

    if (!checkInput(obj)) return;

    const result = await post(obj);
    console.log(result);
    if (result.status === 201) {
      clear();
      // props.func();
      // props.funcUpdate();
      AlertBasic("Cadastro", "Cliente Cadastrado com sucesso", "success");
    }
  };

  const clear = () => {
    setData({
      nome: "",
      cpf: "",
      rg: "",
      dataNascimento: "",
      ocupacao: "",
      email: "",
      logradouro: "",
      numero: "",
      cidade: "",
      estado: "",
    });
  };

  const checkInput = (obj) => {
    for (var prop in obj) {
      if (obj[prop] === "") {
        AlertBasic(
          "Atenção",
          "Preencher todos os campos para cadastrar o cliente.",
          "error"
        );
        return false;
      }
    }
    return true;
  };

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Incluir Cliente </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row">
            <div class="form-group col-sm-12">
              <label>Nome:</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div class="form-group col-sm-4">
              <label>CPF</label>
              <input
                type="text"
                className="form-control"
                name="cpf"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-sm-4">
              <label>RG:</label>
              <input
                type="text"
                className="form-control"
                name="rg"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-sm-4">
              <label>Nascimento:</label>
              <input
                type="date"
                className="form-control"
                name="dataNascimento"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div class="form-group col-sm-4">
              <label>Ocupação</label>
              <input
                type="text"
                className="form-control"
                name="ocupacao"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-sm-8">
              <label>E-mail:</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div class="form-group col-sm-9">
              <label>Logradouro</label>
              <input
                type="text"
                className="form-control"
                name="logradouro"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-sm-3">
              <label>Nº:</label>

              <input
                type="text"
                className="form-control"
                name="numero"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div class="form-group col-sm-9">
              <label>Cidade</label>
              <input
                type="text"
                className="form-control"
                name="cidade"
                onChange={handleChange}
              />
            </div>
            <div class="form-group col-sm-3">
              <label>Estado:</label>
              <input
                type="text"
                className="form-control"
                name="estado"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="modalFooter">
        <button
          className="btn btn-primary"
          onClick={() => {
            postCliente();
          }}
        >
          Incluir
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.func();
          }}
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalAdd;
