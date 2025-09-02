import express from "express";
import {
  addPatient,
  getPatients,
  getPatientById,
  downloadPatients,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", addPatient);

router.get("/", getPatients);

router.get("/download", downloadPatients);

router.get("/:id", getPatientById);

export default router;
