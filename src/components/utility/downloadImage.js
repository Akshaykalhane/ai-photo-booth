export const handleDownload=(imageRef)=>{
    const image = window.document.createElement("a")
    image.download="image.jpg";
    image.href=imageRef;
    document.body.appendChild(image)
    image.click();
    document.body.removeChild(image);
}