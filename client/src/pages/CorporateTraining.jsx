import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  Award,
  CheckCircle2,
  Calendar,
  Briefcase,
  Layers,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Headphones
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import RegistrationForm from "../components/RegistrationForm";

export default function CorporateTraining() {
  return (
    <div className="bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title="Corporate Training & Enterprise Upskilling | StudyGrinder"
        description="Empower your technical workforce with StudyGrinder corporate certification training. Customized cohorts, exam preparation, and verified skill progression for teams."
        canonical="https://studygrinder.com/corporate-training"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Building2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Enterprise & Team Learning Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Upskill Your Workforce. Validate Competence with{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">
              Industry Certifications.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            StudyGrinder partners with engineering directors, L&D managers, and HR leaders to deliver tailored certification training cohorts for technical teams.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#enquiry"
              className="px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all"
            >
              Request Corporate Proposal
            </a>
            <a
              href="#programs"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              Explore Team Programs
            </a>
          </div>
        </div>
      </section>

      {/* Why Organizations Choose StudyGrinder */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
              Strategic Value
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Forward-Thinking Companies Train With Us
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Certification training helps organizations retain top engineering talent, reduce software delivery risks, and fulfill enterprise compliance mandates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Compliance & Security",
                desc: "Equip teams to implement ISO 27001, CMMC, and SOC2 governance controls with certified assurance.",
              },
              {
                icon: TrendingUp,
                title: "Higher Retention & Morale",
                desc: "Engineers thrive when their employer invests in verifiable credentials and structured career pathways.",
              },
              {
                icon: FileCheck2,
                title: "Standardized Best Practices",
                desc: "Ensure all developers, DevOps, and cloud architects follow common architectural patterns and frameworks.",
              },
              {
                icon: Users,
                title: "Customized Cohort Pacing",
                desc: "Training delivered during working hours, weekends, or sprint downtimes without hampering release deadlines.",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-400 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Tracks & Formats */}
      <section id="programs" className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 inline-block mb-3">
              Corporate Curricula
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Popular Enterprise Certification Tracks
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Customizable training modules mapped directly to enterprise certification standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cloud & Infrastructure",
                vendor: "AWS & Microsoft Azure",
                skills: "Cloud Architecture, Kubernetes, Terraform, AZ-104, AWS Solutions Architect, Cost Optimization",
                audience: "DevOps engineers, sysadmins, backend developers",
              },
              {
                title: "Cybersecurity & Governance",
                vendor: "CompTIA, PECB & ISACA",
                skills: "Security+, CySA+, ISO 27001 Lead Implementer, CISA Audit, Network Defenses, Vulnerability Assessment",
                audience: "Infosec teams, compliance officers, network engineers",
              },
              {
                title: "Agile & Project Leadership",
                vendor: "PMI & Scrum Alliance",
                skills: "PMP Prep, Scrum Master (CSM), Agile Delivery, Sprint Planning, Stakeholder Management",
                audience: "Technical project managers, scrum masters, delivery leads",
              },
            ].map((track, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-2">
                    {track.vendor}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{track.title}</h3>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Curriculum Highlights:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">{track.skills}</p>
                  </div>

                  <div className="mt-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Ideal Target Team:
                    </span>
                    <p className="text-xs text-slate-600">{track.audience}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href="#enquiry"
                    className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition"
                  >
                    Request Custom Syllabus
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Enquiry Form */}
      <section id="enquiry" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-3 py-1 rounded-full border border-orange-500/25 inline-block mb-2">
                Enterprise Quote
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Request a Corporate Training Proposal
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Share your team size, target certifications, and scheduling requirements. We will prepare a customized proposal and curriculum breakdown.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl border border-slate-100">
              <RegistrationForm
                prefillCourse="Corporate Team Upskilling"
                source="Corporate Training Page"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
