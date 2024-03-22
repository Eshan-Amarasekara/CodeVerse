import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import styles from '../style.js';
import './businessstyles.css';

const BusinessMode = () => {
  const [view, setView] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const fetchedCode = useRef(false);
  const list =[]

  const fetchCode = async () => {
    if (fetchedCode.current) {
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/business');
      if (!response.ok) {
        throw new Error('Failed to fetch code');
      }
      console.log('Data sent successfully2');
      const data = await response.text();
      setCode(data);
    } catch (err) {
      console.error('Failed to fetch code: ', err);
      setCode('Failed to fetch code');
    }

    fetchedCode.current = true;
  };

  useEffect(() => {
    fetchCode();
  }, []);

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

  const executeCommand = async () => {
    if (loading) return; // Prevent executing command while loading

    setLoading(true); // Set loading state to true

    const userInput = document.getElementById('userInput').value;

    try {
      const response = await fetch('http://127.0.0.1:5000/userinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to server');
      }

      console.log('Data sent successfully');

      const codeResponse = await fetch('http://127.0.0.1:5000/business');
      if (!codeResponse.ok) {
        throw new Error('Failed to fetch code');
      }

      const codeData = await codeResponse.text();
      setCode(codeData);
    } catch (error) {
      console.error('Error sending data to server:', error);
    } finally {
      setLoading(false); // Set loading state to false after execution is done
    }
  };

  const renderView = () => {
    if (view === 'desktop') {
      return (
        <div className={`text-purple-500 flex items-center justify-center border-purple-500`} style={{ minHeight: "85vh" }}>
          <div className="container mx-auto" style={{ height: '100%', width: '80%' }}>
            <div className="w-100 h-200 bg-white border-4 border-gray-300 rounded-md overflow-hidden shadow-md flex justify-center align-center">
              <div dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          </div>
        </div>
      );
    } else if (view === 'mobile') {
      return (
        <div className={`text-purple-500 flex items-center justify-center border-purple-500`} style={{ minHeight: "85vh" }}>
          <div className="container mx-auto flex justify-center items-center" style={{ height: '70%', width: '23%' }}>
            <div className="bg-white border-4 border-gray-300 rounded-md overflow-auto shadow-md" style={{ maxHeight: '70vh', width: '100%' }}>
              <div className="w-full" dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={"  text-gray-500 flex flex-col items-center justify-center border-purple-500"} style={{ minHeight: "85vh" }}>
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex justify-end mb-2">
              <input type="text" id='userInput' className="border border-gray-300 px-2 py-1" style={{ width: '100%' }} placeholder="Enter command" />
              <button className={`bg-gray-800 text-gray-50 px-4 py-2 rounded-md ml-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} onClick={executeCommand} disabled={loading}
>                {loading ? 'Loading...' : 'Proceed'}
              </button>
            </div>
            <div className="relative w-full">
              <textarea className="w-full h-96 bg-color4 border border-gray-300 text-gray-200" value={code} onChange={handleCodeChange} />
              <button className="absolute right-0 bottom-0 hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 rounded-md mb-2 mr-2" onClick={copyToClipboard}>
                Copy Code
              </button>
            </div>
          </div>
        </div>
      </div>
      );
    }
  };

  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop}`}>
      <div className={`${styles.boxWidth}`}></div>
      <Navbar />
      <div className="flex justify-left mt-10">
        <button className={`tab-button ${view === 'code' && 'active'}`} onClick={() => handleViewChange('')}>Code</button>
        <button className={`tab-button ${view === 'desktop' && 'active'}`} onClick={() => handleViewChange('desktop')}>Desktop</button>
        <button className={`tab-button ${view === 'mobile' && 'active'}`} onClick={() => handleViewChange('mobile')}>Mobile</button>
      </div>
      {renderView()}

    </div>
  );
};

export default BusinessMode;
