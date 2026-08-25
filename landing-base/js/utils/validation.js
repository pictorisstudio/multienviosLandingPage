const messages = {
  valueMissing: "Este campo es obligatorio.",
  typeMismatch: "Ingresa un valor con el formato correcto.",
  tooShort: "Ingresa más información para continuar.",
  default: "Revisa este campo.",
};

export function getValidationMessage(field) {
  const validity = field.validity;
  if (validity.valueMissing) return messages.valueMissing;
  if (validity.typeMismatch) return messages.typeMismatch;
  if (validity.tooShort) return messages.tooShort;
  return messages.default;
}

export function setFieldError(field, message = "") {
  const error = document.getElementById(`error-${field.name}`);
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) {
    error.textContent = message;
    field.setAttribute("aria-describedby", error.id);
  }
}

export function validateField(field) {
  if (!field.willValidate) return true;
  const isValid = field.checkValidity();
  setFieldError(field, isValid ? "" : getValidationMessage(field));
  return isValid;
}
