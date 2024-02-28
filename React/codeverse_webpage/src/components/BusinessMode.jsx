import React from 'react';
import Navbar from './Navbar';
import styles from '../style.js';


const BusinessMode = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
    <div className={`${styles.boxWidth}`}>
    
      <Navbar/>
      <div className="bg-black text-purple-500 min-h-screen flex items-center justify-center">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">This page is still under ongoing development</h2>
            <p className="text-gray-600">
              We are working hard to bring you the best experience. Please check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default BusinessMode;
