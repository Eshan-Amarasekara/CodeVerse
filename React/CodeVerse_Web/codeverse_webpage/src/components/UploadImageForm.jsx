import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UploadImageForm = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState({
    status: "",
    message: "",
    error: "",
  });

  const [showButtons, setShowButtons] = useState(false);
  const [educationMode, setEducationMode] = useState(false);
  const [businessMode, setBusinessMode] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    fileValidate(file);
    setImage(file);
    setShowButtons(false);
    setEducationMode(false);
    setBusinessMode(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("file", image);

    axios.post("http://127.0.0.1:5000/upload", data)
      .then((response) => {
        if (response.status === 201) {
          setResponseMsg({
            status: response.data.status,
            message: response.data.message,
          });
          setTimeout(() => {
            setImage(null);
            setResponseMsg({});
            setLoading(false);
            setShowButtons(true);
          }, 1000);

          document.querySelector("#imageForm").reset();
        }
        alert("Successfully Uploaded");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
        setLoading(false);
      });
  };

  const fileValidate = (file) => {
    if (
      file && (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
    ) {
      setResponseMsg({
        error: "",
      });
      return true;
    } else {
      setResponseMsg({
        error: "File type allowed only jpg, png, jpeg",
      });
      return false;
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
    <div className="container mx-auto my-10">
      <div className="max-w-md mx-auto bg-black p-5 rounded-md shadow-md">
        {loading && (
          <div className="text-center text-gray-100">
            Uploading...{' '}
            <i className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-gray-100 rounded-full"></i>
          </div>
        )}

        {responseMsg.status === "success" ? (
          <div className="alert alert-success">
            {responseMsg.message}
          </div>
        ) : responseMsg.status === "failed" ? (
          <div className="alert alert-danger">
            {responseMsg.message}
          </div>
        ) : (
          ""
        )}
        <form onSubmit={submitHandler} encType="multipart/form-data" id="imageForm">
            <h1 className="font-poppins font-semibold text-5xl p-6 text-white">
                Upload a Photo{' '}
                <span className="text-gradient">Here</span>
            </h1>
            <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-1 p-2 border rounded-md w-full text-gray-50"
            />
            <span className="text-red-500">
              {responseMsg.error}
            </span>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md"
              disabled={loading}
            >
              {loading ? (
                <span>
                  Uploading...{' '}
                  <i className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></i>
                </span>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </form>

        {showButtons && (
          <div className="mt-4 space-x-4 max-w-full">
            <button
              onClick={handleEducationMode}
              className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md"
            >
              Education Mode
            </button>
            <button
              onClick={handleBusinessMode}
              className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-md"
            >
              Business Mode
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageForm;
