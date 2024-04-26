import axios from 'axios';

const linkApi = {
  link: 'https://localhost:7096',
};

const api = axios.create({
  baseURL: linkApi.link,
});

export { api, linkApi };
