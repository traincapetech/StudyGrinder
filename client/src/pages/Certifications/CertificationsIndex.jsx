import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import CertificationCard from "../../components/CertificationCard";
import AdvisorModal from "../../components/AdvisorModal";
import {
  getCertificationsCatalog,
  TOP_CATEGORIES,
} from "../../data/certificationsCatalog";

import AWS from "../../assets/aws-kartikey.png";
import Cisco from "../../assets/Cisco/CiscoIcon.png";
import comptia from "../../assets/comptia-2.webp";
import microsoft from "../../assets/microsoft-kartikey.png";
import PECB from "../../assets/PECB1.png";
import ISACA from "../../assets/Isaca.svg";

const TRAINING_TRACKS = [
  {
    title: "Certification Training",
    desc: "Structured learning paths aligned to certification objectives — with exam guidance and practice support.",
  },
  {
    title: "Skill-Based Training",
    desc: "Hands-on programs focused on real projects, job outcomes, and practical tooling.",
  },
  {
    title: "Corporate Training",
    desc: "Customized training for teams with measurable skill progression and delivery support.",
  },
];

const VENDORS = [
  {
    title: "CompTIA",
    desc: "A+, Network+, Security+ and more — foundational to advanced IT career tracks.",
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
    desc: "ISO and governance-focused training (internal audit, risk, compliance).",
    image: PECB,
    href: "/pecb",
  },
  {
    title: "ISACA",
    desc: "CISA, CISM, CRISC, CGEIT & CDPSE — gold-standard IT audit, governance, risk and security management.",
    image: ISACA,
    href: "/isaca",
  },
];

function VendorCard({ vendor, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
    >
      <div className="h-14 flex items-center gap-4">
        <img
          src={vendor.image}
          alt={`${vendor.title} training`}
          className="h-10 w-auto max-w-[80px] object-contain"
          loading="lazy"
          decoding="async"
        />
        <div className="text-lg font-extrabold text-gray-900">
          {vendor.title}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600">{vendor.desc}</p>
      <div className="mt-4 text-sm font-semibold text-blue-700">
        Browse programs
      </div>
    </button>
  );
}

export default function CertificationsIndex() {
  const navigate = useNavigate();
  const { categories, allCourses } = useMemo(
    () => getCertificationsCatalog(),
    [],
  );
  const [query, setQuery] = useState("");
  const [advisorOpen, setAdvisorOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCourses;
    return allCourses.filter((c) => {
      const hay =
        `${c.title} ${c.categoryTitle} ${c.groupTitle} ${c.domainTitle}`.toLowerCase();
      return hay.includes(q);
    });
  }, [allCourses, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <SEOHead
        title="Certifications| Armx-Indecodex"
        description="Explore certification and professional training programs across project management, agile, cybersecurity, cloud, AI, testing, business, and digital marketing. Browse categories and view course details."
        canonical="https://www.Armx-Indecodextech.in/certifications"
        ogType="website"
      />

      <section className="relative overflow-hidden py-24 md:py-32 bg-white border-b border-slate-100">
        {/* Subtle grid and gradient overlays */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none z-[1]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none z-[1]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-[1]"></div>

        <div className="relative max-w-7xl mx-auto px-6 z-10 text-slate-900">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-600">
            Certifications
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 font-display">
            Find the right certification path — and move faster in your career
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 text-lg">
            Browse category-based certifications with detailed outcomes,
            who-it’s-for, and clear next steps.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3 max-w-3xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search certifications (e.g., Agile, ISO, DevOps, Cybersecurity)…"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
            />
            <button
              onClick={() => setAdvisorOpen(true)}
              className="px-5 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/10 whitespace-nowrap"
            >
              Talk to Advisor
            </button>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
            certifications
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Training Tracks
        </h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Pick a track based on your role, background, and timeline. We’ll
          tailor recommendations accordingly.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAINING_TRACKS.map((t) => (
            <div
              key={t.title}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
              <p className="mt-2 text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Popular Training Vendors
            </h2>
            <p className="mt-2 text-gray-600">
              Explore training providers and catalogs.
            </p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENDORS.map((v) => (
            <VendorCard
              key={v.title}
              vendor={v}
              onClick={() => navigate(v.href)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Browse by Category
            </h2>
            <p className="mt-2 text-gray-600">
              Clear separation across services and training paths — optimized
              for fast exploration.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOP_CATEGORIES.map((cat) => {
            const match = categories.find((c) => c.slug === cat.slug);
            const count = match
              ? match.groups.reduce((a, g) => a + g.courses.length, 0)
              : 0;
            return (
              <button
                key={cat.slug}
                onClick={() => navigate(`/certifications/${cat.slug}`)}
                className="text-left bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Category
                </div>
                <div className="mt-2 text-lg font-bold text-gray-900">
                  {cat.title}
                </div>
                <div className="mt-3 inline-flex items-center text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                  {count} programs
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              All Certifications
            </h2>
            <p className="mt-2 text-gray-600">
              Click a program to view outcomes, benefits, and enrollment
              options.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.slice(0, 60).map((c) => (
            <CertificationCard key={c.id} cert={c} />
          ))}
        </div>

        {filtered.length > 60 && (
          <div className="mt-10 text-center text-gray-600">
            Showing 60 of {filtered.length}. Use search or open a category to
            see everything.
          </div>
        )}
      </section>

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse=""
      />
    </div>
  );
}
