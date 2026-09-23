import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Award } from "lucide-react";

export default function CertificationCard({ cert }) {
  return (
    <Link
      to={`/certifications/${cert.categorySlug}/${cert.slug}`}
      className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left"
    >
      <div>
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-md whitespace-nowrap">
              {cert.categoryTitle}
            </span>
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 shrink-0">
              <Clock className="w-3 h-3" />
              <span>{cert.duration ? cert.duration.split("/")[0] : "Flexible"}</span>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {cert.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {cert.shortDescription}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-medium text-slate-500 truncate max-w-[170px]">
              {cert.groupTitle}
            </span>
            <span className="text-xs font-bold text-blue-600 group-hover:text-blue-800 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
