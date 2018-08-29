import _axios from "axios";
const BASE_URL = "http://127.0.0.1:8848/api/";

const axios = _axios.create();

// const clientId = localStorage.getItem("clientId")
//   ? localStorage.getItem("clientId")
//   : null;
// const email = localStorage.getItem("email")
//   ? localStorage.getItem("email")
//   : null;

// console.log( clientId, email );

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

// try {
//   axios.interceptors.request.use(
//     config => {
//       if (clientId !== null) config.headers.clientId = clientId;
//       if (email !== null) config.headers.email = email;

//       console.log("config", config);
//       if (clientId !== null && email !== null) {
//         return config;
//       } else {
//         return false;
//       }
//     },
//     function(err) {
//       return Promise.reject(err);
//     }
//   );
// } catch (err) {
//   console.log(err, "error in request interceptor");
// }

export const post = (uri, options = {}) => {
  const { data } = options;
  return axios({
    method: "post",
    url: uri,
    data
  });
};

export default {
  post
};
