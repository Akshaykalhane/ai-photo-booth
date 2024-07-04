import React, { useEffect, useRef, useState } from 'react';
import styles from './OutputWindow.module.css';
import ReactModal from 'react-modal';
import QRCode from "qrcode.react";
import { RotatingTriangles } from "react-loader-spinner";
import { ScaleLoader } from 'react-spinners';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { handleDownload } from '../utility/downloadImage';

function OutputWindow({url,setUrl,generatedImage}) {

  const [finalImage, setFinalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modals, setModals] = useState({
    emailModal: false,
    qrModal: false,
  });
  const [userEmail,setUserEmail]=useState("");

  const imageRef=useRef(null);
  const navigate = useNavigate();


  const handleModal = (modal) => {
    setModals({ ...modals, [modal]: true })
  }

  const handleClose = (modal) => {
    setModals({ ...modals, [modal]: false });
  }

  const handlePrint= useReactToPrint({
    content:()=>imageRef.current
  })

  useEffect(() => {
    setFinalImage(generatedImage);
  }, [generatedImage]);


  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const handleSubmit=()=>{
    if(!loading){
      console.log('hello','useremal',userEmail)
      if(userEmail){
        console.log('user email')
        setLoading(true);
        sendMail();
        setTimeout(()=>{
          setLoading(true);
          navigate("/")
        },3000)
      }
    }
  }

  const sendMail=()=>{
    console.log('hello2')
     try {
      axios
        .post(
          "https://analytiq4.com/aiphotobooth/aiphotobooth_bluehat/emailer/index.php",
          {
            url: url,
            email: userEmail,
          }
        )
        .then(function (response) {
          // console.log(response);
          // setModals({...modals,emailModal:false})
        })
        .catch(function (error) {
          console.log(error);
        });
      // navigate("/output");
    } catch (error) {
      console.error("Error occurred during axios request:", error);
    }
  }

  const closeModal = () => {
    // setLoading(false)
  }

  const onDownloadclick=(image)=>{
    handleDownload(image);
    toast.success("Image Downloaded Successully", toastOptions);
  }


  return (
    <>
      <div className={styles.output_window} id='my-app'>
      
          <div className={styles.home_button}>
            <button onClick={()=>navigate("/")}>Home</button>
          </div>
        <div className={styles.output_wrapper}>
          <h2>{generatedImage ? "Ready to Download" : "Please Wait.."}</h2>
          {generatedImage && <>
            <div className={styles.download_image_wrapper}>
              {generatedImage && <img src={generatedImage} className={styles.generatedImage} ref={imageRef} alt="" />}
            </div>
          </>
          }
          {generatedImage && <div className={styles.share_options}>
            <button onClick={() => handleModal('qrModal')}>QR</button>
            <ReactModal
              isOpen={modals.qrModal}
              onRequestClose={() => handleClose('qrModal')}
              className={styles.custom_modal}
            >
              <div className={styles.qrcode_wrapper}>
                <div className={styles.qrcode_code}>
                 {url ?<QRCode size={130} value={url} /> : <p>please wait..</p> } 
                </div>
                <div className={styles.qrcode_bottom}>
                  <h2>Scan , Share , Download</h2>
                </div>
              </div>
              <button onClick={()=>handleClose("qrModal")} className={styles.close_button}>X</button>
            </ReactModal>

            <button onClick={() => handleModal('emailModal')}>Email</button>
            <ReactModal isOpen={modals.emailModal} onRequestClose={() => handleClose('emailModal')} className={styles.custom_modal} contentLabel='share modal'>
              <div className={styles.email_modal}>
                <input 
                  type='email' 
                  value={userEmail}
                  onChange={(e)=>setUserEmail(e.target.value)}
                  placeholder='email' />
              </div>
              <div className={styles.button_email}>
                <button onClick={handleSubmit}><ScaleLoader color={"#b4cfe7"} loading={loading} /> {!loading && "Send"}</button>
                <button onClick={() => handleClose('emailModal')}>cancel</button>
              </div>
            </ReactModal>
            <button onClick={handlePrint}>Print</button>
            <button onClick={()=>onDownloadclick(generatedImage)}>Download</button>
          </div>}
          {!generatedImage && <div className={styles.loading_screen}> 
            <RotatingTriangles 
                      width="290"
                      height="290"
                      
                      colors={['#fff', '#fff', '#fff']} 
            /> 
          </div>
          }
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default OutputWindow;