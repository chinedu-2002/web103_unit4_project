export const validateCarSelections = ({ name, convertible, roof }) => {
  if (!name || name.trim() === '') {
    return { valid: false, message: 'Please enter a name for your car.' }
  }

  if (convertible && roof === 'Panoramic') {
    return {
      valid: false,
      message: 'A convertible cannot have a Panoramic roof — an open-top car has no fixed roof to install a panoramic panel!'
    }
  }

  return { valid: true, message: '' }
}
