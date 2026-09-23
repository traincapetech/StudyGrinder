import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Layers,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  Clock,
  Laptop,
  Check,
  HelpCircle,
  Cpu,
  Target
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdvisorModal from "../components/AdvisorModal";
import { getCertificationsCatalog, TOP_CATEGORIES } from "../data/certificationsCatalog";

// Vendor Logos
import comptiaLogo from "../assets/comptia-2.webp";
import pecbLogo from "../assets/PECB1.png";
import isacaLogo from "../assets/Isaca.svg";
import awsLogo from "../assets/aws-kartikey.png";
import microsoftLogo from "../assets/microsoft-kartikey.png";
import ciscoLogo from "../assets/Cisco/CiscoIcon.png";
import studygrinderLogo from "../assets/studygrinder-logo.jpg";
import heroVideo from "../assets/training-video.mp4";
import heroPoster from "../assets/herobg.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [selectedPrefillCourse, setSelectedPrefillCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategorySlug, setActiveCategorySlug] = useState("cybersecurity-compliance");

  // Load catalog
  const { categories, allCourses } = useMemo(() => getCertificationsCatalog(), []);

  // Filter courses for interactive discovery section
  const currentCategoryCourses = useMemo(() => {
    const found = categories.find((c) => c.slug === activeCategorySlug);
    if (!found) return [];
    return found.groups.flatMap((g) => g.courses);
  }, [categories, activeCategorySlug]);

  // Global search matching for Hero search bar
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allCourses
      .filter((c) => {
        const hay = `${c.title} ${c.categoryTitle} ${c.groupTitle}`.toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 6);
  }, [allCourses, searchQuery]);

  const openAdvisor = (courseTitle = "") => {
    setSelectedPrefillCourse(courseTitle);
    setAdvisorModalOpen(true);
  };

  const vendors = [
    {
      name: "CompTIA",
      tagline: "Foundational to Advanced IT",
      desc: "Industry-standard vendor-neutral IT certifications across security, infrastructure, and analytics.",
      logo: comptiaLogo,
      link: "/comptia",
      popular: ["Security+", "Network+", "CySA+", "A+"],
    },
    {
      name: "PECB",
      tagline: "ISO Standards & Governance",
      desc: "Internationally recognized training and certification for ISO/IEC standards, compliance, and privacy.",
      logo: pecbLogo,
      link: "/pecb",
      popular: ["ISO 27001", "ISO 42001 AI", "ISO 31000", "GDPR"],
    },
    {
      name: "ISACA",
      tagline: "Audit, Security & Governance",
      desc: "Gold-standard credentials for information systems auditing, cyber risk management, and cybersecurity.",
      logo: isacaLogo,
      link: "/isaca",
      popular: ["CISA", "CISM", "CRISC", "CDPSE"],
    },
    {
      name: "Microsoft",
      tagline: "Azure & Enterprise Cloud",
      desc: "Official curriculum for cloud architects, administrators, DevOps engineers, and security specialists.",
      logo: microsoftLogo,
      link: "/training/microsoft",
      popular: ["AZ-104", "AZ-500", "AZ-305", "SC-900"],
    },
    {
      name: "AWS",
      tagline: "Cloud Architecture & DevOps",
      desc: "Comprehensive training tracks for architecting, developing, and operating on Amazon Web Services.",
      logo: awsLogo,
      link: "/training/aws",
      popular: ["Solutions Architect", "DevOps Engineer", "Cloud Practitioner"],
    },
    {
      name: "Cisco",
      tagline: "Enterprise Networking",
      desc: "Industry-leading routing, switching, enterprise wireless, and network security pathways.",
      logo: ciscoLogo,
      link: "/training/cisco",
      popular: ["CCNA", "CCNP Enterprise", "CyberOps"],
    },
  ];

  const differentiators = [
    {
      icon: Target,
      title: "Exam-Focused Blueprints",
      desc: "Structured training curricula aligned directly with official vendor domains, test weightages, and core exam objectives.",
    },
    {
      icon: Users,
      title: "Expert-Led Instruction",
      desc: "Learn from certified practitioners with real-world implementation experience in enterprise cloud, cyber, and project delivery.",
    },
    {
      icon: Laptop,
      title: "Flexible Learning Formats",
      desc: "Choose between live interactive weekend batches, weekday virtual sessions, or self-paced video modules tailored to working professionals.",
    },
    {
      icon: Building2,
      title: "Enterprise & Team Upskilling",
      desc: "Custom corporate training cohorts with dedicated reporting, customized schedules, and syllabus tailored to your team's stack.",
    },
    {
      icon: ShieldCheck,
      title: "Prerequisite & Career Guidance",
      desc: "1-on-1 advisor consultations to assess your technical background and map out the highest-ROI certification roadmap.",
    },
    {
      icon: Compass,
      title: "End-to-End Exam Readiness",
      desc: "Comprehensive practice scenarios, sample questions, domain revisions, and test voucher guidance for confident exam day success.",
    },
  ];

  const trainingFormats = [
    {
      title: "Instructor-Led Live Virtual",
      badge: "Most Popular",
      desc: "Interactive live classes delivered online with direct trainer Q&A, structured schedules, and recorded playback.",
      points: [
        "Interactive live lectures & lab walkthroughs",
        "Direct doubt-clearing with certified trainers",
        "Weekend & evening batches for working professionals",
        "Full access to session recordings and materials",
      ],
      cta: "Explore Live Batches",
      link: "/training",
    },
    {
      title: "Self-Paced Learning Paths",
      badge: "Flexible",
      desc: "Curated learning paths with video walkthroughs, study notes, and domain reviews designed for independent study.",
      points: [
        "Learn on your own schedule anywhere, anytime",
        "Domain-by-domain modular curriculum",
        "Downloadable references & review checklists",
        "Advisor support for curriculum guidance",
      ],
      cta: "Browse Self-Paced",
      link: "/certifications",
    },
    {
      title: "Corporate Team Training",
      badge: "Enterprise",
      desc: "Tailored programs designed for engineering teams, IT departments, and organizations upskilling staff on specific tech stacks.",
      points: [
        "Customized curriculum mapped to company projects",
        "Dedicated batches with flexible company timings",
        "Progress tracking and attendance reporting",
        "Volume corporate invoicing & support SLAs",
      ],
      cta: "Request Corporate Proposal",
      link: "/corporate-training",
    },
  ];

  return (
    <div className="bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title="StudyGrinder | Professional Certification Training & Learning Platform"
        description="StudyGrinder helps individuals and organizations prepare for industry-recognized certifications through expert-led training, structured learning programs, and exam guidance."
        canonical="https://studygrinder.com/"
      />

      {/* ========================================================================= */}
      {/* SECTION 1: HERO SECTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-20 pb-28 md:py-32">
        {/* Background Video with Poster Fallback */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={heroPoster}
            className="w-full h-full object-cover filter brightness-[0.32] contrast-[1.15] scale-105"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Ambient overlays for text clarity and visual polish */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/65 to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/35 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-white font-bold">StudyGrinder</span>
            <span className="text-slate-500">•</span>
            <span>Accelerate Your Learning & Certifications</span>
          </motion.div>

          {/* Primary Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12] max-w-5xl"
          >
            Professional Certification Training &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              Career-Focused Learning
            </span>
          </motion.h1>

          {/* Supporting Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed"
          >
            StudyGrinder helps individuals and organizations prepare for industry-recognized certifications through expert-led training, structured learning programs, exam preparation, and professional guidance.
          </motion.p>

          {/* Search Box in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 w-full max-w-2xl relative"
          >
            <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-1.5 border border-slate-200">
              <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 400+ certifications (e.g. Azure, CISSP, ISO 27001, CompTIA Security+)..."
                className="w-full px-3 py-3 text-slate-900 placeholder-slate-400 text-sm sm:text-base bg-transparent outline-none font-medium"
              />
              <button
                onClick={() => navigate(`/certifications?q=${encodeURIComponent(searchQuery)}`)}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
              >
                Find Programs
              </button>
            </div>

            {/* Quick dropdown results if typing */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 text-left z-30 overflow-hidden divide-y divide-slate-100">
                {searchResults.map((course) => (
                  <Link
                    key={course.id}
                    to={`/certifications/${course.categorySlug}/${course.slug}`}
                    className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{course.title}</div>
                      <div className="text-xs text-slate-500">{course.categoryTitle}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-600 shrink-0" />
                  </Link>
                ))}
                <div className="p-2.5 text-center bg-slate-50 text-xs font-semibold text-blue-600">
                  <Link to={`/certifications?q=${encodeURIComponent(searchQuery)}`}>
                    View all results for "{searchQuery}" →
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              to="/certifications"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-[1.02]"
            >
              <span>Explore Certifications</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <button
              onClick={() => openAdvisor()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 backdrop-blur-md transition-all duration-200 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 mr-2 text-blue-400" />
              <span>Talk to a Training Advisor</span>
            </button>

            <Link
              to="/corporate-training"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              <Building2 className="w-4 h-4 mr-2 text-slate-400" />
              <span>Corporate Training</span>
            </Link>
          </motion.div>

          {/* Factual Trust Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-5xl"
          >
            {[
              { label: "400+ Programs", desc: "Structured certification catalog", icon: Award },
              { label: "Multi-Vendor Alignment", desc: "CompTIA, PECB, ISACA, AWS & MS", icon: ShieldCheck },
              { label: "Live & Self-Paced", desc: "Flexible delivery formats", icon: Laptop },
              { label: "Corporate Ready", desc: "Custom cohort team training", icon: Building2 },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-left backdrop-blur-sm"
                >
                  <div className="p-2 w-fit rounded-lg bg-blue-600/15 text-blue-400 mb-2">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-extrabold text-white text-base sm:text-lg">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.desc}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: CERTIFICATION ECOSYSTEM & MAJOR PROVIDERS                      */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Certified Provider Pathways
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Prepare for Industry-Standard Credentials
            </h2>
            <p className="mt-3 text-slate-600 text-base md:text-lg">
              Explore curricula tailored directly to the certification objectives of global technology and governance bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <div
                key={vendor.name}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="h-12 flex items-center justify-between mb-4">
                    <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs max-h-12 flex items-center">
                      <img
                        src={vendor.logo}
                        alt={`${vendor.name} Training`}
                        className="h-7 w-auto object-contain max-w-[100px]"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {vendor.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {vendor.name} Certifications
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {vendor.desc}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Popular Tracks:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {vendor.popular.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <Link
                    to={vendor.link}
                    className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800"
                  >
                    <span>Browse {vendor.name} Programs</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>

                  <button
                    onClick={() => openAdvisor(`${vendor.name} Certification Track`)}
                    className="text-xs font-semibold text-slate-500 hover:text-blue-600 underline cursor-pointer"
                  >
                    Get Guidance
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: INTERACTIVE "FIND YOUR CERTIFICATION" DISCOVERY                */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block mb-3">
                Certification Discovery
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Find the Right Certification Path
              </h2>
              <p className="mt-2 text-slate-600 max-w-2xl text-base">
                Explore our catalog across 8 core domains. Filter by domain to discover curriculum, skills covered, and career validation.
              </p>
            </div>

            <Link
              to="/certifications"
              className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 shrink-0"
            >
              <span>View All 400+ Certifications</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
            {TOP_CATEGORIES.map((cat) => {
              const isSelected = cat.slug === activeCategorySlug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Grid of Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {currentCategoryCourses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100/80">
                      {course.groupTitle || "Certification"}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration ? course.duration.split("/")[0] : "Flexible"}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                    <Link
                      to={`/certifications/${course.categorySlug}/${course.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {course.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Core Outcomes:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {course.learningOutcomes?.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    to={`/certifications/${course.categorySlug}/${course.slug}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View Details →
                  </Link>

                  <button
                    onClick={() => openAdvisor(course.title)}
                    className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Get Guidance
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to={`/certifications/${activeCategorySlug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm shadow-sm hover:bg-slate-50 transition"
            >
              <span>Explore All {TOP_CATEGORIES.find((c) => c.slug === activeCategorySlug)?.title} Certifications</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: WHY STUDYGRINDER (FACTUAL VALUE DIFFERENTIATORS)                */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              The StudyGrinder Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Learn With StudyGrinder?
            </h2>
            <p className="mt-3 text-slate-600 text-base md:text-lg">
              We bridge the gap between theoretical certification material and real-world execution through structured, outcome-driven programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50/60 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{diff.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{diff.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: TRAINING PROGRAMS & DELIVERY FORMATS                           */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block mb-3">
              Delivery Methodologies
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Flexible Training Built for Your Schedule
            </h2>
            <p className="mt-3 text-slate-600 text-base md:text-lg">
              Whether you are an individual working professional or managing an enterprise technical team, choose the training mode that fits your timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainingFormats.map((fmt, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-blue-400 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      {fmt.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{fmt.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{fmt.desc}</p>

                  <ul className="mt-6 space-y-3 pt-6 border-t border-slate-100">
                    {fmt.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    to={fmt.link}
                    className="w-full inline-flex items-center justify-center py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm transition-colors duration-200 shadow-sm"
                  >
                    <span>{fmt.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CORPORATE TRAINING SHOWCASE                                     */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/25 inline-block">
                For Organizations & Enterprise Teams
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Train Your Engineering Team. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-orange-300">
                  Verify Skills with Certifications.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Need to upskill your developers in cloud architectures, prepare security analysts for ISO 27001 / CompTIA credentials, or standardize team workflows? StudyGrinder provides tailored corporate learning cohorts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Tailored Curriculum for Your Tech Stack",
                  "Flexible Timings for Global Teams",
                  "Dedicated Program Manager & Attendance Logs",
                  "Volume Pricing & Streamlined Corporate Invoicing",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to="/corporate-training"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all text-center"
                >
                  Request Corporate Training Proposal
                </Link>

                <button
                  onClick={() => openAdvisor("Corporate Team Training Enquiry")}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all text-center cursor-pointer"
                >
                  Talk to Corporate Advisor
                </button>
              </div>
            </div>

            {/* Visual Corporate Card */}
            <div className="lg:col-span-5 bg-white/10 border border-white/15 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-orange-400" />
                  <span className="font-bold text-white text-base">Corporate Upskilling Suite</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">
                  B2B
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="font-bold text-white block mb-1">1. Skills Gap Assessment</span>
                  <span>We evaluate your team's current capability and recommend specific certification pathways.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="font-bold text-white block mb-1">2. Custom Cohort Schedule</span>
                  <span>Weekend or weekday morning/evening cohorts designed to avoid interrupting sprint deliverables.</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="font-bold text-white block mb-1">3. Exam Readiness & Metrics</span>
                  <span>Hands-on labs and test vouchers ensure team members gain verified credentials.</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400">
                  Over 400+ technical and compliance training modules available.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: LEARNING RESOURCES & FAQs                                      */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Knowledge & Guidance
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Certification FAQs & Resources
            </h2>
            <p className="mt-3 text-slate-600 text-base md:text-lg">
              Common questions answered to help you make an informed decision on your certification path.
            </p>
          </div>

          <div className="max-w-4xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
            {[
              {
                q: "Which certification should I start with if I am transitioning into IT or Cloud?",
                a: "For foundational IT, CompTIA A+ and Network+ provide industry-standard fundamentals. For cloud-specific pathways, AWS Certified Cloud Practitioner or Microsoft Azure Fundamentals (AZ-900) are the recommended entry benchmarks before moving to Associate-level credentials.",
              },
              {
                q: "What is the difference between Live Virtual Training and Self-Paced?",
                a: "Live Virtual Training includes real-time instructor lectures, live Q&A, and scheduled weekend/weekday batches with peer collaboration. Self-Paced training provides on-demand curriculum access for independent study at your own pace.",
              },
              {
                q: "Does StudyGrinder provide training for corporate teams?",
                a: "Yes. StudyGrinder designs customized corporate training programs mapped to an organization's specific tech stack, timeline, and compliance needs, complete with attendance tracking and progress reporting.",
              },
              {
                q: "How does the training consultation with an advisor work?",
                a: "You submit your background and target certifications. A StudyGrinder training advisor reviews your career goals and technical experience, answering questions on prerequisites, exam blueprints, and recommended learning schedules.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="py-6">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/resources"
              className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              <span>Explore More Learning Resources & Career Pathways</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: BEYOND TRAINING — SOFTWARE SOLUTIONS (SECONDARY POSITIONING)   */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-100/80 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Additional Enterprise Capability</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Beyond Training — Custom Software Solutions
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                In addition to our core certification and corporate training platform, StudyGrinder delivers bespoke software engineering services for organizations requiring custom CRM platforms, web portals, mobile applications, and automated business systems.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "Custom CRM Systems",
                  "High-Performance Web Portals",
                  "Mobile App Development",
                  "Cloud Services & DevOps",
                  "Business Process Automation",
                ].map((cap, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors"
              >
                <span>Explore Software Solutions</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
              >
                Discuss a Software Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: FINAL CTA SECTION                                              */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-300 bg-orange-400/20 px-3.5 py-1 rounded-full border border-orange-300/30 inline-block">
            Take The Next Step
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Advance Your Career with an Industry-Recognized Certification?
          </h2>

          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Speak directly with a StudyGrinder training advisor. We’ll help you assess your prerequisites, choose the right exam track, and structure your learning timeline.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openAdvisor()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Talk to a Training Advisor
            </button>

            <Link
              to="/certifications"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-base transition-all"
            >
              Explore 400+ Certifications
            </Link>
          </div>
        </div>
      </section>

      {/* Global Advisor Modal */}
      <AdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        prefillCourse={selectedPrefillCourse}
      />
    </div>
  );
}