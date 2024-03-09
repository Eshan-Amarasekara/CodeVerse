import { features2 } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";


const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features2.length - 1 ? "mb-6" : "mb-0"} feature-card`}>

    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
  
);

const Business = () =>  (
  <section id="" className={`${layout.section} flex-col relative ` }>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Welcome to the <br className="sm:block hidden" /> 
        <span className="text-gradient"> Business Mode</span>{" "}

      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Turn your hand-drawn ideas into visually appealing HTML codes effortlessly enriched with Tailwind CSS!
      </p>

      <Button styles={`mt-10`} />
      
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features2.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;
