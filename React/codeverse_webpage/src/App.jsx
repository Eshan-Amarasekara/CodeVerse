import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";

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
  SignupPage
} from "./components";



const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
              <div className={`${styles.boxWidth}`}>
                <Navbar />
                <Hero />
                <Education />
                <Business />
                <UploadImageForm />
                <Testimonials />
                <Services />
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/EducationMode" element={<EducationMode />} />
        <Route path="/BusinessMode" element={<BusinessMode />} />
        {/* Add the route for ServiceTeam */}
        <Route path="/serviceteam" element={<ServiceTeam />} />
        {/* Add the routes for the LoginPage and the SignupPage */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
