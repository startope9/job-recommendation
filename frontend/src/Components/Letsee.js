import React, { useEffect, useState } from "react";
import myImage from "./venom.jpg";  // Import the image

function Letsee() {
    const [imageSrc, setImageSrc] = useState(null);
    const imageKey = "cachedImage";

    // On component mount, check if image is in localStorage, if not store it
    useEffect(() => {
        const cachedImage = localStorage.getItem(imageKey);
        if (!cachedImage) {
            // Convert imported image to base64 and store it in localStorage
            cacheImage(myImage);
        }
    }, []);

    // Convert the imported image to base64 and store in localStorage
    const cacheImage = (imagePath) => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/jpeg");
            localStorage.setItem(imageKey, dataURL); // Store base64 image in localStorage
        };
    };

    // Load image from localStorage when button is clicked
    const loadImage = () => {
        const cachedImage = localStorage.getItem(imageKey);
        if (cachedImage) {
            setImageSrc(cachedImage);
        } else {
            console.error("Image not found in localStorage");
        }
    };

    return (
        <div>
            <h1>Offline Image Display</h1>
            <button onClick={loadImage}>Load Image</button>
            {imageSrc && <img src={imageSrc} alt="Loaded"
                style={{
                    width: 700,
                    height: 500
                }}
            />}
        </div>
    );
}

export default Letsee;
