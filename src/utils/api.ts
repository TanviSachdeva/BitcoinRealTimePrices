import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://bitcoinaverage-global-ethereum-index-v1.p.rapidapi.com/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "fe72ff4e1fmshc28cf735c99b480p115246jsnbe14af1ce05e",
    "X-RapidAPI-Host": "bitcoinaverage-global-ethereum-index-v1.p.rapidapi.com",
  },
});

axiosClient.interceptors.request.use((req) => {
  return req;
});

axiosClient.interceptors.response.use((res) => {
  return res;
});

export default {

  getData: (getUrl:any) =>
  axiosClient({
      method: "GET",
      url: getUrl
    }),
};