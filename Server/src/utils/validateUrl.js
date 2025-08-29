import validUrl from "valid-url";

/**
 * Validate and normalize a URL
 * @param {string} url - The URL to validate
 * @returns {string|false} - Normalized URL if valid, false otherwise
 */
export const validateUrl = (url) => {
    // ✅ Check if it's a valid URI
    if (validUrl.isUri(url)) {
        // Ensure it has proper protocol (http/https)
        if (!/^https?:\/\//i.test(url)) {
            url = `http://${url}`;
        }
        return url;
    }
    return false;
};