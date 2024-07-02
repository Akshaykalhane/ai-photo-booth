import React, { useRef, useState } from 'react'
import styles from './Camera.module.css'
import Webcam from "react-webcam"
import { useNavigate } from 'react-router-dom';

function CameraWindow() {
    const webcamRef=useRef(null);
    const navigate = useNavigate();
    const [capturedImage,setCapturedImage]=useState(null);
    const handleCapture=(e)=>{
        if(capturedImage){
            setCapturedImage(null);
            e.target.innerText="capture"
        }else{

            const imageSource = webcamRef.current.getScreenshot();
            setCapturedImage(imageSource);
            e.target.innerText="retake"
        }
        // e.target.innerText="retake"
    }

    const handleSubmit=()=>{
        navigate('/template')
    }

  return (<>
    <div className={styles.camera_window}>
        <div className={styles.title_head}>
        <h2>{capturedImage ? "Do You Like It ?" : "Capture Image"}</h2>
        </div>
            <div className={styles.camera_screen}>
                <Webcam
                    ref={webcamRef}
                    forceScreenshotSourceSize={true}
                    mirrored={false}
                    className={styles.webcam} />
                    {capturedImage && <img src={capturedImage} className={styles.captured_img} alt='captureImage' />}
            </div>
            <div className={styles.button_control}>
                <button onClick={handleCapture}>Capture</button>
                <button disabled={capturedImage ? false : true} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
  </>
  )
}

export default CameraWindow