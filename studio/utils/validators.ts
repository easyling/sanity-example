/**
 * Validates an external URL
 * @param url - The URL string to validate
 * @returns true if valid, or an error message string if invalid
 */
export function validateExternalUrl(url: string | undefined): true | string {
  if (!url || url.trim().length === 0) {
    return 'URL is required'
  }

  // Basic URL validation - check if it starts with http:// or https://
  const urlPattern = /^https?:\/\/.+/
  if (!urlPattern.test(url.trim())) {
    return 'URL must start with http:// or https://'
  }

  try {
    // Use URL constructor for additional validation
    new URL(url.trim())
    return true
  } catch {
    return 'Invalid URL format'
  }
}

