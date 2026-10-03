import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";

// Data
import { aboutData } from "../../data/about/aboutData";

// Components
import AboutHero from "../../components/about/AboutHero";
import AboutStory from "../../components/about/AboutStory";
import AboutDivisions from "../../components/about/AboutDivisions";
import AboutTimeline from "../../components/about/AboutTimeline";
import AboutLeadership from "../../components/about/AboutLeadership";
import AboutValues from "../../components/about/AboutValues";
import AboutCTA from "../../components/about/AboutCTA";

export default function AboutUS() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-650 overflow-hidden font-sans">
      {/* Helmet SEO Optimization */}
      <Helmet>
        <title>Our Story &amp; Tech Philosophy | Study Grinder</title>
        <meta
          name="description"
          content="Study Grinder is an enterprise software developer and professional upskilling partner. Learn our story, vision, core values, and engineering philosophies."
        />
        <meta name="keywords" content="Study Grinder story, custom software development company, professional upskilling, Parichay Rana CEO" />
        <link rel="canonical" href="https://www.studygrinder.in/about-us" />
        <meta property="og:title" content="Our Story &amp; Tech Philosophy | Study Grinder" />
        <meta property="og:description" content="Study Grinder is an enterprise software developer and professional upskilling partner. Learn our story, vision, core values, and engineering philosophies." />
        <meta property="og:url" content="https://studygrinder.in/about-us" />
        <meta property="og:type" content="website" />

        {/* Organization JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Study Grinder",
            "url": "https://studygrinder.in",
            "logo": "https://studygrinder.in/assets/TT.png",
            "founder": {
              "@type": "Person",
              "name": "Parichay Singh Rana"
            },
            "foundingDate": "2021",
            "sameAs": [
              "https://www.linkedin.com/company/Armx-Indecodex-technology"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@id": "https://Armx-Indecodextech.in",
                  "name": "Home"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@id": "https://Armx-Indecodextech.in/about-us",
                  "name": "About Us"
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Render components hierarchy */}
      <AboutHero heroData={aboutData.hero} />
      <AboutStory
        whoData={aboutData.whoWeAre}
        storyData={aboutData.story}
        mvData={aboutData.missionVision}
      />
      <AboutDivisions
        divisions={aboutData.divisions}
        philosophies={aboutData.philosophies}
      />
      <AboutTimeline timeline={aboutData.timeline} />
      <AboutLeadership
        leadership={aboutData.leadership}
        team={aboutData.team}
      />
      <AboutValues
        values={aboutData.coreValues}
        globalReach={aboutData.globalReach}
      />
      <AboutCTA />
    </div>
  );
}