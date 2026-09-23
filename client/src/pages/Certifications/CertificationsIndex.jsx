import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import CertificationCard from "../../components/CertificationCard";
import AdvisorModal from "../../components/AdvisorModal";
import {
  getCertificationsCatalog,
  TOP_CATEGORIES,
} from "../../data/certificationsCatalog";
import { Search, Award, Filter, ArrowRight, ShieldCheck, PhoneCall, ChevronRight } from "lucide-react";

import AWS from "../../assets/aws-kartikey.png";
import Cisco from "../../assets/Cisco/CiscoIcon.png";
import comptia from "../../assets/comptia-2.webp";
import microsoft from "../../assets/microsoft-kartikey.png";
import PECB from "../../assets/PECB1.png";
import ISACA from "../../assets/Isaca.svg";

const VENDORS = [
  {
    title: "CompTIA",
    desc: "A+, Network+, Security+, CySA+ and more — foundational to advanced IT career tracks.",
    image: comptia,
    href: "/comptia",
  },
  {
    title: "Microsoft",
    desc: "Azure, security, and productivity certifications for modern IT and cloud roles.",
    image: microsoft,
    href: "/training/microsoft",
  },
  {
    title: "Cisco",
    desc: "Networking and security pathways for enterprise infrastructure roles.",
    image: Cisco,
    href: "/training/cisco",
  },
  {
    title: "AWS",
    desc: "Cloud foundations to architect-level paths for building and scaling on AWS.",
    image: AWS,
    href: "/training/aws",
  },
  {
    title: "PECB",
    desc: "ISO and governance-focused training (ISO 27001, internal audit, risk, compliance).",
    image: PECB,
    href: "/pecb",
  },
  {
    title: "ISACA",
    desc: "CISA, CISM, CRISC, CGEIT & CDPSE — gold-standard IT audit, governance & security.",
    image: ISACA,
    href: "/isaca",
  },
];

function VendorCard({ vendor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-blue-400 hover:-translate-y-0.5 transition-all cursor-pointer group"
    >
      <div className="h-12 flex items-center justify-between gap-3">
        <img
          src={vendor.image}
          alt={`${vendor.title} training`}
          className="h-8 w-auto max-w-[80px] object-contain"
          loading="lazy"
        />
        <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
          View Track →
        </span>
      </div>
      <div className="mt-3 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
        {vendor.title}
      </div>
      <p className="mt-1 text-xs text-slate-600 leading-relaxed">{vendor.desc}</p>
    </button>
  );
}

export default function CertificationsIndex() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const { categories, allCourses } = useMemo(() => getCertificationsCatalog(), []);
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [advisorPrefill, setAdvisorPrefill] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);

  const filtered = useMemo(() => {
    let result = allCourses;

    if (selectedCategory !== "all") {
      result = result.filter((c) => c.categorySlug === selectedCategory);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter((c) => {
        const hay = `${c.title} ${c.categoryTitle} ${c.groupTitle} ${c.domainTitle}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return result;
  }, [allCourses, selectedCategory, query]);

  const handleAdvisorClick = (courseTitle = "") => {
    setAdvisorPrefill(courseTitle);
    setAdvisorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title="Certification Catalog | StudyGrinder"
        description="Browse 400+ professional certifications across cloud, cybersecurity, agile, project management, and AI. Compare curricula, outcomes, and speak with a training advisor."
        canonical="https://studygrinder.com/certifications"
        ogType="website"
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/25 inline-block mb-3">
            Over 400+ Industry-Recognized Certifications
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Find Your Certification Path & Accelerate Your Career
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-slate-300 text-base md:text-lg">
            Explore category-based credentials with structured outcomes, exam blueprints, prerequisites, and clear training next steps.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl p-1.5 border border-slate-200">
              <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(24);
                }}
                placeholder="Search certifications (e.g., Azure, CompTIA Security+, ISO 27001, PMP)..."
                className="w-full px-3 py-3 text-slate-900 placeholder-slate-400 text-sm sm:text-base bg-transparent outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="px-2 text-xs font-bold text-slate-400 hover:text-slate-600 mr-2"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => handleAdvisorClick(query ? `Inquiry for "${query}"` : "General Certification Catalog")}
                className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition shrink-0 cursor-pointer"
              >
                Talk to Advisor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Providers Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 -mt-6 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {VENDORS.map((v) => (
            <button
              key={v.title}
              onClick={() => navigate(v.href)}
              className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs hover:border-blue-400 hover:shadow-md transition text-center flex flex-col items-center justify-center cursor-pointer group"
            >
              <img src={v.image} alt={v.title} className="h-6 w-auto object-contain mb-1.5" />
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {v.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Catalog with Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter Chips */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by Domain</span>
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Showing <strong className="text-slate-900">{filtered.length}</strong> certifications
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setVisibleCount(24);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              All Domains ({allCourses.length})
            </button>

            {TOP_CATEGORIES.map((cat) => {
              const match = categories.find((c) => c.slug === cat.slug);
              const count = match ? match.groups.reduce((a, g) => a + g.courses.length, 0) : 0;
              const isSelected = selectedCategory === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setVisibleCount(24);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Certifications Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No certifications matched your search</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find a program matching "{query}". Try another search term or talk directly with a training advisor.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, visibleCount).map((c) => (
              <CertificationCard key={c.id} cert={c} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filtered.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm shadow-xs hover:bg-slate-50 hover:border-slate-400 transition cursor-pointer"
            >
              Load More Certifications ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </section>

      {/* Advisory CTA Banner */}
      <section className="bg-white border-t border-slate-200 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl font-extrabold text-slate-900">Need Personalized Guidance?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our certified training advisors can assess your current experience, review prerequisites, and recommend the ideal certification roadmap.
          </p>
          <button
            onClick={() => handleAdvisorClick("Catalog General Inquiry")}
            className="mt-2 inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Talk to a Training Advisor</span>
          </button>
        </div>
      </section>

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse={advisorPrefill}
      />
    </div>
  );
}
