import { features2 } from "../constants"; // Importing features data from constants
import styles, { layout } from "../style"; // Importing styles and layout from style file

// Functional component for rendering a feature card
const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features2.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    {/* Feature icon */}
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    {/* Feature details */}
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title} {/* Feature title */}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content} {/* Feature content */}
      </p>
    </div>
  </div>
);

// Functional component for rendering Business section
const Business = () => (
  <section id="" className={`${layout.section} flex-col relative `}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Welcome to the <br className="sm:block hidden" />
        <span className="text-gradient"> Business Mode</span>{" "} {/* Title */}
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Turn your hand-drawn ideas into visually appealing HTML codes effortlessly enriched with Tailwind CSS! {/* Description */}
      </p>
    </div>
    {/* Rendering feature cards */}
    <div className={`${layout.sectionImg} flex-col`}>
      {features2.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} /> // Passing feature data to FeatureCard component
      ))}
    </div>
  </section>
);

export default Business; // Exporting Business component
