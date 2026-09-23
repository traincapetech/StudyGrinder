import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { submitLead } from "../utils/submitLead";
import { Award, PhoneCall, ShieldCheck, X } from "lucide-react";

function isValidEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export default function AdvisorModal({ isOpen, onClose, prefillCourse = "" }) {
  const initial = useMemo(
    () => ({
      name: "",
      email: "",
      country: "",
      whatsapp: "",
      course: prefillCourse || "",
      interestType: "Individual Certification Training",
    }),
    [prefillCourse]
  );

  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setForm((prev) => ({ ...prev, course: prefillCourse || prev.course }));
  }, [isOpen, prefillCourse]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const update = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const country = form.country.trim();
    const whatsapp = form.whatsapp.trim();
    const course = form.course.trim();
    const interestType = form.interestType;

    if (name.length < 2) return toast.error("Please enter your name.");
    if (!isValidEmail(email)) return toast.error("Please enter a valid email.");
    if (!country) return toast.error("Please enter your country/city.");
    if (!whatsapp || whatsapp.replace(/[^\d]/g, "").length < 6)
      return toast.error("Please enter a valid WhatsApp or contact number.");
    if (!course) return toast.error("Please enter the certification or skill track.");

    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const lead = {
      name,
      email,
      phoneNumber: whatsapp,
      location: country,
      subject: `StudyGrinder Training Advisor Request — ${course}`,
      message: `Training Guidance Request:
Program / Track: ${course}
Interest Type: ${interestType}
Country / Location: ${country}
WhatsApp / Phone: ${whatsapp}
Source Page: ${pageUrl}`,
    };

    setSubmitting(true);
    try {
      await submitLead(lead);
      toast.success("Thank you! A StudyGrinder training advisor will contact you within 4 hours.");
      setForm(initial);
      onClose?.();
    } catch (err) {
      toast.error(err?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Talk to StudyGrinder Training Advisor"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100 mb-2">
                <PhoneCall className="w-3 h-3" />
                <span>StudyGrinder Advisory</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Talk to a Training Advisor
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Speak directly with an advisor to evaluate prerequisites, exam formats, and recommended learning schedules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onClose?.()}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <label htmlFor="advisor-name" className="text-xs font-semibold text-slate-800 block mb-1">
                Full Name *
              </label>
              <input
                id="advisor-name"
                autoComplete="name"
                required
                value={form.name}
                onChange={update("name")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label htmlFor="advisor-email" className="text-xs font-semibold text-slate-800 block mb-1">
                Email Address *
              </label>
              <input
                id="advisor-email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update("email")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="advisor-country" className="text-xs font-semibold text-slate-800 block mb-1">
                Country / Location *
              </label>
              <input
                id="advisor-country"
                required
                value={form.country}
                onChange={update("country")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. United States / India"
              />
            </div>

            <div>
              <label htmlFor="advisor-whatsapp" className="text-xs font-semibold text-slate-800 block mb-1">
                Phone / WhatsApp *
              </label>
              <input
                id="advisor-whatsapp"
                type="tel"
                required
                value={form.whatsapp}
                onChange={update("whatsapp")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="+1 555-0199"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="advisor-type" className="text-xs font-semibold text-slate-800 block mb-1">
                Interest Type
              </label>
              <select
                id="advisor-type"
                value={form.interestType}
                onChange={update("interestType")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
              >
                <option value="Individual Certification Training">Individual Certification Training</option>
                <option value="Corporate / Team Upskilling">Corporate / Team Upskilling</option>
                <option value="Exam Blueprint & Voucher Guidance">Exam Blueprint & Voucher Guidance</option>
                <option value="Career Transition Consultation">Career Transition Consultation</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="advisor-course" className="text-xs font-semibold text-slate-800 block mb-1">
                Target Certification or Track *
              </label>
              <input
                id="advisor-course"
                required
                value={form.course}
                onChange={update("course")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. AWS Solutions Architect, CompTIA Security+, ISO 27001, Azure AZ-104"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row items-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => onClose?.()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:flex-1 py-3 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 text-white transition text-sm shadow-md disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Submitting Request..." : "Request Advisor Consultation"}
              </button>
            </div>

            <div className="sm:col-span-2 text-center mt-1">
              <p className="text-[11px] text-slate-400 font-medium">
                🔒 Your details are confidential. We never spam. An advisor will contact you within 4 business hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
