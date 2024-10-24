// import axios from "axios";

// const objUrl = {
//   local: "localhost:8888",
//   edgar: "192.168.100.250:8888",
//   pc: "192.168.137.250:8888",
//   web: "aplicaciones.marianosamaniego.edu.ec",
// };
// const url = objUrl.pc;

// // http://aplicaciones.marianosamaniego.edu.ec/natacion/backend/dataBase

// const instance = axios.create({
//   baseURL: `http://${url}/hotel/backend`,
//   // withCredentials: true
// });

// // baseURL: `http://192.168.137.250:8888/natacion/backend`,



// export const pathPhotos = `http://${url}/hotel/backend/photos`;
// export const pathHomeImages = `http://${url}/hotel/backend/homeimages`;

// export const jwt = () => {
//   return `Bearer ${window.localStorage.getItem("token")}`;
// };
// // export const authorization = {
// //   Authorization: `Bearer ${localStorage.getItem("token")}`,
// // };

// export default instance;

import axios from "axios";

export const urlRequestsApi = {
    local: "localhost:3000",
    edgar: "192.168.137.250:3000",
    edgarPhp: "192.168.100.250:8888/hotel/backendPhp",
    localPhp: "localhost:8888/hotel/backendPhp",
    alumni: "aplicaciones.marianosamaniego.edu.ec/alumniapi",
    urlAcademicSystem: "gaistms.marianosamaniego.edu.ec"
  };
  

const url =  urlRequestsApi.edgar;

const instance = axios.create({
  baseURL: `http://${url}/api`,
  withCredentials: true,
});

export const pathPhotos = `http://${url}/photos/`;

export const jwt = () => {
  return `Bearer ${window.localStorage.getItem("token")}`;
};

export default instance;

