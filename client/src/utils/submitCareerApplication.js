import API_BASE_URL from "../config/api";

export async function submitCareerApplication(application) {
  try {
    const endpoint = `${API_BASE_URL}/contact/career-application`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(application),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Submission failed with status ${response.status}`);
    }

    return {
      success: true,
      message: data.message || "Application submitted successfully!",
    };
  } catch (error) {
    console.error("Career application submission error:", error);
    throw new Error(
      error.message || "Failed to submit application. Please contact register@studygrinder.com directly."
    );
  }
}
