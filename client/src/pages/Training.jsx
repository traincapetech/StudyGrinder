import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import AdvisorModal from "../components/AdvisorModal";

import AWS from "../assets/aws-kartikey.png";
import Cisco from "../assets/Cisco/CiscoIcon.png";
import comptia from "../assets/comptia-2.webp";
import microsoft from "../assets/microsoft-kartikey.png";
import PECB from "../assets/PECB1.png";
import ISACA from "../assets/Isaca.svg";

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
        <div className="text-lg font-extrabold text-gray-900">{vendor.title}</div>
      </div>
      <p className="mt-3 text-sm text-gray-600">{vendor.desc}</p>
      <div className="mt-4 text-sm font-semibold text-blue-700">Browse programs</div>
    </button>
  );
}

export default function Training() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [advisorOpen, setAdvisorOpen] = useState(false);

  const vendorsFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VENDORS;
    return VENDORS.filter((v) => `${v.title} ${v.desc}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <SEOHead
        title="IT Training | Certification & Skill-Based Programs | Armx-Indecodex"
        description="Explore Armx-Indecodex’s IT training: certification-aligned programs, hands-on skill training, and corporate upskilling. Talk to an advisor and choose the right learning path."
        canonical="https://www.Armx-Indecodextech.in/training"
        ogType="website"
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-slate-900 to-purple-900" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#60a5fa,transparent_40%),radial-gradient(circle_at_80%_20%,#22c55e,transparent_35%),radial-gradient(circle_at_50%_80%,#a855f7,transparent_35%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-white">
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-200">
            IT Training
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
            Job‑ready training for cloud, security, networking, and modern IT roles
          </h1>
          <p className="mt-4 max-w-3xl text-white/85 text-lg">
            Choose certification-aligned learning or practical skill-based programs. We’ll help you pick a path based on your goals.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3 max-w-3xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search training providers (e.g., Microsoft, CompTIA, AWS)…"
              className="w-full px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-cyan-300"
            />
            <button
              onClick={() => setAdvisorOpen(true)}
              className="px-5 py-3 rounded-xl font-bold bg-cyan-400 text-slate-900 hover:bg-cyan-300 transition"
            >
              Talk to Advisor
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Training Tracks</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Pick a track based on your role, background, and timeline. We’ll tailor recommendations accordingly.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAINING_TRACKS.map((t) => (
            <div key={t.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
              <p className="mt-2 text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Browse Programs</h2>
            <p className="mt-2 text-gray-600">
              Explore training providers and catalogs. (We keep Certifications separate under the Certifications menu.)
            </p>
          </div>
          <button
            onClick={() => navigate("/certifications")}
            className="px-5 py-3 rounded-xl bg-white border border-gray-200 font-bold text-gray-900 hover:shadow-md transition"
          >
            Explore Certifications
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorsFiltered.map((v) => (
            <VendorCard key={v.title} vendor={v} onClick={() => navigate(v.href)} />
          ))}
        </div>
      </section>

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse=""
      />
    </div>
  );
}
