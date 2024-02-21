import React, { useState, useRef, useEffect } from "react";
import "./services.css";
import styles from "../style";

function Services() {
  const [showTeamItems, setShowTeamItems] = useState(false);
  const teamSectionRef = useRef(null);

  useEffect(() => {
    if (showTeamItems && teamSectionRef.current) {
      teamSectionRef.current.scrollIntoView({ behavior: "smooth" ,block: "end" });
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
        <button
          onClick={handleButtonClick}
          className={`bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {showTeamItems ? "Hide Team" : "Show Team"}
        </button>

        <p className="text-gray-400 mt-8 mx-5 text-left text-xl ">

        <h1 className="text-white">Welcome to Codeverse - Unleashing Creativity through Code!</h1> 
          
          <br />
          At Codeverse, we believe in turning your imagination into reality through the power of coding. Our platform is designed to bridge the gap between creativity and technology, making coding accessible to everyone. Whether you're a seasoned developer or a creative enthusiast, Codeverse empowers you to bring your ideas to life effortlessly. <br /> <br />
          <h1 className="text-white">Our Mission:</h1><br />
          At the core of Codeverse is a mission to democratize coding. We aim to break down the barriers that often intimidate beginners and hinder creativity. By providing a user-friendly platform, we aspire to make coding not just a skill but a language that everyone can speak. <br /> <br />
          <h1 className="text-white">What Sets Us Apart:</h1><br />
          Codeverse stands out as a pioneer in transforming hand-drawn wireframes into functional HTML code. Our unique technology analyzes your sketches, interprets the elements within them, and generates the relevant HTML code, making the coding process intuitive and enjoyable. <br /><br />
      

        </p>
      

      {showTeamItems && (

        <div className="flex flex-no-wrap -mx-4">
          
          {/* Team Item 1 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8">
            <div className="team-item  p-6 rounded-lg shadow-md">
              <img
                src="Chamidu.PNG"
                className="team-image w-full mb-4 rounded-md"
                alt="pic"
              />
              <h3 className="text-lg font-bold mb-2 ">CHAMIDU HIMANTHA</h3>
              <p className="text-gray-300 mb-2">Project Manager</p>
              <p className="italic-text text-gray-200">
              Ensuring smooth project operations and timely completion by effectively coordinating team efforts and managing resources.

              </p>
            </div>
          </div>

          {/* Team Item 2 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8">
            <div className="team-item  p-6 rounded-lg shadow-md">
              <img
                src="Eshan.png"
                className="team-image w-full mb-4 rounded-md"
                alt="pic"
              />
              <h3 className="text-lg font-bold mb-2 text-gray-700">Eshan Amarasekara</h3>
              <p className="text-gray-200 mb-2">Software Developer</p>
              <p className="italic-text text-gray-300">
              seeking innovative solutions to digital challenges, ensuring the delivery of high-quality software products.
              </p>
            </div>
          </div>

          {/* Team Item 3 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8">
            <div className="team-item  p-6 rounded-lg shadow-md">
              <img
                src="Dasun.png"
                className="team-image w-full mb-4 rounded-md"
                alt="pic"
              />
              <h3 className="text-lg font-bold mb-2">DASUN SATHSARA</h3>
              <p className="text-gray-300 mb-2">Software Developer</p>
              <p className="italic-text text-gray-200">
              leveraging expertise in various programming languages to drive technological advancements
              </p>
            </div>
          </div>

          {/* Team Item 4 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8">
            <div className="team-item p-6 rounded-lg shadow-md">
              <img
                src="Malith.png"
                className="team-image w-full mb-4 rounded-md"
                alt="pic"
              />
              <h3 className="text-lg font-bold mb-2">MALITH WANIGASINGHE</h3>
              <p className="text-gray-300 mb-2">UI/UX Designer</p>
              <p className="italic-text text-gray-200">
              designing interfaces that captivate users and enhance product usability.
              </p>
            </div>
          </div>

          {/* Team Item 5 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8">
            <div className="team-item p-6 rounded-lg shadow-md">
              <img
                src="Ayani.png"
                className="team-image w-full mb-4 rounded-md"
                alt="pic"
              />
              <h3 className="text-lg font-bold mb-2">AYANI DE SILVA</h3>
              <p className="text-gray-300 mb-2">Quality Assurance Analyst</p>
              <p className="italic-text text-gray-200">
              ensuring software products meet top quality and reliability standards, leaving no detail overlooked in pursuit of perfection.
              </p>
            </div>
          </div>
        </div>
        
      )}
    </section>
    </div>
  );
}

export default Services;
