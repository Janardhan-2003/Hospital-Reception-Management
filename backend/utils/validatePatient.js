// utils/validatePatient.js
export const validatePatient = (patient) => {
  const errors = [];
  const requiredFields = [
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

  requiredFields.forEach((field) => {
    if (!patient[field] || patient[field].toString().trim() === "") {
      errors.push(`${field} is required`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
