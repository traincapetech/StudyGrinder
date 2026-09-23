import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import CertificationCard from "../../components/CertificationCard";
import AdvisorModal from "../../components/AdvisorModal";
import { getCertificationsCatalog, TOP_CATEGORIES } from "../../data/certificationsCatalog";
import { Search, ArrowRight, Award, PhoneCall } from "lucide-react";

export default function CertificationsCategory() {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { categories } = useMemo(() => getCertificationsCatalog(), []);
  const [query, setQuery] = useState("");
  const [advisorOpen, setAdvisorOpen] = useState(false);

  const category = categories.find((c) => c.slug === categorySlug);
  const categoryTitle =
    category?.title || TOP_CATEGORIES.find((c) => c.slug === categorySlug)?.title || "Certifications";

  const flatCourses = useMemo(() => {
    const all = (category?.groups || []).flatMap((g) => g.courses);
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((c) => `${c.title} ${c.groupTitle}`.toLowerCase().includes(q));
  }, [category, query]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <SEOHead
        title={`${categoryTitle} Certifications | StudyGrinder`}
        description={`Explore ${categoryTitle} certifications and training programs on StudyGrinder. Compare curriculums, view exam blueprints, and consult with a training advisor.`}
        canonical={`https://studygrinder.com/certifications/${categorySlug}`}
        ogType="website"
      />

      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
            <Link to="/" className="hover:text-slate-900">Home</Link>
            <span>/</span>
            <Link to="/certifications" className="hover:text-slate-900">Certifications</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{categoryTitle}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6 lg:items-end lg:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block mb-3">
                Certification Domain
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {categoryTitle}
              </h1>
              <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed">
                Explore structured programs grouped by specialization. View blueprints, who should enroll, and career validation.
              </p>
            </div>

            <div className="w-full lg:w-[380px]">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search in ${categoryTitle}…`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-500 shadow-xs"
                />
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Showing <strong className="text-slate-900">{flatCourses.length}</strong> certification programs
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!category ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
            <h2 className="text-xl font-bold text-slate-900">Category Not Found</h2>
            <p className="mt-2 text-sm text-slate-600">Please select a valid category from the Certifications catalog.</p>
            <Link
              to="/certifications"
              className="mt-6 inline-flex px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm"
            >
              Back to Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {(category.groups || []).map((group) => {
              const groupCourses = group.courses.filter((c) =>
                query.trim()
                  ? `${c.title} ${c.groupTitle}`.toLowerCase().includes(query.trim().toLowerCase())
                  : true
              );
              if (groupCourses.length === 0) return null;
              return (
                <div key={group.slug} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">{group.title}</h2>
                      <p className="mt-1 text-slate-500 text-xs">
                        Domain: <span className="font-semibold text-slate-700">{group.domainTitle}</span>
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                      {groupCourses.length} programs
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {groupCourses.map((c) => (
                      <CertificationCard key={c.id} cert={c} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Advisory Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block mb-1">
              StudyGrinder Guidance
            </span>
            <h3 className="text-2xl font-extrabold text-white">Need Help Choosing in {categoryTitle}?</h3>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Our training advisors evaluate your current background and recommend the ideal certification roadmap and schedule.
            </p>
          </div>
          <button
            onClick={() => setAdvisorOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Talk to Advisor</span>
          </button>
        </div>
      </section>

      <AdvisorModal
        isOpen={advisorOpen}
        onClose={() => setAdvisorOpen(false)}
        prefillCourse={categoryTitle}
      />
    </div>
  );
}
