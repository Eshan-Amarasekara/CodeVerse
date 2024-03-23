// EducationMode.jsx

import React, { useState, useEffect } from 'react';
import Header from './Header.jsx'
import styles from '../style.js';

const EducationMode = () => {
  const [code, setCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showAiHtml, setShowAiHtml] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/me')
      .then(response => response.json())
      .then(data => {
        const htmlString = data.me.join('\n');
        setCode(htmlString);
      })
      .catch(error => console.error('Error fetching HTML code:', error));
  }, []);

const toggleAiHtml = () => {
  // Toggle the showAiHtml state
  setShowAiHtml((prevShowAiHtml) => !prevShowAiHtml);
};

useEffect(() => {
  // Scroll to the ai.html iframe when the button is pressed
  if (showAiHtml) {
    const aiHtmlIframe = document.getElementById('aiHtmlIframe');
    aiHtmlIframe.scrollIntoView({ behavior: 'smooth' });
  }
}, [showAiHtml]);

  const downloadHTML = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/me');
      const data = await response.json();
      const htmlString = data.me.join('\n');

      const blob = new Blob([htmlString], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'codeeditor.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error fetching and downloading HTML code:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/me');
      const data = await response.json();
      const htmlString = data.me.join('\n');

      navigator.clipboard.writeText(htmlString).then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      }).catch(error => {
        console.error('Error copying to clipboard:', error);
        setCopySuccess(false);
      });
    } catch (error) {
      console.error('Error fetching HTML code for copying to clipboard:', error);
      setCopySuccess(false);
    }
  };

  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <div className={`${styles.boxWidth}`}></div>
      <div className="absolute z-[0] w-[50%] h-[50%] right-0 top-10 blue__gradient" />
<<<<<<< Updated upstream
      <div className="absolute z-[0] w-[50%] h-[50%] bottom-70 pink__gradient" />
      <Navbar />
=======
      <div className="absolute z-[0] w-[50%] h-[50%] bottom-40 pink__gradient" />
      <Header/>
>>>>>>> Stashed changes

      <div className={`absolute z-10 top-20 py-5 right-20 ${styles.marginX} ${styles.flexStart}`}>

        {/* New button to toggle ai.html visibility */}
        <button onClick={toggleAiHtml} className="bg-purple-500 hover:bg-purple-800 hover:text-gray-100 text-white px-4 py-2 m-2 rounded">
          Code Explainer
        </button>
      </div>
      {/* Buttons Container */}
      <div className={`absolute z-10 top-20 py-5 left-20 ${styles.marginX} ${styles.flexStart}`}>

        {/* Copy success message */}
        {copySuccess && (
          <div className="text-green-500 text-sm mt-2">Copied to Clipboard successfully!</div>
        )}
                {/* Download button */}
        <button onClick={downloadHTML} className="hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 m-2 rounded">
          Download HTML
        </button>

        {/* Copy to clipboard button */}
        <button onClick={copyToClipboard} className="hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 m-2 rounded">
          Copy Code
        </button>


      </div>

      <iframe
        src={"/CodeEditor/codeeditor.html"}
        title="Live Code Editor"
        width="100%"
        height="900px"
        frameBorder="0"
        style={{ position: 'relative', zIndex: '1', top: '35px' }}
        onLoad={(e) => {
          const iframeContent = e.target.contentDocument.documentElement.outerHTML;
          setCode(iframeContent);
        }}
      ></iframe>

      {/* If showAiHtml is true, render the ai.html iframe */}
      {showAiHtml && (
        <iframe
          id="aiHtmlIframe"  // Add an ID for easy reference
          src={"/ai.html"}
          title="GenAI-Bot"
          width="100%"
          height="900px"
          frameBorder="0"
          style={{ position: 'static', zIndex: '1', top: '35px' }}
        ></iframe>
      )}
      
    </div>
  );
};

export default EducationMode;
