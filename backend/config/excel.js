import XLSX from "xlsx";
import fs from "fs";
import path from "path";

const filePath = path.resolve("data/patients.xlsx");

// Define consistent headers
const HEADERS = [
  "Date",
  "IP No",
  "S.No",
  "Name",
  "Age",
  "Phone",
  "Place",
  "Referral Name",
  "Referral Phone",
];

// Ensure Excel file exists with headers
export const initExcelFile = () => {
  if (!fs.existsSync(filePath)) {
    const worksheet = XLSX.utils.json_to_sheet([], { header: HEADERS });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
    XLSX.writeFile(workbook, filePath);
  }
};

// Read all patients
export const readPatients = () => {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets["Patients"];
  const data = XLSX.utils.sheet_to_json(worksheet);
  return data;
};

// Write a new patient
export const writePatient = (patientData) => {
  const patients = readPatients();
  patients.push(patientData);

  const worksheet = XLSX.utils.json_to_sheet(patients, { header: HEADERS });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
  XLSX.writeFile(workbook, filePath);
};

// Filter patients by query params
export const filterPatients = (query) => {
  let patients = readPatients();

  if (query.name) {
    patients = patients.filter((p) =>
      p.Name?.toLowerCase().includes(query.name.toLowerCase())
    );
  }
  if (query.place) {
    patients = patients.filter((p) =>
      p.Place?.toLowerCase().includes(query.place.toLowerCase())
    );
  }
  if (query.referralName) {
    patients = patients.filter((p) =>
      p["Referral Name"]?.toLowerCase().includes(query.referralName.toLowerCase())
    );
  }
  if (query.date) {
    patients = patients.filter((p) => p.Date === query.date);
  }

  return patients;
};

// Generate Excel file from data (used for download)
export const generateExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data, { header: HEADERS });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

  const filePathDownload = path.resolve(`data/${fileName}`);
  XLSX.writeFile(workbook, filePathDownload);

  return filePathDownload;
};
