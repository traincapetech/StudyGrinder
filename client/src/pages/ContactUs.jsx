import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "../components/SEOHead";
import toast from "react-hot-toast";
import { submitLead } from "../utils/submitLead";
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
  // Form payload state
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    company: "",
    phoneNumber: "",
    location: "", // Country
    industry: "",
    subject: "",  // Service Interested
    budget: "",
    timeline: "",
    preferredContact: "Email",
    message: "",
    website: "", // Honeypot spam protection field
  });

  // State controls
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // File Upload state
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // FAQ expanded state
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Call Scheduler state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isCallScheduled, setIsCallScheduled] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set default date for call scheduler (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Form option options
  const servicesList = [
    "Custom Software Development",
    "CRM Development",
    "Website Development",
    "Mobile App Development",
    "UI/UX Design System",
    "Cloud Services & DevOps",
    "AI Solutions & RAG",
    "Cyber Security & IT Audit",
    "Partner Program Inquiry",
    "Other Services",
  ];

  const budgetsList = [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
  ];

  const timelinesList = [
    "Immediate (Less than 1 month)",
    "1 - 3 Months",
    "3 - 6 Months",
    "Flexible / Ongoing Support",
  ];

  const preferredContacts = ["Email", "Phone Call", "WhatsApp"];

  // Generate scheduler dates (next 5 working days)
  const getSchedulerDates = () => {
    const dates = [];
    let count = 0;
    let daysToAdd = 1;
    while (count < 5) {
      const d = new Date();
      d.setDate(d.getDate() + daysToAdd);
      // Skip Sundays
      if (d.getDay() !== 0) {
        dates.push({
          raw: d.toISOString().split("T")[0],
          formatted: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        });
        count++;
      }
      daysToAdd++;
    }
    return dates;
  };

  const schedulerDates = getSchedulerDates();
  const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];

  // Real-time single field validation
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Full name is required.";
      else if (value.trim().length < 2) error = "Name must be at least 2 characters.";
    }
    if (name === "email") {
      if (!value.trim()) error = "Business email is required.";
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
        error = "Please enter a valid email address.";
      }
    }
    if (name === "phoneNumber") {
      if (!value.trim()) error = "Phone number is required.";
      else if (!/^\+?[0-9\s-]{7,15}$/.test(value.trim())) {
        error = "Please enter a valid phone number (e.g. +44 1253 928501).";
      }
    }
    if (name === "location") {
      if (!value.trim()) error = "Country/Location is required.";
    }
    if (name === "subject" && currentStep === 2) {
      if (!value) error = "Please select a service interest.";
    }
    if (name === "budget" && currentStep === 2) {
      if (!value) error = "Please select a budget range.";
    }
    if (name === "timeline" && currentStep === 2) {
      if (!value) error = "Please specify a project timeline.";
    }
    if (name === "message" && currentStep === 2) {
      if (!value.trim()) error = "Project description is required.";
      else if (value.trim().length < 15) error = "Please describe in at least 15 characters.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Step 1 Validation check
  const handleNextStep = (e) => {
    e.preventDefault();
    const step1Fields = ["name", "email", "phoneNumber", "location"];
    const stepErrors = {};
    let hasError = false;

    step1Fields.forEach((field) => {
      const error = validateField(field, payload[field]);
      if (error) {
        stepErrors[field] = error;
        hasError = true;
      }
    });

    setTouched((prev) => ({
      ...prev,
      name: true,
      email: true,
      phoneNumber: true,
      location: true,
    }));
    setErrors(stepErrors);

    if (!hasError) {
      setCurrentStep(2);
      window.scrollTo({ top: 350, behavior: "smooth" });
    } else {
      toast.error("Please fill in all Step 1 fields correctly.");
    }
  };

  // Drag and Drop File Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;

    // Check size limit (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    setFile(selectedFile);
    setUploadProgress(0);

    // Mock progress bar upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        setUploadProgress(100);
        clearInterval(interval);
        toast.success("File uploaded successfully!");
      } else {
        setUploadProgress(progress);
      }
    }, 100);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  // Submit Lead Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 1. Spam protection honeypot verification
    if (payload.website) {
      // Quietly ignore or report success to confuse bots
      setIsSuccess(true);
      return;
    }

    const step2Fields = ["subject", "budget", "timeline", "message"];
    const stepErrors = {};
    let hasError = false;

    step2Fields.forEach((field) => {
      const error = validateField(field, payload[field]);
      if (error) {
        stepErrors[field] = error;
        hasError = true;
      }
    });

    setTouched((prev) => ({
      ...prev,
      subject: true,
      budget: true,
      timeline: true,
      message: true,
    }));
    setErrors((prev) => ({ ...prev, ...stepErrors }));

    if (hasError) {
      toast.error("Please fill in all Step 2 details correctly.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Build a comprehensive, formatted corporate requirements summary
      const finalMessage = `
--- ENTERPRISE SERVICE CONSULTATION REQUEST ---
Company: ${payload.company || "N/A"}
Industry: ${payload.industry || "N/A"}
Country: ${payload.location}
Preferred Contact: ${payload.preferredContact}
Budget Scope: ${payload.budget}
Timeline Scope: ${payload.timeline}
Attachment Attached: ${file ? `${file.name} (Uploaded)` : "None"}

Project Details:
${payload.message}
      `.trim();

      // Submit API request
      await submitLead({
        name: payload.name.trim(),
        email: payload.email.trim(),
        phoneNumber: payload.phoneNumber.trim(),
        location: payload.location.trim(),
        subject: payload.subject,
        message: finalMessage,
      });

      setIsSuccess(true);
      toast.success("Consultation request received successfully!");
    } catch (err) {
      toast.error(err?.message || "Failed to submit request. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Discovery Call Scheduler Action
  const handleScheduleCall = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and a time slot.");
      return;
    }

    const name = payload.name.trim();
    const email = payload.email.trim();
    const phoneNumber = payload.phoneNumber.trim();

    if (!name || name.length < 2) {
      toast.error("Please enter your name to schedule the call.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!phoneNumber) {
      toast.error("Please enter your phone number.");
      return;
    }

    setIsScheduling(true);
    try {
      const scheduleMessage = `
--- SYSTEM SCHEDULED DISCOVERY CALL ---
Requested Date: ${selectedDate}
Requested Time: ${selectedTime} (IST Timezone)
Company Info: ${payload.company || "Not Specified"}
Action Required: Please send calendar invite or call client at the scheduled hour.
      `.trim();

      await submitLead({
        name,
        email,
        phoneNumber,
        location: payload.location || "Online Scheduler",
        subject: "Discovery Call Booking",
        message: scheduleMessage,
      });

      setIsCallScheduled(true);
      toast.success(`Discovery session requested for ${selectedDate} at ${selectedTime}!`);
    } catch (err) {
      toast.error(err?.message || "Failed to schedule call. Please try again.");
    } finally {
      setIsScheduling(false);
    }
  };

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
        title="Consultation & Enterprise RFP Portal | Armx-Indecodex"
        description="Discuss your enterprise requirements with Armx-Indecodex's engineering architects. Submit your RFP or request a secure 1-on-1 technical discovery call."
        canonical="https://www.Armx-Indecodextech.in/contact-us"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Armx-Indecodex Consultation & RFP Portal",
          "description": "Enterprise-grade IT Solutions discovery call and lead validation form.",
          "url": "https://www.Armx-Indecodextech.in/contact-us",
          "mainEntity": {
            "@type": "Organization",
            "name": "Armx-Indecodex (OPC) Private Limited",
            "telephone": "+91-9911910793",
            "email": "sales@Armx-Indecodextech.info",
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
                <span>The Armx-Indecodex Standard</span>
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
                  <a href="tel:+44 1253 928501" className="hover:text-blue-600 hover:underline transition-colors font-semibold">
                    +44 1253 928501
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <BsWhatsapp className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <a href="https://wa.me/+441253928501" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 hover:underline transition-colors font-semibold">
                    +44 1253 928501 (WhatsApp Business)
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: 2-Step Lead Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md border border-slate-200/60 relative">

              {/* Form Step Banner */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900">Enterprise Solutions Brief</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Please provide project parameters for engineering sizing.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${currentStep === 1 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}>Step 1</div>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-350" />
                  <div className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${currentStep === 2 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                    }`}>Step 2</div>
                </div>
              </div>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-6 text-center max-w-md mx-auto"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-md shadow-emerald-500/10">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Request Lodged Successfully</h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                    Thank you for submitting your brief. An Enterprise Solution Architect is compiling initial estimates. We will reach out within 4 hours.
                  </p>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-left space-y-2 mb-8">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Estimated Callback Slot</div>
                    <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>Today, before {new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setCurrentStep(1);
                      setPayload({
                        name: "",
                        email: "",
                        company: "",
                        phoneNumber: "",
                        location: "",
                        industry: "",
                        subject: "",
                        budget: "",
                        timeline: "",
                        preferredContact: "Email",
                        message: "",
                        website: "",
                      });
                      setFile(null);
                    }}
                    className="bg-blue-600 hover:bg-blue-505 text-white font-bold px-6 py-2.5 rounded-lg text-sm shadow-md transition-all shadow-blue-500/10"
                  >
                    Submit another requirements brief
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                  {/* Skip to Scoping Wizard Banner */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-xs text-slate-600 flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-start gap-2.5">
                      <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0 animate-pulse" />
                      <div>
                        <span className="font-bold text-slate-800">Already have project specifications?</span>
                        <p className="mt-0.5 text-slate-500">Skip this form and use our Project Scoping Wizard to map requirements, budgets, and timeline parameters.</p>
                      </div>
                    </div>
                    <Link
                      to="/requirement-wizard"
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3.5 py-2 rounded-lg whitespace-nowrap transition-all hover:scale-102"
                    >
                      Start Wizard
                    </Link>
                  </div>

                  {/* Step 1: Corporate Profile */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-5"
                    >
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          <span>Full Name <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={payload.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="John Doe"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                            }`}
                        />
                        {errors.name && (
                          <div id="name-error" className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.name}</span>
                          </div>
                        )}
                      </div>

                      {/* Business Email */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          <span>Business Email <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={payload.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="johndoe@company.com"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                            }`}
                        />
                        {errors.email && (
                          <div id="email-error" className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5" />
                          <span>Company Name</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={payload.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-slate-350 transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone Number */}
                        <div className="space-y-1.5">
                          <label htmlFor="phoneNumber" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5" />
                            <span>Phone Number <span className="text-red-500">*</span></span>
                          </label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={payload.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="+1 555-0199"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.phoneNumber}
                            aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
                            className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.phoneNumber ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                              }`}
                          />
                          {errors.phoneNumber && (
                            <div id="phone-error" className="text-xs text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>{errors.phoneNumber}</span>
                            </div>
                          )}
                        </div>

                        {/* Country */}
                        <div className="space-y-1.5">
                          <label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5" />
                            <span>Country <span className="text-red-500">*</span></span>
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={payload.location}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="United States"
                            required
                            aria-required="true"
                            aria-invalid={!!errors.location}
                            aria-describedby={errors.location ? "location-error" : undefined}
                            className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.location ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                              }`}
                          />
                          {errors.location && (
                            <div id="location-error" className="text-xs text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>{errors.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Industry */}
                      <div className="space-y-1.5">
                        <label htmlFor="industry" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5" />
                          <span>Industry vertical</span>
                        </label>
                        <input
                          type="text"
                          id="industry"
                          name="industry"
                          value={payload.industry}
                          onChange={handleChange}
                          placeholder="Healthcare, FinTech, E-commerce..."
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-slate-350 transition-all"
                        />
                      </div>

                      {/* Honeypot Spam Protection Field (Invisible to human users) */}
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="website">Leave blank</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          tabIndex="-1"
                          value={payload.website}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>

                      {/* Action Step 1 */}
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-full bg-blue-600 hover:bg-blue-505 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-98"
                        >
                          <span>Proceed to Project Scope</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-center mt-2">
                        <p className="text-[11px] text-slate-450 font-medium">
                          🔒 Your details are 100% confidential. We never spam.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Project Scope & Parameters */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Service Interested */}
                        <div className="space-y-1.5">
                          <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Service Interested <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={payload.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            aria-invalid={!!errors.subject}
                            className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.subject ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                              }`}
                          >
                            <option value="" disabled>Select Service...</option>
                            {servicesList.map((service) => (
                              <option key={service} value={service}>{service}</option>
                            ))}
                          </select>
                          {errors.subject && (
                            <div className="text-xs text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>{errors.subject}</span>
                            </div>
                          )}
                        </div>

                        {/* Preferred Contact Method */}
                        <div className="space-y-1.5">
                          <label htmlFor="preferredContact" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Preferred Contact Method
                          </label>
                          <select
                            id="preferredContact"
                            name="preferredContact"
                            value={payload.preferredContact}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-slate-350 transition-all"
                          >
                            {preferredContacts.map((method) => (
                              <option key={method} value={method}>{method}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Budget Scope */}
                        <div className="space-y-1.5">
                          <label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Budget Parameters <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={payload.budget}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            aria-invalid={!!errors.budget}
                            className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.budget ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                              }`}
                          >
                            <option value="" disabled>Select Budget...</option>
                            {budgetsList.map((b) => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                          {errors.budget && (
                            <div className="text-xs text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>{errors.budget}</span>
                            </div>
                          )}
                        </div>

                        {/* Project Timeline */}
                        <div className="space-y-1.5">
                          <label htmlFor="timeline" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Timeline Scope <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={payload.timeline}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            aria-invalid={!!errors.timeline}
                            className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.timeline ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                              }`}
                          >
                            <option value="" disabled>Select Timeline...</option>
                            {timelinesList.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                          {errors.timeline && (
                            <div className="text-xs text-red-500 font-semibold flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              <span>{errors.timeline}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Project Description Message */}
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Project Scope & Specifications <span className="text-red-500">*</span></span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={payload.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Please outline system capabilities, user load targets, integration endpoints, or any existing system audits..."
                          rows="4"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className={`w-full px-4 py-3 border rounded-xl bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.message ? "border-red-500 focus:ring-red-400" : "border-slate-200 focus:border-slate-350"
                            }`}
                        ></textarea>
                        {errors.message && (
                          <div id="message-error" className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.message}</span>
                          </div>
                        )}
                      </div>

                      {/* Custom Drag & Drop File Attachment */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Upload Requirements / RFPs (Optional, Max 10MB)
                        </label>
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${isDragging
                              ? "border-blue-600 bg-blue-50/40"
                              : "border-slate-200 hover:border-blue-500 hover:bg-slate-50/50"
                            }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                            className="hidden"
                          />
                          {!file ? (
                            <div className="space-y-2">
                              <Upload className="h-8 w-8 text-slate-450 mx-auto" />
                              <div className="text-sm font-semibold text-slate-700">
                                Drag & drop file, or <span className="text-blue-600 hover:underline">browse</span>
                              </div>
                              <p className="text-xs text-slate-400">PDF, Word, Excel, or ZIP files accepted.</p>
                            </div>
                          ) : (
                            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100 max-w-sm mx-auto">
                                <span className="text-xs font-bold text-slate-700 truncate mr-2">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={removeFile}
                                  className="text-xs text-red-500 hover:text-red-600 font-bold"
                                >
                                  Remove
                                </button>
                              </div>
                              {uploadProgress < 100 && (
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                                  <div
                                    className="bg-blue-600 h-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="w-1/3 border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-1 active:scale-98"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || (file && uploadProgress < 100)}
                          className="w-2/3 bg-blue-600 hover:bg-blue-550 text-white font-bold py-3.5 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Booking Consultation..." : "Submit Request & Lock Slot"}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <p className="text-[11px] text-slate-450 font-medium">
                          ⚡ We respect your timeline. Initial scoping response guaranteed within 4 hours.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
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
                href="mailto:sales@Armx-Indecodextech.info"
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
