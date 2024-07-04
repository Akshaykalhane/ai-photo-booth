import React, { useEffect, useState } from 'react';
import { Route,BrowserRouter, Routes} from "react-router-dom";
import CameraWindow from './components/CameraWindow/CameraWindow';
import Home from './components/Home/Home';
import Template from './components/Template/Template';
import OutputWindow from './components/Output/OutputWindow';

function Routing() {
  const [capturedImage,setCapturedImage]=useState(null);
  const [generatedImage,setGeneratedImage]=useState(null);
  const [url,setUrl]=useState(null);
  // const [filterImage,setFilterImage]=useState(null);

  const handleCapturedImage=(src)=>{
    setCapturedImage(src);
  }

  useEffect(()=>{
    console.log('generated image',generatedImage);
  },[generatedImage]);

  useEffect(()=>{
    console.log(url,'url')
  },[url])

  // const handleOriginalImage=(src)=>{
  //   const originalImage = new Image();
  //   originalImage.onload=()=>{
  //     const canvas = document.createElement('canvas');
  //     canvas.width=originalImage.width;
  //     canvas.height=originalImage.height;
  //     const ctx = canvas.getContext('2d');
  //     ctx.drawImage(
  //       originalImage,
  //       0,
  //       0
  //     );
  //     let image = canvas.toDataURL();
  //     setOriginalImage(image);
  //   }
  //   originalImage.src=src;
  // }
  // useEffect(()=>{
  //   console.log(originalImage)
  // },[originalImage])

  // const bodyData={
  //   image:capturedImage,
  //   choice:originalImage,
  //   status:"PREMIUM"
  // }

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/camera' element={<CameraWindow handleCapturedImage={handleCapturedImage} />} />
                <Route path='/template' element={<Template  
                       capturedImage={capturedImage} 
                       setGeneratedImage={setGeneratedImage} 
                       setUrl={setUrl}
                       generatedImage={generatedImage}
                       />} 
                />
                <Route path='/output' element={<OutputWindow 
                        url={url}
                        setUrl={setUrl}
                        // data={bodyData} 
                        generatedImage={generatedImage}
                        />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Routing