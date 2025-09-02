import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPatients = async (filters = {}) => {
  const response = await api.get("/patients", { params: filters });
  return response.data;
};

export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const addPatient = async (patientData) => {
  const response = await api.post("/patients", patientData);
  return response.data;
};

export const downloadPatients = async (filters = {}) => {
  const response = await api.get("/patients/download", {
    params: filters,
    responseType: "blob", 
  });
  return response;
};

export default api;
