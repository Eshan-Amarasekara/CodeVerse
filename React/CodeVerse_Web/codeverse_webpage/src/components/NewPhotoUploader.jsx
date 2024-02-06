import React, { useState } from 'react';

const UploadImageForm = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('/img', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        console.log('Image uploaded successfully');
        // Handle success
      } else {
        console.error('Failed to upload image');
        // Handle error
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UploadImageForm;
