import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FaCopy, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/userSlice";
import logo from "../assets/Armx-Indecodex-Logo.png";
import DashboardHeader from "../pages/DashboardHeader";
import ReactDOM from "react-dom";

// Helper component for the gradient button style - NOW USING forwardRef
const GradientButton = React.forwardRef(({ children, className = "", ...props }, ref) => (
  <button
    ref={ref} // The ref is now correctly attached to the actual button
    className={`relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-lg group bg-gradient-to-br from-blue-600 to-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-md shadow-blue-500/10 hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 ${className}`}
    {...props}
  >
    <span className="relative px-4 py-2 transition-all ease-in duration-75 rounded-md">
      {children}
    </span>
  </button>
));

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const token = localStorage.getItem("token");

  const dropdownRef = useRef(null);
  const payNowButtonRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const mobilePayNowButtonRef = useRef(null);

  const accountNumber = "732205000345";
  const bankName = "ICICI Bank";
  const branchName = "Palam Colony";
  const accountHolderName = "Armx-Indecodex (OPC) PRIVATE LIMITED";
  const ifscCode = "ICIC0007322";
  const Email = "sales@traincapetech.info";

  const bankDetails = {
    "Account Number": accountNumber,
    "Bank Name": bankName,
    "Branch Name": branchName,
    "Account Holder Name": accountHolderName,
    "IFSC Code": ifscCode,
    "EMAIL": Email
  };

  const updateDropdownPosition = () => {
    if (payNowButtonRef.current) {
      const rect = payNowButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right + window.scrollX - 192,
        width: 192
      });
    }
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomepage = location.pathname === "/";
  const useTransparentNav = isHomepage && !isScrolled;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown) {
        const isClickInside =
          (payNowButtonRef.current && payNowButtonRef.current.contains(event.target)) ||
          (mobilePayNowButtonRef.current && mobilePayNowButtonRef.current.contains(event.target)) ||
          (dropdownRef.current && dropdownRef.current.contains(event.target)) ||
          (mobileDropdownRef.current && mobileDropdownRef.current.contains(event.target));

        if (!isClickInside) {
          setShowDropdown(false);
        }
      }

      if (isMenuOpen && !event.target.closest('.lg\\:hidden > button[aria-label]')) {
        if (!document.querySelector('.mobile-menu').contains(event.target)) {
          setMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown, isMenuOpen]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setShowBankDetails(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/login");
    setMenuOpen(false);
  };

  const handlePayNow = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (payNowButtonRef.current && !isMenuOpen) {
      updateDropdownPosition();
    }
    setShowDropdown(prev => !prev);
  };

  const handleBankTransfer = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowBankDetails(true);
    setShowDropdown(false);
    if (isMenuOpen) {
      setMenuOpen(false);
    }
  };

  const copyToClipboard = () => {
    const detailsText = Object.entries(bankDetails)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    navigator.clipboard.writeText(detailsText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Dynamic active state styling for desktop
  const isActive = (path) => {
    if (useTransparentNav) {
      return location.pathname === path
        ? "text-white border-b-2 border-white font-semibold transition duration-300 ease-in-out"
        : "text-white/80 hover:text-white border-b-2 border-transparent hover:border-white transition duration-300 ease-in-out";
    } else {
      return location.pathname === path || (path !== "/" && location.pathname.startsWith(path))
        ? "text-blue-600 border-b-2 border-blue-600 font-semibold transition duration-300 ease-in-out"
        : "text-slate-650 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-300 ease-in-out";
    }
  };

  // Always slate-700/blue-600 styling for mobile menu (since backdrop drawer is always white)
  const isMobileActive = (path) => {
    return location.pathname === path || (path !== "/" && location.pathname.startsWith(path))
      ? "text-blue-600 border-b-2 border-blue-600 font-bold transition duration-300 ease-in-out"
      : "text-slate-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-300 ease-in-out";
  };

  const handleExternalLink = (url, event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowDropdown(false);
    if (isMenuOpen) {
      setMenuOpen(false);
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderDropdown = () => {
    if (!showDropdown || !payNowButtonRef.current || isMenuOpen) return null;

    const dropdownContent = (
      <div
        ref={dropdownRef}
        className="absolute bg-white text-slate-800 shadow-xl rounded-lg w-48 py-1 border border-slate-200 transform origin-top-right transition-all duration-300 ease-out animate-dropdown-in"
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          zIndex: 9999,
          width: '12rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-1">
          <button
            onClick={(e) => handleExternalLink("https://paypal.me/ParichayP?country.x=IN&locale.x=en_GB", e)}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 font-semibold"
          >
            PayPal
          </button>
          <button
            onClick={(e) => handleExternalLink("https://buy.stripe.com/8wM2az10TaYQgww29d", e)}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 font-semibold"
          >
            Credit / Debit Card (Stripe)
          </button>
          <button
            onClick={handleBankTransfer}
            className="block w-full px-4 py-2 text-sm text-left hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 font-semibold"
          >
            Bank Transfer
          </button>
        </div>
      </div>
    );

    return ReactDOM.createPortal(
      dropdownContent,
      document.body
    );
  };

  const navClass = useTransparentNav
    ? "bg-transparent absolute top-0 left-0 right-0 z-30 lg:h-20 h-24 md:px-0 lg:px-12 px-4 shadow-none flex items-center transition-all duration-300"
    : "bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-30 lg:h-20 h-24 md:px-0 lg:px-12 px-4 shadow-sm flex items-center transition-all duration-300";

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown-in {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-in {
          animation: modalIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
      <nav className={navClass} aria-label="Main Navigation" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="mx-auto flex items-center justify-between w-full">
          {/* Logo Section */}
          <div className="flex items-center lg:w-[22%] justify-start">
            <div
              className="flex items-center gap-2.5 cursor-pointer transform hover:scale-102 transition duration-300 ease-in-out"
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt="Armx-Indicodex"
                className="w-auto h-14 md:h-16 lg:h-18 object-contain"
                width="120"
                height="120"
              />
              <div className="hidden sm:flex flex-col border-l border-slate-400/30 pl-2.5 py-0.5 text-left">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${useTransparentNav ? "text-blue-300" : "text-blue-600"}`}>
                  A Unit of Tax Bucket
                </span>
                <span className={`text-[9px] font-medium tracking-tight ${useTransparentNav ? "text-slate-200/90" : "text-slate-500"}`}>
                  Enterprise Software & CRM
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation (LG and up) */}
          <div className={`hidden lg:flex justify-between w-full items-center ${useTransparentNav ? "text-white" : "text-slate-800"}`}>
            <div className="flex space-x-8 mx-auto font-medium text-lg">
              <Link to="/" className={isActive("/")}>
                Home
              </Link>
              <Link to="/about-us" className={isActive("/about-us")}>
                About
              </Link>
              <Link to="/services" className={isActive("/services")}>
                Services
              </Link>
              <Link to="/products" className={isActive("/products")}>
                Products
              </Link>
              <Link to="/portfolio" className={isActive("/portfolio")}>
                Portfolio
              </Link>
              <Link to="/certifications" className={isActive("/certifications")}>
                Certifications
              </Link>
              <Link to="/review-page" className={isActive("/review-page")}>
                Reviews
              </Link>
              <Link to="/contact-us" className={isActive("/contact-us")}>
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* <div className="relative">
                <GradientButton
                  ref={payNowButtonRef}
                  onClick={handlePayNow}
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                  className="!p-0.5"
                >
                  Pay Now
                </GradientButton>
              </div> */}

              {token ? (
                <div className="transform transition-all duration-300 hover:scale-105">
                  <DashboardHeader />
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={handleLogin}
                  aria-label="Login"
                  className={`font-semibold border px-5 py-2 rounded-lg transition duration-300 shadow-sm ${useTransparentNav
                      ? "text-white border-white/40 hover:bg-white/10 hover:border-white"
                      : "text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-blue-600"
                    }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Hamburger/Cross Icon */}
          <div className="lg:hidden" onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!isMenuOpen);
          }}>
            <button aria-label={isMenuOpen ? "Close menu" : "Open menu"} className={`p-2 ${useTransparentNav ? "text-white" : "text-slate-800"}`}>
              {isMenuOpen ? (
                <ImCross className="text-xl animate-spin-once" />
              ) : (
                <GiHamburgerMenu className="text-2xl transition duration-300" />
              )}
            </button>
          </div>
        </div>

      </nav>

      {renderDropdown()}

      {/* Render Mobile Sidebar Menu & Backdrop via React Portal to body to break out of parent stacking context */}
      {ReactDOM.createPortal(
        <>
          {/* Mobile Menu Backdrop */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            ></div>
          )}

          {/* Mobile Sidebar Menu */}
          <div
            className={`mobile-menu fixed top-0 right-0 w-64 h-full bg-white text-slate-800 border-l border-slate-100 transition-transform transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              } z-50 p-6 shadow-2xl lg:hidden`}
            aria-modal="true"
            role="dialog"
            aria-hidden={!isMenuOpen}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-8">
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="text-slate-400 hover:text-slate-800 transition duration-200 p-1"
              >
                <ImCross className="text-lg" />
              </button>
            </div>

            <div className="flex flex-col space-y-6 text-lg font-medium">
              <Link
                to="/"
                className={`${isMobileActive("/")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className={`${isMobileActive("/about-us")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`${isMobileActive("/services")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/products"
                className={`${isMobileActive("/products")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/portfolio"
                className={`${isMobileActive("/portfolio")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                to="/certifications"
                className={`${isMobileActive("/certifications")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                Certifications
              </Link>
              <Link
                to="/review-page"
                className={`${isMobileActive("/review-page")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                to="/contact-us"
                className={`${isMobileActive("/contact-us")} py-2`}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>

              {/* <div className="relative mt-4 pt-4 border-t border-slate-100">
                <GradientButton
                  ref={mobilePayNowButtonRef}
                  onClick={handlePayNow}
                  className="w-full !p-0.5"
                >
                  Pay Now
                </GradientButton> */}

                {/* Mobile dropdown logic */}
                {/* {showDropdown && (
                  <div
                    ref={mobileDropdownRef}
                    className="mt-3 bg-white text-slate-800 shadow-xl w-full rounded-lg overflow-hidden border border-slate-200 transform origin-top transition-all duration-300 ease-out animate-dropdown-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => handleExternalLink("https://paypal.me/ParichayP?country.x=IN&locale.x=en_GB", e)}
                      className="block w-full px-4 py-3 text-sm text-left hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 font-semibold"
                    >
                      PayPal
                    </button>
                    <button
                      onClick={(e) => handleExternalLink("https://buy.stripe.com/8wM2az10TaYQgww29d", e)}
                      className="block w-full px-4 py-3 text-sm text-left hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 font-semibold"
                    >
                      Credit / Debit Card (Stripe)
                    </button>
                    <button
                      onClick={handleBankTransfer}
                      className="block w-full px-4 py-3 text-sm text-left hover:bg-slate-50 hover:text-blue-600 transition-colors duration-200 font-semibold"
                    >
                      Bank Transfer
                    </button>
                  </div>
                )}
              </div> */}

              <div className="mt-6">
                {token ? (
                  <div className="w-full">
                    <DashboardHeader />
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleLogin}
                    className="text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-md block text-center transition duration-300 shadow-sm"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Bank Details Modal */}
      {showBankDetails && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-[10000] p-4 transition-opacity duration-300 ease-out"
          onClick={() => setShowBankDetails(false)}
          aria-modal="true"
          role="dialog"
          aria-label="Bank Account Details Modal"
        >
          <div
            className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 transform transition-transform duration-300 scale-95 opacity-0 animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
                <h2 className="text-2xl font-extrabold text-slate-900">Bank Transfer Details</h2>
                <button
                  onClick={() => setShowBankDetails(false)}
                  className="text-slate-400 hover:text-red-500 transition-colors duration-200 p-1"
                  aria-label="Close modal"
                >
                  <ImCross className="text-lg" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {Object.entries(bankDetails).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="font-semibold text-blue-600 mr-2 min-w-[150px]">{key}: </span>
                    <span className="text-slate-700 break-all text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-md ${copied
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/10"
                    }`}
                >
                  {copied ? (
                    <>
                      <FaCheck className="mr-2" /> Details Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy className="mr-2" /> Copy All Details
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;