import React, { useState } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styles from "../style"; // Import Tailwind CSS styles
import backgroundVideo from "../background.mp4"; // Import the same background video


const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  //Handling Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    //Password Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      //Redirect to Home page after login
      await auth.createUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  //Loading display
  if (loading) {
    return <div className={`${styles.flexCenter} bg-gray-100 h-screen`}>Loading...</div>;
  }

  //Display message if already logged in
  if (user) {
    return <div className={`${styles.flexCenter} bg-gray-100 h-screen`}>You are already logged in</div>;
  }

  //Apply video
  return (
    <div className="relative flex items-center justify-center h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
  
      <div className="absolute inset-0 bg-black opacity-30 "></div>
  
    {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className={`${styles.boxWidth} relative z-10 bg-white bg-opacity-40 p-12 rounded-3xl shadow-lg`}>
        <h1 className={styles.heading2} id="Upload">
          <span className="text-gradient ">SignUp</span>
        </h1>
        <form onSubmit={handleSignup} className={`${styles.marginY} mt-4`}>
        <label className={`${styles.paragraph} text-primary`}>Email</label>
        <div className="flex items-center mt-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`${styles.paragraph} w-full border-b-2 border-white focus:outline-none focus:border-secondary shadow-md rounded-md text-primary`}
          />
        </div>
        <label className={`${styles.paragraph} mt-4 text-primary`}>Password</label>
        <div className="flex items-center mt-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`${styles.paragraph} w-full border-b-2 border-white focus:outline-none focus:border-secondary shadow-md rounded-md text-primary`}
          />
        </div>
        <label className={`${styles.paragraph} mt-4 text-primary`}>Confirm Password</label>
        <div className="flex items-center mt-2">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={`${styles.paragraph} w-full border-b-2 border-white focus:outline-none focus:border-secondary shadow-md rounded-md text-primary`}
          />
        </div>
        <button
          type="submit"
          className={`${styles.paragraph} bg-white text-primary py-2 px-4 mt-6 hover:bg-secondary transition-all duration-300 focus:outline-none focus:ring focus:border-secondary transform hover:scale-105 shadow-md rounded-md`}
        >
          Sign up
        </button>
        </form>
        {error && <div className={`${styles.paragraph} text-red-500 mt-4`}>{error}</div>}
        <p className={`${styles.paragraph} mt-4 text-primary`}>
          Already have an account? <a href="/login" className="text-secondary">Login</a>
        </p>
      </div>
    </div>
  </div>
);
  }
export default SignupPage;