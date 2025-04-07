import WebcamCapture from "../components/WebcamContainer";
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CameraPage = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(searchParams.get('state') != 'VERIFICATION' && searchParams.get('state') != 'ENROLLMENT') {
            navigate("/")
        }
      }, [searchParams, setSearchParams]);

    return (
        <main>
            <div className="w-full h-[83px] bg-[#FFF2E4] flex justify-center items-center">
                <p className="font-inter font-bold text-[32px] leading-[39px] text-[#FF8400]">{searchParams.get('state')}</p>
            </div>
            <WebcamCapture/>
        </main>
    );
}

export default CameraPage;