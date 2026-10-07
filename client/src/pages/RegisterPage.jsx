import React from "react";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  Mail,
  HelpCircle,
} from "lucide-react";
import RegistrationForm from "../components/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-20">
      <Helmet>
        <title>Course Registration & Enrollment | StudyGrinder</title>
        <meta
          name="description"
          content="Register for certification training and advisory programs with StudyGrinder. Inquiries are processed directly by our admissions team at register@studygrinder.com."
        />
        <link rel="canonical" href="https://studygrinder.com/register" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            <GraduationCap className="w-4 h-4" />
            <span>Admissions Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            StudyGrinder Course Registration
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Begin your journey towards globally recognized certifications. Submit your details below, and our admissions advisor will connect with you within 4 business hours.
          </p>
        </div>

        {/* Main Grid: Form + Trust Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 mb-2 inline-block">
                Single Unified Form
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Enrollment & Advisory Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                All submissions are delivered securely to{" "}
                <strong className="text-slate-800">register@studygrinder.com</strong>.
              </p>
            </div>

            <RegistrationForm source="Register Page" />
          </div>

          {/* Right Column: Highlights & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            {/* Why StudyGrinder Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-extrabold tracking-tight mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400" />
                Why StudyGrinder?
              </h3>

              <ul className="space-y-4 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Accredited Curricula:</strong> Prepared in alignment with official vendor blueprints (PMI, ISACA, AWS, CompTIA, PECB).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Verified Exam Vouchers:</strong> Official exam voucher assistance and registration support.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Rapid Response:</strong> Direct advisory callback guaranteed within 4 hours.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Flexible Formats:</strong> Live cohorts, 1-on-1 mentoring, and self-paced intensive tracks.
                  </span>
                </li>
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Direct Admissions Desk
              </h4>
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <a
                  href="mailto:register@studygrinder.com"
                  className="font-semibold hover:text-blue-600 hover:underline transition"
                >
                  register@studygrinder.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-800">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-xs text-slate-600">
                  Admissions office hours: Mon – Sat (24/7 online dispatch)
                </span>
              </div>
            </div>

            {/* Privacy Guarantee */}
            <div className="bg-slate-100 rounded-2xl p-5 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-600">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Privacy Guaranteed:</strong> We take data confidentiality seriously. Your contact information is never shared with third parties and is used solely for StudyGrinder course advisory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
