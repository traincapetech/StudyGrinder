import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

const CertificateForm = () => {
  const [form, setForm] = useState({
    certificateId: "",
    fullName: "",
    courseName: "",        // ✅ was `course`
    issueDate: "",         // ✅ was `dateOfCompletion`
    instructor: "",        // (can remove if not needed by backend)
    issuedBy: "",
    organization: "",      // (can remove if not needed by backend)
    certificateURL: "",    // optional
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Helper function to format date for backend
  const formatDateForBackend = (dateString) => {
    if (!dateString) return "";

    // If it's already in YYYY-MM-DD format (from date input), convert to DD/MM/YYYY
    const dateObj = new Date(dateString);
    if (!isNaN(dateObj.getTime())) {
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return dateString; // Return as-is if not a valid date
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['certificateId', 'fullName', 'courseName', 'issueDate', 'issuedBy'];
    const missingFields = requiredFields.filter(field => !form[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        certificateId: form.certificateId,
        fullName: form.fullName,
        courseName: form.courseName,
        issueDate: formatDateForBackend(form.issueDate),
        issuedBy: form.issuedBy,
        certificateURL: form.certificateURL || ""
      };

      console.log("Sending payload:", payload); // Debug log

      // Use API_BASE_URL to hit the configured backend
      const response = await axios.post(`${API_BASE_URL}/certificates`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        timeout: 30000, // 30 second timeout
        withCredentials: false // Disable sending cookies
      });

      console.log("Response:", response.data); // Debug log

      if (response.data.success) {
        alert("✅ Certificate saved successfully!");

        // Reset form
        setForm({
          certificateId: "",
          fullName: "",
          courseName: "",
          issueDate: "",
          instructor: "",
          issuedBy: "",
          organization: "",
          certificateURL: "",
        });
      } else {
        throw new Error(response.data.message || "Unknown error from server");
      }
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      console.error("Error request:", err.request);
      console.error("Error message:", err.message);

      let errorMessage = "Unknown error occurred";

      if (err.response) {
        // Server responded with error status
        console.error("Server error response:", err.response.data);
        errorMessage = err.response.data?.message || `Server error: ${err.response.status} ${err.response.statusText}`;
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response received:", err.request);
        errorMessage = "No response from server. Please check your internet connection.";
      } else {
        // Something else happened
        errorMessage = err.message || "Request setup error";
      }

      alert("❌ Error saving certificate: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold">Add Certificate</h2>

        <input
          name="certificateId"
          placeholder="Certificate ID"
          className="w-full p-2 border border-gray-300 rounded"
          value={form.certificateId}
          onChange={handleChange}
          required
        />

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          name="courseName"
          placeholder="Course Name"
          className="w-full p-2 border border-gray-300 rounded"
          value={form.courseName}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date
          </label>
          <input
            type="date"
            name="issueDate"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.issueDate}
            onChange={handleChange}
            required
          />
        </div>

        <input
          name="issuedBy"
          placeholder="Issued By"
          className="w-full p-2 border border-gray-300 rounded"
          value={form.issuedBy}
          onChange={handleChange}
          required
        />

        <input
          name="certificateURL"
          placeholder="Certificate URL (optional)"
          type="url"
          className="w-full p-2 border border-gray-300 rounded"
          value={form.certificateURL}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded text-white font-medium ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {loading ? 'Saving...' : 'Save Certificate'}
        </button>
      </form>

      {/* Debug Information */}
      <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <p><strong>API Endpoint:</strong> {API_BASE_URL}/certificates</p>
        <p><strong>Current Form Data:</strong></p>
        <pre className="bg-white p-2 rounded mt-1 text-xs overflow-auto">
          {JSON.stringify(form, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default CertificateForm;
