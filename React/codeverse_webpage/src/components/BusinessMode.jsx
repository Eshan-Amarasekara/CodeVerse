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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code: ', err);
      alert('Failed to copy code to clipboard.');
    }
  };

  const renderView = () => {
    if (view === 'desktop') {
      return (
        <div className={`bg-primary text-purple-500 min-h-screen flex items-center justify-center`}>
          <div className="container mx-auto" style={{height: '600px'}}>
            <div className="text-center">
              <div dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          </div>
        </div>
      );
    } else if (view === 'mobile') {
      return (
        <div className={`bg-primary text-purple-500 min-h-screen flex items-center justify-center`}>
          <div className="container mx-auto flex justify-center items-center">
            <div className="w-64 h-128 bg-white border items-center border-gray-300 rounded-md overflow-hidden shadow-md flex justify-center align-center" style={{width: '300px'}}>
              <div className="w-full h-full overflow-auto" dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`bg-primary text-gray-500 min-h-screen flex items-center justify-center`}>
          <div className="container mx-auto">
            <div className="text-center">
              <textarea className="w-full h-96 bg-white border border-gray-300" value={code} onChange={handleCodeChange} style={{height: '500px', width: '900px', marginBottom: '350px'}} />
              {view === 'code' && (
                <button className="bg-gray-600 text-black px-4 py-2 rounded-md absolute top-25 left-20" onClick={copyToClipboard}>
                  Copy Code
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
        <div className="flex justify-left mt-20">
          <button className={`${view === 'code' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'} px-4 py-2 mr-2 rounded-md`} onClick={() => handleViewChange('code')}>Code</button>
          <button className={`${view === 'desktop' ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'} px-4 py-2 mr-2 rounded-md`} onClick={() => handleViewChange('desktop')}>Desktop</button>
          <button className={`${view === 'mobile'? 'bg-purple-500 text-white' : 'bg-white text-purple-500'} px-4 py-2 rounded-md`} onClick={() => handleViewChange('mobile')}>Mobile</button>
        </div>
        {renderView()}
      </div>
    </div>
  );
};

export default BusinessMode;