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

  if (!formData.class) {
    errors.class = "Class is required.";
  }
  
  if (!formData.section) {
    errors.section = "Section is required.";
  }

  const rollVal = parseInt(formData.rollNo);
  if (formData.rollNo === '' || isNaN(rollVal)) {
    errors.rollNo = "Roll Number is required.";
  } else if (rollVal <= 0) {
    errors.rollNo = "Roll Number must be a positive integer.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
export default validateStudentForm;
