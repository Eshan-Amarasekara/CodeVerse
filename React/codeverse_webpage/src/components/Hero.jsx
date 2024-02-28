import styles from "../style";
import { robot } from "../assets";


const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Visions <br className="sm:block hidden" />{" "}
            <span className="text-gradient"> Into Reality...</span>{" "}
          </h1>

        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Elevate your web design game with CODEVERSE - effortlessly transform 
        hand-drawn sketches into functional websites. Simplify your journey into 
        web development and unleash creativity without the hassle of manual coding.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[100%] h-[100%] right-[-9%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[60%] h-[60%] top-0 pink__gradient" />
        <div className="absolute z-[0] w-[80%] h-[60%] right-20 bottom-20 blue__gradient" />
        
        {/* gradient end */}
      </div>


    </section>
  );
};

export default Hero;
