/**
 * Wikidata and Wikipedia authority entity sameAs mappings.
 * Helps search engines and LLM AI systems resolve technologies to their global concepts.
 */
export const SAME_AS_WIKIDATA = {
  // Frontend
  React: "https://en.wikipedia.org/wiki/React_(software_library)",
  "Tailwind CSS": "https://en.wikipedia.org/wiki/Tailwind_CSS",
  ChakraUI: "https://en.wikipedia.org/wiki/Chakra_UI",
  Redux: "https://en.wikipedia.org/wiki/Redux_(JavaScript_library)",

  // Backend / Database
  "Node.js": "https://en.wikipedia.org/wiki/Node.js",
  Express: "https://en.wikipedia.org/wiki/Express.js",
  PostgreSQL: "https://en.wikipedia.org/wiki/PostgreSQL",
  MongoDB: "https://en.wikipedia.org/wiki/MongoDB",
  Redis: "https://en.wikipedia.org/wiki/Redis",
  "Socket.io": "https://en.wikipedia.org/wiki/Socket.IO",

  // Cloud / Hosting
  AWS: "https://en.wikipedia.org/wiki/Amazon_Web_Services",
  "AWS S3": "https://en.wikipedia.org/wiki/Amazon_S3",
  "AWS ECS": "https://en.wikipedia.org/wiki/Amazon_Elastic_Container_Service",
  Azure: "https://en.wikipedia.org/wiki/Microsoft_Azure",
  Render: "https://en.wikipedia.org/wiki/Render_(design_company)", // fallback or specific hosting service node

  // Certifications & Frameworks
  CompTIA: "https://en.wikipedia.org/wiki/CompTIA",
  "CompTIA A+": "https://en.wikipedia.org/wiki/CompTIA#A+",
  "CompTIA Network+": "https://en.wikipedia.org/wiki/CompTIA#Network+",
  "CompTIA Security+": "https://en.wikipedia.org/wiki/CompTIA#Security+",
  PMP: "https://en.wikipedia.org/wiki/Project_Management_Professional",
  PRINCE2: "https://en.wikipedia.org/wiki/PRINCE2",
  "ISO/IEC 27001": "https://en.wikipedia.org/wiki/ISO/IEC_27001",
  "ISO 9001": "https://en.wikipedia.org/wiki/ISO_9001",
  "Six Sigma": "https://en.wikipedia.org/wiki/Six_Sigma",
  ITIL: "https://en.wikipedia.org/wiki/ITIL",
  GDPR: "https://en.wikipedia.org/wiki/General_Data_Protection_Regulation",
  CISSP: "https://en.wikipedia.org/wiki/Certified_Information_Systems_Security_Professional",
  CEH: "https://en.wikipedia.org/wiki/Certified_Ethical_Hacker",
  Cisco: "https://en.wikipedia.org/wiki/Cisco_Systems",
  Microsoft: "https://en.wikipedia.org/wiki/Microsoft",
};

/**
 * Returns a list of sameAs URLs for a list of technology names.
 * @param {string[]} techs
 * @returns {string[]}
 */
export function getSameAsForTechnologies(techs = []) {
  if (!Array.isArray(techs)) return [];
  return techs
    .map(t => SAME_AS_WIKIDATA[t] || SAME_AS_WIKIDATA[t.trim()])
    .filter(Boolean);
}

/**
/**
 * Primary organization configuration for StudyGrinder.
 */
export const STUDYGRINDER_ORG_INFO = {
  name: "StudyGrinder",
  legalName: "StudyGrinder Learning & Certification Platform",
  url: "https://studygrinder.com",
  logo: "https://studygrinder.com/studygrinder-logo.jpg",
  description: "Professional Certification Training and Career-Focused Learning Platform for individuals and organizations.",
  telephone: "+441253928501",
  email: "support@studygrinder.com",
  address: {
    streetAddress: "Ramphal Chowk Road, Dwarka Sector 7",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110075",
    addressCountry: "IN"
  },
  geo: {
    latitude: "28.5830",
    longitude: "77.0673"
  },
  sameAs: []
};

export const ARMX_INDECODEX_ORG_INFO = STUDYGRINDER_ORG_INFO;
export const TRAINCAPE_ORG_INFO = STUDYGRINDER_ORG_INFO;
