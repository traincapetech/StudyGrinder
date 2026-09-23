// Updated by Saurav
import React, { Suspense } from "react";
import { lazyWithRetry } from "../utils/lazyWithRetry";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
const ForgotPassword = lazyWithRetry(() => import("../pages/ForgotPassword"));
const NotFound = lazyWithRetry(() => import("../pages/NotFound"));
const Gallery = lazyWithRetry(() => import("../pages/Gallery"));
const CertificateLookup = lazyWithRetry(() => import("../pages/CertificateLookup"));

// Loading component
const LoadingComponent = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70vh",
      fontSize: "18px",
      color: "#333",
    }}
  >
    <p>Loading content...</p>
  </div>
);

// Lazy load high-level pages for better performance
const ClientRequirementWizard = lazyWithRetry(() => import("../pages/ClientRequirementWizard"));
const ConsultantChat = lazyWithRetry(() => import("../pages/ConsultantChat")); // Added ConsultantChat import
const Home = lazyWithRetry(() => import("../pages/Home"));
// const UserPage = lazy(() => import("../pages/userPage/UserPage"));
const Login = lazyWithRetry(() => import("../pages/Login"));
const AboutUS = lazyWithRetry(() => import("../pages/AboutUs/AboutUS"));
// Removed ConsultantLogin and ConsultantSignup imports as they are now part of AdminPanel
const ContactUs = lazyWithRetry(() => import("../pages/ContactUs"));
const Signup = lazyWithRetry(() => import("../pages/Signup"));
const FAQ = lazyWithRetry(() => import("../pages/FAQ"));
const Services = lazyWithRetry(() => import("../pages/Services/Services"));
const TermsAndCondition = lazyWithRetry(
  () => import("../pages/TermsAndCondition"),
);
const Courses = lazyWithRetry(() => import("../pages/Courses"));
const Career = lazyWithRetry(() => import("../pages/Career/Career"));
const Policy = lazyWithRetry(() => import("../pages/Policy"));
const PageNotFound = lazyWithRetry(() => import("../pages/404/PageNotFound"));
const Blogs = lazyWithRetry(() => import("../pages/Blogs/Blogs"));
const CompTIAsinglePage = lazyWithRetry(
  () => import("../pages/SinglePage/CompTIA/CompTIAsinglePage"),
);
const ReviewPage = lazyWithRetry(() => import("../pages/review/ReviewPage"));
const LandingPage = lazyWithRetry(
  () => import("../pages/landingPage/LandingPage"),
);
const Internship = lazyWithRetry(() => import("../pages/Internship"));
const Test = lazyWithRetry(() => import("../pages/Test/Test"));
const Training = lazyWithRetry(() => import("../pages/Training"));
const CorporateTraining = lazyWithRetry(() => import("../pages/CorporateTraining"));
const Resources = lazyWithRetry(() => import("../pages/Resources"));
const TrainingVendor = lazyWithRetry(() => import("../pages/TrainingVendor"));
const ISACA = lazyWithRetry(() => import("../pages/ISACA"));
const InternalExams = lazyWithRetry(() => import("../pages/InternalExams"));
// const VoucherSuccess = lazyWithRetry(() => import("../pages/VoucherSuccess"));
// const VoucherCancel = lazyWithRetry(() => import("../pages/VoucherCancel"));
// const Comptia = lazyWithRetry(() => import("../pages/Comptia"));
// const Aws = lazyWithRetry(() => import("../pages/Aws"));
// const BookPage = lazyWithRetry(() => import("../pages/ebook/BookPage"));

// Admin imports
const AdminPanel = lazyWithRetry(
  () => import("../pages/AdminPanel/AdminPanel"),
);
const VerifyCertificate = lazyWithRetry(
  () => import("../pages/Test/VerifyCertificate"),
);
const CertificateTemplate = lazyWithRetry(
  () => import("../pages/Test/CertificateTemplate"),
);

const VideoCoursesPage = lazyWithRetry(() => import("../pages/VideoCourses/VideoCoursesPage"));
const VideoCourseDetailPage = lazyWithRetry(() => import("../pages/VideoCourses/VideoCourseDetailPage"));
const VideoCourseSuccess = lazyWithRetry(() => import("../pages/VideoCourses/VideoCourseSuccess"));

// Portfolio pages
const Portfolio = lazyWithRetry(() => import("../pages/Portfolio/Portfolio"));
const ProjectDetail = lazyWithRetry(() => import("../pages/Portfolio/ProjectDetail"));

// Case Studies pages
const CaseStudies = lazyWithRetry(() => import("../pages/CaseStudies/CaseStudies"));
const CaseStudyDetails = lazyWithRetry(() => import("../pages/CaseStudies/CaseStudyDetails"));

// Products Showcase pages
const Products = lazyWithRetry(() => import("../pages/products/Products"));
const ProductDetail = lazyWithRetry(() => import("../pages/products/ProductDetail"));

// Other pages
const PartnerPage = lazyWithRetry(() => import("../pages/PartnerPage"));
const CertificationsIndex = lazyWithRetry(
  () => import("../pages/Certifications/CertificationsIndex"),
);
const CertificationsCategory = lazyWithRetry(
  () => import("../pages/Certifications/CertificationsCategory"),
);
const CertificationDetail = lazyWithRetry(
  () => import("../pages/Certifications/CertificationDetail"),
);

// B2B Services System
const ServiceDetail = lazyWithRetry(() => import("../pages/Services/ServiceDetail"));

// CompTIA Certification Pages
// Main CompTIA pages
const ComptiaLevels = lazyWithRetry(
  () => import("../pages/Comptia/ComptiaLevels"),
);
const ComptiaSpecialistLevel = lazyWithRetry(
  () => import("../pages/Comptia/ComptiaSpecialist"),
);
const ComptiaProfessionalLevel = lazyWithRetry(
  () => import("../pages/Comptia/ComptiaProfessional"),
);
const ComptiaExpertLevel = lazyWithRetry(
  () => import("../pages/Comptia/ComptiaExpert"),
);

// Specialist Level
const ComptiaAPlus = lazyWithRetry(
  () => import("../pages/Comptia/Specialist/ComptiaA+"),
);
const ComptiaNetworkPlus = lazyWithRetry(
  () => import("../pages/Comptia/Specialist/ComptiaNetwork+"),
);
const ComptiaSecurityPlusSpecialist = lazyWithRetry(
  () => import("../pages/Comptia/Specialist/ComptiaSecurity+"),
);
const ComptiaSecureInfrastructure = lazyWithRetry(
  () => import("../pages/Comptia/Specialist/ComptiaSecureInfrastructure"),
);

// Professional Level
const ComptiaCYSAPlus = lazyWithRetry(
  () => import("../pages/Comptia/Professional/ComptiaCYSA+"),
);
const ComptiaPenTestPlus = lazyWithRetry(
  () => import("../pages/Comptia/Professional/ComptiaPenTest"),
);
const ComptiaCloudPlus = lazyWithRetry(
  () => import("../pages/Comptia/Professional/ComptiaCloud+"),
);
const ComptiaCNVP = lazyWithRetry(
  () => import("../pages/Comptia/Professional/ComptiaCNVP"),
);
const ComptiaNetworkSecurity = lazyWithRetry(
  () => import("../pages/Comptia/Professional/ComptiaNetworkSecurity"),
);
const ComptiaSecureCloud = lazyWithRetry(
  () => import("../pages/Comptia/Professional/ComptiaSecureCloud"),
);
const ComptiaSecurityAnalytics = lazyWithRetry(
  () => import("../pages/Comptia/Professional/ComptiaSecurityAnalytics"),
);

// Expert Level
const CASPPlus = lazyWithRetry(() => import("../pages/Comptia/Expert/CASP+"));
const CSAE = lazyWithRetry(() => import("../pages/Comptia/Expert/CSAE"));

// PECB Certification Pages - Individual Certifications
// Information Security
const InformationSecurity = lazyWithRetry(
  () => import("../pages/PECB/Information_Security/InformationSecurity"),
);
const IEC27001InformationSecurityManagementSystem = lazyWithRetry(
  () =>
    import("../pages/PECB/Information_Security/ISO/IEC_27001_Information_Security_Management_System"),
);
const IEC27002InformationSecurityControls = lazyWithRetry(
  () =>
    import("../pages/PECB/Information_Security/ISO/IEC_27002_Information_Security_Controls"),
);
const IEC27005InformationSecurityRiskManagement = lazyWithRetry(
  () =>
    import("../pages/PECB/Information_Security/ISO/IEC_27005_Information _Security _Risk_Management"),
);
const PECBChiefInformationSecurityOfficer = lazyWithRetry(
  () =>
    import("../pages/PECB/Information_Security/PECB_Chief_Information_Security_Officer"),
);

// Cybersecurity Management
const CyberSecurityManagement = lazyWithRetry(
  () =>
    import("../pages/PECB/CyberSecurity_Management/CyberSecurityManagement"),
);
const PenetrationTestingProfessional = lazyWithRetry(
  () =>
    import("../pages/PECB/CyberSecurity_Management/Penetration_Testing_Professional"),
);
const CloudSecurity = lazyWithRetry(
  () => import("../pages/PECB/CyberSecurity_Management/Cloud_Security"),
);
const ComputerForensics = lazyWithRetry(
  () => import("../pages/PECB/CyberSecurity_Management/Computer_Forensics"),
);

// Quality & Management
const QualityManagement = lazyWithRetry(
  () => import("../pages/PECB/Quality&Management/QualityManagement"),
);
const ISO9001QualityManagementSystem = lazyWithRetry(
  () =>
    import("../pages/PECB/Quality&Management/ISO_9001_Quality_Management_System"),
);
const ISO55001AssetManagementSystem = lazyWithRetry(
  () =>
    import("../pages/PECB/Quality&Management/ISO_55001_Asset_Management_System"),
);
const ISO13485MedicalDevicesQMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Quality&Management/ISO_13485_Medical_Devices_Quality_Management_System"),
);
const ISO21001EducationalOrganizationsMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Quality&Management/ISO_21001_Educational_Organizations_Management_System"),
);
const ISO21502ProjectManagement = lazyWithRetry(
  () => import("../pages/PECB/Quality&Management/ISO_21502_Project_Management"),
);
const ISO28000SupplyChainSecurityMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Quality&Management/ISO_28000_Supply_Chain_Security_Management_System"),
);
const SixSigma = lazyWithRetry(
  () => import("../pages/PECB/Quality&Management/Six_Sigma"),
);
const IEC17025LaboratoryMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Quality&Management/ISO/IEC_17025_Laboratory_Management_System"),
);
const IEC20000ITServiceMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Quality&Management/ISO/IEC_20000_IT_Service_Management_System"),
);

// Information Security (Additional)
const EBIOSRiskManager = lazyWithRetry(
  () => import("../pages/PECB/Information_Security/EBIOS"),
);
const IEC27034ApplicationSecurity = lazyWithRetry(
  () =>
    import("../pages/PECB/Information_Security/ISO/IEC_27034_Application_Security"),
);
const IEC27035IncidentManagement = lazyWithRetry(
  () =>
    import("../pages/PECB/Information_Security/ISO/IEC_27035_Information_Security_Incident_Management"),
);

// Cybersecurity Management (Additional)
const CMMC = lazyWithRetry(
  () =>
    import("../pages/PECB/CyberSecurity_Management/Cybersecurity_Maturity_Model_Certification_(CMMC)"),
);
const IEC27033NetworkSecurity = lazyWithRetry(
  () =>
    import("../pages/PECB/CyberSecurity_Management/ISO/IEC_27033_Network_Security"),
);
const SCADASecurityManager = lazyWithRetry(
  () => import("../pages/PECB/CyberSecurity_Management/SCADA_Security_Manager"),
);

// Governance, Risk & Compliance
const GovernanceRiskCompliance = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/GovernanceRiskCompliance"),
);
const ISO31000RiskManagement = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/ISO_31000_Risk_Management"),
);
const ISO37001AntiBriberyMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/ISO 37001_Anti-Bribery_Management_System"),
);
const ISO37000CorporateGovernance = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/ISO_37000_Corporate_Governance"),
);
const ISO37301ComplianceMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/ISO_37301_Compliance_Management_System"),
);
const IEC38500ITGovernance = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/ISO/IEC_38500_IT_Governance"),
);
const ManagementSystemsInternalAuditor = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/Management_Systems_Internal_Auditor"),
);
const OperationalRiskManagement = lazyWithRetry(
  () =>
    import("../pages/PECB/Governance_Risk&Compliance/Operational_Risk_Management_in_Financial_Institutions"),
);

// Artificial Intelligence
const ArtificialIntelligence = lazyWithRetry(
  () => import("../pages/PECB/Artificial_Intelligence/ArtificialIntelligence"),
);
const ArtificialIntelligenceProfessional = lazyWithRetry(
  () =>
    import("../pages/PECB/Artificial_Intelligence/Artificial_Intelligence_Professional"),
);
const AIRiskManagement = lazyWithRetry(
  () => import("../pages/PECB/Artificial_Intelligence/AI_Risk_Management"),
);
const IEC42001AIMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Artificial_Intelligence/ISO/IEC_42001_Artificial_Intelligence_Management_System"),
);

// Privacy & Data Protection
const PrivacyDataProtection = lazyWithRetry(
  () => import("../pages/PECB/Privacy&Data_Protection/PrivacyDataProtection"),
);
const GeneralDataProtectionRegulationGDPR = lazyWithRetry(
  () =>
    import("../pages/PECB/Privacy&Data_Protection/General_Data_Protection_Regulation_(GDPR)"),
);
const IEC27701PrivacyMS = lazyWithRetry(
  () =>
    import("../pages/PECB/Privacy&Data_Protection/ISO/IEC_27701_Privacy_Information_Management_System"),
);

// Continuity, Resilience & Recovery
const ContinuityResilienceRecovery = lazyWithRetry(
  () =>
    import("../pages/PECB/Continuity_Resilience_Recovery/ContinuityResilienceRecovery"),
);
const ISO22301BusinessContinuityManagementSystem = lazyWithRetry(
  () =>
    import("../pages/PECB/Continuity_Resilience_Recovery/ISO_22301_Business_Continuity_Management_System"),
);
const CrisisManagement = lazyWithRetry(
  () =>
    import("../pages/PECB/Continuity_Resilience_Recovery/Crisis_Management"),
);
const DORA = lazyWithRetry(
  () =>
    import("../pages/PECB/Continuity_Resilience_Recovery/Digital_Operational_Resilience_Act_(DORA)"),
);
const DisasterRecovery = lazyWithRetry(
  () =>
    import("../pages/PECB/Continuity_Resilience_Recovery/Disaster_Recovery"),
);
const OperationalResilienceManagement = lazyWithRetry(
  () =>
    import("../pages/PECB/Continuity_Resilience_Recovery/Operational_Resilience_Management"),
);

// Technical Cybersecurity
const TechnicalCybersecurity = lazyWithRetry(
  () => import("../pages/PECB/Technical_Cybersecurity/TechnicalCybersecurity"),
);
const EthicalHacking = lazyWithRetry(
  () => import("../pages/PECB/Technical_Cybersecurity/Ethical_Hacking"),
);
const CCTA = lazyWithRetry(
  () =>
    import("../pages/PECB/Technical_Cybersecurity/Certified_Cyber_Threat_Analyst_(CCTA)"),
);
const DigitalForensicsExaminer = lazyWithRetry(
  () =>
    import("../pages/PECB/Technical_Cybersecurity/Certified_Digital_Forensics_Examiner"),
);
const IncidentResponse = lazyWithRetry(
  () => import("../pages/PECB/Technical_Cybersecurity/Incident_Response"),
);

// Digital Transformation
const DigitalTransformation = lazyWithRetry(
  () => import("../pages/PECB/Digital_Trasformation/Digital_Transformation"),
);

// Main PECB Landing Page
const PECB = lazyWithRetry(() => import("../pages/PECB"));

const AllRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        {/* Pages WITHOUT Navbar/Footer */}
        <Route
          path="/test"
          element={token ? <Test /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/" replace />}
        />
        <Route
          path="/forgot-password"
          element={!token ? <ForgotPassword /> : <Navigate to="/" replace />}
        />
        <Route path="/review-page" element={<ReviewPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/partner-page" element={<PartnerPage />} />
        <Route path="/certifications" element={<CertificationsIndex />} />
        <Route
          path="/certifications/:categorySlug"
          element={<CertificationsCategory />}
        />
        <Route
          path="/certifications/:categorySlug/:certSlug"
          element={<CertificationDetail />}
        />
        {/* <Route
          path="/ebook-page"
          element={
            token ? (
              <BookPage />
            ) : (
              <Navigate to="/login" state={{ from: "/ebook-page" }} replace />
            )
          }
        /> */}
        <Route path="/about-us" element={<AboutUS />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/requirement-wizard" element={<ClientRequirementWizard />} />
        {/* Removed Consultant Login/Signup routes */}
        <Route path="/consultant" element={<ConsultantChat />} />{" "}
        {/* Added Consultant Route */}
        {/* Clean URL aliases */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<Blogs />} />
        <Route path="/policies" element={<Policy />} />
        <Route path="/career" element={<Career />} />
        <Route path="/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/partners" element={<PartnerPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<ProjectDetail />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/video-courses" element={<VideoCoursesPage />} />
        <Route path="/video-courses/:id" element={<VideoCourseDetailPage />} />
        <Route path="/video-courses/payment-success" element={<VideoCourseSuccess />} />
        <Route path="/training" element={<Training />} />
        <Route path="/corporate-training" element={<CorporateTraining />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/software-solutions" element={<Services />} />
        <Route path="/training/:vendorSlug" element={<TrainingVendor />} />
        <Route path="/frequently-asked-questions" element={<FAQ />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/our-services" element={<Navigate to="/services" replace />} />
        <Route path="/service-detail/:slug" element={<Navigate to="/services" replace />} />
        <Route path="/Terms-and-Conditions" element={<TermsAndCondition />} />
        <Route path="/CertificateLookup" element={<CertificateLookup />} />
        <Route path="/verifyCertificate" element={<VerifyCertificate />} />
        {/* Legacy URL alias */}
        <Route path="/Courses-details" element={<Courses />} />
        <Route path="/Career-details" element={<Career />} />
        <Route path="/Our-Policies" element={<Policy />} />
        <Route path="/Our-Blogs" element={<Blogs />} />
        <Route path="/Our-Blogs/:slug" element={<Blogs />} />
        <Route path="/CompTIA-single-page" element={<CompTIAsinglePage />} />
        {/* CompTIA Certification Routes */}
        {/* Main CompTIA Navigation */}
        <Route path="/comptia" element={<ComptiaLevels />} />
        <Route
          path="/comptia/specialist"
          element={<ComptiaSpecialistLevel />}
        />
        <Route
          path="/comptia/professional"
          element={<ComptiaProfessionalLevel />}
        />
        <Route path="/comptia/expert" element={<ComptiaExpertLevel />} />
        {/* Specialist Level Certifications */}
        <Route path="/comptia/specialist/a-plus" element={<ComptiaAPlus />} />
        <Route
          path="/comptia/specialist/network-plus"
          element={<ComptiaNetworkPlus />}
        />
        <Route
          path="/comptia/specialist/security-plus"
          element={<ComptiaSecurityPlusSpecialist />}
        />
        <Route
          path="/comptia/specialist/secure-infrastructure"
          element={<ComptiaSecureInfrastructure />}
        />
        {/* Professional Level Certifications */}
        <Route
          path="/comptia/professional/cysa-plus"
          element={<ComptiaCYSAPlus />}
        />
        <Route
          path="/comptia/professional/pentest-plus"
          element={<ComptiaPenTestPlus />}
        />
        <Route
          path="/comptia/professional/cloud-plus"
          element={<ComptiaCloudPlus />}
        />
        <Route path="/comptia/professional/cnvp" element={<ComptiaCNVP />} />
        <Route
          path="/comptia/professional/network-security"
          element={<ComptiaNetworkSecurity />}
        />
        <Route
          path="/comptia/professional/secure-cloud"
          element={<ComptiaSecureCloud />}
        />
        <Route
          path="/comptia/professional/security-analytics"
          element={<ComptiaSecurityAnalytics />}
        />
        {/* Expert Level Certifications */}
        <Route path="/comptia/expert/casp-plus" element={<CASPPlus />} />
        <Route path="/comptia/expert/csae" element={<CSAE />} />
        {/* PECB Certification Routes - Individual Certifications */}
        {/* Information Security */}
        <Route
          path="/pecb/information-security"
          element={<InformationSecurity />}
        />
        <Route
          path="/pecb/information-security/iso-27001"
          element={<IEC27001InformationSecurityManagementSystem />}
        />
        <Route
          path="/pecb/information-security/iso-27002"
          element={<IEC27002InformationSecurityControls />}
        />
        <Route
          path="/pecb/information-security/iso-27005"
          element={<IEC27005InformationSecurityRiskManagement />}
        />
        <Route
          path="/pecb/information-security/iso-27034"
          element={<IEC27034ApplicationSecurity />}
        />
        <Route
          path="/pecb/information-security/iso-27035"
          element={<IEC27035IncidentManagement />}
        />
        <Route
          path="/pecb/information-security/ciso"
          element={<PECBChiefInformationSecurityOfficer />}
        />
        <Route
          path="/pecb/information-security/ebios"
          element={<EBIOSRiskManager />}
        />
        {/* Cybersecurity Management */}
        <Route
          path="/pecb/cybersecurity"
          element={<CyberSecurityManagement />}
        />
        <Route
          path="/pecb/cybersecurity/penetration-testing"
          element={<PenetrationTestingProfessional />}
        />
        <Route
          path="/pecb/cybersecurity/cloud-security"
          element={<CloudSecurity />}
        />
        <Route
          path="/pecb/cybersecurity/computer-forensics"
          element={<ComputerForensics />}
        />
        <Route path="/pecb/cybersecurity/cmmc" element={<CMMC />} />
        <Route
          path="/pecb/cybersecurity/network-security"
          element={<IEC27033NetworkSecurity />}
        />
        <Route
          path="/pecb/cybersecurity/scada-security"
          element={<SCADASecurityManager />}
        />
        {/* Quality & Management */}
        <Route path="/pecb/quality" element={<QualityManagement />} />
        <Route
          path="/pecb/quality/iso-9001"
          element={<ISO9001QualityManagementSystem />}
        />
        <Route
          path="/pecb/quality/iso-55001"
          element={<ISO55001AssetManagementSystem />}
        />
        <Route
          path="/pecb/quality/iso-13485"
          element={<ISO13485MedicalDevicesQMS />}
        />
        <Route
          path="/pecb/quality/iso-21001"
          element={<ISO21001EducationalOrganizationsMS />}
        />
        <Route
          path="/pecb/quality/iso-21502"
          element={<ISO21502ProjectManagement />}
        />
        <Route
          path="/pecb/quality/iso-28000"
          element={<ISO28000SupplyChainSecurityMS />}
        />
        <Route path="/pecb/quality/six-sigma" element={<SixSigma />} />
        <Route
          path="/pecb/quality/iso-17025"
          element={<IEC17025LaboratoryMS />}
        />
        <Route
          path="/pecb/quality/iso-20000"
          element={<IEC20000ITServiceMS />}
        />
        {/* Governance, Risk & Compliance */}
        <Route path="/pecb/governance" element={<GovernanceRiskCompliance />} />
        <Route
          path="/pecb/governance/iso-31000"
          element={<ISO31000RiskManagement />}
        />
        <Route
          path="/pecb/governance/iso-37001"
          element={<ISO37001AntiBriberyMS />}
        />
        <Route
          path="/pecb/governance/iso-37000"
          element={<ISO37000CorporateGovernance />}
        />
        <Route
          path="/pecb/governance/iso-37301"
          element={<ISO37301ComplianceMS />}
        />
        <Route
          path="/pecb/governance/iso-38500"
          element={<IEC38500ITGovernance />}
        />
        <Route
          path="/pecb/governance/internal-auditor"
          element={<ManagementSystemsInternalAuditor />}
        />
        <Route
          path="/pecb/governance/operational-risk"
          element={<OperationalRiskManagement />}
        />
        {/* Artificial Intelligence */}
        <Route
          path="/pecb/artificial-intelligence"
          element={<ArtificialIntelligence />}
        />
        <Route
          path="/pecb/artificial-intelligence/ai-professional"
          element={<ArtificialIntelligenceProfessional />}
        />
        <Route
          path="/pecb/artificial-intelligence/ai-risk-management"
          element={<AIRiskManagement />}
        />
        <Route
          path="/pecb/artificial-intelligence/iso-42001"
          element={<IEC42001AIMS />}
        />
        {/* Privacy & Data Protection */}
        <Route path="/pecb/privacy" element={<PrivacyDataProtection />} />
        <Route
          path="/pecb/privacy/gdpr"
          element={<GeneralDataProtectionRegulationGDPR />}
        />
        <Route path="/pecb/privacy/iso-27701" element={<IEC27701PrivacyMS />} />
        {/* Continuity, Resilience & Recovery */}
        <Route
          path="/pecb/continuity"
          element={<ContinuityResilienceRecovery />}
        />
        <Route
          path="/pecb/continuity/iso-22301"
          element={<ISO22301BusinessContinuityManagementSystem />}
        />
        <Route
          path="/pecb/continuity/crisis-management"
          element={<CrisisManagement />}
        />
        <Route path="/pecb/continuity/dora" element={<DORA />} />
        <Route
          path="/pecb/continuity/disaster-recovery"
          element={<DisasterRecovery />}
        />
        <Route
          path="/pecb/continuity/operational-resilience"
          element={<OperationalResilienceManagement />}
        />
        {/* Technical Cybersecurity */}
        <Route
          path="/pecb/technical-cybersecurity"
          element={<TechnicalCybersecurity />}
        />
        <Route
          path="/pecb/technical-cybersecurity/ethical-hacking"
          element={<EthicalHacking />}
        />
        <Route path="/pecb/technical-cybersecurity/ccta" element={<CCTA />} />
        <Route
          path="/pecb/technical-cybersecurity/digital-forensics"
          element={<DigitalForensicsExaminer />}
        />
        <Route
          path="/pecb/technical-cybersecurity/incident-response"
          element={<IncidentResponse />}
        />
        {/* Digital Transformation */}
        <Route
          path="/pecb/digital-transformation"
          element={<DigitalTransformation />}
        />
        {/* Main PECB Landing Page */}
        <Route path="/PECB" element={<PECB />} />
        <Route path="/pecb" element={<PECB />} />
        {/* Main ISACA Landing Page */}
        <Route path="/isaca" element={<ISACA />} />
        <Route path="/ISACA" element={<ISACA />} />
        <Route path="/home" element={<LandingPage />} />
        {/* Employee and Training Routes */}
        <Route path="/internship" element={<Internship />} />
        <Route path="/internal-exams" element={<InternalExams />} />
        {/* <Route path="/voucher-success" element={<VoucherSuccess />} /> */}
        {/* <Route path="/voucher-cancel" element={<VoucherCancel />} /> */}
        {/* Admin Panel */}
        <Route
          path="/admin-panel"
          element={
            token ? (
              <AdminPanel />
            ) : (
              <Navigate to="/login" state={{ from: "/admin-panel" }} replace />
            )
          }
        />
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/cer" element={<CertificateTemplate />} />
        <Route path="/Gallery" element={<Gallery />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoute;
