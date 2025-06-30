import { saveUser, getUser } from './storage.js';

const MIN_AGE = 10;

/**
 * Calculates age based on a date of birth string (YYYY-MM-DD).
 * @param {string} dobString - The date of birth.
 * @returns {number} The calculated age in years.
 */
function calculateAge(dobString) {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

/**
 * Validates the user's age and name.
 * @param {string} name - The user's name.
 * @param {string} dob - The user's date of birth.
 * @returns {{isValid: boolean, errors: {name?: string, dob?: string}}} Validation result.
 */
export function validateUser(name, dob) {
    const errors = {};
    if (!name.trim()) {
        errors.name = 'Name is required.';
    }

    if (!dob) {
        errors.dob = 'Date of birth is required.';
    } else {
        const age = calculateAge(dob);
        if (age < MIN_AGE) {
            errors.dob = `You must be at least ${MIN_AGE} years old to use this application.`;
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}

/**
 * Handles the user verification process.
 * @param {string} name - The user's name.
 * @param {string} dob - The user's date of birth.
 */
export function handleVerification(name, dob) {
    const user = { name, dob, verifiedAt: new Date().toISOString() };
    saveUser(user);
    window.location.href = '/app.html';
}

/**
 * Checks if a user is already verified and redirects them.
 */
export function checkAndRedirectUser() {
    const user = getUser();
    if (user && user.name && user.dob) {
        // Optional: Re-validate age in case they've become too young since last visit (unlikely but robust)
        const age = calculateAge(user.dob);
        if (age >= MIN_AGE) {
            console.log('User already verified. Redirecting...');
            window.location.href = '/app.html';
        }
    }
}