import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import AdvisorModal from "../components/AdvisorModal";

import AWS from "../assets/aws-kartikey.png";
import Cisco from "../assets/Cisco/CiscoIcon.png";
import microsoft from "../assets/microsoft-kartikey.png";
import ISACA from "../assets/Isaca.svg";

const VENDORS = {
  aws: {
    name: "AWS Training",
    short: "Build cloud fundamentals to architect-level capability with AWS-aligned learning paths.",
    image: AWS,
    seoTitle: "AWS Training | Cloud Learning Paths | Armx-Indecodex",
    seoDescription:
      "Explore AWS training with role-based learning paths, hands-on labs, and advisor support. Build cloud fundamentals, architecture skills, and job-ready capability.",
    highlights: [
      "Role-based tracks: Cloud Practitioner → Associate → Professional",
      "Hands-on labs + project guidance",
      "Interview-focused preparation and mentoring",
      "Flexible delivery: Live / Self-paced",
    ],
    popularTracks: [
      { title: "AWS Foundations", desc: "Cloud concepts, IAM, core services, billing, and best practices." },
      { title: "AWS Associate Path", desc: "Architecture patterns, networking, compute/storage, and operational excellence." },
      { title: "Cloud DevOps on AWS", desc: "CI/CD fundamentals, automation, monitoring, and reliability practices." },
    ],
    recommendedLinks: [
      { label: "Explore Certifications", href: "/certifications" },
      { label: "Cloud & Infrastructure Certifications", href: "/certifications/cloud-infrastructure-networking" },
    ],
  },
  cisco: {
    name: "Cisco Training",
    short: "Master networking fundamentals and enterprise networking skills with Cisco-aligned training paths.",
    image: Cisco,
    seoTitle: "Cisco Training | Networking Learning Paths | Armx-Indecodex",
    seoDescription:
      "Explore Cisco networking training with practical labs, guided learning paths, and advisor support. Build routing, switching, and security fundamentals for IT roles.",
    highlights: [
      "Networking fundamentals → enterprise routing & switching",
      "Lab-first practice with real scenarios",
      "Security concepts and troubleshooting mindset",
      "Flexible delivery and career support",
    ],
    popularTracks: [
      { title: "Network Fundamentals", desc: "OSI model, IP addressing, switching basics, and troubleshooting." },
      { title: "Enterprise Networking", desc: "Routing, VLANs, WAN concepts, resiliency, and best practices." },
      { title: "Network Security Basics", desc: "Security fundamentals for securing enterprise networks." },
    ],
    recommendedLinks: [
      { label: "Explore Certifications", href: "/certifications" },
      { label: "Cloud, Infrastructure & Networking", href: "/certifications/cloud-infrastructure-networking" },
    ],
  },
  microsoft: {
    name: "Microsoft Training",
    short: "Grow in Microsoft cloud and security with role-based learning paths and practical, job-ready training.",
    image: microsoft,
    seoTitle: "Microsoft Training | Azure & Security Learning Paths | Armx-Indecodex",
    seoDescription:
      "Explore Microsoft training (Azure, security, productivity) with practical learning paths, hands-on sessions, and advisor support to accelerate your IT career.",
    highlights: [
      "Azure fundamentals to advanced role-based paths",
      "Security-first learning and best practices",
      "Hands-on training and guided preparation",
      "Flexible delivery: Live / Self-paced",
    ],
    popularTracks: [
      { title: "Azure Fundamentals", desc: "Cloud basics, core services, governance, security fundamentals." },
      { title: "Azure Administrator Path", desc: "Identity, networking, compute/storage, monitoring, operations." },
      { title: "Microsoft Security Basics", desc: "Security principles, identity protection, and governance mindset." },
    ],
    recommendedLinks: [
      { label: "Explore Certifications", href: "/certifications" },
      { label: "Cybersecurity & Compliance", href: "/certifications/cybersecurity-compliance" },
      { label: "Cloud & Infrastructure Certifications", href: "/certifications/cloud-infrastructure-networking" },
    ],
  },
  isaca: {
    name: "ISACA Training",
    short: "Master IT audit, information security management, risk governance, and compliance with ISACA-aligned certifications.",
    image: ISACA,
    seoTitle: "ISACA Certifications Training | CISA, CISM, CRISC | Armx-Indecodex",
    seoDescription:
      "Prepare for ISACA certifications (CISA, CISM, CRISC, CGEIT, CDPSE) with comprehensive learning tracks, mock tests, and advisor guidance.",
    highlights: [
      "Globally recognized credentials: CISA, CISM, CRISC, CGEIT, CDPSE",
      "Aligned with official ISACA exam blueprints and job practice domains",
      "Hands-on case studies and real-world audit & risk scenarios",
      "Mentorship from certified ISACA practitioner instructors",
    ],
    popularTracks: [
      { title: "CISA (Certified Information Systems Auditor)", desc: "World-renowned benchmark for IT audit, assurance, control, and security assessment." },
      { title: "CISM (Certified Information Security Manager)", desc: "Management-focused certification covering info security governance, risk, and incident management." },
      { title: "CRISC (Certified in Risk & Information Systems Control)", desc: "Enterprise IT risk identification, assessment, response, and monitoring controls." },
      { title: "CGEIT (Governance of Enterprise IT)", desc: "Strategic governance, benefits realization, risk optimization, and resource stewardship." },
      { title: "CDPSE (Data Privacy Solutions Engineer)", desc: "Technical privacy implementation and data governance across digital architectures." },
    ],
    recommendedLinks: [
      { label: "Explore Certifications", href: "/certifications" },
      { label: "Dedicated ISACA Certification Hub", href: "/isaca" },
      { label: "Cybersecurity & Compliance", href: "/certifications/cybersecurity-compliance" },
      { label: "PECB Certifications", href: "/pecb" },
    ],
  },
};

export default function TrainingVendor() {
  const navigate = useNavigate();
  const { vendorSlug } = useParams();
  const [advisorOpen, setAdvisorOpen] = useState(false);

  const vendor = useMemo(() => VENDORS[vendorSlug], [vendorSlug]);

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <SEOHead
          title="Training | Armx-Indecodex"
          description="Explore Armx-Indecodex training programs and certification learning paths."
          canonical="https://www.Armx-Indecodextech.in/training"
          ogType="website"
        />
        <div className="max-w-7xl mx-auto px-6 py-14">
          <h1 className="text-3xl font-extrabold text-gray-900">Training page not found</h1>
          <p className="mt-2 text-gray-600">Please go back to Training and choose a program.</p>
          <button
            onClick={() => navigate("/training")}
            className="mt-6 px-5 py-3 rounded-xl bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
          >
            Back to Training
          </button>
        </div>
      </div>
    );
  }

  const canonical = `https://www.Armx-Indecodextech.in/training/${vendorSlug}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <SEOHead
        title={vendor.seoTitle}
        description={vendor.seoDescription}
        canonical={canonical}
        ogType="website"
      />

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link to="/training" className="hover:text-gray-900">Training</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{vendor.name}</span>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{vendor.name}</h1>
              <p className="mt-3 text-gray-700 leading-relaxed">{vendor.short}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setAdvisorOpen(true)}
                  className="px-6 py-3 rounded-xl font-bold bg-blue-700 text-white hover:bg-blue-800 transition"
                >
                  Talk to Advisor
                </button>
                <button
                  onClick={() => navigate("/certifications")}
                  className="px-6 py-3 rounded-xl font-bold bg-white border border-gray-200 text-gray-900 hover:shadow-md transition"
                >
                  Explore Certifications
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={vendor.image}
                  alt={`${vendor.name} logo`}
                  className="h-14 w-14 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="text-sm text-gray-500 font-semibold">Delivery</div>
                  <div className="text-gray-900 font-extrabold">Live / Self-paced</div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-700">
                <div className="font-bold text-gray-900">What you get</div>
                <ul className="list-disc list-inside space-y-1">
                  {vendor.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Popular Learning Tracks</h2>
        <p className="mt-2 text-gray-600 max-w-3xl">
          Choose a track based on your current level. We’ll recommend the right starting point during advisory.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {vendor.popularTracks.map((t) => (
            <div key={t.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
              <p className="mt-2 text-gray-600">{t.desc}</p>
              <button
                onClick={() => setAdvisorOpen(true)}
                className="mt-5 text-sm font-semibold text-blue-700 hover:underline"
              >
                Get recommended plan →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-purple-900 rounded-3xl p-8 md:p-10 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#60a5fa,transparent_40%),radial-gradient(circle_at_80%_20%,#22c55e,transparent_35%),radial-gradient(circle_at_50%_80%,#a855f7,transparent_35%)]" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Ready to start?</h2>
              <p className="mt-2 text-white/85 max-w-2xl">
                Tell us your goal (job switch / promotion / certification). We’ll suggest the best track and timeline.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {vendor.recommendedLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="inline-flex items-center text-sm font-semibold bg-white/10 border border-white/20 px-3 py-2 rounded-xl hover:bg-white/15 transition"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <button
              onClick={() => setAdvisorOpen(true)}
              className="px-6 py-3 rounded-xl font-bold bg-cyan-400 text-slate-900 hover:bg-cyan-300 transition"
            >
              Talk to Advisor
            </button>
          </div>
        </div>
      </section>

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse={vendor?.name || ""}
      />
    </div>
  );
}

