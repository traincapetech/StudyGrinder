import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AutoPlay from "../pages/AutoPlay";
import Slider from "react-slick";

import banner from "../assets/banner.jpeg";
import review1 from "../assets/review5.jpeg";
import review2 from "../assets/review2.jpeg";
import review3 from "../assets/review4.jpeg";
import review4 from "../assets/review6.png";
import gif from "../assets/student-mgmt.gif";
import mircro from "../assets/Microsoft-Emblem.jpg";
import { Helmet } from "react-helmet-async";


// Import Logos
import Logo1 from "../assets/ciscologo-courses.webp";
import Logo2 from "../assets/tallylogo-courses.jpg";
import Logo3 from "../assets/pmilogo-courses.png";
import Logo4 from "../assets/ibmlogo-courses.png";
import Logo5 from "../assets/quickbookslogo-courses.png";
import Logo6 from "../assets/metalogocourses.png";
import Logo7 from "../assets/dlilogo-courses.jpg";
import Logo8 from "../assets/unitylogo-courses.png";
import Logo9 from "../assets/csblogo-courses.png";
import Logo10 from "../assets/adwslogo-courses.jpg";
import Logo11 from "../assets/esblogo-courses.jpg";
import Logo12 from "../assets/adobenewlogo2.png";
import Logo13 from "../assets/autodesklogo.png";
import Logo14 from "../assets/microsoftlogo-courses.png";
import { FaStar } from "react-icons/fa";


const Courses = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Explore our IT Courses & Certification | StudyGrinder</title>
        <meta
          name="description"
          content="Explore our IT Certifications and get in touch with us for Certifications like CompTIA, AWS, PMI, Microsoft, Cisco and many more. | StudyGrinder"
        />
        <link rel="canonical" href="https://studygrinder.com/Courses-details" />
      </Helmet>



      <div className="bg-gray-50">
        {/* Banner Section */}
        <div className="relative md:h-[11rem] lg:h-[20rem] mb-12">
          <div className="w-full md:h-[11rem] lg:h-[25rem] overflow-hidden">
            <AutoPlay />
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
            <span className="ml-4">Course Details</span>
          </div>
        </div>
        {/* Logos Section */}
        <div className="bg-gray-200 p-5 m-5">
          <h1 className="text-center font-bold uppercase text-4xl p-4">
            Get Certified by World's Leading IT Companies' Certifications
          </h1>
          <Slider {...settings} className="w-full">
            {[
              Logo1,
              Logo2,
              Logo3,
              Logo4,
              Logo5,
              Logo6,
              Logo7,
              Logo8,
              Logo9,
              Logo10,
              Logo11,
              Logo12,
              Logo13,
              Logo14,
            ].map((logo, index) => (
              <div key={index} className="flex justify-center p-3">
                <img
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="max-h-20 object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>



        {/* Learner Outcomes Section */}
        <div className="flex flex-col md:flex-row bg-gray-50 my-36 p-2 md:pl-4">
          <img
            src={banner}
            className="rounded bg-gray-50 w-full md:w-[32rem] md:h-[20rem] object-cover"
            alt="IT Certifications- AWS, CompTIA, PMI, Microsoft Azure, Cisco, etc"
          />
          <div className="flex flex-col text-center text-2xl mx-8  mt-4 md:mt-0">
            <h2 className="mt-7 text-3xl md:text-4xl font-bold text-cyan-500">
              Learner outcomes on Armx-Indecodex
            </h2>
            <h3 className="text-base md:text-lg mt-4">
              87% of people certifying for professional development report
              career benefits, including outcomes like getting a promotion,
              becoming better at their current job, and finding a new job.
            </h3>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-200 h-auto py-10">
          <p className="flex text-3xl font-bold pt-10 font-serif justify-center">
            ------ Testimonial ------
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5 mt-10">
            {[
              {
                name: "Asim Farooq",
                review:
                  "This is a great company. Everyone is very experienced and knowledgeable. I would recommend everyone to partner and work with them. Highly recommend checking them out!",
                image: review1,
              },
              {
                name: "Manish kumar",
                review:
                  "I'm so happy to find this training center. They provide outstanding training, support, coaching, and tutoring for all IT related courses. Always available for any questions regarding exam prep and certification.",
                image: review2,
              },
              {
                name: "Muthiah Lakshmanan",
                review:
                  "The team was awesome to work with, provided great expertise and communication to help me successfully complete my goal. I highly recommend them and will do more business in the future.",
                image: review3,
              },
              {
                name: "rohit mullick",
                review:
                  "If you want to do certifications in your respective field and enhance your career then this institute is the one of best I came across with.. Would really recommend to people who want to enhance their skills and climb the ladder by selecting quite a good range certifications which this institute offer.",
                image: review4,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-md h-auto w-full max-w-xs m-2 mt-10 relative"
              >
                <div className="bg-red-400 rounded-full w-[6rem] sm:w-[7rem] mx-auto mt-10 h-[6rem] sm:h-[7rem] absolute top-0 left-0 right-0">
                  <img
                    src={testimonial.image}
                    className="w-full h-full object-cover rounded-full"
                    alt={`review${index + 1}`}
                  />
                </div>
                <h2 className="text-center text-xl sm:text-xl font-bold pt-[10rem]">
                  {testimonial.name}
                </h2>
                <div className="flex justify-center pt-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={30} style={{ color: "gold" }} />
                  ))}
                </div>
                <p className="p-4 mt-4 text-justify text-sm sm:text-base">
                  {testimonial.review}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Call-to-Action Section */}
        <div className="relative bg-gray-50 h-auto flex flex-col-reverse sm:flex-row items-center justify-center p-4 sm:p-8 overflow-hidden">
          <div className="mx-auto text-center sm:text-left relative sm:w-1/2">
            <h1 className="sm:text-xl md:text-3xl font-bold text-gray-800 mb-4 px-4">
              Take the next step toward your personal and professional{" "}
              <br className="hidden md:block" />
              goals with Armx-Indecodex.
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 px-4">
              Join now to receive personalized recommendations from the full
              Armx-Indecodex catalog.
            </h2>
          </div>
          <img
            src={gif}
            className="rounded-md sm:w-1/2 md:w-10/12 lg:w-8/12 opacity-70 shadow-lg shadow-blue-300 object-cover sm:h-[15rem] md:h-[20rem]"
            alt="Armx-Indecodex"
          />
        </div>
      </div>
    </>
  );
};

export default Courses;