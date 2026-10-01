// // import React, { useEffect, useState } from "react";
// // import signuppage from "../css/Signup.module.css";
// // import { FaCircleUser } from "react-icons/fa6";
// // import { FaRegEyeSlash } from "react-icons/fa6";
// // import { MdEmail } from "react-icons/md";
// // import axios from "axios";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { signupUser } from "../slices/userSlice";

// // const Signup = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const {user,loading,error} = useSelector((state)=> state.user)
// //   const [payload, setPayload] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //   });

// //   const handleChange = (e) => {
// //     setPayload({ ...payload, [e.target.name]: e.target.value });
// //   };
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     dispatch(signupUser({
// //       username: payload.username,
// //       email: payload.email,
// //       password: payload.password
// //     })).then(()=>{
// //       navigate('/login')
// //     })
// //     setPayload({ username: "", email: "", password: "" });
// //   };
// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);
// //   return (
// //     <div className={signuppage.wrapperSignup}>
// //       <div className={signuppage.formBoxLogin}>
// //         <form onSubmit={handleSubmit} className={signuppage.singupForm}>
// //           <h1>Signup</h1>
// //           <div className={signuppage.inputBox}>
// //             <input
// //               type="text"
// //               placeholder="Username"
// //               name="username"
// //               required
// //               onChange={handleChange}
// //             />
// //             <FaCircleUser className={signuppage.icon} />
// //           </div>
// //           <div className={signuppage.inputBox}>
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               name="email"
// //               required
// //               onChange={handleChange}
// //             />
// //             <MdEmail className={signuppage.icon} />
// //           </div>
// //           <div className={signuppage.inputBox}>
// //             <input
// //               type="password"
// //               placeholder="Password"
// //               name="password"
// //               required
// //               onChange={handleChange}
// //             />
// //             <FaRegEyeSlash className={signuppage.icon} />
// //           </div>
// //           <div className={signuppage.RememberPassword}>
// //             <lable>
// //               <input type="checkbox" required />
// //               <span style={{ position: "relative", top: "-6px" }}>
// //                 I agree to terms & conditions{" "}
// //               </span>
// //             </lable>
// //           </div>
// //           <button type="submit">Register</button>

// //           <div className={signuppage.registerLink}>
// //             <p>
// //               Already have an account? <a href="/login">Login here</a>
// //             </p>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;

// // import React, { useEffect, useState } from "react";
// // // import signuppage from "../css/Signup.module.css";
// // import { FaRegEyeSlash, FaEye } from "react-icons/fa6";
// // import { useDispatch } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { signupUser } from "../slices/userSlice";
// // import banner from "../../src/assets/loginbanner.jpeg";
// // import Lottie from "lottie-react";
// // import signup from "../assets/signup.json"

// // const Signup = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [payload, setPayload] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //   });
// //   const [passwordVisible, setPasswordVisible] = useState(false);
// //   const [signupError, setSignupError] = useState(null);

// //   const togglePasswordVisibility = () => {
// //     setPasswordVisible(!passwordVisible);
// //   };

// //   const handleChange = (e) => {
// //     setPayload({ ...payload, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSignupError(null);

// //     try {
// //       const result = await dispatch(
// //         signupUser({
// //           username: payload.username,
// //           email: payload.email,
// //           password: payload.password,
// //         })
// //       );

// //       if (result.type === "user/signupUser/fulfilled") {
// //         navigate("/login");
// //       } else {
// //         setSignupError(result.payload?.msg || "Signup failed.");
// //       }
// //     } catch (error) {
// //       setSignupError("An error occurred during signup.");
// //     }
// //   };

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   return (
// //     <div className="w-full md:h-[85vh] h-[125vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${banner})` }}>
// //       <div className="absolute inset-0 bg-black opacity-50"></div>

// //       <div className="absolute inset-0 flex justify-center items-center">

// //         <div className="grid-cols-1 md:flex m-auto p-4">
// //           <div className="bg-[#152B54] w-fit md:w-[30%]  ml-auto">
// //           <Lottie  animationData={signup} loop={true} className=' w-full h-full my-auto'/>
// //           </div>
// //           {/* Right Signup Form */}
// //           <div className="bg-white bg-opacity-90 p-8 shadow-lg w-full sm:w-[400px] mr-auto">
// //             <h1 className="text-3xl font-semibold text-center text-[#152B54] mb-6">Sign Up</h1>
// //             {signupError && <p className="text-red-500 text-sm mb-4">{signupError}</p>}
// //             <form onSubmit={handleSubmit}>
// //               <div className="mb-4">
// //                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
// //                 <input
// //                   type="text"
// //                   id="username"
// //                   name="username"
// //                   required
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                 />
// //               </div>

// //               <div className="mb-4">
// //                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   required
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                 />
// //               </div>

// //               <div className="mb-4 relative">
// //                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
// //                 <input
// //                   type={passwordVisible ? "text" : "password"}
// //                   id="password"
// //                   name="password"
// //                   required
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                 />
// //                 {passwordVisible ? (
// //                   <FaEye onClick={togglePasswordVisibility} className="absolute right-4 top-[70%] transform -translate-y-1/2 text-gray-600 cursor-pointer" />
// //                 ) : (
// //                   <FaRegEyeSlash onClick={togglePasswordVisibility} className="absolute right-4 top-[70%] transform -translate-y-1/2 text-gray-600 cursor-pointer" />
// //                 )}
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="w-full py-2 bg-[#152B54] text-white rounded-lg hover:bg-sky-950- transition duration-200"
// //               >
// //                 Register
// //               </button>

// //               <div className="mt-4 text-center">
// //                 <p className="text-sm text-gray-700">
// //                   Already have an account?{" "}
// //                   <a href="/login" className="text-[#152B54] hover:underline">Login here</a>
// //                 </p>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;

// //Updated by Ritik
// import React, { useEffect, useState } from "react";
// import { FaRegEyeSlash, FaEye } from "react-icons/fa6";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { signupUser } from "../slices/userSlice";
// import banner from "../../src/assets/loginbanner.jpeg";
// import Lottie from "lottie-react";
// import signup from "../assets/signup.json";import logo from "../assets/WhatsApp_Image_2024-06-22_at_10.01.48-removebg-preview.png";

// const Signup = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [payload, setPayload] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     address: "",
//     pinCode: "",
//     country: "",
//     linkedIn: "",
//     interest: ""
//   });
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [signupError, setSignupError] = useState(null);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleChange = (e) => {
//     setPayload({ ...payload, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log the payload data to the console for debugging purposes
//     // console.log(payload);

//     setSignupError(null);

//     try {
//       const result = await dispatch(
//         signupUser({
//           username: payload.username,
//           email: payload.email,
//           password: payload.password,
//           phoneNumber: payload.phoneNumber,
//           address: payload.address,
//           pinCode: payload.pinCode,
//           country: payload.country,
//           linkedIn: payload.linkedIn,
//           interest: payload.interest
//         })
//       );

//       if (result.type === "user/signupUser/fulfilled") {
//         // alert("Registration successful! Please log in.");
//         navigate("/login");
//       } else {
//         setSignupError(result.payload?.msg || "Signup failed.");
//       }
//     } catch (error) {
//       setSignupError("An error occurred during signup.");
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="w-full h-[205vh] md:h-[150vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${banner})` }}>
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       <div className="absolute inset-0 flex justify-center items-center">
//         <div className="grid-cols-1 md:flex m-auto p-4">
//           <div className="bg-[#152B54] w-fit md:w-[30%] ml-auto">
//           <div className="relative">
//             <img
//               src={logo}
//               alt="Armx-Indecodex"
//               className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] absolute top-0"
//             />
//           </div>
//             <Lottie animationData={signup} loop={true} className="w-full h-full my-auto" />
//           </div>
//           {/* Right Signup Form */}
//           <div className="bg-white bg-opacity-90 p-8 shadow-lg w-full sm:w-[400px] mr-auto">
//             <h1 className="text-3xl font-semibold text-center text-[#152B54] mb-6">Sign Up</h1>
//             {signupError && <p className="text-red-500 text-sm mb-4">{signupError}</p>}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>

//               <div className="mb-4 relative">
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//                 {passwordVisible ? (
//                   <FaEye onClick={togglePasswordVisibility} className="absolute right-4 top-[70%] transform -translate-y-1/2 text-gray-600 cursor-pointer" />
//                 ) : (
//                   <FaRegEyeSlash onClick={togglePasswordVisibility} className="absolute right-4 top-[70%] transform -translate-y-1/2 text-gray-600 cursor-pointer" />
//                 )}
//               </div>

//               {/* New Fields */}
//               <div className="mb-4">
//                 <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                 <input
//                   type="text"
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700">Pin Code</label>
//                 <input
//                   type="text"
//                   id="pinCode"
//                   name="pinCode"
//                   required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
//                 <input
//                   type="text"
//                   id="country"
//                   name="country"
//                   required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="linkedIn" className="block text-sm font-medium text-gray-700">LinkedIn <span className="text-slate-500 text-[10px] ">(optional)</span></label>
//                 <input
//                   type="text"
//                   id="linkedIn"
//                   name="linkedIn"
//                   // required
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//               </div>

//               {/* Interest Dropdown */}
//               <div className="mb-4">
//                 <label htmlFor="interest" className="block text-sm font-medium text-gray-700">Interest</label>
//                 <select
//                   id="interest"
//                   name="interest"
//                   onChange={handleChange}
//                   value={payload.interest}
//                   className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   <option value="">Select Interest</option>
//                   <option value="Cloud Computing">Cloud Computing</option>
//                   <option value="Project Management Professional">Project Management Professional</option>
//                   <option value="PECB">PECB</option>
//                   <option value="Microsoft">Microsoft</option>
//                   <option value="CyberSecurity">CyberSecurity</option>
//                   <option value="Non-IT">Non-IT</option>
//                 </select>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full py-2 bg-[#152B54] text-white rounded-lg hover:bg-sky-950- transition duration-200"
//               >
//                 Register
//               </button>

//               <div className="mt-4 text-center">
//                 <p className="text-sm text-gray-700">
//                   Already have an account?{" "}
//                   <a href="/login" className="text-[#152B54] hover:underline">Login here</a>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

//Ishaan Jain Code
import React, { useEffect, useState } from "react";
import { FaRegEyeSlash, FaEye, FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../slices/userSlice";
import banner from "../../src/assets/loginbanner.jpeg";
import Lottie from "lottie-react";
import signup from "../assets/signup.json";
import logo from "../assets/Study_Grinder_Logo.jpg.jpeg";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    pinCode: "",
    country: "",
    linkedIn: "",
    interest: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle numeric fields to prevent non-numeric input
    if (name === "phoneNumber" || name === "pinCode") {
      // Only allow digits
      const numericValue = value.replace(/\D/g, "");
      setPayload({ ...payload, [name]: numericValue });
    } else {
      setPayload({ ...payload, [name]: value });
    }

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!payload.username.trim()) {
      newErrors.username = "Username is required";
    } else if (payload.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!payload.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(payload.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!payload.password) {
      newErrors.password = "Password is required";
    } else if (payload.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else {
      // Check password strength
      const hasUpperCase = /[A-Z]/.test(payload.password);
      const hasLowerCase = /[a-z]/.test(payload.password);
      const hasNumbers = /\d/.test(payload.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(payload.password);

      if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
        newErrors.password =
          "Password must contain uppercase, lowercase, and numbers";
      }
    }

    // Phone number validation
    if (!payload.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      payload.phoneNumber.length < 10 ||
      payload.phoneNumber.length > 15
    ) {
      newErrors.phoneNumber =
        "Please enter a valid phone number (10-15 digits)";
    }

    // Pin code validation
    if (!payload.pinCode) {
      newErrors.pinCode = "Pin code is required";
    } else if (!/^\d{5,6}$/.test(payload.pinCode)) {
      newErrors.pinCode = "Please enter a valid 5-6 digit pin code";
    }

    // Country validation
    if (!payload.country.trim()) {
      newErrors.country = "Country is required";
    }

    // Address validation
    if (!payload.address.trim()) {
      newErrors.address = "Address is required";
    } else if (payload.address.trim().length < 10) {
      newErrors.address =
        "Please enter a complete address (at least 10 characters)";
    }

    // Interest validation
    if (!payload.interest) {
      newErrors.interest = "Please select an interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setConfirmSubmit(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSignupError(null);

    try {
      const result = await dispatch(
        signupUser({
          username: payload.username,
          email: payload.email,
          password: payload.password,
          phoneNumber: payload.phoneNumber,
          address: payload.address,
          pinCode: payload.pinCode,
          country: payload.country,
          linkedIn: payload.linkedIn,
          interest: payload.interest,
        }),
      );

      if (result.type === "user/signupUser/fulfilled") {
        navigate("/login");
      } else {
        const errorMessage =
          result.payload?.message || "Signup failed. Please try again.";
        setSignupError(errorMessage);
        setConfirmSubmit(false);
      }
    } catch (error) {
      setSignupError(
        "An error occurred during signup. Please try again later.",
      );
      console.error("Signup error:", error);
      setConfirmSubmit(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Back Arrow Button */}
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="absolute top-2 left-2 md:top-4 md:left-4 z-20 text-white bg-[#152B54] 
                   p-2 md:p-3 rounded-full hover:bg-sky-950 transition duration-200
                   flex items-center justify-center"
        aria-label="Go back to home"
      >
        <FaArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
      </button>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0 flex justify-center items-center p-4 overflow-auto">
        <div className="grid-cols-1 md:flex m-auto p-4 max-w-6xl">
          {/* Left Animation Section */}
          <div className="bg-[#152B54] w-full md:w-[30%] relative ml-auto mb-4 md:mb-0">
            <div className="relative z-10">
              <img
                src={logo}
                alt="Armx-Indecodex"
                className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] absolute top-0 left-0"
              />
            </div>
            <div className="h-full flex justify-center items-center">
              <Lottie
                animationData={signup}
                loop={true}
                style={{ width: "100%", height: "auto", maxHeight: "100%" }}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                }}
                onError={(error) => {
                  console.warn("Lottie animation error:", error);
                  // Fallback to a simple div if animation fails
                }}
              />
            </div>
          </div>

          {/* Right Signup Form */}
          <div className="bg-white bg-opacity-90 p-6 md:p-8 shadow-lg w-full md:w-[400px] mr-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#152B54] mb-6">
              Sign Up
            </h1>

            {signupError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-red-700 text-sm">{signupError}</p>
              </div>
            )}

            {confirmSubmit ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-[#152B54]">
                  Confirm Your Details
                </h2>
                <div className="space-y-3 mb-4">
                  <p>
                    <span className="font-medium">Username:</span>{" "}
                    {payload.username}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {payload.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {payload.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span>{" "}
                    {payload.country}
                  </p>
                  <p>
                    <span className="font-medium">Interest:</span>{" "}
                    {payload.interest}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 py-2 bg-[#152B54] text-white rounded-lg hover:bg-sky-950 transition duration-200"
                  >
                    {isLoading ? "Processing..." : "Confirm & Register"}
                  </button>
                  <button
                    onClick={() => setConfirmSubmit(false)}
                    className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmation} noValidate>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username*
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={payload.username}
                    required
                    onChange={handleChange}
                    className={`w-full px-4 py-2 mt-2 border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  {errors.username && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={payload.email}
                    required
                    onChange={handleChange}
                    className={`w-full px-4 py-2 mt-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      value={payload.password}
                      required
                      onChange={handleChange}
                      className={`w-full px-4 py-2 mt-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    <button
                      type="button"
                      aria-label={
                        passwordVisible ? "Hide password" : "Show password"
                      }
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      {passwordVisible ? (
                        <FaEye className="text-gray-600" />
                      ) : (
                        <FaRegEyeSlash className="text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                  {!errors.password && payload.password && (
                    <p className="mt-1 text-xs text-gray-500">
                      Password must be at least 8 characters with uppercase,
                      lowercase, and numbers.
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={payload.phoneNumber}
                    required
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`w-full px-4 py-2 mt-2 border ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={payload.address}
                    required
                    onChange={handleChange}
                    className={`w-full px-4 py-2 mt-2 border ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                    aria-invalid={errors.address ? "true" : "false"}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="pinCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pin Code*
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    id="pinCode"
                    name="pinCode"
                    value={payload.pinCode}
                    required
                    onChange={handleChange}
                    placeholder="5-6 digit code"
                    maxLength="6"
                    className={`w-full px-4 py-2 mt-2 border ${
                      errors.pinCode ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                    aria-invalid={errors.pinCode ? "true" : "false"}
                  />
                  {errors.pinCode && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.pinCode}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country*
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={payload.country}
                    required
                    onChange={handleChange}
                    className={`w-full px-4 py-2 mt-2 border ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                    aria-invalid={errors.country ? "true" : "false"}
                  />
                  {errors.country && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="linkedIn"
                    className="block text-sm font-medium text-gray-700"
                  >
                    LinkedIn{" "}
                    <span className="text-slate-500 text-[10px]">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    id="linkedIn"
                    name="linkedIn"
                    value={payload.linkedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="interest"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interest*
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    onChange={handleChange}
                    value={payload.interest}
                    required
                    className={`w-full px-4 py-2 mt-2 border ${
                      errors.interest ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#152B54]`}
                    aria-invalid={errors.interest ? "true" : "false"}
                  >
                    <option value="">Select Interest</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Project Management Professional">
                      Project Management Professional
                    </option>
                    <option value="PECB">PECB</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="CyberSecurity">CyberSecurity</option>
                    <option value="Non-IT">Non-IT</option>
                  </select>
                  {errors.interest && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.interest}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-[#152B54] text-white rounded-lg hover:bg-sky-950 transition duration-200 disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-700">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="text-[#152B54] hover:underline"
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
