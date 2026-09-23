import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  Building2,
  GraduationCap,
  Layers,
  ArrowRight
} from "lucide-react";
import logo from "../assets/studygrinder-logo.jpg";
import AdvisorModal from "./AdvisorModal";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);

  const toggleSection = (sectionKey) => {
    setOpenSection(openSection === sectionKey ? null : sectionKey);
  };

  const footerGroups = [
    {
      key: "certifications",
      title: "Certifications",
      icon: Award,
      links: [
        { label: "Project & Program Management", path: "/certifications/project-program-management" },
        { label: "Cybersecurity & Compliance", path: "/certifications/cybersecurity-compliance" },
        { label: "Cloud & Infrastructure", path: "/certifications/cloud-infrastructure-networking" },
        { label: "Agile, Scrum & Lean", path: "/certifications/agile-scrum-lean" },
        { label: "AI, Data & Emerging Tech", path: "/certifications/ai-data-emerging-tech" },
        { label: "CompTIA Tracks", path: "/comptia" },
        { label: "PECB ISO Certifications", path: "/pecb" },
        { label: "ISACA (CISA, CISM, CRISC)", path: "/isaca" },
      ],
    },
    {
      key: "training",
      title: "Training Programs",
      icon: BookOpen,
      links: [
        { label: "Instructor-Led Live Virtual", path: "/training" },
        { label: "Self-Paced Learning Paths", path: "/training" },
        { label: "AWS Training Catalog", path: "/training/aws" },
        { label: "Microsoft Azure Programs", path: "/training/microsoft" },
        { label: "Cisco Enterprise Networking", path: "/training/cisco" },
        { label: "Exam Readiness Bootcamps", path: "/training" },
      ],
    },
    {
      key: "corporate",
      title: "Corporate Learning",
      icon: Building2,
      links: [
        { label: "Corporate Training Overview", path: "/corporate-training" },
        { label: "Team Upskilling Cohorts", path: "/corporate-training#cohorts" },
        { label: "Custom Curriculum Mapping", path: "/corporate-training#custom" },
        { label: "Enterprise Invoicing & Quotes", path: "/corporate-training#enquiry" },
        { label: "Request Corporate Proposal", path: "/corporate-training#enquiry" },
      ],
    },
    {
      key: "resources",
      title: "Resources",
      icon: GraduationCap,
      links: [
        { label: "Learning & Certification Guides", path: "/resources" },
        { label: "Career Transition Pathways", path: "/resources#pathways" },
        { label: "Certification FAQs", path: "/frequently-asked-questions" },
        { label: "Knowledge Insights & Blogs", path: "/blogs" },
        { label: "Certificate Verification", path: "/verify-certificate" },
      ],
    },
    {
      key: "solutions",
      title: "Software Solutions",
      subtitle: "Secondary Capability",
      icon: Layers,
      links: [
        { label: "Custom Software Engineering", path: "/services/custom-software-development" },
        { label: "Bespoke CRM Platforms", path: "/services/crm-development" },
        { label: "Web Applications & Portals", path: "/services/web-development" },
        { label: "Mobile Apps (iOS & Android)", path: "/services/mobile-app-development" },
        { label: "Cloud Services & DevOps", path: "/services/cloud-services" },
      ],
    },
    {
      key: "company",
      title: "Company & Trust",
      icon: ShieldCheck,
      links: [
        { label: "About StudyGrinder", path: "/about-us" },
        { label: "Contact Us", path: "/contact-us" },
        { label: "Career Opportunities", path: "/career" },
        { label: "Privacy Policy", path: "/policies" },
        { label: "Terms & Conditions", path: "/terms-and-conditions" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800 relative z-10">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-blue-800/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block mb-2">
              Accelerate Your Learning
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Ready to earn your next professional certification?
            </h3>
            <p className="text-sm text-blue-200/90 mt-1 max-w-xl">
              Connect with a StudyGrinder training advisor to assess your prerequisites, choose the right exam path, and build a tailored study schedule.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setAdvisorModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer"
            >
              Talk to a Training Advisor
            </button>
            <Link
              to="/certifications"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-200"
            >
              Explore 400+ Certifications
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info & Mission (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="bg-white p-1 rounded-xl border border-slate-700 shadow-md">
                <img
                  src={logo}
                  alt="StudyGrinder"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  Study<span className="text-orange-500">Grinder</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  Accelerate Your Learning
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              StudyGrinder is a professional certification training and learning platform dedicated to helping individuals and organizations develop verified industry skills and prepare for globally recognized credentials.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:support@studygrinder.com" className="hover:text-white transition-colors">
                  support@studygrinder.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Industry-Aligned Exam Preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Individual & Corporate Training Options</span>
              </div>
            </div>
          </div>

          {/* Nav Categories Grid (8 cols on lg) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {footerGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.key} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-800/80 text-blue-400">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      {group.title}
                    </h4>
                  </div>
                  {group.subtitle && (
                    <span className="inline-block text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                      {group.subtitle}
                    </span>
                  )}
                  <ul className="space-y-2 text-xs">
                    {group.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          to={link.path}
                          className="text-slate-400 hover:text-white transition-colors duration-150 inline-flex items-center gap-1 hover:translate-x-0.5 transform"
                        >
                          <ChevronRight className="w-3 h-3 text-slate-600" />
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} StudyGrinder. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/policies" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact-us" className="hover:text-slate-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>

      <AdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
      />
    </footer>
  );
}
