import React, { useEffect } from "react";
import comptia from "../assets/comptia.json";
import Lottie from "lottie-react";
import CiscoCourse from "../components/CiscoCourse.jsx";
import CiscoCCST from "../assets/Cisco/Cisco-ccst.png";
import CiscoCCT from "../assets/Cisco/CCT.png";
import CCSTsc from "../assets/Cisco/CCSTcybersecurity.png";
import CCTRS from "../assets/Cisco/CCT-RS.jpg";
import CCTDC from "../assets/Cisco/cct-data-center.png";
import CCNA from "../assets/Cisco/CCNA.png";
import CCCA from "../assets/Cisco/CCCA.png";
import CCNPEnterprise from "../assets/Cisco/ccnpEnterprise.png";
import CCNPSecurity from "../assets/Cisco/ccnpSecurity.png";
import CCNPDatacenter from "../assets/Cisco/ccnpDatacenter.png";
import CCNPServiceprovider from "../assets/Cisco/ccnpServiceprovider.png";
import CCNPCollaboration from "../assets/Cisco/ccnpCollaboration.png";
import CCNPDevnet from "../assets/Cisco/CCNPDevNet.png";
import CCIEenterpriseinfa from "../assets/Cisco/CCIEEnterpriseInfastructure.png";
import CCIEenterpriseWireless from "../assets/Cisco/CCIEWireless.png";
import CCIESecurity from "../assets/Cisco/CCIESecurity.png";
import CCIEDatacenter from "../assets/Cisco/CCIEdatacenter.png";
import CCIEServiceprovider from "../assets/Cisco/CCIEserviceprovider.png";
import CCIECollabration from "../assets/Cisco/CCIECollabration.png";
import { useNavigate } from "react-router-dom";

const Cisco = () => {
  const courseData = [
    {
      image: CCSTsc,
      title: "CCST Cybersecurity",
      description: "Learn to secure and protect systems like a pro.",
      url: "/CCSTcybersecurity",
      course: "Cisco",
      subCourse: "CCSTcybersecurity",
    },
    {
      image: CiscoCCST,
      title: "CCST Networking",
      description: "Networking fundamentals aligned with Cisco CCST.",
      url: "/CCSTNetworking",
      course: "Cisco",
      subCourse: "CCSTNetworking",
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="course-detail text-center bg-blue-100 py-10">
        <div className="info flex flex-col md:flex-row gap-6 items-center px-5">
          <Lottie
            animationData={comptia}
            className="w-full md:w-1/2"
            onError={(error) => {
              console.warn("Lottie animation error:", error);
            }}
          />
          <div className="text w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-7 text-cyan-900">
              <a
                href="https://www.cisco.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors cursor-pointer"
                title="Visit Cisco Official Website"
              >
                CISCO
              </a>
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              A Cisco CCNA (Cisco Certified Network Associate) course is an
              entry-level IT certification offered by Cisco that provides
              foundational knowledge in networking fundamentals, covering topics
              like network access, IP connectivity, routing, switching, security
              basics, and more, essentially preparing individuals to install,
              configure, operate, and troubleshoot basic network devices like
              routers and switches within a Cisco environment; it's widely
              recognized as a stepping stone for careers in network
              administration and IT support roles.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full py-4 px-6 bg-white rounded shadow-md border border-gray-200">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="text-gray-600 font-bold py-2 px-4 rounded"
        >
          <span className="hover:text-gray-800">Home</span>
        </button>
        <div className="flex items-center text-gray-500 font-bold">
          <span>{" > "}</span>
          <button
            onClick={() => {
              navigate("/courses");
            }}
            className="text-gray-600 font-bold py-2 px-4 rounded"
          >
            <span className="hover:text-gray-800">Courses</span>
          </button>
          <span>{" > "}</span>
          <span className="ml-4">Cisco</span>
        </div>
      </div>
      {/* Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 py-10">
        {courseData.map((course, index) => (
          <CiscoCourse
            key={index}
            image={course.image}
            title={course.title}
            description={course.description}
            url={course.url}
            course={course.course}
            subCourse={course.subCourse}
          />
        ))}
      </div>
    </>
  );
};

export default Cisco;
