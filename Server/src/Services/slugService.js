import { customAlphabet } from "nanoid";

/**
 * Generate a random short slug (default: 6 characters).
 * Example: "aB3xYz"
 */
export const generateRandomSlug = (length = 6) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
};

/**
 * Generate a slug from a given title or keyword
 * Example: "My Portfolio Site" -> "my-portfolio-site"
 */

export const generateSlugFromText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars with "-"
    .replace(/^-+|-+$/g, "");   // trim "-" from start/end
};
