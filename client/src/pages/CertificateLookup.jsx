import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Confetti from "react-confetti";

const CertificateLookup = () => {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const certRef = useRef();

  const handleVerify = async () => {
    setError("");
    setCertificate(null);
    setShowConfetti(false);
    if (!certificateId.trim()) {
      setError("Please enter a valid Certificate ID.");
      return;
    }

    try {
      const res = await axios.get(
        `${API_BASE_URL}/certificates/${certificateId}`
      );
      if (res.data && res.data.success) {
        setCertificate(res.data.data);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        setError("Certificate not found.");
      }
    } catch (err) {
      console.error("Certificate verification error:", err);
      setError("Certificate not found.");
    }
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(certRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`certificate-${certificateId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4 relative">
      {showConfetti && <Confetti />}
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 md:p-10">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center flex items-center justify-center gap-2">
          <span>🎓</span> Verify Certificate
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="flex-grow px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-lg"
          />
          <button
            onClick={handleVerify}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition"
          >
            Verify
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-300">
            ❌ {error}
          </div>
        )}

        <AnimatePresence>
          {certificate && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6 }}
              className="mt-8 bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4"
              ref={certRef}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">Certificate Details</h3>
                <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full animate-pulse">
                  ✅ Verified
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-md">
                <div><strong>Name:</strong> {certificate.fullName}</div>
                <div><strong>Certificate ID:</strong> {certificate.certificateId}</div>
                <div><strong>Issued By:</strong> {certificate.issuedBy}</div>
                <div><strong>Course:</strong> {certificate.courseName}</div>
                <div><strong>Issue Date:</strong> {new Date(certificate.issueDate).toLocaleDateString()}</div>
              </div>
              <div className="text-right">
                <button
                  onClick={handleDownload}
                  className="mt-4 px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                  📄 Download PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CertificateLookup;
