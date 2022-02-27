/* eslint-disable no-fallthrough */
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const $api = async ({ url, type = "GET", body, auth = true }) => {
  if (auth) {
    const token = localStorage.getItem("token");
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  let data;
  try {
    switch (type) {
      case "GET":
        data = await instance.get(url);
        break;

      case "POST":
        data = await instance.post(url, body);
        break;
      case "PUT":
        data = await instance.put(url, body);
        break;
      case "DELETE":
        data = await instance.delete(url);
        break;
      default:
        return data;
    }
    return data.data;
  } catch (error) {
    throw error.response && error.response.data ? error.response.data.message : error.message;
  }
};
