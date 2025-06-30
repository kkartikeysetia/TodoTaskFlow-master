import {
  validateUser,
  handleVerification,
  checkAndRedirectUser,
} from "./modules/auth.js";

// Immediately check if user is already verified on page load.
checkAndRedirectUser();

// --- DOM Elements ---
const form = document.getElementById("age-verification-form");
const nameInput = document.getElementById("name");
const dobInput = document.getElementById("dob");

/**
 * Displays validation errors in the UI.
 * @param {object} errors - An object containing error messages for form fields.
 */
function displayErrors(errors) {
  // Clear previous errors first
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  if (errors.name) {
    nameInput.nextElementSibling.textContent = errors.name;
  }
  if (errors.dob) {
    // Find the error message span for the date of birth input
    const dobErrorSpan =
      dobInput.closest(".input-with-icon").nextElementSibling;
    if (dobErrorSpan && dobErrorSpan.classList.contains("error-message")) {
      dobErrorSpan.textContent = errors.dob;
    }
  }
}

/**
 * Handles form submission.
 * @param {Event} event - The form submission event.
 */
function onFormSubmit(event) {
  event.preventDefault(); // Prevent default browser submission

  const name = nameInput.value;
  const dob = dobInput.value;

  const { isValid, errors } = validateUser(name, dob);

  if (isValid) {
    handleVerification(name, dob);
  } else {
    displayErrors(errors);
  }
}

// --- Event Listeners ---
form.addEventListener("submit", onFormSubmit);
