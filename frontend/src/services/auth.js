import axios from "axios";

// Configuration de l'URL des requêtes
const commonConfig = {
  baseURL: "http://localhost:3000/",
};

const notConnectedClient = axios.create({ ...commonConfig });
const connectedClient = axios.create({ ...commonConfig });

// Introduction du header d'authentification
connectedClient.interceptors.request.use(function(config) {
  const token = JSON.parse(localStorage.groupomaniaUser).token;
  config.headers = { Authorization: `Bearer ${token}` };
  return config;
});

export { connectedClient, notConnectedClient };
