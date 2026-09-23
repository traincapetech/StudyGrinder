import { useEffect, useState, useRef } from "react"
import { FaArrowRight, FaSquareWhatsapp } from "react-icons/fa6"
import { Link, useNavigate, NavLink } from "react-router-dom"
import { BsCheck2Circle } from "react-icons/bs"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Typewriter from "typewriter-effect"
import SEOHead from "../components/SEOHead"
import {
  Sparkles,
  Building2,
  Shield,
  ShieldCheck,
  Cpu,
  BarChart3,
  Users,
  Smartphone,
  Laptop,
  Workflow,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  ChevronRight,
  TrendingUp,
  Database,
  Bell,
  CreditCard,
  CheckCircle2,
  X,
  ArrowRight,
  Layers,
  FileSpreadsheet,
  Lock
} from "lucide-react"

// Attached platform overview image
import platformOverviewImg from "../assets/armx-indicodex-platform-overview.png"
// Hero video bundled by webpack
import heroVideoAsset from "../assets/armx-hero.mp4"

// Banner images
import img2 from "../assets/img-2.jpg"
import img3 from "../assets/img-3.jpg"
import img4 from "../assets/img4.jpg"

// Service cards
import card1 from "../assets/card1.jpeg"
import card2 from "../assets/card2.jpeg"
import card3 from "../assets/card3.jpeg"
import card4 from "../assets/card4.jpeg"
import card5 from "../assets/card5.jpeg"
import card6 from "../assets/card6.jpeg"

// Logos
import comptia from "../assets/comptia-2.webp"
import comptiaA from "../assets/CompTIA_A+.png"
import comptiaCySA from "../assets/CompTIA_CySA+.png"
import comptiaNetwork from "../assets/CompTIA_Network+.png"
import comptiaSecurity from "../assets/CompTIA_Security+.png"
import pecb from "../assets/PECB1.png"
import ISACA from "../assets/Isaca.svg"
import pecbAI from "../assets/PECB_AIP.jpeg"
import pecbAIMR from "../assets/AI_Risk_Management.jpeg"
import pecbNetwork from "../assets/PECB_IEC_27033_Network_Security.jpeg"
import pecbComputerForensics from "../assets/PECB_Computer_Forensics.jpeg"


// Partner logos
import Logo1 from "../assets/SBS.png"
import Logo2 from "../assets/ThreatMatrix.png"
import Logo4 from "../assets/Gruslabs.svg"
import Logo5 from "../assets/MSA.png"
import Logo6 from "../assets/spectre.webp"

// Other images
import team from "../assets/team.jpeg"
import mircro from "../assets/microsoft-kartikey.png"
import PECB from "../assets/PECB1.png"
import AWS from "../assets/aws-kartikey.png"
import Cisco from "../assets/Cisco/CiscoIcon.png"

const img1 = "/img-1.jpg";

const serviceCards = [
  {
    title: "Custom CRM Solutions",
    description: "Built for the way you work. Tailored lead pipelines, deal tracking, customer 360, and multi-channel conversion funnels.",
    image: card5,
    route: "/products/crm"
  },
  {
    title: "Business Automation Systems",
    description: "One intelligent system unifying Attendance, Automated Payroll, Employee Management, and smart alerts across departments.",
    image: card6,
    route: "/services/crm-development"
  },
  {
    title: "Web & Enterprise Portals",
    description: "High-performance React & Next.js web applications engineered for scalability, speed, and mission-critical workflows.",
    image: card4,
    route: "/services/web-development"
  },
  {
    title: "Cloud Infrastructure & DevOps",
    description: "Enterprise-grade cloud architectures, automated CI/CD pipelines, containerized deployments, and 99.99% uptime guarantees.",
    image: card1,
    route: "/services/cloud-services"
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS and Android, keeping your teams and customers connected from anywhere.",
    image: card2,
    route: "/services/mobile-app-development"
  },
  {
    title: "AI Solutions & Data Analytics",
    description: "Real-time insights for smarter decisions with predictive analytics, AI automation, and interactive executive reporting.",
    image: card3,
    route: "/services/ai-solutions"
  },
];

const serviceImageDimensions = {
  "Custom CRM Solutions": { width: 736, height: 490 },
  "Business Automation Systems": { width: 626, height: 415 },
  "Web & Enterprise Portals": { width: 626, height: 417 },
  "Cloud Services": { width: 626, height: 345 },
  "Mobile App Development": { width: 626, height: 379 },
  "AI Solutions & Data Analytics": { width: 626, height: 415 }
};

const partnerLogoDimensions = {
  "SBS": { width: 2133, height: 593 },
  "ThreatMatrix": { width: 15857, height: 2685 },
  "Gruslabs": { width: 150, height: 50 },
  "MSA Software": { width: 93, height: 54 },
  "Spectre": { width: 300, height: 150 }
};

const Home = () => {
  const isReactSnap =
    typeof navigator !== "undefined" && String(navigator.userAgent || "").includes("ReactSnap");

  // Video and modal controls
  const videoRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [activeEcosystemTab, setActiveEcosystemTab] = useState(0);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Close lightbox on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowOverviewModal(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const courseData = [
    {
      image: comptia,
      title: "COMPTIA",
      description: "Industry-standard IT certifications across multiple levels and specializations",
      price: "$300",
      url: "/comptia",
    },
    {
      image: comptiaA,
      title: "COMPTIA A+",
      description: "Industry-standard IT certifications across multiple levels and specializations",
      price: "$300",
      url: "/comptia/specialist/a-plus",
    },
    {
      image: comptiaNetwork,
      title: "CompTIA Network+",
      description: "Industry-standard IT certifications across multiple levels and specializations",
      price: "$300",
      url: "/comptia/specialist/network-plus",
    },
    {
      image: comptiaSecurity,
      title: "COMPTIA Security+",
      description: "Industry-standard IT certifications across multiple levels and specializations",
      price: "$300",
      url: "/comptia/specialist/security-plus",
    },
    {
      image: comptiaCySA,
      title: "CompTIA CySA+",
      description: "Industry-standard IT certifications across multiple levels and specializations",
      price: "$300",
      url: "/comptia/professional/cysa-plus",
    },
    {
      image: PECB,
      title: "PECB",
      description: "Excel in compliance and IT security with internationally recognized certifications",
      price: "$400",
      url: "/PECB"
    },
    {
      image: pecbAI,
      title: "Artificial Intelligence Professional",
      description: "Master AI technologies, machine learning, and AI implementation strategies for business applications",
      price: "$400",
      url: "/pecb/artificial-intelligence/ai-professional"
    },
    {
      image: pecbAIMR,
      title: "AI Risk Management Professional",
      description: "Learn to identify, assess, and manage risks associated with artificial intelligence systems",
      price: "$400",
      url: "/pecb/artificial-intelligence/ai-risk-management"
    },
    {
      image: pecbNetwork,
      title: "IEC_27033_Network_Security",
      description: "Master network security principles and best practices for protecting digital assets",
      price: "$400",
      url: "/pecb/cybersecurity/network-security"
    },
    {
      image: pecbComputerForensics,
      title: "Computer_Forensics_Professional",
      description: "Learn digital forensics techniques for investigating cybercrimes and security incidents",
      price: "$400",
      url: "/pecb/cybersecurity/computer-forensics"
    },
    {
      image: ISACA,
      title: "ISACA CISA",
      description: "Certified Information Systems Auditor — Global benchmark for IT audit, controls and assurance.",
      price: "$450",
      url: "/isaca"
    },
    {
      image: ISACA,
      title: "ISACA CISM",
      description: "Certified Information Security Manager — Leading management-focused credential for infosec leaders.",
      price: "$450",
      url: "/isaca"
    },
    {
      image: ISACA,
      title: "ISACA CRISC",
      description: "Certified in Risk & Information Systems Control — Master enterprise IT risk management and governance.",
      price: "$450",
      url: "/isaca"
    },
  ];

  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const bgColors = ["bg-[#E0E7FF]", "bg-[#E0F2FE]", "bg-[#FEF3C7]", "bg-[#FDE68A]", "bg-[#FCE7F3]", "bg-[#DCFCE7]"];

  const partners = [
    { logo: Logo1, name: "SBS", url: "https://sbs-mea.com/" },
    { logo: Logo2, name: "ThreatMatrix", url: "https://threatmatrix.co.uk/" },
    { logo: Logo4, name: "Gruslabs", url: "https://www.gruslabs.com/" },
    { logo: Logo5, name: "MSA Software", url: "https://msasoftware.in/" },
    { logo: Logo6, name: "Spectre", url: "https://spectreme.ai/" },
  ];

  const ecosystemPillars = [
    {
      title: "Custom CRM Solutions",
      subtitle: "Built for the way you work",
      icon: Users,
      badge: "89% Conversion Rate",
      description: "Tailor-made CRM architectures equipped with visual sales pipelines, automatic lead capture, deal staging, and source attribution (Website, Referrals, LinkedIn).",
      features: ["Custom Lead Scoring & Routing", "Deal Pipeline Management", "Multi-Source Attribution", "Automated Follow-up Sequences"]
    },
    {
      title: "Automate Your Business",
      subtitle: "All your operations. One intelligent system.",
      icon: Cpu,
      badge: "Zero Redundancy",
      description: "Consolidate your disparate business operations into a unified engine encompassing Lead Management, Attendance, Automated Payroll, and Instant Notifications.",
      features: ["Biometric & Web Attendance", "Automated Payroll Calculation", "Customer Support Management", "Role-Based Security & Permissions"]
    },
    {
      title: "Connect Your Teams",
      subtitle: "Access anytime. Anywhere. On any device.",
      icon: Laptop,
      badge: "Universal Access",
      description: "Native responsive interfaces engineered for Desktop, Laptop, Tablet, and Smartphone, enabling remote, hybrid, and field teams to operate in total synchrony.",
      features: ["Desktop & Web Portals", "Optimized Tablet Dashboards", "Field-Ready Mobile Apps", "Real-Time Cloud Synchronization"]
    },
    {
      title: "Understand Your Data",
      subtitle: "Real-time insights for smarter decisions",
      icon: BarChart3,
      badge: "Live KPIs",
      description: "Executive dashboards that provide instant clarity on revenue trajectories, customer growth curves (1,248+ tracked), active workforce health, and operational velocity.",
      features: ["Live Revenue & Deal Analytics", "Customer Retention Metrics", "Workforce Attendance Insights", "Automated Scheduled PDF Reports"]
    },
  ];

  return (
    <div className="bg-white font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title="Armx-Indicodex (A Unit of Tax Bucket) | Enterprise Software, CRM & Cloud Solutions"
        description="Armx-Indicodex is a strategic enterprise technology and custom software development unit of Tax Bucket. We engineer custom CRM solutions, intelligent business automation systems, and scalable digital architectures."
        canonical="https://www.Armx-Indecodextech.in/"
        preloads={[{ href: "/img-1.jpg", as: "image", fetchpriority: "high" }]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Armx-Indicodex (A Unit of Tax Bucket)",
          "alternateName": "Armx-Indicodex | Tax Bucket Enterprise Solutions",
          "description": "Armx-Indicodex operates as the specialized enterprise software and technology innovation unit of Tax Bucket, building bespoke CRM platforms, operations automation, and high-performance digital architectures.",
          "url": "https://www.Armx-Indecodextech.in/",
          "logo": "https://www.Armx-Indecodextech.in/android-chrome-512x512.png",
          "image": "https://www.Armx-Indecodextech.in/android-chrome-512x512.png",
          "telephone": "+91-6280281505",
          "email": "sales@Armx-Indecodextech.in",
          "priceRange": "$$",
          "parentOrganization": {
            "@type": "Organization",
            "name": "Tax Bucket",
            "description": "Premier corporate compliance, financial governance, taxation, and business structuring consultancy."
          }
        }}
      />

      {/* ========================================================================= */}
      {/* HERO SECTION WITH DYNAMIC VIDEO & TAX BUCKET UNIT BRANDING                */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[92vh] md:min-h-[860px] overflow-hidden flex flex-col justify-center bg-slate-950 text-white">
        {/* Background Video or Fallback Poster */}
        {isReactSnap ? (
          <img
            src={platformOverviewImg}
            alt="Armx-Indicodex Platform Ecosystem"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            preload="auto"
            poster={platformOverviewImg}
            className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-[0.85] contrast-[1.05]"
          >
            <source src={heroVideoAsset} type="video/mp4" />
            <source src="/videos/armx-hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Ambient Overlay Gradients for Optimal Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-slate-950/65 to-slate-950 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/25 via-transparent to-transparent z-0 pointer-events-none" />

        {/* Video Floating Controls */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full px-3.5 py-1.5 shadow-2xl text-xs text-slate-300">
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1 px-1.5"
            title={isVideoPlaying ? "Pause Video" : "Play Video"}
          >
            {isVideoPlaying ? <Pause className="w-3.5 h-3.5 text-blue-400" /> : <Play className="w-3.5 h-3.5 text-blue-400" />}
            <span>{isVideoPlaying ? "Pause" : "Play"}</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={toggleMute}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-1 px-1.5"
            title={isVideoMuted ? "Unmute Video Audio" : "Mute Video Audio"}
          >
            {isVideoMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400 animate-pulse" />}
            <span>{isVideoMuted ? "Sound: Off" : "Sound: On"}</span>
          </button>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24 text-center flex flex-col items-center justify-center">
          {/* Prominent Unit of Tax Bucket Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-400/40 backdrop-blur-xl text-blue-200 text-xs sm:text-sm font-semibold tracking-wide shadow-xl shadow-blue-900/30 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-white font-extrabold tracking-wider uppercase">Armx-Indicodex</span>
            <span className="text-blue-400/60">•</span>
            <span className="text-blue-300 font-medium">A Strategic Technology Unit of Tax Bucket</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 drop-shadow-2xl"
          >
            Enterprise Software <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Built Around Your Business
            </span>
          </motion.h1>

          {/* Dynamic Typewriter */}
          <div className="h-10 sm:h-12 flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-bold text-cyan-300 drop-shadow mb-6">
            <Typewriter
              options={{
                strings: [
                  "Custom CRM Solutions Built For How You Work",
                  "Automate All Your Business Operations in One System",
                  "Seamless Data Flow: Sales → HR → Finance → Management",
                  "Real-Time Executive Insights for Smarter Decisions",
                  "Backed by the Corporate & Compliance Power of Tax Bucket"
                ],
                autoStart: true,
                loop: true,
                delay: 45,
                deleteSpeed: 25,
                pauseFor: 2200,
                wrapperClassName: "typewriter-wrapper",
                cursorClassName: "typewriter-cursor"
              }}
            />
          </div>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300/90 leading-relaxed mb-10"
          >
            <strong className="text-white font-semibold">Ideas | Software | Growth.</strong> Technology that moves your business forward. We engineer bespoke CRM platforms, unified workforce automation, and mission-critical cloud solutions — combining Tax Bucket's institutional governance with high-velocity engineering.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => {
                const el = document.getElementById("platform-architecture");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-102 transition-all duration-300 w-full sm:w-auto group cursor-pointer"
            >
              <span>Explore Platform Architecture</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-white font-semibold rounded-xl hover:bg-slate-800 transition duration-300 w-full sm:w-auto backdrop-blur-md"
            >
              Request Executive Consultation
            </Link>

            <button
              onClick={() => setShowOverviewModal(true)}
              className="inline-flex items-center justify-center px-6 py-3.5 bg-blue-500/10 border border-blue-400/30 text-blue-300 hover:text-white hover:bg-blue-500/20 font-medium rounded-xl transition duration-300 w-full sm:w-auto cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              View Ecosystem Diagram
            </button>
          </motion.div>

          {/* Trust and Key Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 w-full max-w-5xl">
            {[
              { title: "Custom CRM Solutions", desc: "Built for your exact workflow", icon: Users },
              { title: "A Unit of Tax Bucket", desc: "Institutional compliance & trust", icon: Building2 },
              { title: "Cross-Device Sync", desc: "Desktop, Tablet & Smartphone", icon: Smartphone },
              { title: "Real-Time Analytics", desc: "Live revenue & team KPIs", icon: TrendingUp },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-4 text-left flex flex-col justify-between hover:border-blue-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 rounded-lg bg-blue-600/15 text-blue-400">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Live</span>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white leading-tight">{stat.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{stat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRUSTED VENDORS & ACCREDITATIONS                                          */}
      {/* ========================================================================= */}
      <motion.div
        className="py-16 bg-white border-y border-slate-100"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Accreditations & Partnerships</p>
          <h2 className="font-extrabold text-3xl md:text-4xl text-[#1F3C88] mb-10 tracking-tight">
            Our Certified Partners & Providers
          </h2>
          <div className="flex flex-col md:flex-row items-stretch justify-center border border-slate-200 bg-white rounded-3xl shadow-lg p-4 md:p-6 max-w-4xl mx-auto">
            {[
              { logo: comptia, name: "CompTIA", url: "https://www.comptia.org/" },
              { logo: pecb, name: "PECB", url: "https://pecb.com/" },
              { logo: ISACA, name: "ISACA", url: "https://www.isaca.org/" },
            ].map((vendor, index, arr) => (
              <div
                key={index}
                className="flex-1 px-6 py-6 relative bg-white flex flex-col items-center justify-center hover:scale-102 transition-transform"
              >
                <a
                  href={vendor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full text-center"
                >
                  <img
                    src={vendor.logo || "/placeholder.svg"}
                    alt={vendor.name}
                    className="object-contain max-h-16 max-w-[80%] mx-auto mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">{vendor.name}</h3>
                </a>
                {index < arr.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-6 bottom-6 w-px bg-slate-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* STRATEGIC ALLIANCE: ARMX-INDICODEX IS A UNIT OF TAX BUCKET                */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" />
              Strategic Corporate Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
              Armx-Indicodex — The Technology Unit of <span className="text-blue-400">Tax Bucket</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Tax Bucket is an established leader in corporate compliance, financial governance, taxation, and business structuring.
              <strong className="text-white font-medium"> Armx-Indicodex operates as Tax Bucket’s specialized enterprise software and technological innovation unit</strong>, bridging institutional regulatory rigor with advanced digital engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-7 relative group hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Audit & Tax-Ready Systems</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Software built from the ground up with inherent financial compliance, GST-ready invoicing, automated payroll computations, and institutional data retention.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Automated GST & TDS compliance engines</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Immutable financial audit logs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Regulatory-compliant payroll integration</li>
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-7 relative group hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">End-to-End Business Lifecycle</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                By uniting Tax Bucket's legal advisory with Armx-Indicodex's software capabilities, companies receive complete digital and structural transformation under one roof.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Entity setup to software deployment</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Tailored CRM tailored to exact operations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Cross-departmental operational harmony</li>
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-7 relative group hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Institutional Security & Trust</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                ISO 9001 and ISO 27001 aligned architecture, military-grade data encryption, granular role-based permissions, and 99.9% high availability SLA.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Bank-grade AES-256 data encryption</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Zero-trust role & permission matrices</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Daily automated failover backups</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* THE COMPLETE ARMX-INDICODEX ENTERPRISE ECOSYSTEM (ATTACHED IMAGE SHOWCASE)*/}
      {/* ========================================================================= */}
      <section id="platform-architecture" className="py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Subtle mesh background */}
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Platform Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              All Your Operations. One Intelligent System.
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Explore how Armx-Indicodex unifies Custom CRM, Lead Pipelines, Workforce Management, Omni-Device Access, and Real-Time Analytics into a single seamless business engine.
            </p>
          </div>

          {/* High-Impact Visual Frame of the Attached Image */}
          <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-[0_0_70px_rgba(37,99,235,0.22)] bg-slate-900/60 backdrop-blur-xl group mb-14">
            <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
                <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">armx-indicodex://enterprise-ecosystem-overview</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex items-center gap-1.5 text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                  <ShieldCheck className="w-3 h-3" /> A Unit of Tax Bucket
                </span>
                <button
                  onClick={() => setShowOverviewModal(true)}
                  className="inline-flex items-center gap-1.5 text-white bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" /> Fullscreen View
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden cursor-pointer" onClick={() => setShowOverviewModal(true)}>
              <img
                src={platformOverviewImg}
                alt="Armx-Indicodex Platform Ecosystem - CRM, Operations, Device Sync, Analytics"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.015]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                <span className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-bold text-sm shadow-xl flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" /> Click to Inspect Full Resolution Blueprint
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Deep-Dive Cards Corresponding to the Storyboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-400/90 mb-3">{pillar.subtitle}</p>
                    <p className="text-slate-400 text-xs leading-relaxed mb-4">{pillar.description}</p>
                  </div>

                  <div className="border-t border-slate-800/80 pt-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Key Modules:</p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {pillar.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-blue-400 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connected Flow Visualization Banner */}
          <div className="mt-12 bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                <Workflow className="w-4 h-4" /> Connected Business Operations
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Eliminate Silos: Sales → HR → Management → Finance → Employees
              </h3>
              <p className="text-slate-400 text-sm max-w-2xl">
                Every department shares a synchronized single source of truth. As a unit of Tax Bucket, Armx-Indicodex keeps financial records, lead pipelines, and workforce operations seamlessly aligned.
              </p>
            </div>
            <Link
              to="/products/crm"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors whitespace-nowrap"
            >
              <span>Explore CRM Features</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL FOR ATTACHED IMAGE                              */}
      {/* ========================================================================= */}
      {showOverviewModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setShowOverviewModal(false)}
        >
          <div
            className="relative max-w-6xl w-full bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950 text-white">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <h3 className="font-bold text-sm md:text-base">Armx-Indicodex Enterprise Architecture Blueprint</h3>
                <span className="text-xs text-blue-400 hidden sm:inline">(A Unit of Tax Bucket)</span>
              </div>
              <button
                onClick={() => setShowOverviewModal(false)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 md:p-6 bg-slate-950 max-h-[80vh] overflow-y-auto flex items-center justify-center">
              <img
                src={platformOverviewImg}
                alt="Armx-Indicodex Architecture Diagram - Custom CRM, Operations, Analytics"
                className="w-full h-auto object-contain rounded-xl shadow-lg"
              />
            </div>
            <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Press ESC or click outside to close</span>
              <a
                href={platformOverviewImg}
                download="Armx-Indicodex-Platform-Overview.png"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Download Diagram (PNG)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ENTERPRISE SERVICES SECTION                                               */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100 text-[#152B54] text-xs font-bold uppercase tracking-wider mb-3">
              WHAT WE DELIVER
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#152B54] mb-4 tracking-tight">
              Enterprise Engineering & Technology Solutions
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              We design, build, and support bespoke software architectures that drive revenue, streamline operations, and secure enterprise continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceCards.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      width={serviceImageDimensions[service.title]?.width || 626}
                      height={serviceImageDimensions[service.title]?.height || 417}
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Enterprise Grade
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#152B54] mb-2">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={() => navigate(service.route)}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer"
                  >
                    <span>Explore Solution</span>
                    <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/our-services")}
              className="bg-[#152B54] hover:bg-blue-700 text-white py-3.5 px-10 rounded-xl transition-colors duration-300 font-bold shadow-md cursor-pointer"
            >
              View All Technology Services
            </button>
          </div>
        </div>
      </section>

      

      {/* ========================================================================= */}
      {/* POPULAR CERTIFICATION COURSES CAROUSEL                                    */}
      {/* ========================================================================= */}
      <section className="py-16 bg-white">
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-[#1F3C88] mb-10 tracking-tight">
          Industry Certification Programs
        </h2>
        <div className="relative overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-content">
              {courseData
                .concat(courseData)
                .map((course, idx) => (
                  <div key={idx} className={`course-card ${bgColors[idx % bgColors.length]}`}>
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-24 w-24 object-contain rounded-xl mb-4 bg-white p-2 shadow-sm"
                      loading="lazy"
                    />
                    <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{course.title}</h3>
                    <p className="text-gray-700 text-center mb-4 text-xs leading-relaxed line-clamp-2">{course.description}</p>
                    <Link
                      to={course.url}
                      className="mt-auto inline-block bg-[#1F3C88] hover:bg-[#15306b] text-white font-semibold text-xs px-5 py-2 rounded-lg shadow transition"
                    >
                      Course Details
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <style jsx="true">{`
          .marquee-container {
            width: 100%;
            overflow: hidden;
            position: relative;
          }
          .marquee-content {
            display: flex;
            gap: 1.5rem;
            animation: marquee 35s linear infinite;
            width: max-content;
          }
          .course-card {
            min-width: 260px;
            max-width: 300px;
            border-radius: 1rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container:hover .marquee-content {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* ========================================================================= */}
      {/* STATS SECTION                                                             */}
      {/* ========================================================================= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              Proven Track Record
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
              Impact Delivered Across Industries
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Empowered by Tax Bucket's institutional strength and Armx-Indicodex's software craftsmanship.
            </p>
          </div>
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { count: 100000, label: "Sales Tracked & Managed", suffix: "+", bg: "bg-slate-950/60", text: "text-blue-400" },
              { count: 500, label: "Certifications & Deployments", suffix: "+", bg: "bg-slate-950/60", text: "text-green-400" },
              { count: 8000, label: "Active Enterprise Users", suffix: "+", bg: "bg-slate-950/60", text: "text-purple-400" },
              { count: 300000, label: "Engineering & Training Hours", suffix: "+", bg: "bg-slate-950/60", text: "text-yellow-400" },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl border border-slate-800 shadow-xl transition-all duration-300 transform hover:scale-105 hover:border-blue-500/40 ${item.bg}`}
              >
                <span className={`text-4xl md:text-5xl font-extrabold block mb-2 ${item.text}`}>
                  {inView ? <CountUp start={0} end={item.count} duration={2} separator="," /> : "0"}{item.suffix}
                </span>
                <p className="text-sm font-semibold text-slate-300">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL HIGH-IMPACT CALL TO ACTION                                          */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Armx-Indicodex • A Unit of Tax Bucket
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Ready to Build What's Next with Armx-Indicodex?
          </h2>
          <p className="text-blue-200 mb-10 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need custom CRM solutions, complete business operations automation, or enterprise digital engineering, our team is ready to deliver.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/contact-us")}
              className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xl transition duration-300 transform hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
            >
              Request Free Consultation Session
            </button>
            <div
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer w-full sm:w-auto"
              onClick={() => {
                const whatsappIcon = document.querySelector('.whatsapp-icon');
                if (whatsappIcon) whatsappIcon.click();
              }}
            >
              <FaSquareWhatsapp className="text-green-400 text-2xl" />
              <span>Chat with Executive</span>
            </div>
          </div>
          <p className="text-xs text-blue-300/70 mt-4 font-medium">
            Zero-obligation scoping. Guaranteed response within 4 hours.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;