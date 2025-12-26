// Define regex patterns at the top level for better performance
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOWERCASE_REGEX = /[a-z]/;
const UPPERCASE_REGEX = /[A-Z]/;
const DIGIT_REGEX = /\d/;
const SPECIAL_CHAR_REGEX = /[^a-zA-Z\d]/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password: string, minLength = 6): boolean => {
  return password.length >= minLength;
};

export const checkPasswordStrength = (
  password: string
): {
  score: number;
  feedback: string[];
} => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Password should be at least 8 characters long");
  }

  if (LOWERCASE_REGEX.test(password) && UPPERCASE_REGEX.test(password)) {
    score += 1;
  } else {
    feedback.push(
      "Password should contain both uppercase and lowercase letters"
    );
  }

  if (DIGIT_REGEX.test(password)) {
    score += 1;
  } else {
    feedback.push("Password should contain at least one number");
  }

  if (SPECIAL_CHAR_REGEX.test(password)) {
    score += 1;
  } else {
    feedback.push("Password should contain at least one special character");
  }

  return { score, feedback };
};

export const sanitizeUser = <T extends { password?: string }>(
  user: T
): Omit<T, "password"> => {
  const { password: _password, ...sanitized } = user;
  return sanitized;
};
