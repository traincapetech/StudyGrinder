import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "../components/SEOHead";
import toast from "react-hot-toast";
import RegistrationForm from "../components/RegistrationForm";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Info,
  ChevronDown,
  ArrowRight,
  Upload,
  User,
  Building2,
  Globe,
  Briefcase,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const ContactUs = () => {
  // FAQ expanded state
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    const faqData = [
    {
      q: "What happens after I submit my consultation request?",
      a: "An Enterprise Solutions Architect will review your requirements and respond within 4 hours. We will prepare an initial assessment and schedule an introductory technical call to discuss scope.",
    },
    {
      q: "Do you sign Non-Disclosure Agreements (NDAs)?",
      a: "Yes. We respect your intellectual property. We sign standard corporate NDAs before discussing any project details, system architecture, or proprietary logic.",
    },
    {
      q: "What pricing models do you offer for software engineering?",
      a: "We offer Time & Materials (T&M), Fixed Price contracts, and dedicated engineering team retainers depending on project clarity, scale, and agility requirements.",
    },
    {
      q: "How do you ensure cybersecurity and data compliance?",
      a: "As an ISO 9001 and ISO 27001 partner, our architecture, pipelines, and hosting follow strict cybersecurity protocols. We build HIPAA, SOC2, and GDPR-compliant structures.",
    },
    {
      q: "Can you integrate with our existing CRMs and ERP systems?",
      a: "Yes. Our engineering team specializes in connecting custom business logic with legacy ERPs, Salesforce, HubSpot, SAP, and other cloud databases via secure REST/GraphQL APIs.",
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20 relative" style={{ fontFamily: "Inter, sans-serif" }}>
      <SEOHead
        title="Contact Admissions & Course Advisory | StudyGrinder"
        description="Connect with StudyGrinder's course advisory and admissions team. Submit your inquiry to register@studygrinder.com for certification training programs."
        canonical="https://studygrinder.com/contact-us"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "StudyGrinder Course Advisory & Admissions",
          "description": "Certification training inquiry and registration form.",
          "url": "https://studygrinder.com/contact-us",
          "mainEntity": {
            "@type": "Organization",
            "name": "StudyGrinder",
            "telephone": "++44 7353 049644",
            "email": "register@studygrinder.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sector 7, Dwarka",
              "addressLocality": "New Delhi",
              "addressRegion": "Delhi",
              "postalCode": "110077",
              "addressCountry": "IN"
            }
          }
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-[#0e1630] py-20 lg:py-28 text-white text-center relative overflow-hidden">
        {/* Glow rings */}
        <div className="absolute top-[-50%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-40%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="h-3 w-3 text-cyan-300" />
            <span>Consultation & Lead System</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Let's Engineer Your <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Digital Transformation
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-350 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Skip the generic forms. Tell us about your technical specs, budget parameters, and business roadmap to initiate our solution architecture loop.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-6 border-t border-white/10 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4 Hours</div>
              <div className="text-xs text-slate-400 font-medium">Guaranteed SLA Response</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">ISO 27001</div>
              <div className="text-xs text-slate-400 font-medium">Security Compliant Partner</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium">IP Protection & NDA</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4.9/5★</div>
              <div className="text-xs text-slate-400 font-medium">Partner Client Review</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Structure */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-[-60px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Why Partner + Scheduler + Contacts */}
          <div className="lg:col-span-5 space-y-8">

            {/* Why Contact Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-200/60 hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <Sparkles className="h-5.5 w-5.5 text-blue-600" />
                <span>The StudyGrinder Standard</span>
              </h2>

              <ul className="space-y-6">
                {[
                  {
                    title: "Solutions Architecture First",
                    desc: "We don't just sell hours. We map database dependencies, system scale parameters, and cloud costs during pre-engineering.",
                  },
                  {
                    title: "Rigorous Code Reviews",
                    desc: "Every logic block is audited by Senior Architects for performance (LCP/INP), scale safety, and memory management.",
                  },
                  {
                    title: "ISO-Certified Security",
                    desc: "All client code, database networks, and staging layers adhere to ISO 9001 quality and ISO 27001 data compliance.",
                  },
                  {
                    title: "Dedicated Technical Lead",
                    desc: "Get direct, timezone-aligned communication with a dedicated Technical Manager. No generic ticketing layers.",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base">{item.title}</h4>
                      <p className="text-xs md:text-sm text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            
            {/* Quick Contacts */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-200/60 space-y-4">
              <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                Escalation Contacts
              </h4>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-650">
                
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <a href="mailto:register@studygrinder.com" className="hover:text-blue-600 hover:underline transition-colors font-semibold">
                    register@studygrinder.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <a href="tel:+44 7353 049644" className="hover:text-blue-600 hover:underline transition-colors font-semibold">
                    +44 7353 049644
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <BsWhatsapp className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <a href="https://wa.me/+447353049644" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 hover:underline transition-colors font-semibold">
                    +44 7353 049644 (WhatsApp Business)
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: 2-Step Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md border border-slate-200/60 relative">

              <div className="mb-6 pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 mb-2 inline-block">
                  Official Admissions & Inquiries
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-900">
                  Course & Advisory Registration
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill out your details below. Every inquiry is delivered directly to our admissions desk at <strong className="text-slate-800">register@studygrinder.com</strong>.
                </p>
              </div>

              <RegistrationForm source="Contact Page" />
            </div>
          </div>

        </div>
      </section>


      {/* Accordion FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <HelpCircle className="h-10 w-10 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
            Consultation FAQ
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Answers to key questions about our discovery call process, NDA policies, and deliverables.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  aria-expanded={isExpanded}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <span className="font-bold text-slate-800 text-sm md:text-base leading-tight pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-450 transition-transform flex-shrink-0 ${isExpanded ? "transform rotate-180" : ""
                      }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA / SLA Partnership banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-blue-900 to-[#0e1630] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          {/* Ambient glow backgrounds */}
          <div className="absolute top-[-50%] left-[-20%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Zap className="h-3.5 w-3.5" />
              <span>SLA Response Commitment</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Looking for a Dedicated Engineering Retainer?
            </h3>
            <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
              If your enterprise requires a structured dedicated pod of developers, cloud engineers, and UI designers, skip standard consultation queues and request a direct technical onboarding agenda.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="mailto:register@studygrinder.com"
                className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-2.5 rounded-xl transition text-xs shadow-md shadow-white/10"
              >
                Request Technical SLA Proposal
              </a>
              <a
                href="tel:+44 1253 928501"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold px-6 py-2.5 rounded-xl transition text-xs"
              >
                Direct Line: +44 1253 928501
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
