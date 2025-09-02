import express from "express";
import cors from "cors";
import morgan from "morgan";
import patientRoutes from "./routes/patientRoutes.js";
import { initExcelFile } from "./config/excel.js"; // ✅ new import

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

initExcelFile();

app.use("/api/patients", patientRoutes);

app.get("/", (req, res) => {
  res.send("Hospital Reception Management Backend is running 🚑");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
