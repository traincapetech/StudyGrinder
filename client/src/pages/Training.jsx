import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Laptop,
  Users,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Search,
  Sparkles
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdvisorModal from "../components/AdvisorModal";

import AWS from "../assets/aws-kartikey.png";
import Cisco from "../assets/Cisco/CiscoIcon.png";
import comptia from "../assets/comptia-2.webp";
import microsoft from "../assets/microsoft-kartikey.png";
import PECB from "../assets/PECB1.png";
import ISACA from "../assets/Isaca.svg";

export default function Training() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const trainingModes = [
    {
      title: "Instructor-Led Live Virtual Training",
      badge: "Highest Completion Rate",
      desc: "Live interactive classrooms led by certified practitioners. Participate in structured discussions, live demonstrations, and direct Q&A.",
      features: [
        "Interactive live lectures with certified trainers",
        "Weekend & evening batches tailored for professionals",
        "Lifetime access to session recordings & lecture decks",
        "Live doubt resolution & examination review sessions",
      ],
      cta: "Enquire for Live Batches",
    },
    {
      title: "Self-Paced Learning Paths",
      badge: "Maximum Flexibility",
      desc: "Structured modular video courses and reading resources for self-directed study, allowing you to learn at your pace from anywhere.",
      features: [
        "Comprehensive domain-by-domain modular curriculum",
        "Downloadable revision guides and cheat sheets",
        "Exam blueprint checklists and test readiness guidelines",
        "On-demand advisor guidance when you get stuck",
      ],
      cta: "Explore Self-Paced Courses",
    },
    {
      title: "Corporate Team Cohorts",
      badge: "Enterprise Ready",
      desc: "Customized training designed for engineering and IT departments, scheduled around company sprints and project deliverables.",
      features: [
        "Curriculum tailored to your organization's tech stack",
        "Dedicated corporate program manager & attendance logs",
        "Volume corporate invoicing & group pricing",
        "Post-training skill validation and assessments",
      ],
      cta: "Request Corporate Training",
      link: "/corporate-training",
    },
  ];

  const vendors = [
    {
      title: "CompTIA",
      desc: "Industry-standard vendor-neutral IT certifications from A+ to Security+ and CySA+.",
      image: comptia,
      href: "/comptia",
      programs: "A+, Network+, Security+, CySA+, Cloud+",
    },
    {
      title: "Microsoft Azure",
      desc: "Role-based cloud administration, architecture, DevOps, and security training.",
      image: microsoft,
      href: "/training/microsoft",
      programs: "AZ-900, AZ-104, AZ-305, AZ-500, SC-900",
    },
    {
      title: "Cisco",
      desc: "Enterprise networking, routing, switching, and network security pathways.",
      image: Cisco,
      href: "/training/cisco",
      programs: "CCNA, CCNP Enterprise, CyberOps",
    },
    {
      title: "AWS (Amazon Web Services)",
      desc: "Cloud foundations, solutions architecture, developer tracks, and SysOps.",
      image: AWS,
      href: "/training/aws",
      programs: "Cloud Practitioner, Solutions Architect, DevOps",
    },
    {
      title: "PECB",
      desc: "ISO and governance-focused training (ISO 27001, ISO 42001 AI, ISO 31000 Risk).",
      image: PECB,
      href: "/pecb",
      programs: "ISO 27001, ISO 9001, ISO 42001, GDPR",
    },
    {
      title: "ISACA",
      desc: "CISA, CISM, CRISC & CDPSE — gold standard for audit, cybersecurity, and risk management.",
      image: ISACA,
      href: "/isaca",
      programs: "CISA, CISM, CRISC, CDPSE",
    },
  ];

  const vendorsFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vendors;
    return vendors.filter((v) => `${v.title} ${v.desc} ${v.programs}`.toLowerCase().includes(q));
  }, [query]);

  const openAdvisor = (course = "") => {
    setSelectedCourse(course);
    setAdvisorOpen(true);
  };

  return (
    <div className="bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title="Training Programs & Methodologies | StudyGrinder"
        description="Explore StudyGrinder's certification training programs: Live virtual instructor-led training, flexible self-paced tracks, and corporate team upskilling."
        canonical="https://studygrinder.com/training"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <BookOpen className="w-3.5 h-3.5 text-orange-400" />
            <span>StudyGrinder Training Methodologies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            How StudyGrinder Prepares You for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              Certification Success
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose between live virtual classrooms, self-paced video modules, or corporate team cohorts designed to help you gain mastery and pass your exams with confidence.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <div className="relative w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search vendor training (e.g. AWS, Microsoft, CompTIA)..."
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 text-sm outline-none focus:border-blue-400 backdrop-blur-md"
              />
            </div>
            <button
              onClick={() => openAdvisor("General Training Inquiry")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition whitespace-nowrap cursor-pointer"
            >
              Talk to Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Training Delivery Modes */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Delivery Options
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Training Formats Designed for Your Lifestyle
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Whether you require structured weekend classes or on-demand modules, we provide high-touch support at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainingModes.map((mode, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 transition-all duration-300"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    {mode.badge}
                  </span>

                  <h3 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight">{mode.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{mode.desc}</p>

                  <ul className="mt-6 space-y-3 pt-6 border-t border-slate-200">
                    {mode.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  {mode.link ? (
                    <Link
                      to={mode.link}
                      className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm transition"
                    >
                      <span>{mode.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => openAdvisor(mode.title)}
                      className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
                    >
                      <span>{mode.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Training Programs */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block mb-3">
                Vendor Tracks
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore Training by Certification Provider
              </h2>
              <p className="mt-2 text-slate-600 max-w-2xl text-base">
                Curricula aligned with official vendor objectives and test blueprints.
              </p>
            </div>

            <Link
              to="/certifications"
              className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 shrink-0"
            >
              <span>Explore All 400+ Certifications</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorsFiltered.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-blue-400 transition-all duration-300"
              >
                <div>
                  <div className="h-12 flex items-center justify-between mb-4">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/80 max-h-12 flex items-center">
                      <img
                        src={v.image}
                        alt={`${v.title} Training`}
                        className="h-7 w-auto object-contain max-w-[100px]"
                      />
                    </div>
                    <span className="text-xs font-bold text-blue-600">Training Track</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Programs:
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{v.programs}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={v.href}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View Curriculum →
                  </Link>

                  <button
                    onClick={() => openAdvisor(`${v.title} Training`)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisor Consultation Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="text-2xl font-extrabold text-slate-900">Need Help Choosing a Training Program?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our training advisors will review your background and recommend the right certification curriculum and schedule.
          </p>
          <button
            onClick={() => openAdvisor("General Training Guidance")}
            className="mt-4 px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition cursor-pointer"
          >
            Talk to a Training Advisor
          </button>
        </div>
      </section>

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse={selectedCourse}
      />
    </div>
  );
}
