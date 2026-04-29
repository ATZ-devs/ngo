/**
 * PAN (Permanent Account Number) validation utilities
 * 
 * PAN format: AAAPL5055K (10 characters)
 * - 5 alphabetic characters
 * - 4 numeric digits
 * - 1 alphabetic character
 */

/**
 * Validates Indian PAN format
 * 
 * @param pan - The PAN string to validate
 * @returns true if valid PAN format, false otherwise
 */
export function isValidPanFormat(pan: string | null | undefined): boolean {
  if (!pan || typeof pan !== "string") {
    return false;
  }

  // Remove whitespace and convert to uppercase
  const cleanPan = pan.trim().toUpperCase();

  // PAN must be exactly 10 characters
  if (cleanPan.length !== 10) {
    return false;
  }

  // PAN pattern: 5 letters, 4 digits, 1 letter
  // Example: AAAPL5055K
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  return panRegex.test(cleanPan);
}

/**
 * Normalizes PAN string (trim, uppercase)
 * 
 * @param pan - Raw PAN input
 * @returns Normalized PAN or null if invalid
 */
export function normalizePan(pan: string | null | undefined): string | null {
  if (!pan || typeof pan !== "string") {
    return null;
  }

  const normalized = pan.trim().toUpperCase();

  if (isValidPanFormat(normalized)) {
    return normalized;
  }

  return null;
}

/**
 * Check if donor should receive 80G certificate
 * 
 * @param pan - PAN number (can be null/undefined)
 * @returns true if valid PAN is provided
 */
export function shouldInclude80GCertificate(pan: string | null | undefined): boolean {
  return isValidPanFormat(pan);
}
