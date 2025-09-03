// utils/validatePatient.js

export const validatePatient = (patient) => {
  const errors = {};

  // Helper function to get field value (handles both frontend and backend field names)
  const getFieldValue = (frontendKey, backendKey) => {
    return patient[frontendKey] || patient[backendKey] || '';
  };

  // Required fields validation
  const name = getFieldValue('Name', 'name');
  if (!name || !name.trim()) {
    errors.name = "Name is required";
  }

  const age = getFieldValue('Age', 'age');
  if (!age) {
    errors.age = "Age is required";
  } else if (isNaN(age) || age <= 0) {
    errors.age = "Age must be a positive number";
  }

  const place = getFieldValue('Place', 'place');
  if (!place || !place.trim()) {
    errors.place = "Place is required";
  }

  const date = getFieldValue('Date', 'date');
  if (!date) {
    errors.date = "Date is required";
  }

  const ipNo = getFieldValue('IP No', 'ipNo');
  if (!ipNo || !ipNo.trim()) {
    errors.ipNo = "IP No is required";
  }

  const sNo = getFieldValue('S.No', 'sNo');
  if (!sNo || !sNo.trim()) {
    errors.sNo = "S.No is required";
  }

  // Referral Name is now REQUIRED
  const referralName = getFieldValue('Referral Name', 'referralName');
  if (!referralName || !referralName.trim()) {
    errors.referralName = "Referral Name is required";
  }

  // ONLY PHONES are optional - validate format if provided
  const phone = getFieldValue('Phone', 'phone');
  if (phone && phone.trim()) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
      errors.phone = "Phone must be a valid 10-digit number";
    }
  }

  const referralPhone = getFieldValue('Referral Phone', 'referralPhone');
  if (referralPhone && referralPhone.trim()) {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(referralPhone.replace(/\s+/g, ""))) {
      errors.referralPhone = "Referral phone must be a valid 10-digit number";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};