import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { put } from "../../services/clientes";
import { AlertBasic } from "../Alert";
import "./Modal.css";
import { estados } from "../../global/jsFunctions/estados";
import moment from "moment";

function ModalEdit(props) {
  const [id, setId] = useState("");
  const [endId, setEndId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [ocupacao, setOcupacao] = useState("");
  const [email, setEmail] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const putCliente = async () => {
    let obj = {
      clienteId: id,
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      ocupacao: ocupacao,
      email: email,
      dataCadastro: new Date(),
      enderecoId: endId,
      endereco: {
        logradouro: logradouro,
        numero: numero,
        cidade: cidade,
        estado: estado,
      },
    };

    if (!checkInput(obj)) return;

    var result = await put(id, obj);
    console.log(result);
    if (result.status === 200) {
      props.func();
      props.funcUpdate();
      AlertBasic("Atualizar", "Cliente atualizado com sucesso", "success");
    }
  };

  const setData = async () => {
    const response = props.obj;
    const endereco = await props.obj.endereco;
    setId(response.clienteId);
    setNome(response.nome);
    setCpf(response.cpf);
    setRg(response.rg);
    setDataNascimento(moment(response.dataNascimento).format('yyyy-MM-DD'));
    setOcupacao(response.ocupacao);
    setEmail(response.email);
    setEndId(endereco.enderecoId);
    setLogradouro(endereco.logradouro);
    setNumero(endereco.numero);
    setCidade(endereco.cidade);
    setEstado(endereco.estado);
  };

  const checkInput = (obj) => {
    for (var prop in obj) {
      if (obj[prop] === "") {
        AlertBasic(
          "Atenção",
          "Preencher todos os campos para atualizar a mercadoria.",
          "error"
        );
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (props.visible) setData();
  }, [props]);

  return (
    <Modal isOpen={props.visible}>
      <ModalHeader className="modalHeader"> Editar Cliente </ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row">
            <div class="form-group col-sm-3">
              <label>ID:</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                disabled={true}
                onChange={(e) => setId(e.target.value)}
                value={id}
              />
            </div>
            <div class="form-group col-sm-9">
              <label>Nome:</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
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
                onChange={(e) => setCpf(e.target.value)}
                value={cpf}
              />
            </div>
            <div class="form-group col-sm-4">
              <label>RG:</label>
              <input
                type="text"
                className="form-control"
                name="rg"
                onChange={(e) => setRg(e.target.value)}
                value={rg}
              />
            </div>
            <div class="form-group col-sm-4">
              <label>Nascimento:</label>
              <input
                id="dataNascimento"
                type="date"
                className="form-control"
                name="dataNascimento"
                onChange={(e) => setDataNascimento(e.target.value)}
                value={dataNascimento}
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
                onChange={(e) => setOcupacao(e.target.value)}
                value={ocupacao}
              />
            </div>
            <div class="form-group col-sm-8">
              <label>E-mail:</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                onChange={(e) => setLogradouro(e.target.value)}
                value={logradouro}
              />
            </div>
            <div class="form-group col-sm-3">
              <label>Nº:</label>
              <input
                type="text"
                className="form-control"
                name="numero"
                onChange={(e) => setNumero(e.target.value)}
                value={numero}
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
                onChange={(e) => setCidade(e.target.value)}
                value={cidade}
              />
            </div>
            <div class="form-group col-sm-3">
              <label>Estado:</label>
              <select
                type="text"
                className="form-control"
                name="estado"
                onChange={(e) => setEstado(e.target.value)}
                value={estado}
              >
                {estados.map((uf) => (
                  <option value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="modalFooter">
        <button
          className="btn btn-primary"
          onClick={() => {
            putCliente();
          }}
        >
          Editar
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

export default ModalEdit;
