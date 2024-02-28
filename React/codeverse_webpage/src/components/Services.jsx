import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./services.css";
import styles from "../style";

function Services() {
  const [showTeamItems, setShowTeamItems] = useState(false);
  const teamSectionRef = useRef(null);

  useEffect(() => {
    if (showTeamItems && teamSectionRef.current) {
      teamSectionRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [showTeamItems]);

  const handleButtonClick = () => {
    setShowTeamItems(!showTeamItems);
  };

  return (
    <div ref={teamSectionRef}>
      <section id="About us">
        <h2 className={`${styles.heading2} my-8 id=`}>
          About
          <span className="text-gradient"> Us</span>{" "}
        </h2>
        <Link to="/serviceteam">
          <button
            onClick={handleButtonClick}
            className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {showTeamItems ? "Hide Team" : "Show Team"}
          </button>
        </Link>

        <p className="text-gray-400 mt-8 mx-5 text-left text-xl ">
        <h1 className="text-white">Welcome to Codeverse - Unleashing Creativity through Code!</h1> 
          
          <br />
          At Codeverse, we believe in turning your imagination into reality through the power of coding. Our platform is designed to bridge the gap between creativity and technology, making coding accessible to everyone. Whether you're a seasoned developer or a creative enthusiast, Codeverse empowers you to bring your ideas to life effortlessly. <br /> <br />
          <h1 className="text-white">Our Mission:</h1><br />
          At the core of Codeverse is a mission to democratize coding. We aim to break down the barriers that often intimidate beginners and hinder creativity. By providing a user-friendly platform, we aspire to make coding not just a skill but a language that everyone can speak. <br /> <br />
          <h1 className="text-white">What Sets Us Apart:</h1><br />
          Codeverse stands out as a pioneer in transforming hand-drawn wireframes into functional HTML code. Our unique technology analyzes your sketches, interprets the elements within them, and generates the relevant HTML code, making the coding process intuitive and enjoyable. <br /><br />
      

        </p>
      

      


        
    
    </section>
    </div>
  );
}

export default Services;
