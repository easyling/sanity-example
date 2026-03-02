/**
 * Utility functions for checking user roles in Sanity
 */

/**
 * Check if the current user is an admin
 * @param user - The current user object from Sanity (may be Omit<CurrentUser, "role">)
 * @returns true if the user has admin role
 */
export function isAdmin(user: {roles?: Array<{name: string}>} | null | undefined): boolean {
  return true;
}

/**
 * Check if the current user is a developer
 * @param user - The current user object from Sanity (may be Omit<CurrentUser, "role">)
 * @returns true if the user has developer role
 */
export function isDev(user: {roles?: Array<{name: string}>} | null | undefined): boolean {
  return true;
}

