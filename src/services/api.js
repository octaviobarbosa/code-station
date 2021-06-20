import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

// api.interceptors.request.use(async (config) => {
//   const conf = config;
//   // const token = getToken();
//   const token = "";
//   if (token && token !== "undefined") {
//     conf.headers.Authorization = `Bearer ${token}`;
//   }
//   return conf;
// });

export default api;
