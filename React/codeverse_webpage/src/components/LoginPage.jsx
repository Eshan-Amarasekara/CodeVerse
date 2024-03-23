import React, { useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styles from "../style"; // Import your Tailwind CSS styles
import { GoogleAuthProvider } from "firebase/auth";
import GoogleLogo from '../Google.svg'; // Import the Google logo SVG file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState(""); // State to handle email input for password reset
  const [showResetForm, setShowResetForm] = useState(false); // State to control visibility of password reset form
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      if (auth.currentUser) { // Check if user is authenticated
        await auth.sendPasswordResetEmail(resetEmail);
        setError("Password reset email sent. Check your inbox.");
      } else {
        setError("You need to be logged in to reset your password."); // Error message for non-authenticated user
      }
    } catch (err) {
      setError(err.message);
    }
  };
  

  const toggleResetForm = () => {
    setShowResetForm(!showResetForm);
    setError(""); // Clear error when toggling the form
  };

  if (loading) {
    return <div className={`${styles.flexCenter} bg-gray-100 h-screen`}>Loading...</div>;
  }

  // Check if the user is already logged in and redirect to the main page
  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="relative flex items-center justify-center h-screen">
      <div className="absolute z-[0] w-[70%] h-[70%] right-0 top-10 blue__gradient" />
      <div className="absolute z-[0] w-[50%] h-[60%] left-20 bottom-40 pink__gradient" />
      <div className="relative z-10 bg-primary bg-opacity-40 p-12 rounded-3xl shadow-lg" style={{ width: "500px" }}> {/* Adjust the width here */}
        <h1 className={styles.heading2} >
          <span className="text-gradient">Login</span>
        </h1>
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
              className={`${styles.paragraph} bg-gray-100 text-primary py-2 px-4 mt-2 hover:bg-secondary transition-all duration-300 focus:outline-none focus:ring focus:border-secondary transform hover:scale-105 shadow-md rounded-md`}
            >
              Reset Password
            </button>
            <button
              onClick={toggleResetForm}
              className={`${styles.paragraph} text-primary underline hover:text-purple-800 focus:outline-none mt-2`}
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
              className="h-6 w-6 mr-2 " // Adjust the size as needed
            />
            Sign Up with Google
          </div>
        </button>

        {error && <div className={`${styles.paragraph} text-red-500 mt-4`}>{error}</div>}
        <p className={`${styles.paragraph} mt-4 text-white`}>
          Don't have an account? <a href="/signup" className="text-purple-800">Sign up</a>
        </p>
      </div>

      {/* Add the overlay to make the video darker */}
      <div className="absolute inset-0 bg-black opacity-30 "></div>
    </div>
  );
};

export default LoginPage;
