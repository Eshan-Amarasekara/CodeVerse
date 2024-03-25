// Importing necessary constants and styles from respective files
import { features } from "../constants";
import styles, { layout } from "../style";

// FeatureCard component definition
const FeatureCard = ({ icon, title, content, index }) => (
  // Container for each feature card with conditional margin classes based on index
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    {/* Container for feature icon */}
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    {/* Container for feature title and content */}
    <div className="flex-1 flex flex-col ml-3">
      {/* Title of the feature */}
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      {/* Content of the feature */}
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

// Education component definition
const Education = () =>  (
  // Section for Education mode
  <section id="features" className={layout.section}>
    {/* Section information */}
    <div className={layout.sectionInfo}>
      {/* Heading for Education mode */}
      <h2 className={styles.heading2}>
        Welcome to the <br className="sm:block hidden" /> 
        {/* Highlighted text for Education mode */}
        <span className="text-gradient"> Education Mode</span>{" "}
      </h2>
      {/* Description for Education mode */}
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Turn your hand-drawn ideas into basic HTML and CSS codes!
      </p>
    </div>

    {/* Container for displaying features */}
    <div className={`${layout.sectionImg} flex-col`}>
      {/* Mapping through each feature to render FeatureCard component */}
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

// Exporting Education component as default
export default Education;
