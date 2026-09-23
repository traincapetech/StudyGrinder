import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import {
  Award,
  BookOpen,
  Building2,
  Layers,
  PhoneCall,
  GraduationCap,
  ChevronRight,
  Info,
  Mail
} from "lucide-react";
import logo from "../assets/studygrinder-logo.jpg";
import DashboardHeader from "../pages/DashboardHeader";
import AdvisorModal from "./AdvisorModal";
import ReactDOM from "react-dom";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Certifications", path: "/certifications", badge: "400+" },
    { name: "Training", path: "/training" },
    { name: "Corporate Training", path: "/corporate-training" },
    { name: "Resources", path: "/resources" },
    { name: "Software Solutions", path: "/services" },
    { name: "About", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  const isLinkActive = (path) => {
    const current = location.pathname;
    if (path === "/") return current === "/";
    return current.startsWith(path);
  };

  return (
    <>
      <nav id="site-navbar" className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all font-sans" aria-label="Main Navigation">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none group"
            aria-label="StudyGrinder Home"
          >
            <img
              src={logo}
              alt="StudyGrinder — Accelerate Your Learning"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              width="180"
              height="44"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navLinks.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] xl:text-[14px] font-semibold tracking-tight whitespace-nowrap transition-colors duration-150 ${
                    active
                      ? "text-blue-700 bg-blue-50/90"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 leading-none">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setAdvisorModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs xl:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Talk to Advisor</span>
            </button>

            {/* {token ? (
              <DashboardHeader />
            ) : (
              <Link
                to="/login"
                className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              >
                Login
              </Link>
            )} */}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setAdvisorModalOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-xs"
            >
              Advisor
            </button>

            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <ImCross className="text-base text-slate-800" />
              ) : (
                <GiHamburgerMenu className="text-2xl text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (React Portal) */}
      {ReactDOM.createPortal(
        <>
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 lg:hidden transition-opacity"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <div
            className={`fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white text-slate-800 z-50 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out lg:hidden ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div>
              {/* Header inside mobile drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <img
                  src={logo}
                  alt="StudyGrinder"
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-800 rounded-lg"
                  aria-label="Close"
                >
                  <ImCross className="text-sm" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1 mt-6">
                {navLinks.map((item) => {
                  const active = isLinkActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        active
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="flex items-center gap-2.5">
                        {item.path === "/certifications" && <Award className="w-4 h-4 text-blue-600" />}
                        {item.path === "/training" && <BookOpen className="w-4 h-4 text-indigo-600" />}
                        {item.path === "/corporate-training" && <Building2 className="w-4 h-4 text-purple-600" />}
                        {item.path === "/resources" && <GraduationCap className="w-4 h-4 text-emerald-600" />}
                        {item.path === "/services" && <Layers className="w-4 h-4 text-slate-500" />}
                        {item.path === "/about-us" && <Info className="w-4 h-4 text-slate-400" />}
                        {item.path === "/contact-us" && <Mail className="w-4 h-4 text-slate-400" />}
                        <span>{item.name}</span>
                      </span>

                      {item.badge ? (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {item.badge}
                        </span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile CTAs */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setAdvisorModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Talk to a Training Advisor</span>
              </button>

              {/* {token ? (
                <div className="pt-1">
                  <DashboardHeader />
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  Candidate / Corporate Login
                </Link>
              )} */}
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Global Advisor Modal */}
      <AdvisorModal
        isOpen={advisorModalOpen}
        onClose={() => setAdvisorModalOpen(false)}
      />
    </>
  );
};

export default Navbar;