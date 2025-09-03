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

export const addPatient = (req, res) => {
  try {
    console.log('Received patient data:', req.body);
    
    // Normalize the data to handle both frontend (Excel names) and backend (lowercase) formats
    const normalizedPatient = {
      date: req.body.Date || req.body.date || new Date().toISOString().split('T')[0],
      ipNo: req.body["IP No"] || req.body.ipNo || '',
      sNo: req.body["S.No"] || req.body.sNo || '',
      name: req.body.Name || req.body.name || '',
      age: req.body.Age || req.body.age || '',
      phone: req.body.Phone || req.body.phone || '', // OPTIONAL
      place: req.body.Place || req.body.place || '',
      referralName: req.body["Referral Name"] || req.body.referralName || '', // NOW REQUIRED
      referralPhone: req.body["Referral Phone"] || req.body.referralPhone || '' // OPTIONAL
    };

    console.log('Normalized patient data:', normalizedPatient);

    // Validate input
    const { isValid, errors } = validatePatient(normalizedPatient);
    if (!isValid) {
      console.log('Validation errors:', errors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // Save to Excel (pass the original req.body since writePatient expects Excel format)
    writePatient(req.body);

    res.status(201).json({
      success: true,
      message: "New patient added successfully",
      data: req.body,
    });
  } catch (err) {
    console.error('Error in addPatient:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get all patients (with filters)
export const getPatients = (req, res) => {
  try {
    const filters = req.query;
    console.log("=== DEBUG: Received filters ===");
    console.log(filters);
    console.log("Filter keys:", Object.keys(filters));
    
    let patients = [];

    if (Object.keys(filters).length > 0) {
      console.log("Applying filters...");
      patients = filterPatients(filters);
      console.log(`Found ${patients.length} patients after filtering`);
    } else {
      console.log("No filters, returning all patients");
      patients = readPatients();
    }

    res.json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (err) {
    console.error("Error in getPatients:", err);
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
