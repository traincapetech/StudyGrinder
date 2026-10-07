import React from "react";
import { Link } from "react-router-dom";

const MicrosoftCourse = ({ title, url, image, course, subCourse }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg border border-[#212146] hover:shadow-xl transition-shadow">
      {/* Image */}
      <img
        className="w-full h-20 md:w-full md:h-28 mb-4 object-cover"
        src={image}
        alt={title}
      />

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-4 text-center">
        {title}
      </h3>

      {/* Course Details Button */}
      <Link to={url} className="mt-auto w-full">
        <button className="w-full text-white bg-blue-600 hover:bg-blue-700 text-sm md:text-base font-medium py-2 px-5 rounded-lg transition-colors">
          Course Details
        </button>
      </Link>
    </div>
  );
};

export default MicrosoftCourse;
