import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import AdvisorModal from "../../components/AdvisorModal";
import { getCertificationsCatalog } from "../../data/certificationsCatalog";
import {
  Award,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  HelpCircle,
  Laptop,
  PhoneCall,
  ShieldCheck,
  Users,
  ArrowRight,
  BookOpen
} from "lucide-react";
import toast from "react-hot-toast";
import { submitLead } from "../../utils/submitLead";

export default function CertificationDetail() {
  const navigate = useNavigate();
  const { categorySlug, certSlug } = useParams();
  const { allCourses } = useMemo(() => getCertificationsCatalog(), []);
  const [advisorOpen, setAdvisorOpen] = useState(false);

  // Quick enquiry form state
  const [quickForm, setQuickForm] = useState({
    name: "",
    email: "",
    phone: "",
    trainingMode: "Live Virtual",
  });
  const [submitting, setSubmitting] = useState(false);

  const cert = allCourses.find((c) => c.categorySlug === categorySlug && c.slug === certSlug);
  const title = cert?.title || "Certification";
  const canonical = `https://studygrinder.com/certifications/${categorySlug}/${certSlug}`;

  const relatedCerts = useMemo(() => {
    if (!cert) return [];
    return allCourses
      .filter((c) => c.categorySlug === cert.categorySlug && c.id !== cert.id)
      .slice(0, 3);
  }, [allCourses, cert]);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quickForm.name.trim() || quickForm.name.length < 2) {
      return toast.error("Please enter your name.");
    }
    if (!quickForm.email.trim() || !quickForm.email.includes("@")) {
      return toast.error("Please enter a valid email.");
    }
    if (!quickForm.phone.trim() || quickForm.phone.length < 6) {
      return toast.error("Please enter a phone number.");
    }

    setSubmitting(true);
    try {
      const pageUrl = typeof window !== "undefined" ? window.location.href : "";
      const lead = {
        name: quickForm.name.trim(),
        email: quickForm.email.trim(),
        phoneNumber: quickForm.phone.trim(),
        location: "Certification Detail Page",
        subject: `Certification Guidance Request: ${cert?.title}`,
        message: `Inquiry for Certification: ${cert?.title}
Category: ${cert?.categoryTitle}
Preferred Mode: ${quickForm.trainingMode}
Page: ${pageUrl}`,
      };

      await submitLead(lead);
      toast.success("Thank you! A StudyGrinder training advisor will contact you shortly.");
      setQuickForm({ name: "", email: "", phone: "", trainingMode: "Live Virtual" });
    } catch (err) {
      toast.error(err?.message || "Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  const structuredData = cert
    ? {
      "@context": "https://schema.org",
      "@type": "Course",
      name: cert.title,
      description: cert.shortDescription,
      provider: {
        "@type": "EducationalOrganization",
        name: "StudyGrinder",
        url: "https://studygrinder.com",
      },
      url: canonical,
      educationalCredentialAwarded: cert.title,
    }
    : undefined;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title={`${title} Training & Certification | StudyGrinder`}
        description={
          cert?.shortDescription ||
          "Explore certification details, learning outcomes, who should enroll, exam blueprints, and training options."
        }
        canonical={canonical}
        ogType="article"
        structuredData={structuredData}
      />

      {/* Breadcrumbs & Title */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link to="/certifications" className="hover:text-slate-900">Certifications</Link>
            <span>/</span>
            <Link to={`/certifications/${categorySlug}`} className="hover:text-slate-900">
              {cert?.categoryTitle || "Category"}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-xs">{title}</span>
          </nav>

          {!cert ? (
            <div className="mt-8 text-center py-16">
              <h1 className="text-2xl font-extrabold text-slate-900">Certification Not Found</h1>
              <p className="mt-2 text-sm text-slate-600">The certification path you requested is unavailable.</p>
              <Link
                to="/certifications"
                className="mt-6 inline-flex px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm"
              >
                Back to Certifications Catalog
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Content Area */}
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                      {cert.categoryTitle}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {cert.groupTitle}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {cert.title}
                  </h1>

                  <p className="mt-4 text-slate-600 text-base leading-relaxed whitespace-pre-line">
                    {cert.longDescription}
                  </p>
                </div>

                {/* Key Outcomes & Audience Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center gap-2 mb-3 text-slate-900">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h2 className="text-lg font-bold">Skills & Outcomes</h2>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {cert.learningOutcomes?.map((x, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                    <div className="flex items-center gap-2 mb-3 text-slate-900">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h2 className="text-lg font-bold">Who Should Enroll</h2>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {cert.whoShouldEnroll?.map((x, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Career Value */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-3 text-slate-900">
                    <Award className="w-5 h-5 text-orange-500" />
                    <h2 className="text-lg font-bold">Career & Practical Benefits</h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
                    {cert.careerBenefits?.map((x, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-500 font-bold">✓</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Training Methodology */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-slate-900 mb-2">How StudyGrinder Prepares You</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our training for {cert.title} covers theoretical exam blueprints combined with practical lab scenarios. You gain direct access to certified trainers, review checklists, sample test problems, and post-training support to ensure you pass with confidence.
                  </p>
                </div>

                {/* Related Programs in Domain */}
                {relatedCerts.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Related Certifications in {cert.categoryTitle}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {relatedCerts.map((rc) => (
                        <Link
                          key={rc.id}
                          to={`/certifications/${rc.categorySlug}/${rc.slug}`}
                          className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 shadow-xs flex flex-col justify-between group"
                        >
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2">
                            {rc.title}
                          </span>
                          <span className="text-[11px] font-semibold text-blue-600 mt-3 inline-flex items-center gap-1">
                            <span>View Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar with Program Specs & Fast Lead Capture */}
              <aside className="lg:col-span-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Program Specifications</h3>
                    <div className="mt-4 space-y-3 text-xs sm:text-sm">
                      <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100">
                        <span className="font-semibold text-slate-500">Duration</span>
                        <span className="font-bold text-slate-800 text-right">{cert.duration || "4–6 Weeks"}</span>
                      </div>
                      <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100">
                        <span className="font-semibold text-slate-500">Format</span>
                        <span className="font-bold text-slate-800 text-right">{cert.deliveryMode || "Live Online / Self-Paced"}</span>
                      </div>
                      <div className="flex items-start justify-between gap-2 py-1.5 border-b border-slate-100">
                        <span className="font-semibold text-slate-500">Credential</span>
                        <span className="font-bold text-slate-800 text-right">{cert.groupTitle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fast Contextual Lead Capture Box */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
                      Enquire for this Certification
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">Get Training Guidance & Batches</h4>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      Speak with an advisor to discuss schedules, fees, and curriculum details.
                    </p>

                    <form onSubmit={handleQuickSubmit} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={quickForm.name}
                          onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                          placeholder="Your Full Name"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          required
                          value={quickForm.email}
                          onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                          placeholder="Your Email Address"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          required
                          value={quickForm.phone}
                          onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                          placeholder="Phone / WhatsApp Number"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <select
                          value={quickForm.trainingMode}
                          onChange={(e) => setQuickForm({ ...quickForm, trainingMode: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-300 outline-none focus:border-blue-500 text-slate-700"
                        >
                          <option value="Live Virtual Batch">Live Virtual Batch</option>
                          <option value="Weekend Intensive">Weekend Intensive</option>
                          <option value="Self-Paced Learning">Self-Paced Track</option>
                          <option value="Corporate Team Training">Corporate Team Cohort</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? "Submitting..." : "Get Training Guidance"}
                      </button>
                    </form>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setAdvisorOpen(true)}
                      className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                      <span>Talk to Training Advisor</span>
                    </button>

                    <button
                      onClick={() => navigate("/test", { state: { course: cert.categoryTitle, subTopic: cert.title, level: "easy" } })}
                      className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                    >
                      Take Diagnostic Practice Test
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse={cert?.title || ""}
      />
    </div>
  );
}
