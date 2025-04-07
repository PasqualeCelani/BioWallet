import logo from '../assets/Logo.png';
import serchButton from '../assets/SearchButton.png';
import success_img from '../assets/SuccessIcon.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import error_triangle from '../assets/ErrorTriangle.png';

const VerificationSearch = ({}) => {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="ml-[50px] flex flex-col">
              <img src={logo} />
              <div className="flex items-center justify-between  w-[361px] py-[8px] pl-[10px] pr-[10px] border border-[#FF8400] rounded-[20px]">
                <input type="text"  className="focus:outline-none" placeholder="Insert you identity ..."
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" ? navigate('/camera?state='+searchParams.get('state')+'&id='+inputValue) : null}/>
                <button onClick={() =>  navigate('/camera?state='+searchParams.get('state')+'&id='+inputValue)}><img src={serchButton}
                className='transition-all transform hover:scale-95 active:scale-90 hover:opacity-75'/></button>
              </div>
            </div>
            {
              searchParams.get('operation') === "SUCCESS" ?
            <div className='w-[372px] h-[49px] bg-[#8EEBA7] border border-[#0A7527] rounded-[10px] box-border
            mt-5 flex items-cernter justify-center'>
              <div className="flex flex-row justify-center items-center gap-3">
                <img className='w-[35px] h-[35px]' src={success_img}/>
                <p className='font-inter font-bold text-[12px] leading-[15px] text-[#0A7527]'>ENROLLMENT SUCCESSES</p>
              </div>
            </div> : <div></div>
            }
            {
              searchParams.get("error") != null ? 
              <div className='box-border w-[500px] h-[100px] bg-white border border-[#B50000] rounded-md mt-5'>
                <div className='flex flex-col gap-2 mx-2 my-2'> 
                <div className='flex flex-row items-center gap-2'>
                <img src={error_triangle}/>
                <p className='font-inter font-normal text-[12px] leading-[15px] text-[#B50000]'>ERROR</p>
                </div>
                  <p className='font-inter font-normal text-[12px] leading-[15px] text-[#B50000] pl-1'>{searchParams.get('error')}</p>
                </div>
              </div> : <div></div>
            }
        </div>
    );
}

export default VerificationSearch;