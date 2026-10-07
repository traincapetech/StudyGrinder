import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Send,
  BookOpen,
  Hash,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { submitRegistration } from "../utils/submitRegistration";

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export default function RegistrationForm({
  prefillCourse = "",
  prefillCourseCode = "",
  source = "Website Form",
  onSuccess,
  inModal = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    countryCode: "+1",
    email: "",
    country: "",
    linkedinUrl: "",
    course: prefillCourse || "",
    courseCode: prefillCourseCode || "",
    telegram: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const email = formData.email.trim();
    const country = formData.country.trim();
    const course = formData.course.trim();

    if (name.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!phone || phone.replace(/[^\d]/g, "").length < 5) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    if (!country) {
      toast.error("Please enter your country.");
      return;
    }
    if (!course) {
      toast.error("Please enter the course or certification name.");
      return;
    }

    setLoading(true);
    try {
      await submitRegistration({
        name,
        phone,
        countryCode: formData.countryCode.trim(),
        email,
        country,
        linkedinUrl: formData.linkedinUrl.trim(),
        course,
        courseCode: formData.courseCode.trim(),
        telegram: formData.telegram.trim(),
        source,
      });

      toast.success("Registration submitted successfully! Our team will contact you shortly.");
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err?.message || "Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Registration Received!
        </h3>
        <p className="mt-2 text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
          Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your inquiry for{" "}
          <strong className="text-blue-600">{formData.course}</strong> has been submitted to{" "}
          <span className="font-semibold text-slate-800">register@studygrinder.com</span>.
          Our admissions advisor will contact you within 4 business hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              phone: "",
              countryCode: "+1",
              email: "",
              country: "",
              linkedinUrl: "",
              course: prefillCourse || "",
              courseCode: prefillCourseCode || "",
              telegram: "",
            });
          }}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-sm cursor-pointer"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={updateField("name")}
              placeholder="e.g. John Doe"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={updateField("email")}
              placeholder="john@example.com"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>
        </div>

        {/* Country Code (Optional) & Phone Number (Required) */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            <div className="col-span-1">
              <input
                type="text"
                value={formData.countryCode}
                onChange={updateField("countryCode")}
                placeholder="+1"
                title="Country Code (Optional)"
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition text-center"
              />
            </div>
            <div className="col-span-2 sm:col-span-3 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={updateField("phone")}
                placeholder="555-0199 or WhatsApp number"
                className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Country code is optional (defaults to +1 or international format).
          </p>
        </div>

        {/* Country */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Country / Region <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={formData.country}
              onChange={updateField("country")}
              placeholder="e.g. United States, United Kingdom, India, UAE..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>
        </div>

        {/* Course (Required) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Course / Certification <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={formData.course}
              onChange={updateField("course")}
              placeholder="e.g. PMP, AWS Solutions Architect, CompTIA Security+"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>
        </div>

        {/* Course Code (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Course Code <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Hash className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.courseCode}
              onChange={updateField("courseCode")}
              placeholder="e.g. SAA-C03, SY0-701, PMI-PMP"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>
        </div>

        {/* LinkedIn Profile URL (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            LinkedIn Profile <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Linkedin className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={updateField("linkedinUrl")}
              placeholder="https://linkedin.com/in/username"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>
        </div>

        {/* Telegram (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Telegram <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Send className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.telegram}
              onChange={updateField("telegram")}
              placeholder="@username or phone"
              className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-6 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting Registration...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Submit Registration to Admissions</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-center text-slate-500 mt-2">
        🔒 Submitted directly to <strong className="text-slate-700 font-medium">register@studygrinder.com</strong>. We respect your privacy and never spam.
      </p>
    </form>
  );
}
