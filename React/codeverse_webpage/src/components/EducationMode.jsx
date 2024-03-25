// EducationMode.jsx

import React, { useState, useEffect } from 'react';
import Header from './Header.jsx'; // Importing Header component
import styles from '../style.js'; // Importing styles

// EducationMode component
const EducationMode = () => {
  // State variables
  const [code, setCode] = useState(''); // State for holding HTML code
  const [copySuccess, setCopySuccess] = useState(false); // State for copy success message
  const [showAiHtml, setShowAiHtml] = useState(false); // State for toggling AI HTML iframe

  // Effect to fetch HTML code on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:8000/me') // Fetching HTML code
      .then(response => response.json())
      .then(data => {
        const htmlString = data.me.join('\n'); // Joining HTML array into a string
        setCode(htmlString); // Setting HTML code state
      })
      .catch(error => console.error('Error fetching HTML code:', error)); // Handling fetch error
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to toggle AI HTML iframe visibility
  const toggleAiHtml = () => {
    setShowAiHtml((prevShowAiHtml) => !prevShowAiHtml); // Toggling showAiHtml state
  };

  // Effect to scroll to AI HTML iframe when button is pressed
  useEffect(() => {
    if (showAiHtml) { // Checking if AI HTML iframe should be shown
      const aiHtmlIframe = document.getElementById('aiHtmlIframe'); // Getting AI HTML iframe element
      aiHtmlIframe.scrollIntoView({ behavior: 'smooth' }); // Scrolling to AI HTML iframe
    }
  }, [showAiHtml]); // Dependency array ensures the effect runs when showAiHtml changes

  // Function to download HTML code
  const downloadHTML = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/me'); // Fetching HTML code
      const data = await response.json(); // Parsing JSON response
      const htmlString = data.me.join('\n'); // Joining HTML array into a string

      // Creating blob and downloading HTML file
      const blob = new Blob([htmlString], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'codeeditor.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error fetching and downloading HTML code:', error); // Handling download error
    }
  };

  // Function to copy HTML code to clipboard
  const copyToClipboard = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/me'); // Fetching HTML code
      const data = await response.json(); // Parsing JSON response
      const htmlString = data.me.join('\n'); // Joining HTML array into a string

      // Copying HTML code to clipboard
      navigator.clipboard.writeText(htmlString).then(() => {
        setCopySuccess(true); // Setting copy success message
        setTimeout(() => {
          setCopySuccess(false); // Resetting copy success message after 2 seconds
        }, 2000);
      }).catch(error => {
        console.error('Error copying to clipboard:', error); // Handling clipboard copy error
        setCopySuccess(false);
      });
    } catch (error) {
      console.error('Error fetching HTML code for copying to clipboard:', error); // Handling fetch error
      setCopySuccess(false);
    }
  };

  // Rendering component
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <div className={`${styles.boxWidth}`}></div>
      <div className="absolute z-[0] w-[50%] h-[50%] right-0 top-10 blue__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] bottom-40 pink__gradient" />
      <Header /> {/* Rendering Header component */}

      {/* Button container for Code Explainer */}
      <div className={`absolute z-10 top-20 py-5 right-20 ${styles.marginX} ${styles.flexStart}`}>
        <button onClick={toggleAiHtml} className="bg-purple-500 hover:bg-purple-800 hover:text-gray-100 text-white px-4 py-2 m-2 rounded">
          Code Explainer
        </button>
      </div>

      {/* Buttons Container for Download and Copy */}
      <div className={`absolute z-10 top-20 py-5 left-20 ${styles.marginX} ${styles.flexStart}`}>
        {/* Copy success message */}
        {copySuccess && (
          <div className="text-green-500 text-sm mt-2">Copied to Clipboard successfully!</div>
        )}
        {/* Download HTML button */}
        <button onClick={downloadHTML} className="hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 m-2 rounded">
          Download HTML
        </button>
        {/* Copy to clipboard button */}
        <button onClick={copyToClipboard} className="hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 m-2 rounded">
          Copy Code
        </button>
      </div>

      {/* Code editor iframe */}
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

      {/* Render AI HTML iframe if showAiHtml is true */}
      {showAiHtml && (
        <iframe
          id="aiHtmlIframe" // Adding ID for easy reference
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

export default EducationMode; // Exporting EducationMode component
