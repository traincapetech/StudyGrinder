import React, { useEffect } from "react";
import comptia from "../assets/comptia.json";
import Lottie from "lottie-react";
import MicrosoftCourse from "../components/MicrosoftCourse.jsx";
import mircro from "../assets/Microsoft-Emblem.jpg";
import { useNavigate } from "react-router-dom";

const Microsoft = () => {
  const courseData = [
    // All MicrosoftCourse/* URLs removed - no routes exist for these pages
    // If you need specific Microsoft courses, add them with proper routes in AllRoute.jsx first
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
                href="https://www.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors cursor-pointer"
                title="Visit Microsoft Official Website"
              >
                Microsoft
              </a>
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              Microsoft is a globally recognized technology company that
              develops, licenses, and supports a wide range of software,
              hardware, and cloud services. Known for products like Windows,
              Office, and Azure, Microsoft plays a pivotal role in empowering
              individuals and organizations worldwide. Through innovative
              solutions in cloud computing, artificial intelligence, and
              productivity tools, Microsoft enables professionals to enhance
              their capabilities and achieve their goals in diverse industries.
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
              navigate("/training");
            }}
            className="text-gray-600 font-bold py-2 px-4 rounded"
          >
            <span className="hover:text-gray-800">Training</span>
          </button>
          <span>{" > "}</span>
          <span className="ml-4">Microsoft</span>
        </div>
      </div>
      {/* Courses Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-5 py-10">
        {courseData.map((course, index) => (
          <MicrosoftCourse
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

export default Microsoft;
