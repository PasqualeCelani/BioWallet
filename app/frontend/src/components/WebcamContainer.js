import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEnrollmentContext } from '../EnrollmentContext';

const WebcamContainer = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const context = useEnrollmentContext();
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()

  const capture = () => {
    if(!loading){
      setLoading(true);

      const image = webcamRef.current.getScreenshot();
      const id = searchParams.get('id');

      if(searchParams.get('state') === "ENROLLMENT") {
        context.addImage(image);
        navigate("/?state=ENROLLMENT");
      }
    }

  };

  return (
    <div className="flex flex-col items-center  gap-4 py-10">
        <Webcam 
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-xl shadow-lg w-[50%]"
        />
        <button onClick={capture} className="
        bg-[#FF8400] text-white px-4 py-2 rounded-lg 
        transition-all transform hover:scale-95 active:scale-90 hover:opacity-75">
          Take Photo
        </button>
    </div>
  );
};

export default WebcamContainer;