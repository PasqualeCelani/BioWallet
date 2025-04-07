import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEnrollmentContext } from '../EnrollmentContext';
import { verify_user } from '../Services/UserService';
import Spinner from './Spinner';

const WebcamContainer = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const context = useEnrollmentContext();
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()


  const submit = async (id, img) => {
    let result = await verify_user(id, img);
    if(result["status"] != 200) 
    {
      const error_message = result["response"]["data"]["error"]["message"];
      navigate("/?state=VERIFICATION&error="+error_message);
    }
    else
    {
      const token = result["data"]["token"];
      localStorage.setItem('token',token);
      navigate("/keypage?id="+id);
    }
  }

  const capture = () => {
    if(!loading){
      setLoading(true);

      const image = webcamRef.current.getScreenshot();
      setLoadingImage(image);
      const id = searchParams.get('id');

      if(searchParams.get('state') === "ENROLLMENT") {
        context.addImage(image);
        navigate("/?state=ENROLLMENT");
      }
      else
      {
        submit(id, image);
      }
    }

  };

  return (
    <div className="flex flex-col items-center  gap-4 py-10">
        {!loading ? 
        <Webcam 
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-xl shadow-lg w-[50%]"
        /> : <img src={loadingImage} className="rounded-xl shadow-lg w-[50%]"/>
        }
        {!loading ? 
        <button onClick={capture} className="
        bg-[#FF8400] text-white px-4 py-2 rounded-lg 
        transition-all transform hover:scale-95 active:scale-90 hover:opacity-75">
          Take Photo
        </button>
        : <Spinner />
        }
    </div>
  );
};

export default WebcamContainer;