import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaSearch,
  FaBalanceScale,
  FaSitemap,
  FaUserShield,
  FaAward,
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
  FaArrowRight,
  FaChevronDown,
  FaUsers,
  FaBuilding,
  FaHeadset,
} from "react-icons/fa";
import SEOHead from "../components/SEOHead";
import AdvisorModal from "../components/AdvisorModal";
import ISACALogo from "../assets/Isaca.svg";

const ISACA_COURSES = [
  {
    id: "cisa",
    code: "CISA®",
    title: "Certified Information Systems Auditor",
    category: "audit",
    tag: "World #1 IT Audit Standard",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    gradient: "from-blue-600 to-indigo-700",
    description:
      "The globally acknowledged gold standard for professionals who audit, control, monitor, and assess an enterprise's information technology and business systems.",
    examDetails: {
      questions: "150 Multiple Choice",
      duration: "4 Hours",
      passingScore: "450 / 800",
      experienceReq: "5 Years of IS audit/control/security work experience",
    },
    domains: [
      "Domain 1: Information System Auditing Process (21%)",
      "Domain 2: Governance & Management of IT (17%)",
      "Domain 3: Information Systems Acquisition, Development & Implementation (12%)",
      "Domain 4: Information Systems Operations & Business Resilience (23%)",
      "Domain 5: Protection of Information Assets (27%)",
    ],
    targetRoles: [
      "IT Auditor / Lead Auditor",
      "Audit Manager / Partner",
      "Compliance & Assurance Officer",
      "Cybersecurity Analyst",
    ],
    salaryAvg: "$135,000+",
  },
  {
    id: "cism",
    code: "CISM®",
    title: "Certified Information Security Manager",
    category: "security",
    tag: "Premier Leadership Credential",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    gradient: "from-purple-600 to-indigo-800",
    description:
      "Management-focused certification validating expertise in designing, overseeing, and assessing an enterprise's information security program and governance.",
    examDetails: {
      questions: "150 Multiple Choice",
      duration: "4 Hours",
      passingScore: "450 / 800",
      experienceReq: "5 Years of information security management experience",
    },
    domains: [
      "Domain 1: Information Security Governance (17%)",
      "Domain 2: Information Security Risk Management (20%)",
      "Domain 3: Information Security Program (33%)",
      "Domain 4: Incident Management (30%)",
    ],
    targetRoles: [
      "Chief Information Security Officer (CISO)",
      "Information Security Director",
      "IT Security Manager",
      "Security Risk Consultant",
    ],
    salaryAvg: "$145,000+",
  },
  {
    id: "crisc",
    code: "CRISC®",
    title: "Certified in Risk & Information Systems Control",
    category: "risk",
    tag: "Enterprise IT Risk & Controls",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    gradient: "from-emerald-600 to-teal-700",
    description:
      "The only credential focused exclusively on enterprise IT risk management and the design, implementation, and maintenance of effective information systems controls.",
    examDetails: {
      questions: "150 Multiple Choice",
      duration: "4 Hours",
      passingScore: "450 / 800",
      experienceReq: "3+ Years in IT risk identification, assessment, & response",
    },
    domains: [
      "Domain 1: Governance (26%)",
      "Domain 2: IT Risk Assessment (20%)",
      "Domain 3: Risk Response & Reporting (32%)",
      "Domain 4: Information Technology & Security (22%)",
    ],
    targetRoles: [
      "Chief Risk Officer (CRO)",
      "Risk & Compliance Specialist",
      "Business Analyst / Risk Consultant",
      "Security Operations Manager",
    ],
    salaryAvg: "$140,000+",
  },
  {
    id: "cgeit",
    code: "CGEIT®",
    title: "Certified in the Governance of Enterprise IT",
    category: "governance",
    tag: "Executive IT Governance",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    gradient: "from-amber-600 to-orange-700",
    description:
      "Demonstrates high-level capability in optimizing enterprise IT investments, strategic alignment, and resource stewardship for senior IT leaders.",
    examDetails: {
      questions: "150 Multiple Choice",
      duration: "4 Hours",
      passingScore: "450 / 800",
      experienceReq: "5 Years of enterprise IT governance advisory experience",
    },
    domains: [
      "Domain 1: Governance of Enterprise IT (40%)",
      "Domain 2: IT Resources (15%)",
      "Domain 3: Benefits Realization (26%)",
      "Domain 4: Risk Optimization (19%)",
    ],
    targetRoles: [
      "CIO / VP of Information Technology",
      "IT Governance Director",
      "Enterprise Architect",
      "Senior Governance & Risk Advisor",
    ],
    salaryAvg: "$150,000+",
  },
  {
    id: "cdpse",
    code: "CDPSE®",
    title: "Certified Data Privacy Solutions Engineer",
    category: "privacy",
    tag: "Privacy by Design & Engineering",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    gradient: "from-cyan-600 to-blue-800",
    description:
      "The first experience-based, technical privacy credential that bridges technical IT implementation with legal and regulatory privacy requirements.",
    examDetails: {
      questions: "120 Multiple Choice",
      duration: "3.5 Hours",
      passingScore: "450 / 800",
      experienceReq: "3+ Years in privacy governance, architecture, or data lifecycle",
    },
    domains: [
      "Domain 1: Privacy Governance (34%)",
      "Domain 2: Privacy Architecture (44%)",
      "Domain 3: Data Lifecycle (22%)",
    ],
    targetRoles: [
      "Data Privacy Engineer",
      "Data Protection Officer (DPO)",
      "Privacy Solutions Architect",
      "Information Security Architect",
    ],
    salaryAvg: "$130,000+",
  },
  {
    id: "cobit",
    code: "COBIT® 2019",
    title: "COBIT® 2019 Foundation & Implementation",
    category: "governance",
    tag: "Framework for IT Governance",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    gradient: "from-indigo-600 to-slate-800",
    description:
      "Master the globally recognized framework that connects business goals with IT metrics, governance systems, and operational design factors.",
    examDetails: {
      questions: "75 Multiple Choice",
      duration: "2 Hours",
      passingScore: "65% (49/75)",
      experienceReq: "No formal prerequisites for Foundation",
    },
    domains: [
      "COBIT Framework Principles & Architecture",
      "Governance System & Components",
      "Governance & Management Objectives",
      "Performance Management in COBIT",
      "Designing a Tailored Governance System",
    ],
    targetRoles: [
      "IT Governance Consultant",
      "Enterprise Architect",
      "IT Process Owner / Director",
      "Audit & Compliance Lead",
    ],
    salaryAvg: "$125,000+",
  },
];

const FAQS = [
  {
    q: "Why are ISACA certifications considered the gold standard?",
    a: "ISACA certifications like CISA, CISM, CRISC, and CGEIT are globally accredited under ISO/IEC 17024 and consistently ranked among the highest-paying and most sought-after credentials by Fortune 500 companies, government agencies, and major audit firms.",
  },
  {
    q: "Can I take the exam before fulfilling the 5-year experience requirement?",
    a: "Yes! You can take and pass the ISACA exam first. You have up to 5 years from the date you pass the exam to submit your application for certification once you meet the required experience criteria. Educational degrees or other certs can also substitute for 1-2 years of experience.",
  },
  {
    q: "What is included in the Armx-Indecodex ISACA training program?",
    a: "Our program includes live interactive sessions with certified expert practitioners, official domain coverage, official QAE (Questions, Answers & Explanations) practice pools, mock exams with full rationales, slide decks, and one-on-one exam mentorship.",
  },
  {
    q: "How does the training schedule work?",
    a: "We offer both weekend and weekday evening cohorts designed for working professionals, as well as customized corporate schedules for enterprise teams.",
  },
];

export default function ISACA() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openAdvisor = (courseName = "ISACA Certification Training") => {
    setSelectedCourse(courseName);
    setAdvisorOpen(true);
  };

  const filteredCourses =
    activeFilter === "all"
      ? ISACA_COURSES
      : ISACA_COURSES.filter((c) => c.category === activeFilter);

  const filterTabs = [
    { id: "all", label: "All Certifications" },
    { id: "audit", label: "IT Audit (CISA)" },
    { id: "security", label: "Infosec Management (CISM)" },
    { id: "risk", label: "Risk & Controls (CRISC)" },
    { id: "governance", label: "Governance & COBIT" },
    { id: "privacy", label: "Data Privacy (CDPSE)" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <SEOHead
        title="ISACA Certifications Training | CISA, CISM, CRISC, CGEIT - Armx-Indecodex"
        description="Comprehensive ISACA certification training for CISA, CISM, CRISC, CGEIT, and CDPSE. Expert instructors, official practice questions, live interactive classes, and corporate training packages."
        canonical="https://www.Armx-Indecodextech.in/isaca"
        ogType="website"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#102142] to-slate-900 text-white pt-28 pb-20 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide backdrop-blur-md">
                <FaAward className="text-yellow-400" />
                ACCREDITED ISACA TRAINING PATHWAYS
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Master IT Audit, Risk, Governance & Security with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  ISACA®
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
                Accelerate your career with globally accredited credentials:{" "}
                <span className="text-white font-semibold">CISA, CISM, CRISC, CGEIT, and CDPSE</span>.
                Learn from certified practitioners with exam blueprints, hands-on scenarios, and proven pass strategies.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => openAdvisor("General ISACA Inquiry")}
                  className="px-8 py-3.5 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
                >
                  Speak with an Advisor
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("isaca-catalog");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-3.5 rounded-xl font-bold bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all hover:-translate-y-0.5 backdrop-blur-md"
                >
                  View All Certifications
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-400" />
                  <span>Official Exam Blueprint</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-400" />
                  <span>Experienced Practitioners</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-400" />
                  <span>Corporate Cohorts Available</span>
                </div>
              </div>
            </div>

            {/* Right Card / Logo Showcase */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl relative">
                <div className="bg-white rounded-2xl p-6 flex items-center justify-center shadow-inner mb-6">
                  <img
                    src={ISACALogo}
                    alt="ISACA Logo"
                    className="h-16 w-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white text-center">
                  ISACA Authorized Catalog
                </h3>
                <p className="mt-2 text-sm text-slate-400 text-center">
                  Recognized worldwide across 180+ countries as the pinnacle benchmark for IT governance, security, and assurance.
                </p>
                <div className="mt-6 pt-6 border-t border-slate-800 flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-extrabold text-blue-400">#1</div>
                    <div className="text-xs text-slate-400 mt-0.5">Audit Rank</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-emerald-400">96%</div>
                    <div className="text-xs text-slate-400 mt-0.5">Pass Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-purple-400">150k+</div>
                    <div className="text-xs text-slate-400 mt-0.5">Alumni</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-white border-b border-slate-200 py-8 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-slate-900">$135K+</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Average Global Salary for ISACA Holders</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-blue-600">5 Domains</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Deep-dive Coverage per Curriculum</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-emerald-600">ISO/IEC 17024</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Accredited Globally Recognized Standards</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-purple-600">1-on-1</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1">Exam Mentorship & Study Guidance</div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="isaca-catalog" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Certification Catalog
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Explore ISACA Programs
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Choose your credential based on your career goals in IT audit, security leadership, risk management, or privacy engineering.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white text-slate-650 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${c.badgeColor}`}>
                    {c.tag}
                  </span>
                  <span className="text-xs font-extrabold text-slate-400 tracking-wider">
                    {c.code}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                  {c.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {c.description}
                </p>

                {/* Exam Specs Box */}
                <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-semibold flex items-center gap-1.5">
                      <FaClock className="text-blue-500" /> Duration:
                    </span>
                    <span>{c.examDetails.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-semibold flex items-center gap-1.5">
                      <FaSearch className="text-blue-500" /> Format:
                    </span>
                    <span>{c.examDetails.questions}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-semibold flex items-center gap-1.5">
                      <FaAward className="text-yellow-500" /> Passing Score:
                    </span>
                    <span className="font-bold text-slate-900">{c.examDetails.passingScore}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700 pt-1 border-t border-slate-200">
                    <span className="font-semibold text-slate-500">Avg. Salary:</span>
                    <span className="font-bold text-emerald-600">{c.salaryAvg}</span>
                  </div>
                </div>

                {/* Domains List */}
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Key Domains Covered
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {c.domains.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                    {c.domains.length > 3 && (
                      <li className="text-xs text-blue-600 font-semibold pl-3">
                        + {c.domains.length - 3} more domains
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => openAdvisor(`${c.code} - ${c.title}`)}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white text-center transition shadow-sm"
                >
                  Inquire Now
                </button>
                <button
                  onClick={() => navigate("/contact-us")}
                  className="py-3 px-4 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                >
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Armx-Indecodex */}
      <section className="bg-slate-100 py-16 px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Why Prepare for ISACA with Armx-Indecodex?
            </h2>
            <p className="mt-2 text-slate-600">
              Our structured approach combines domain theory, real enterprise case studies, and continuous practice testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4">
                <FaGraduationCap />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Certified Practitioner Instructors</h3>
              <p className="mt-2 text-sm text-slate-600">
                Learn directly from veterans with active CISA, CISM, and CRISC certifications who have led enterprise audit and security teams.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-4">
                <FaCheckCircle />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Curated Practice Questions & Explanations</h3>
              <p className="mt-2 text-sm text-slate-600">
                Access hundreds of scenario-based mock questions designed to match ISACA’s tricky wording, situational judgment, and exam logic.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Flexible Delivery & Group Batches</h3>
              <p className="mt-2 text-sm text-slate-600">
                Choose between weekend batches for busy executives or custom corporate bootcamps tailored to organizational compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600">
            Everything you need to know about ISACA exam preparation and credentials.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-slate-800 hover:text-blue-600 transition"
              >
                <span>{faq.q}</span>
                <FaChevronDown
                  className={`text-slate-400 transition-transform duration-200 ${
                    expandedFaq === idx ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {expandedFaq === idx && (
                <div className="px-6 pb-5 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white py-14 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Earn Your ISACA Credential?
          </h2>
          <p className="mt-3 text-blue-100 text-lg">
            Connect with an educational counselor to get customized study roadmaps, batch timings, and early registration benefits.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openAdvisor("General ISACA Registration")}
              className="px-8 py-3.5 rounded-xl font-bold bg-white text-blue-700 hover:bg-slate-100 transition shadow-lg"
            >
              Talk to an Advisor
            </button>
            <button
              onClick={() => navigate("/contact-us")}
              className="px-8 py-3.5 rounded-xl font-bold bg-transparent border-2 border-white text-white hover:bg-white/10 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Advisor Modal */}
      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse={selectedCourse}
      />
    </div>
  );
}
