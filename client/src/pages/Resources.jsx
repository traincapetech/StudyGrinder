import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Compass,
  FileText,
  HelpCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  ChevronRight,
  BookOpen,
  PhoneCall,
  CheckCircle2
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import AdvisorModal from "../components/AdvisorModal";

export default function Resources() {
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [prefillCourse, setPrefillCourse] = useState("");

  const pathways = [
    {
      domain: "Cybersecurity & Information Security",
      badge: "High Demand",
      description: "Progress from fundamental network security into enterprise cyber threat analysis, penetration testing, and ISO governance.",
      steps: [
        { level: "Foundational", cert: "CompTIA Security+", desc: "Core infosec fundamentals, threat models, and risk management." },
        { level: "Intermediate", cert: "CompTIA CySA+ / PenTest+", desc: "Behavioral analytics, vulnerability detection, and ethical exploitation." },
        { level: "Advanced & Governance", cert: "ISO 27001 Lead Auditor / CISM", desc: "Enterprise governance, audit readiness, and security program leadership." },
      ],
    },
    {
      domain: "Cloud Engineering & Architecture",
      badge: "Enterprise Standard",
      description: "Build validated mastery across multi-tier cloud architectures, high-availability deployments, and cloud migration.",
      steps: [
        { level: "Foundational", cert: "AWS Cloud Practitioner / AZ-900", desc: "Understanding cloud principles, billing, and core services." },
        { level: "Associate", cert: "AWS Solutions Architect / AZ-104", desc: "Designing scalable, decoupled virtual networks and storage clusters." },
        { level: "Professional", cert: "AWS DevOps Engineer / AZ-305", desc: "Complex enterprise cloud governance, CI/CD, and disaster recovery." },
      ],
    },
    {
      domain: "IT Audit, Risk & Compliance",
      badge: "Governance",
      description: "Specialize in auditing enterprise information systems, regulatory compliance, and risk controls.",
      steps: [
        { level: "Foundational", cert: "ISO 27001 Lead Implementer", desc: "Designing and deploying an Information Security Management System." },
        { level: "Practitioner", cert: "ISACA CISA", desc: "Global benchmark for auditing controls, assurance, and system integrity." },
        { level: "Strategic Risk", cert: "ISACA CRISC / ISO 31000", desc: "Enterprise risk mitigation, business impact analysis, and compliance." },
      ],
    },
  ];

  return (
    <div className="bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title="Certification Resources & Career Pathways | StudyGrinder"
        description="Explore StudyGrinder's certification guides, career transition pathways, exam preparation blueprints, and frequently asked candidate questions."
        canonical="https://studygrinder.com/resources"
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
            <span>Learning Hub & Guides</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Certification Roadmaps &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              Preparation Resources
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to plan your certification journey: step-by-step career tracks, exam prerequisite guidelines, and expert study strategies.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                setPrefillCourse("Career Roadmap Consultation");
                setAdvisorModalOpen(true);
              }}
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition cursor-pointer"
            >
              Get Free Roadmap Consultation
            </button>
            <Link
              to="/certifications"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition"
            >
              Browse 400+ Certifications
            </Link>
          </div>
        </div>
      </section>

      {/* Pathways Section */}
      <section id="pathways" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Step-by-Step Progression
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recommended Certification Career Pathways
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Wondering which exam comes first? Follow structured industry paths to build credentials with cumulative recognition.
            </p>
          </div>

          <div className="space-y-12">
            {pathways.map((pathway, pIdx) => (
              <div
                key={pIdx}
                className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 mr-2">
                      {pathway.badge}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">{pathway.domain}</h3>
                    <p className="text-sm text-slate-600 mt-1">{pathway.description}</p>
                  </div>

                  <button
                    onClick={() => {
                      setPrefillCourse(pathway.domain);
                      setAdvisorModalOpen(true);
                    }}
                    className="shrink-0 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-blue-600 font-bold text-xs shadow-xs cursor-pointer"
                  >
                    Discuss this Pathway
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
                  {pathway.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-white rounded-2xl border border-slate-200/90 p-5 relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Step 0{sIdx + 1} • {step.level}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-2">{step.cert}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-600">
                        Exam Aligned
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & FAQs */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block mb-3">
              Candidate FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Essential Certification Guidelines
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs divide-y divide-slate-100 space-y-6">
            <div className="pt-2">
              <h4 className="text-base font-bold text-slate-900">How long does it take to prepare for an exam?</h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Most associate-level certifications (such as CompTIA Security+ or AWS Solutions Architect) require 4 to 6 weeks of structured study with 8–10 hours per week. Advanced credentials like CISM or ISO Lead Auditor may take 6 to 8 weeks.
              </p>
            </div>

            <div className="pt-6">
              <h4 className="text-base font-bold text-slate-900">Are exam vouchers included with StudyGrinder training?</h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                StudyGrinder provides training packages with or without official exam vouchers. Our advisors can guide you through exam scheduling and official voucher purchasing for CompTIA, PECB, and ISACA exams.
              </p>
            </div>

            <div className="pt-6">
              <h4 className="text-base font-bold text-slate-900">What if I need help deciding between two certifications?</h4>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                You can request a free consultation with our training advisors. We evaluate your current technical experience, employer demands, and career goals to advise you on the highest-ROI credential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="text-2xl font-extrabold text-slate-900">Have Questions About Your Certification Goals?</h3>
          <p className="text-sm text-slate-600">
            Our certified training advisors are available to review your background and map out a personalized study timeline.
          </p>
          <button
            onClick={() => setAdvisorModalOpen(true)}
            className="mt-4 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
          >
            Speak With a Training Advisor
          </button>
        </div>
      </section>

      <AdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
        prefillCourse={prefillCourse}
      />
    </div>
  );
}
