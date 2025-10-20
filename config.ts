/**
 * ===================================================================
 *               API Key Configuration for Local Development
 * ===================================================================
 *
 * To use the AI Trip Planner on your local server, you need to provide your
 * own Google AI Studio API key.
 *
 * 1. Obtain your API key from Google AI Studio: https://aistudio.google.com/app/apikey
 * 2. Replace the placeholder text "YOUR_API_KEY_HERE" below with your actual API key.
 *
 * Example:
 * const USER_API_KEY = "AbCdEfGhIjKlMnOpQrStUvWxYz123456789";
 *
 * IMPORTANT: Do NOT commit this file with your API key to a public repository.
 * We recommend using a local environment variable solution for production projects.
 *
 */
const USER_API_KEY = "YOUR_API_KEY_HERE";

/**
 * Returns the available API key.
 * It prioritizes the environment variable (used in AI Studio) and falls
 * back to the user-defined key for local development.
 * @returns {string | undefined} The API key, or undefined if not found.
 */
export const getApiKey = (): string | undefined => {
  // In the AI Studio environment, process.env.API_KEY is automatically provided.
  if (process.env.API_KEY) {
    return process.env.API_KEY;
  }
  
  // For local development, we use the key defined in this file.
  if (USER_API_KEY && USER_API_KEY !== "YOUR_API_KEY_HERE") {
    return USER_API_KEY;
  }

  return undefined;
};
