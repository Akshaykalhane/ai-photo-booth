import React, { useRef, useState,useEffect } from 'react'
import styles from './Camera.module.css'
import Webcam from "react-webcam"
import { useNavigate } from 'react-router-dom';
import convertToBase64 from '../utility/convertBase64';

import { useLocation } from 'react-router-dom';
import Plausible from 'plausible-tracker';

const plausible = Plausible({
  domain: 'yourdomain.com',
});

function CameraWindow({ handleCapturedImage }) {
    const webcamRef = useRef(null);
    const windowRef = useRef(null);
    const navigate = useNavigate();
    const [capturedImage, setCapturedImage] = useState(null);
    const location = useLocation();

    useEffect(() => {
      // Track page view when the route changes
      plausible.trackPageview({
        url: location.pathname,
      });
      console.log(location.pathname,'location');
    }, [location]);
    const handleCapture = (e) => {
        if (capturedImage) {
            setCapturedImage(null);
            e.target.innerText = "capture"
        } else {

            const imageSource = webcamRef.current.getScreenshot();
            // console.log(imageSource)
            setCapturedImage(imageSource);
            handleCapturedImage(imageSource)
            e.target.innerText = "retake"
        }
        // console.log(convertToBase64(windowRef.current))
        // e.target.innerText="retake"
    }

    const handleSubmit = () => {
        navigate('/template');
    }

    return (<>
        <div className={styles.camera_window}>
            <div className={styles.camera_wrapper}>
                <div className={styles.title_head}>
                    <h2>{capturedImage ? "Do You Like It ?" : "Capture Image"}</h2>
                </div>
                <div className={styles.camera_screen} ref={windowRef} >
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
        </div>
    </>
    )
}

export default CameraWindow