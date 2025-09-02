import {
  initExcelFile,
  readPatients,
  writePatient,
  filterPatients,
  generateExcel,
} from "../services/excelService.js";
import { validatePatient } from "../utils/validatePatient.js";


// Ensure Excel file is ready
initExcelFile();

// @desc    Add a new patient
export const addPatient = (req, res) => {
  try {
    const newPatient = req.body;

    // Validate input
    const { isValid, errors } = validatePatient(newPatient);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Save to Excel
    writePatient(newPatient);

    res.status(201).json({
      success: true,
      message: "New patient added successfully",
      data: newPatient,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all patients (with filters)
export const getPatients = (req, res) => {
  try {
    const filters = req.query; // example: ?name=John&place=Hyderabad
    let patients = [];

    if (Object.keys(filters).length > 0) {
      patients = filterPatients(filters);
    } else {
      patients = readPatients();
    }

    res.json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get a single patient by ID (using S.No)
export const getPatientById = (req, res) => {
  try {
    const { id } = req.params;
    const patients = readPatients();
    const patient = patients.find((p) => String(p["S.No"]) === id);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res.json({ success: true, data: patient });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Download all patients as Excel
// @desc    Download patients (all or filtered) as Excel
export const downloadPatients = (req, res) => {
  try {
    const filters = req.query;
    let patients = [];

    if (Object.keys(filters).length > 0) {
      patients = filterPatients(filters);
    } else {
      patients = readPatients();
    }

    // Generate a custom filename
    const fileName =
      Object.keys(filters).length > 0
        ? "filtered_patients.xlsx"
        : "all_patients.xlsx";

    const filePath = generateExcel(patients, fileName);

    res.download(filePath, fileName);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
