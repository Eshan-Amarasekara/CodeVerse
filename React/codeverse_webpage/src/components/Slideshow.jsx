import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

// Import your images locally
import image1 from './a.png';
import image2 from './Dasun.png';

const images = [image1, image2]; // Define an array with your local images

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  // Determine the width of each slide based on the number of images
  const slideWidth = 100 / images.length;

  // Calculate the translation value based on the current index and the width of each slide
  const { x } = useSpring({
    x: -index * slideWidth,
    config: { duration: 1000, easing: e => e }, // Add transition duration and easing function
  });

  // Function to handle incrementing index automatically
  const incrementIndex = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Use useEffect to start the interval when component mounts
  useEffect(() => {
    const interval = setInterval(incrementIndex, 3000); // Change the interval duration here (e.g., 3000ms for 3 seconds)
    return () => clearInterval(interval); // Cleanup function to clear the interval when component unmounts
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div className="relative overflow-hidden h-screen bg-gray-900 text-white" style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)' }}>
      <animated.div
        style={{
          display: 'flex',
          height: '100%',
          width: `${images.length * 100}vw`,
          transform: x.interpolate(x => `translateX(${x}%)`),
          transition: 'transform 1000ms ease-out', // Add transition duration and easing function
        }}
      >
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />
        ))}
      </animated.div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border-2 border-white transition-transform duration-300 ${index === i ? 'bg-white' : 'bg-gray-500'}`}
            style={{ transform: index === i ? 'translateY(-50%) scale(1.5)' : 'translateY(-50%)' }}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}

export default Slideshow;