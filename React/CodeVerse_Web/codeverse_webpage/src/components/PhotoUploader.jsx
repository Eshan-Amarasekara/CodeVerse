import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { imageDb } from "./Config";
import Navbar from './Navbar';
import EducationMode from './EducationMode';
import BusinessMode from './BusinessMode';

const PhotoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [educationMode, setEducationMode] = useState(false);
  const [businessMode, setBusinessMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setShowButtons(false);
    setEducationMode(false);
    setBusinessMode(false);
    setValidationMessage('');  // Reset validation message when a new file is chosen
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
      const imgRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imgRef, selectedFile);
      setLoading(false);
      setShowButtons(true);
    } else {
      setValidationMessage('Please select a file before uploading.');
    }
  };

  const handleEducationMode = () => {
    setEducationMode(true);
    navigate('/EducationMode');
  };

  const handleBusinessMode = () => {
    setBusinessMode(true);
    navigate('/BusinessMode');
  };

  return (
    <div id='Upload' className="flex flex-col items-center space-y-10 mt-20">
      <h1 className="font-poppins font-semibold text-5xl p-6 text-white">
        Upload a Photo{' '}
        <span className="text-gradient">Here</span>
      </h1>
      <p className="text-dimWhite text-lg">
        {selectedFile
          ? 'Upload the photo to continue'
          : 'Choose a file to upload your wireframe and continue'}
      </p>
      {validationMessage && (
        <p className="text-red-500 mt-2">{validationMessage}</p>
      )}
      <label
        className="relative cursor-pointer rounded-md text-white overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at left, #b669d5 0%, #943fc2 100%)',
          padding: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.2s ease-in-out',
        }}
      >
        <span className="text-lg">Choose a file</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <button
        onClick={() => {
          handleUpload();
        }}
        className={`px-8 py-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-blue active:bg-purple-800 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-200 border-t-2 "></div>
            <span className="ml-2 text-green-200">Uploading...</span>
          </div>
        ) : (
          'Upload'
        )}
      </button>
      {selectedFile && showButtons && (
        <div>
          <p className="text-green-400 mb-2">Selected File:</p>
          {loading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 border-t-2 border-gray-400"></div>
          ) : (
            <>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected"
                className="max-w-full h-auto rounded-md"
              />
              <div className="mt-4 space-x-4 max-w-full">
                <button
                  onClick={handleEducationMode}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                >
                  Education Mode
                </button>
                <button
                  onClick={handleBusinessMode}
                  className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple active:bg-purple-800"
                >
                  Business Mode
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <hr className="mt-8 w-full border-t-2 border-gray-700" />
      {educationMode && <EducationMode />}
      {businessMode && <BusinessMode />}
    </div>
  );
};

export default PhotoUploader;
