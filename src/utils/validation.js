export const validateStudentForm = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  
  if (!formData.name || !formData.name.trim()) {
    errors.name = "Full name is required.";
  } else if (formData.name.trim().length < 3) {
    errors.name = "Full name must be at least 3 characters.";
  }
  
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phoneRegex.test(formData.phone.trim())) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }
  
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const ageLimitDate = new Date();
    ageLimitDate.setFullYear(ageLimitDate.getFullYear() - 15); // must be 15+
    const dobDate = new Date(formData.dateOfBirth);
    if (dobDate > ageLimitDate) {
      errors.dateOfBirth = "Students must be at least 15 years old.";
    }
  }

  if (!formData.department) {
    errors.department = "Department is required.";
  }
  
  if (!formData.year) {
    errors.year = "Academic year is required.";
  } else {
    const yearVal = parseInt(formData.year);
    if (isNaN(yearVal) || yearVal < 1 || yearVal > 4) {
      errors.year = "Academic year must be between 1 and 4.";
    }
  }

  const gpaVal = parseFloat(formData.gpa);
  if (formData.gpa === '' || isNaN(gpaVal)) {
    errors.gpa = "GPA score is required.";
  } else if (gpaVal < 0 || gpaVal > 4.0) {
    errors.gpa = "GPA must be between 0.00 and 4.00.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
export default validateStudentForm;
