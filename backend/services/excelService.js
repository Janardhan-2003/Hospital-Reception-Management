import XLSX from "xlsx";
import fs from "fs";
import path from "path";

const filePath = path.resolve("data/patients.xlsx");

// Ensure Excel file exists with headers
export const initExcelFile = () => {
  if (!fs.existsSync(filePath)) {
    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, [
      [
        "Date",
        "IP No",
        "S.No",
        "Name",
        "Age",
        "Phone",
        "Place",
        "Referral Name",
        "Referral Phone",
      ],
    ]);
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
  
  // Ensure all required fields exist, set empty string for missing optional fields
  const normalizedPatient = {
    "Date": patientData.Date || patientData.date || '',
    "IP No": patientData["IP No"] || patientData.ipNo || '',
    "S.No": patientData["S.No"] || patientData.sNo || '',
    "Name": patientData.Name || patientData.name || '',
    "Age": patientData.Age || patientData.age || '',
    "Phone": patientData.Phone || patientData.phone || '', // Optional - will be empty string if not provided
    "Place": patientData.Place || patientData.place || '',
    "Referral Name": patientData["Referral Name"] || patientData.referralName || '',
    "Referral Phone": patientData["Referral Phone"] || patientData.referralPhone || '', // Optional
  };
  
  patients.push(normalizedPatient);

  const worksheet = XLSX.utils.json_to_sheet(patients, {
    header: [
      "Date",
      "IP No",
      "S.No",
      "Name",
      "Age",
      "Phone",
      "Place",
      "Referral Name",
      "Referral Phone",
    ],
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");
  XLSX.writeFile(workbook, filePath);
};

// Filter patients by query params (UPDATED WITH ALL FILTERS)
export const filterPatients = (query) => {
  let patients = readPatients();

  // Filter by Name
  if (query.name) {
    patients = patients.filter(
      (p) => p.Name && p.Name.toLowerCase().includes(query.name.toLowerCase())
    );
  }

  // Filter by Place
  if (query.place) {
    patients = patients.filter(
      (p) =>
        p.Place && p.Place.toLowerCase().includes(query.place.toLowerCase())
    );
  }

  // Filter by Referral Name
  if (query.referralName) {
    patients = patients.filter(
      (p) =>
        p["Referral Name"] &&
        p["Referral Name"]
          .toLowerCase()
          .includes(query.referralName.toLowerCase())
    );
  }

  // Filter by Date
  if (query.date) {
    patients = patients.filter((p) => p.Date === query.date);
  }

  // Filter by IP No (NEW)
  if (query.ipNo) {
    patients = patients.filter(
      (p) =>
        p["IP No"] && 
        p["IP No"].toString().toLowerCase().includes(query.ipNo.toLowerCase())
    );
  }

  // Filter by S.No (NEW)
  if (query.sNo) {
    patients = patients.filter(
      (p) =>
        p["S.No"] && 
        p["S.No"].toString().toLowerCase().includes(query.sNo.toLowerCase())
    );
  }

  // Filter by Age (NEW)
  if (query.age) {
    patients = patients.filter(
      (p) => p.Age && p.Age.toString() === query.age.toString()
    );
  }

  return patients;
};

// Generate Excel file from data (used for download)
export const generateExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

  const filePathDownload = path.resolve(`data/${fileName}`);
  XLSX.writeFile(workbook, filePathDownload);

  return filePathDownload;
};