import React, { useState } from "react";
import { auth } from "./firebase"; 
import { useAuthState } from "react-firebase-hooks/auth"; 
import { useNavigate } from "react-router-dom"; 
import styles from "../style";
import { GoogleAuthProvider } from "firebase/auth"; // Import Google authentication provider from Firebase
import GoogleLogo from '../Google.svg';

// Define the Login Page component
const LoginPage = () => {
  // Define state variables
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [resetEmail, setResetEmail] = useState(""); // State to handle email input for password reset
  const [showResetForm, setShowResetForm] = useState(false); // State to control visibility of password reset form
  const [error, setError] = useState(""); // State to handle error messages
  const [user, loading] = useAuthState(auth); // State to track user authentication status
  const navigate = useNavigate(); // Function for navigation

  // Function to handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await auth.signInWithEmailAndPassword(email, password); // Sign in with email and password
      navigate("/"); // Redirect to the main page upon successful login
    } catch (err) {
      setError(err.message); // Set error message if login fails
    }
  };

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Create Google authentication provider
      await auth.signInWithPopup(provider); // Sign in with Google popup
      navigate("/"); // Redirect to the main page upon successful login
    } catch (err) {
      setError(err.message); // Set error message if Google login fails
    }
  };

  // Function to handle password reset
  const handlePasswordReset = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await auth.sendPasswordResetEmail(resetEmail); // Send password reset email
      setError("Password reset email sent. Check your inbox. (Emails sent only for sign up Users)"); // Set success message
    } catch (err) {
      setError(err.message); // Set error message if password reset fails
    }
  };

  // Function to toggle password reset form visibility
  const toggleResetForm = () => {
    setShowResetForm(!showResetForm); // Toggle visibility of password reset form
    setError(""); // Clear error when toggling the form
  };

  // Render loading message while authentication is in progress
  if (loading) {
    return <div className={`${styles.flexCenter} bg-gray-100 h-screen`}>Loading...</div>;
  }

  // Check if the user is already logged in and redirect to the main page
  if (user) {
    navigate("/"); // Redirect to the main page if user is already authenticated
    return null; // Return null if redirecting
  }

  // Return the login form JSX
  return (
    <div className="relative flex items-center justify-center h-screen">
      {/* Background gradients */}
      <div className="absolute z-[0] w-[70%] h-[70%] right-0 top-10 blue__gradient" />
      <div className="absolute z-[0] w-[50%] h-[60%] left-20 bottom-40 pink__gradient" />
      
      {/* Login form */}
      <div className="relative z-10 bg-primary bg-opacity-60 p-12 rounded-3xl shadow-lg" style={{ width: "500px" }}> {/* Adjust the width here */}
        <h1 className={styles.heading2}>
          <span className="text-gradient">Login</span>
        </h1>
        
        {/* Email and password input fields */}
        <form onSubmit={handleLogin} className={`${styles.marginY} mt-6`}>
          <label className={`${styles.paragraph} text-white`}>Email</label>
          <div className="flex items-center mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`${styles.paragraph} w-full border-b-2 border-white focus:outline-none focus:border-secondary shadow-md rounded-md text-primary`}
            />
          </div>
          <label className={`${styles.paragraph} mt-4 text-white`}>Password</label>
          <div className="flex items-center mt-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`${styles.paragraph} w-full border-b-2 border-white focus:outline-none focus:border-secondary shadow-md rounded-md text-primary`}
            />
          </div>
          <button
            type="submit"
            className={`${styles.paragraph} bg-gray-100 text-primary py-2 px-4 mt-6 hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring focus:border-secondary transform hover:scale-105 shadow-md rounded-md`}
          >
            Login
          </button>
        </form>

        {/* "Forgot Password" Section */}
        {!showResetForm ? (
          <div className={`${styles.marginY} mt-4`}>
            <button
              onClick={toggleResetForm}
              className={`${styles.paragraph} text-white underline hover:text-secondary focus:outline-none`}
            >
              Forgot Password?
            </button>
          </div>
        ) : (
          <form onSubmit={handlePasswordReset} className={`${styles.marginY} mt-4`}>
            <label className={`${styles.paragraph} text-white`}>Forgot Password?</label>
            <div className="flex items-center mt-2">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className={`${styles.paragraph} w-full border-b-2 border-white focus:outline-none focus:border-secondary shadow-md rounded-md text-primary`}
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className={`${styles.paragraph} bg-gray-100 text-primary py-2 px-4 mt-2 hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring focus:border-secondary transform hover:scale-105 shadow-md rounded-md`}
            >
              Reset Password
            </button>
            <button
              onClick={toggleResetForm}
              className={`${styles.paragraph} text-white underline hover:text-purple-800 focus:outline-none mt-2`}
            >
              Cancel
            </button>
          </form>
        )}

        {/* Google login button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className={`${styles.paragraph} bg-gray-100 text-primary py-2 px-4 mt-4 hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring focus:border-secondary transform hover:scale-105 shadow-md rounded-md`}
        >
          <div className="flex items-center">
            <img
              src={GoogleLogo}
              alt="Google Logo"
              className="h-6 w-6 mr-2 " 
            />
            Sign Up with Google
          </div>
        </button>

        {error && <div className={`${styles.paragraph} text-red-500 mt-4`}>{error}</div>}
        <p className={`${styles.paragraph} mt-4 text-white`}>
          Don't have an account? <a href="/signup" className="text-purple-800">Sign up</a>
        </p>
      </div>

      <div className="absolute inset-0 bg-black opacity-30 "></div>
    </div>
  );
};

export default LoginPage;
