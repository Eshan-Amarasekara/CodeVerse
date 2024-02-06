import React from 'react';
import Navbar from './Navbar';

const EducationMode = () => {
  return (
    <div>
      <Navbar/>
      <iframe
        src={"/CodeEditor/index.html"}
        title="Live Code Editor"
        width="100%"
        height="900px"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default EducationMode;