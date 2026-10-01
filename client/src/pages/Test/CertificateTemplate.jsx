import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Logo from "../../assets/Study_Grinder_Logo.jpg.jpeg";

const CertificateTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, courseName, subTopic, certificateId } =
    location.state || {};
  const certificateRef = useRef();

  if (!username || !courseName || !subTopic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Certificate Not Available
          </h2>
          <p className="text-gray-600 mb-4">
            Missing certificate details. Please complete a test first.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadPDF = () => {
    const options = {
      margin: 0,
      filename: `${courseName}_${subTopic}_Certificate.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };
    html2pdf().from(certificateRef.current).set(options).save();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Great+Vibes&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </button>
        <h1 className="font-bold text-gray-800">Your Certificate</h1>
        <div />
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT — Certificate */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-xl p-4">
            {/* ===== HTML CERTIFICATE ===== */}
            <div
              ref={certificateRef}
              style={{
                width: "100%",
                aspectRatio: "1.414 / 1",
                background: "linear-gradient(135deg, #fdfcfb 0%, #f9f7f4 100%)",
                border: "8px solid #1a1a5e",
                borderRadius: "4px",
                position: "relative",
                overflow: "hidden",
                padding: "5% 8%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              {/* Gold inner border */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  right: "12px",
                  bottom: "12px",
                  border: "2px solid #c9a84c",
                  borderRadius: "2px",
                  pointerEvents: "none",
                }}
              />

              {/* Corner decorations */}
              <div style={{ position: "absolute", top: "8px", left: "8px", width: "60px", height: "60px", borderTop: "4px solid #c9a84c", borderLeft: "4px solid #c9a84c" }} />
              <div style={{ position: "absolute", top: "8px", right: "8px", width: "60px", height: "60px", borderTop: "4px solid #c9a84c", borderRight: "4px solid #c9a84c" }} />
              <div style={{ position: "absolute", bottom: "8px", left: "8px", width: "60px", height: "60px", borderBottom: "4px solid #c9a84c", borderLeft: "4px solid #c9a84c" }} />
              <div style={{ position: "absolute", bottom: "8px", right: "8px", width: "60px", height: "60px", borderBottom: "4px solid #c9a84c", borderRight: "4px solid #c9a84c" }} />

              {/* TOP: Logo */}
              <div style={{ textAlign: "center", zIndex: 1 }}>
                <img src={Logo} alt="StudyGrinder" style={{ height: "50px", marginBottom: "4px" }} />
                <p style={{ fontSize: "10px", color: "#666", letterSpacing: "2px", textTransform: "uppercase" }}>
                  ISO/IEC 27001:2022
                </p>
              </div>

              {/* TITLE */}
              <div style={{ textAlign: "center", zIndex: 1, marginTop: "-8px" }}>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: "700",
                    color: "#1a1a5e",
                    margin: "0",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  Certificate
                </h1>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    fontWeight: "400",
                    color: "#333",
                    margin: "4px 0 0",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  of Achievement
                </p>
              </div>

              {/* PRESENTED TO */}
              <div style={{ textAlign: "center", zIndex: 1, marginTop: "-8px" }}>
                <p
                  style={{
                    fontSize: "clamp(10px, 1.2vw, 14px)",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                    marginBottom: "8px",
                  }}
                >
                  This Certificate is Presented to
                </p>

                {/* NAME BLOCK */}
                <div
                  style={{
                    borderBottom: "2px solid #c9a84c",
                    paddingBottom: "8px",
                    display: "inline-block",
                    minWidth: "300px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(24px, 3.5vw, 44px)",
                      fontWeight: "600",
                      color: "#1a1a2e",
                      margin: "0",
                      letterSpacing: "1px",
                    }}
                  >
                    {username}
                  </h2>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div style={{ textAlign: "center", zIndex: 1, maxWidth: "80%", marginTop: "-4px" }}>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(10px, 1.3vw, 15px)",
                    color: "#444",
                    lineHeight: "1.6",
                    margin: "0",
                  }}
                >
                  For successfully completing the{" "}
                  <strong style={{ color: "#1a1a5e" }}>{subTopic}</strong>{" "}
                  assessment under{" "}
                  <strong style={{ color: "#1a1a5e" }}>{courseName}</strong>{" "}
                  from Armx-Indecodex on {today}.
                </p>
              </div>

              {/* BOTTOM: Date + Seal + Signature */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  width: "100%",
                  zIndex: 1,
                  marginTop: "-4px",
                  position: "relative",
                }}
              >
                {/* Date (left) */}
                <div style={{ textAlign: "center", flex: "0 0 160px" }}>
                  <p style={{ fontSize: "12px", color: "#666", borderTop: "1px solid #999", paddingTop: "4px", minWidth: "120px", margin: "0" }}>
                    {today}
                  </p>
                  <p style={{ fontSize: "10px", color: "#999", margin: "2px 0 0" }}>Date</p>
                </div>

                {/* Spacer for seal */}
                <div style={{ flex: "1" }} />

                {/* Director + Signature (right) */}
                <div style={{ textAlign: "center", flex: "0 0 160px" }}>
                  {/* Cursive signature */}
                  <p
                    style={{
                      fontFamily: "'Great Vibes', cursive",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      color: "#1a1a2e",
                      margin: "0 0 2px",
                      lineHeight: "1",
                    }}
                  >
                    Parichay Singh
                  </p>
                  <p style={{ fontSize: "12px", color: "#333", fontWeight: "600", borderTop: "1px solid #999", paddingTop: "4px", minWidth: "120px", margin: "0" }}>
                    Parichay Singh
                  </p>
                  <p style={{ fontSize: "10px", color: "#999", margin: "2px 0 0" }}>Director</p>
                </div>
              </div>

              {/* Seal / Stamp — fixed position, bottom center, no overlap */}
              <div
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    border: "3px solid #c9a84c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #fdf6d8 0%, #c9a84c 100%)",
                    boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "7px", fontWeight: "bold", color: "#1a1a5e", letterSpacing: "1px", display: "block" }}>
                      ★ Armx-Indecodex ★
                    </span>
                    <span style={{ fontSize: "9px", fontWeight: "900", color: "#1a1a5e", display: "block", margin: "1px 0" }}>
                      VERIFIED
                    </span>
                    <span style={{ fontSize: "6px", color: "#1a1a5e", display: "block", letterSpacing: "0.5px" }}>
                      TECHNOLOGY
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate ID — bottom right */}
              <p style={{ fontSize: "8px", color: "#aaa", position: "absolute", bottom: "16px", right: "20px", fontFamily: "monospace" }}>
                ID: {certificateId}
              </p>
            </div>
            {/* ===== END CERTIFICATE ===== */}
          </div>

          {/* Verification Text */}
          <div className="mt-4 bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              This certificate verifies that{" "}
              <strong>{username}</strong> successfully completed the{" "}
              <strong>{subTopic}</strong> assessment under{" "}
              <strong>{courseName}</strong> from{" "}
              <strong>Armx-Indecodex</strong> on{" "}
              <strong>{today}</strong>.
            </p>
          </div>
        </div>

        {/* RIGHT — Sidebar */}
        <div>
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-sm font-bold text-gray-500 uppercase mb-3">
              Recipient
            </h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
              <p className="text-lg font-bold">{username}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-sm font-bold text-gray-500 uppercase mb-3">
              Course Details
            </h2>
            <p className="text-sm font-semibold mb-1">{subTopic}</p>
            <p className="text-sm text-gray-600">Course: {courseName}</p>
            <p className="text-sm text-gray-600">Date: {today}</p>
            <p className="text-xs font-mono mt-2 text-gray-500">
              {certificateId}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <button
              onClick={downloadPDF}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              ⬇ Download Certificate
            </button>
            <button
              onClick={() => {
                const url = `${window.location.origin}/verify-certificate?id=${certificateId}`;
                navigator.clipboard.writeText(url);
                alert("Certificate link copied!");
              }}
              className="w-full border border-gray-300 py-3 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              🔗 Share Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;
