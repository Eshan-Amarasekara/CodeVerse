import React, { useState } from "react";
import { auth } from "./firebase"; // Import Firebase authentication module
import { useAuthState } from "react-firebase-hooks/auth"; // Import hook for Firebase authentication state
import { useNavigate } from "react-router-dom"; // Import hook for navigation
import styles from "../style"; // Import Tailwind CSS styles

// SignupPage Component
const SignupPage = () => {
  // State variables for email, password, confirm password, error message, user authentication state, and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  //Handling Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    // Password Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Create user with email and password using Firebase authentication
      await auth.createUserWithEmailAndPassword(email, password);
      // Redirect to Home page after successful signup
      navigate("/");
    } catch (err) {
      setError(err.message); // Set error message if signup fails
    }
  };

  // Loading display
  if (loading) {
    return <div className={`${styles.flexCenter} bg-gray-100 h-screen`}>Loading...</div>;
  }

  // Display message if already logged in
  if (user) {
    return <div className={`${styles.flexCenter} bg-gray-100 h-screen`}>You are already logged in</div>;
  }

  // Signup form JSX
  return (
    <div className="relative flex items-center justify-center h-screen">  
      {/* Signup Form */}
      <div className="relative z-10 flex items-center justify-center h-full" style={{ width: "500px" }}>
        {/* Background gradients */}
        <div className="absolute z-[0] w-[80%] h-[80%] right-0 top-60 blue__gradient" />
        <div className="absolute z-[0] w-[70%] h-[70%] left-20 bottom-60 pink__gradient" />
        {/* Signup form container */}
        <div className={`${styles.boxWidth} relative z-10 bg-black bg-opacity-60 p-12 rounded-3xl shadow-lg`}>
          {/* Signup heading */}
          <h1 className={styles.heading2} id="Upload">
            <span className="text-gradient ">SignUp</span>
          </h1>
          {/* Signup form */}
          <form onSubmit={handleSignup} className={`${styles.marginY} mt-4`}>
            {/* Email input */}
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
            {/* Password input */}
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
            {/* Confirm Password input */}
            <label className={`${styles.paragraph} mt-4 text-white`}>Confirm Password</label>
            <div className="flex items-center mt-2">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`${styles.paragraph} w-full border-b-2 border-white focus:outline-none focus:border-secondary shadow-md rounded-md text-primary`}
              />
            </div>
            {/* Signup button */}
            <button
              type="submit"
              className={`${styles.paragraph} bg-white text-black py-2 px-4 mt-6 hover:bg-purple-800 transition-all duration-300 focus:outline-none focus:ring focus:border-secondary transform hover:scale-105 shadow-md rounded-md`}
            >
              Sign up
            </button>
          </form>
          {/* Error message display */}
          {error && <div className={`${styles.paragraph} text-red-500 mt-4`}>{error}</div>}
          {/* Login link */}
          <p className={`${styles.paragraph} mt-4 text-purple`}>
            Already have an account? <a href="/login" className="text-secondary">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage; // Export SignupPage component
