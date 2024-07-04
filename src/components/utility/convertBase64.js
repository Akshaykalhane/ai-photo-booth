import html2canvas from "html2canvas";

// const convertToBase64=async(image)=>{
//         const originalImage = new Image();
//         originalImage.crossOrigin='Anonymous'
//         originalImage.onload=()=>{
//                 const canvas2 = document.createElement('canvas')
                
//                 canvas2.width=originalImage.width;
//                 canvas2.height=originalImage.height;
//                 const ctx = canvas2.getContext('2d');
//                 // canvas2.toDataURL();
//                 ctx.clearRect(0,0,canvas2.width,canvas2.height)
//                 ctx.drawImage(
//                         originalImage,
//                         0,0,
//                         originalImage.width,
//                         originalImage.height
//                         );
//                 let cropimg=canvas2.toDataURL();
//                 console.log(cropimg);
//                 console.log(canvas2.width,'*',canvas2.height)
//                 // const canvas = await html2canvas(originalImage);
//                 // const base64 = canvas.toDataURL();
//                 // console.log(base64);
                
//         }
//         // document.body.appendChild(originalImage)
//         // console.log(originalImage.width)
//         originalImage.src=image;
// }

const base64 = (template,callback) => {
        if (typeof document === "undefined") return; // Ensure code only runs in browser environment
      
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
      
        const getImageData = img => {
          canvas.width = img.width;
          canvas.height = img.height;
         
          context.drawImage(img, 0, 0);
          return canvas.toDataURL("image/jpg");
        };
      
        var img = new Image();
        img.crossOrigin = "Anonymous"; // To handle CORS issues if any
        img.src = template;
        img.onload = () => {
          const base64Data = getImageData(img);
          console.log(base64Data);
          callback(base64Data);
        };
        console.log(template)
};

export default base64;