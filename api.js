import Axios from "axios";

Axios.defaults.withCredentials = false;

const api = Axios.create({
  baseURL: "http://challenge.dienekes.com.br/api",
});

export default api;
