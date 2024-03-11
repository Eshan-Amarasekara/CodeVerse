import React, { useState } from 'react';
import Navbar from './Navbar';
import styles from '../style.js';

const BusinessMode = () => {
  const [view, setView] = useState('code');
  const [code, setCode] = useState('');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const renderView = () => {
    if (view === 'desktop') {
      return (
        <div className={`bg-primary text-purple-500 min-h-screen flex items-center justify-center`}>
          <div className="container mx-auto">
            <div className="text-center">
              <div dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          </div>
        </div>
      );
    } else if (view === 'mobile') {
      return (
        <div className={`bg-primary text-purple-500 min-h-screen flex items-center justify-center`}>
          <div className="container mx-auto">
            <div className="text-center">
              <div className="w-64 h-128 bg-white border items-center border-gray-300 rounded-md overflow-hidden shadow-md flex justify-center align-center"> {/* Updated container with flexbox properties */}
                <div className="w-full h-full overflow-auto" dangerouslySetInnerHTML={{ __html: code }} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`bg-primary text-gray-500 min-h-screen flex items-center justify-center`}>
          <div className="container mx-auto">
            <div className="text-center">
              <textarea className="w-full h-96 bg-white border border-gray-300" value={code} onChange={handleCodeChange} style={{height: '400px'}} />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
        <div className="flex justify-center mt-4">
          <button className={`${view === 'code' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'} px-4 py-2 mr-2`} onClick={() => handleViewChange('code')}>Code</button>
          <button className={`${view === 'desktop' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'} px-4 py-2 mr-2`} onClick={() => handleViewChange('desktop')}>Desktop</button>
          <button className={`${view === 'mobile' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'} px-4 py-2`} onClick={() => handleViewChange('mobile')}>Mobile</button>
        </div>
        {renderView()}
      </div>
    </div>
  );
};

export default BusinessMode;
