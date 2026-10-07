import { API_ENDPOINTS } from "../config/api";

/**
 * Submits the single website registration form to the backend.
 * Delivery destination: register@studygrinder.com via Hostinger SMTP.
 *
 * @param {Object} payload
 * @param {string} payload.name - Student's full name (Required)
 * @param {string} payload.email - Student's email (Required)
 * @param {string} payload.phone - Phone number (Required)
 * @param {string} payload.country - Country (Required)
 * @param {string} [payload.countryCode] - Optional country dial code
 * @param {string} [payload.linkedinUrl] - Optional LinkedIn URL
 * @param {string} payload.course - Target course/certification (Required)
 * @param {string} [payload.courseCode] - Optional course/exam code
 * @param {string} [payload.telegram] - Optional Telegram handle
 * @param {string} [payload.source] - Optional tracking source (e.g. "Navbar CTA")
 */
export async function submitRegistration(payload) {
  try {
    const endpoint = API_ENDPOINTS.REGISTRATION || "/registration";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Submission failed with status ${response.status}. Please try again.`
      );
    }

    return {
      success: true,
      message:
        data.message ||
        "Registration submitted successfully! We will contact you soon.",
    };
  } catch (error) {
    console.error("Registration submission error:", error);
    throw new Error(
      error.message ||
        "Failed to submit registration. Please contact register@studygrinder.com directly."
    );
  }
}
