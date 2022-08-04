import axios from "axios";

export function getUsers() {
  return axios.get("/api/jobview/get_users").then((res) => {
    return res.data;
  });
}

export function getProduction() {
  return axios.get("/api/jobview/get_production").then((res) => {
    return res.data;
  });
}

export function getErrorLogs() {
  return axios.get("/api/jobview/get_errorlogs").then((res) => {
    return res.data;
  });
}
