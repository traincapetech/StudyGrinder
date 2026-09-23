import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Toaster, toast } from "react-hot-toast";
import AllRoute from "./allRoute/AllRoute";
import axios from "axios";
import API_BASE_URL from "./config/api";

import WhatsAppPopup from "./components/WhatsAppPopup";
import GlobalChat from "./components/GlobalChat";
import ErrorBoundary from "./components/ErrorBoundary";
import ChunkErrorBoundary from "./components/ChunkErrorBoundary";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";

const App = () => {
  const location = useLocation();
  const isConsultantPage = location.pathname.startsWith("/consultant");

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    // AOS is initialized via npm bundle (not via CDN) to keep react-snap stable.
    // Skip during react-snap prerender.
    if (
      typeof navigator !== "undefined" &&
      String(navigator.userAgent || "").includes("ReactSnap")
    )
      return;
    (async () => {
      try {
        const AOS = (await import("aos")).default;
        await import("aos/dist/aos.css");
        AOS.init({ offset: 200, duration: 800, once: true });
      } catch (e) {
        // no-op (AOS is optional)
      }
    })();
  }, []);

  return (
    <ChunkErrorBoundary>
      <HelmetProvider>
        <Helmet>
          <link rel="canonical" href={`https://studygrinder.com${location.pathname.endsWith('/') && location.pathname !== '/' ? location.pathname.slice(0, -1) : location.pathname}`} />
        </Helmet>
        <LanguageProvider>
          <ErrorBoundary>
            <Toaster position="top-center" reverseOrder={false} />
            {!isConsultantPage && <Navbar />}
            <AllRoute />
            {!isConsultantPage && <Footer />}

            {!isConsultantPage && <WhatsAppPopup />}
            {!isConsultantPage && <GlobalChat />}
          </ErrorBoundary>
        </LanguageProvider>
      </HelmetProvider>
    </ChunkErrorBoundary>
  );
};

export default App;
