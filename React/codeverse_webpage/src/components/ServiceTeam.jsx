import React from 'react'
import "./services.css";
import styles from '../style';
import Navbar from './Navbar';

const ServiceTeam = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
                    <Navbar />

        <div className={`${styles.boxWidth} `}>
          
            {/* Team Item 1 */}
            <div className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 ${styles.flexCenter}`}>
                <div className="team-item p-6 rounded-lg shadow-md">
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
            <div className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 ${styles.flexCenter}`}>
                <div className="team-item p-6 rounded-lg shadow-md">
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
            <div className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 ${styles.flexCenter}`}>
                <div className="team-item p-6 rounded-lg shadow-md">
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
            <div className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 ${styles.flexCenter}`}>
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
            <div className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8 ${styles.flexCenter}`}>
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
    </div>   

  )
}

export default ServiceTeam