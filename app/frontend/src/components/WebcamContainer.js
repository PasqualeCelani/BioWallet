import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamContainer = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
  };

  return (
    <div className="flex flex-col items-center  gap-4 py-10">
        <Webcam 
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-xl shadow-lg w-[50%]"
        />
        <button onClick={capture} className="
        bg-[#FF8400] text-white px-4 py-2 rounded-lg">
          Take Photo
        </button>
    </div>
  );
};

export default WebcamContainer;