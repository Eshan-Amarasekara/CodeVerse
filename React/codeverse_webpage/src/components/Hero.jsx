import styles from "../style";
import { robot } from "../assets";

const Hero = () => {
  const scrollToWhatsNew = () => {
    const whatsNewSection = document.getElementById("Upload");

    if (whatsNewSection) {
      whatsNewSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Visions <br className="sm:block hidden" />{" "}
            <span className="text-gradient"> Into Reality...</span>{" "}
          </h1>
        </div>

        <p className={`${styles.paragraph} max-w-[500px] mt-6`}>
          Elevate your web design game with CODEVERSE - effortlessly transform 
          hand-drawn sketches into functional websites. Simplify your journey into 
          web development and unleash creativity without the hassle of manual coding.
        </p>

        <div className="py-20 grid gap-8 items-start justify-center">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-100">
            </div>
            
            <button
              className="relative px-10 py-6 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
              onClick={scrollToWhatsNew}
            >
              <span className="flex items-center space-x-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-400 -rotate-6 animate-spin"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                </svg>
                <span className="pr-6 text-2xl text-gray-300">CodeVerse Release 2.0</span>
              </span>
              <span className="pl-6 text-indigo-400 group-hover:text-purple-500 transition duration-100">Upload Your Photo &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[100%] h-[100%] right-[-9%] relative z-[5]" />

        <div className="absolute z-[0] w-[60%] h-[60%] top-0 pink__gradient" />
        <div className="absolute z-[0] w-[80%] h-[60%] right-20 bottom-20 blue__gradient" />
      </div>
    </section>
  );
};

export default Hero;
