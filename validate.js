const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate({ name, email, password }) {
  const errors = {};

  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 50) {
    errors.name = "Name must be 2-50 characters.";
  }

  if (!EMAIL_RE.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (password) {
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    if (password.length < 8 || !hasNumber || !hasLetter) {
      errors.password =
        "Password must be at least 8 characters and include a letter and a number.";
    }
  }

  return errors;
}
