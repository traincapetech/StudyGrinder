import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, Layers, Building2, Code2 } from "lucide-react";
import { servicesData } from "../../data/services/servicesData";

export default function Services() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-700 font-sans">
      <Helmet>
        <title>Software Solutions & Engineering Services | StudyGrinder</title>
        <meta
          name="description"
          content="Beyond certification training, StudyGrinder delivers enterprise software development: custom CRM systems, high-speed React web applications, cross-platform mobile apps, and cloud architectures."
        />
        <link rel="canonical" href="https://studygrinder.com/services" />
      </Helmet>

      {/* Header with clear secondary positioning */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-20 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Additional Enterprise Capability • Beyond Training</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            StudyGrinder{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              Software Solutions
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            In addition to our primary professional certification training programs, StudyGrinder engineers high-performance custom applications, CRM platforms, and cloud systems for organizations seeking tailored technical solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact-us"
              className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
            >
              Discuss Your Software Requirement
            </Link>
            <Link
              to="/certifications"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition"
            >
              Back to Certification Training
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
            Development Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Bespoke Engineering & IT Capabilities
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Engineered with modern stacks, 100% source code ownership, and full deployment support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((serv) => (
            <article
              key={serv.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                    Enterprise
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    100% Code Ownership
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  <Link to={`/services/${serv.slug}`}>
                    {serv.title}
                  </Link>
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {serv.shortDescription}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {serv.solutions?.slice(0, 2).map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <Link
                  to={`/services/${serv.slug}`}
                  className="font-bold text-blue-600 group-hover:text-blue-750 inline-flex items-center gap-1"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contact-us"
                  className="text-slate-500 hover:text-slate-900 font-medium"
                >
                  Get a Quote
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Trust & Methodology */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl font-extrabold text-slate-900">
            Have a Specific Software or CRM Requirement?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Discuss your system architecture, user workflows, and timelines directly with our engineering team.
          </p>
          <div className="pt-2">
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
