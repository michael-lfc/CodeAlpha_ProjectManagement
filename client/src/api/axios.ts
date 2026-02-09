// // // import axios from "axios";

// // // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // // const api = axios.create({
// // //   baseURL: API_URL,
// // //   headers: { "Content-Type": "application/json" },
// // // });

// // // api.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem("token");
// // //     if (token) {
// // //       config.headers = config.headers || {};
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // // export default api;

// // import axios from "axios";

// // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // const api = axios.create({
// //   baseURL: API_URL,
// //   headers: { "Content-Type": "application/json" },
// // });

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) {
// //     config.headers = config.headers || {};
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       // 🔥 token invalid → force logout
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("user");
// //       window.location.href = "/login";
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api", // adjust if needed
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; // ✅ default export
