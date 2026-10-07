import { submitRegistration } from "./submitRegistration";

/**
 * Universal fallback adapter: forwards any legacy submitLead calls
 * to the backend registration endpoint delivered to register@studygrinder.com
 */
export async function submitLead(lead = {}) {
  try {
    const name = lead.name || "Inquiry Contact";
    const email = lead.email || "";
    const phone = lead.phoneNumber || lead.phone || "Not specified";
    const country = lead.location || lead.country || "Website Lead";
    const course = lead.subject || "General StudyGrinder Advisory";

    return await submitRegistration({
      name,
      email,
      phone,
      country,
      course,
      source: lead.subject ? `Lead: ${lead.subject}` : "Legacy Form",
    });
  } catch (error) {
    console.error("submitLead forward error:", error);
    throw error;
  }
}
