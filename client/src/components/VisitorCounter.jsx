import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const VISITOR_ID_KEY = "studygrinder_visitor_id";
const VISITOR_TRACKED_SESSION_KEY = "studygrinder_visitor_tracked";

/**
 * Generates a persistent anonymous UUID for unique browser visitor tracking.
 * Uses crypto.randomUUID() where supported, with safe cryptographic fallbacks.
 */
function generateVisitorId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch (_) {}
  }

  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    try {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
      bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10
      const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    } catch (_) {}
  }

  // Safe fallback for legacy environments
  const timestamp = Date.now().toString(36);
  const randomStr =
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(36).substring(2, 10);
  return `v4-${timestamp}-${randomStr}`;
}

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Never track during react-snap / prerendering
    const isPrerender =
      typeof window === "undefined" ||
      (typeof navigator !== "undefined" &&
        navigator.userAgent &&
        navigator.userAgent.includes("ReactSnap"));

    if (isPrerender) {
      return;
    }

    setMounted(true);

    let isSubscribed = true;

    const trackOrFetchVisitor = async () => {
      try {
        // Retrieve or generate persistent visitor ID from localStorage
        let visitorId = null;
        try {
          visitorId = localStorage.getItem(VISITOR_ID_KEY);
          if (!visitorId) {
            visitorId = generateVisitorId();
            localStorage.setItem(VISITOR_ID_KEY, visitorId);
          }
        } catch (_) {
          // If localStorage is unavailable (e.g. strict private mode), use in-memory ID
          visitorId = generateVisitorId();
        }

        // Check if we already registered this visitor in the current session
        let alreadyTrackedInSession = false;
        try {
          alreadyTrackedInSession =
            sessionStorage.getItem(VISITOR_TRACKED_SESSION_KEY) === visitorId;
        } catch (_) {}

        if (!alreadyTrackedInSession) {
          // Send tracking request to backend
          const endpoint = API_ENDPOINTS.VISITORS_TRACK || "/api/visitors/track";
          const res = await axios.post(
            endpoint,
            { visitorId },
            { headers: { "Content-Type": "application/json" }, timeout: 8000 }
          );

          if (isSubscribed && res.data && typeof res.data.count === "number") {
            setVisitorCount(res.data.count);
            try {
              sessionStorage.setItem(VISITOR_TRACKED_SESSION_KEY, visitorId);
            } catch (_) {}
          }
        } else {
          // Already registered in this session, simply fetch the current count
          const countEndpoint = API_ENDPOINTS.VISITORS_COUNT || "/api/visitors/count";
          const res = await axios.get(countEndpoint, { timeout: 8000 });
          if (isSubscribed && res.data && typeof res.data.count === "number") {
            setVisitorCount(res.data.count);
          }
        }
      } catch (err) {
        // Graceful fallback: do not crash website, try fetching count directly
        try {
          const fallbackEndpoint = API_ENDPOINTS.VISITORS_COUNT || "/api/visitors/count";
          const fallbackRes = await axios.get(fallbackEndpoint, { timeout: 5000 });
          if (
            isSubscribed &&
            fallbackRes.data &&
            typeof fallbackRes.data.count === "number"
          ) {
            setVisitorCount(fallbackRes.data.count);
          }
        } catch (_) {
          // Silent failure: preserves fallback state without error
        }
      }
    };

    trackOrFetchVisitor();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // During prerender or before mount, reserve clean footprint without layout shift
  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center my-2 sm:my-0 min-w-[110px] min-h-[50px]" />
    );
  }

  // Format count with commas (e.g. 1,024) or display fallback
  const formattedCount =
    typeof visitorCount === "number" ? visitorCount.toLocaleString() : "--";

  return (
    <div
      className="flex flex-col items-center justify-center my-2 sm:my-0 select-none"
      title="Unique Browser Visitors"
      aria-label={`Unique Visitors: ${formattedCount}`}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
         Unique Visitors
        </span>
      </div>
      <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1 shadow-inner flex items-center justify-center min-w-[84px]">
        <span className="font-mono text-xs sm:text-sm font-bold text-slate-200 tracking-widest tabular-nums">
          {formattedCount}
        </span>
      </div>
    </div>
  );
}
