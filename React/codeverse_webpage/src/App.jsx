import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import styles from "./style"; // Importing styles for component styling

// Importing individual components from the "./components" directory
import {
  Navbar,
  Hero,
  Business,
  Testimonials,
  Footer,
  Education,
  EducationMode,
  BusinessMode,
  UploadImageForm,
  Services,
  ServiceTeam,
  LoginPage,
  SignupPage,
} from "./components";

// Main App component
const App = () => (
  <Router>
    {/* Main container with background color, width, and overflow */}
    <div className="bg-primary w-full overflow-hidden">
      <Routes>
        {/* Route for the homepage */}
        <Route
          path="/"
          element={
            // Container for the homepage content
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
              {/* Inner container limiting content width */}
              <div className={`${styles.boxWidth}`}>
                {/* Components rendered on the homepage */}
                <Navbar/>
                <Hero/> 
                <Education/> 
                <Business/> 
                <UploadImageForm/> 
                <Testimonials/> 
                <Services/> 
                <Footer/> 
              </div>
            </div>
          }
        />
        {/* Routes for various pages */}
        <Route path="/EducationMode" element={<EducationMode />} /> 
        <Route path="/BusinessMode" element={<BusinessMode />} /> 
        <Route path="/serviceteam" element={<ServiceTeam />} /> 
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/signup" element={<SignupPage />} /> 
      </Routes>
    </div>
  </Router>
);

export default App; 
