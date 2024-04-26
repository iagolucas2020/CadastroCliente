import { api } from './api';

//Get
async function get() {
  return await api.get('/Clientes');
}

//POST
async function post(clientes) {
  const response = await api.post(
    '/Clientes',
    clientes,
  );
  return response;
}

//PUT
async function put(id, clientes) {
  const response = await api.put(
    '/Clientes/'+ id,
    clientes,
  );
  return response;
}

//Delete
async function remove(id) {
  const response = await api.delete(
    '/Clientes/' + id,
  );
  return response;
}

export { get, post, put, remove };
