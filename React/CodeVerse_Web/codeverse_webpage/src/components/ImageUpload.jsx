

import React, { useState } from 'react';
import {imageDb} from "./Config";
import { ref, uploadBytes } from 'firebase/storage';
import {v4} from 'uuid';

function ImageUpload() {
  const [img,setImg] =useState("")
  const handleClick = () =>{
    const imgref = ref (imageDb, `files/${v4()}`)
    uploadBytes(imgref, img)
  }

  
  return (
    <div className="Upload">
      <input type="file" accept="image/*" onChange={(e)=>setImg(e.target.files[0])}/>
      <button onClick={handleClick}>Upload</button>
    </div>
  )
}

export default ImageUpload;