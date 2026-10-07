// API Configuration for different environments
const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://studygrinder-server.onrender.com' // Live Render Backend
    : 'http://localhost:3001'); // Development URL (Server runs on 3001)

export const API_ENDPOINTS = {
  // Registration endpoint (Unified website form)
  REGISTRATION: `${API_BASE_URL}/registration`,

  // User endpoints
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
  SEND_OTP: `${API_BASE_URL}/users/sendOTPToEmail`,
  VERIFY_OTP: `${API_BASE_URL}/users/verifyOtp`,
  RESET_PASSWORD: `${API_BASE_URL}/users/reset_password`,

  // Question endpoints
  QUESTIONS: `${API_BASE_URL}/questions`,
  GET_QUESTIONS: `${API_BASE_URL}/questions/getQuestions`,
  ADD_QUESTION: `${API_BASE_URL}/questions/addQuestion`,

  // User management
  USERS: `${API_BASE_URL}/users`,

  // Results
  RESULTS: `${API_BASE_URL}/results`,

  // Security
  SECURITY: `${API_BASE_URL}/security`,
};

export default API_BASE_URL;
