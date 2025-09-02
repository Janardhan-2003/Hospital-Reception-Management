export const validatePatient = (data) => {
  const errors = [];

  if (!data.Date) errors.push("Date is required");
  if (!data["IP No"]) errors.push("IP No is required");
  if (!data["S.No"]) errors.push("S.No is required");
  if (!data.Name) errors.push("Name is required");
  if (!data.Age || isNaN(data.Age)) errors.push("Valid Age is required");
  if (!data.Phone || !/^\d{10}$/.test(data.Phone))
    errors.push("Valid 10-digit Phone number is required");
  if (!data.Place) errors.push("Place is required");
  if (!data["Referral Name"]) errors.push("Referral Name is required");
  if (!data["Referral Phone"] || !/^\d{10}$/.test(data["Referral Phone"])) {
    errors.push("Valid 10-digit Referral Phone number is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
