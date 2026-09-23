import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import useBreadcrumbs from '../../hooks/useBreadcrumbs';
import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getWebsiteSchema,
  getBreadcrumbSchema,
  getServiceSchema,
  getProductSchema,
  getCourseSchema,
  getFAQSchema,
  getPortfolioProjectSchema,
  getCaseStudySchema
} from '../../utils/seo/schemaBuilders';

/**
 * Rich SEO & Structured Data Head Manager.
 * Injects baseline organization, website, breadcrumb, and page-specific entity schemas.
 */
const SEOHead = ({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  structuredData,
  noindex = false,
  preloads = [], // Array of { href, as, type, fetchpriority }
  // Entity attributes
  category, // 'service' | 'product' | 'course' | 'project' | 'case-study' | 'faq' | 'article'
  entityData, // Raw data item representing the current entity
  faqs // Question/Answer list for page-level FAQs
}) => {
  const location = useLocation();
  const crumbs = useBreadcrumbs();

  const baseUrl = 'https://studygrinder.com';
  const rawCanonical = canonical || `${baseUrl}${location.pathname}`;
  let cleanCanonical = rawCanonical;
  if (cleanCanonical.endsWith('/') && cleanCanonical !== 'https://studygrinder.com/') {
    cleanCanonical = cleanCanonical.slice(0, -1);
  }
  const canonicalUrl = cleanCanonical;

  const defaultDescription = "StudyGrinder is a professional certification training and learning platform. Prepare for CompTIA, AWS, Microsoft, Cisco, PECB, and ISACA certifications with expert-led instruction.";
  const defaultTitle = "StudyGrinder | Professional Certification Training & Learning Platform";
  const defaultOgImage = `${baseUrl}/studygrinder-logo.jpg`;

  const metaTitle = title || defaultTitle;
  const metaDesc = description || defaultDescription;
  const metaOgImage = ogImage || defaultOgImage;

  // Build schemas memoized
  const jsonLdSchemas = useMemo(() => {
    const list = [];

    // 1. Always include baseline Organization & WebSite schemas
    list.push(getOrganizationSchema());
    list.push(getWebsiteSchema());

    // 2. Include LocalBusiness on Home and Contact pages
    const path = location.pathname;
    if (path === '/' || path === '/contact-us') {
      list.push(getLocalBusinessSchema());
    }

    // 3. Dynamic Breadcrumb List Schema
    if (crumbs && crumbs.length > 1) {
      list.push(getBreadcrumbSchema(crumbs));
    }

    // 4. Page-specific Entity Schema
    if (category && entityData) {
      let pageSchema = null;
      switch (category.toLowerCase()) {
        case 'service':
          pageSchema = getServiceSchema(entityData);
          break;
        case 'product':
          pageSchema = getProductSchema(entityData);
          break;
        case 'course':
          pageSchema = getCourseSchema(entityData);
          break;
        case 'project':
          pageSchema = getPortfolioProjectSchema(entityData);
          break;
        case 'case-study':
          pageSchema = getCaseStudySchema(entityData);
          break;
        default:
          break;
      }
      if (pageSchema) list.push(pageSchema);
    }

    // 5. FAQ Page Schema
    if (faqs && faqs.length > 0) {
      const faqSchema = getFAQSchema(faqs);
      if (faqSchema) list.push(faqSchema);
    }

    // 6. Custom schema passed directly
    if (structuredData) {
      list.push(structuredData);
    }

    return list;
  }, [location.pathname, crumbs, category, entityData, faqs, structuredData]);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:site_name" content="Armx-Indecodex" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={metaOgImage} />

      {/* Author and Viewport */}
      <meta name="author" content="Armx-Indecodex" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Dynamic Link Preloads */}
      {preloads && preloads.map((preload, idx) => (
        <link
          key={`preload-${idx}`}
          rel="preload"
          href={preload.href}
          as={preload.as}
          type={preload.type}
          fetchpriority={preload.fetchpriority}
        />
      ))}

      {/* Inject all compiled JSON-LD scripts */}
      {jsonLdSchemas.map((schema, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
