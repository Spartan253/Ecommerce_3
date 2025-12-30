// import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";
// import { authEndpoints } from "./api.js";
// export const axiosInstance=axios.create({});

// export const apiconnector=(method,url,bodyData,headers={},params={})=>{
//   const tokenString = localStorage.getItem("token");
//     const token = tokenString ? JSON.parse(tokenString) : null;
//     console.log("token available",token);
//         if (token) {
//         headers.Authorization = `Bearer ${token}`;
//     }

//     return axiosInstance({
//         method:`${method}`,
//         url:`${url}`,
//         data:bodyData ||null,
//         headers,
//         params:params ||null,
//          withCredentials: true, 
//     })
// }

import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/+esm";

export const axiosInstance = axios.create({});

export const apiconnector = (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
    // const tokenString = localStorage.getItem("token");
    // const token = tokenString ? JSON.parse(tokenString) : null;
const token = localStorage.getItem("token"); 
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
  }

  return axiosInstance({
    method,
    url,
    data: bodyData || null,
    headers,
    params: params || null,
    withCredentials: true,
  });
};
