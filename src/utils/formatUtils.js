// Function to format number with spaces (e.g., 1000 -> 1 000)
export const formatNumberWithSpaces = (value) => {
  if (!value) return '';
  
  // Remove all non-digit characters
  const digits = value.toString().replace(/\D/g, '');
  
  // Format with spaces
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Function to parse formatted number back to float
export const parseFormattedNumber = (value) => {
  if (!value) return 0;
  
  // Remove all spaces and convert to float
  return parseFloat(value.replace(/\s/g, '')) || 0;
};