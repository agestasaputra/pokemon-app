import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 5000,
  headers: {
    'X-Custom-Header': 'foobar'
    // 'Accept': 'application/vnd.GitHub.v3+json',
    //'Authorization': 'token <your-token-here> -- https://docs.GitHub.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  }
});

export default axiosInstance