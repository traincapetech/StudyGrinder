import React, { useEffect } from "react";
import { GraduationCap, X } from "lucide-react";
import RegistrationForm from "./RegistrationForm";

export default function AdvisorModal({
  isOpen,
  onClose,
  prefillCourse = "",
  prefillCourseCode = "",
  source = "Advisor Modal",
}) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="StudyGrinder Course Registration & Advisory"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans my-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500" />

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 mb-2">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Official Registration & Advisory</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {prefillCourse ? `Enroll in ${prefillCourse}` : "StudyGrinder Course Registration"}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Submit your details below. An admissions advisor will confirm course availability, blueprints, and schedule within 4 hours.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onClose?.()}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unified Form */}
          <RegistrationForm
            prefillCourse={prefillCourse}
            prefillCourseCode={prefillCourseCode}
            source={source}
            inModal={true}
          />
        </div>
      </div>
    </div>
  );
}

// Named alias
export { AdvisorModal as RegistrationModal };
