import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
});

export default axiosInstance