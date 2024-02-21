import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import styles from '/src/style.js';

const EducationMode = () => {
  const [code, setCode] = useState(''); // State to hold the code content
  const [copySuccess, setCopySuccess] = useState(false); // State for copy success message

  useEffect(() => {
    // Fetch HTML code content from Flask server
    fetch('http://127.0.0.1:5000/me')
      .then(response => response.json())
      .then(data => {
        // Assuming 'me' is an array with HTML strings
        const htmlString = data.me.join('\n');
        setCode(htmlString);
      })
      .catch(error => console.error('Error fetching HTML code:', error));
  }, []);

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
        }, 2000); // Clear success message after 2 seconds
      }).catch(error => {
        console.error('Error copying to clipboard:', error);
        setCopySuccess(false); // Reset copy success state on error
      });
    } catch (error) {
      console.error('Error fetching HTML code for copying to clipboard:', error);
      setCopySuccess(false); // Reset copy success state on error
    }
  };

  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <div className={`${styles.boxWidth}`}></div>
      <Navbar />
      <div className="absolute z-[0] w-[80%] h-[200%] -right-[70%] rounded-full blue__gradient bottom-40" />

      <div style={{ position: 'relative' }}>
        <div className="absolute z-[0] w-[80%] h-[650%] -left-[87%] rounded-full pink__gradient top-40" />

        {/* Buttons Container */}
        <div
          style={{
            position: 'absolute',
            top: '-5px',
            right: '70px',
            display: 'inline',
            flexDirection: 'column',
            alignItems: 'flex-end',
            zIndex: '2',
          }}
        >
          {/* Download button */}
          <button onClick={downloadHTML} className="bg-purple-500 text-white px-4 py-2 m-2 rounded">
            Download HTML
          </button>

          {/* Copy to clipboard button */}
          <button onClick={copyToClipboard} className="bg-purple-500 text-white px-4 py-2 m-2 rounded">
            Copy to Clipboard
          </button>

          {/* Copy success message */}
          {copySuccess && (
            <div className="text-green-500 text-sm mt-2">Copied to Clipboard successfully!</div>
          )}
        </div>

        <iframe
          src={"/CodeEditor/codeeditor.html"}
          title="Live Code Editor"
          width="100%"
          height="900px"
          frameBorder="0"
          style={{ position: 'relative', zIndex: '1', top: '35px' }}
          onLoad={(e) => {
            // Set code content when iframe is loaded
            const iframeContent = e.target.contentDocument.documentElement.outerHTML;
            setCode(iframeContent);
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default EducationMode;
