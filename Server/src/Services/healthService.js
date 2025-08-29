// services/healthService.js
import fetch from "node-fetch"

/**
 * Check the health of a URL (alive, dead, or timeout).
 * @param {string} url - The URL to check
 * @returns {Promise<{status: string, code: number|null}>}
 */
export const checkLinkHealth = async (url) => {
  try {
    const response = await fetch(url, {
      method: "HEAD", // lightweight check
      redirect: "follow",
      timeout: 5000, // 5 sec timeout
    });

    // If response is in 200–399 range → Alive
    if (response.ok) {
      return { status: "alive", code: response.status };
    }

    // Otherwise → Dead
    return { status: "dead", code: response.status };
  } catch (error) {
    // Timeout or DNS error
    return { status: "unreachable", code: null };
  }
};
