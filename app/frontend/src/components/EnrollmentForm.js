import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEnrollmentContext } from '../EnrollmentContext';
import removeButtomImg from '../assets/RemoveButton.png';
import { enroll_user } from '../Services/UserService';
import error_triangle from '../assets/ErrorTriangle.png';
import Spinner from './Spinner';


const EnrollmentForm = ({}) => {

    const navigate = useNavigate();
    const context = useEnrollmentContext();
    const [inputValue, setInputValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [errorMessage, setErrorMessage] = useState('');

    const submit = async () => {
        if(!context._getLoading()) {
            context._setLoading(true);
            let result =  await enroll_user(context._getId(), context.getImages());
            context._setLoading(false);
            context._setId("");
            context.clearImages();
            if(result["status"] != 200) 
                setErrorMessage(result["response"]["data"]["error"]["message"]);
            else
                navigate("/?state=VERIFICATION&operation=SUCCESS");
        }
    }

    return (
        <div className="flex justify-center items-center flex-col gap-6">
            <div className="w-[746px] bg-white border border-[#FF8400] 
            shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[5px] h-[323px] flex flex-row">
                <div className="flex-1">
                    <div className="flex flex-col py-5 pl-5 gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="font-inter font-normal text-[12px] leading-[15px] text-[#FF8400]">
                                identity
                            </p>
                            <input type="text" className="box-border w-[206px] h-[41px] bg-white border 
                            border-[#FF8400] rounded-[5px]"
                            onChange={(e) => {setInputValue(e.target.value); context._setId(e.target.value);}}
                            value={context._getId()}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-inter font-normal text-[12px] leading-[15px] text-[#FF8400]">
                                images
                            </p>
                            <div className="flex flex-row gap-5">
                                {
                                    context.getImages().map(
                                        (img, index) => (
                                            <div key={index} className="relative">
                                                <img src={img} className="w-[90px] h-[90px] 
                                                shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[2px] "/>
                                                <button className='absolute top-[-4px] right-[-4px]
                                                transition-all transform hover:scale-95 active:scale-90 hover:opacity-75'
                                                onClick={() => context.removeImage(index)}>
                                                    <img src={removeButtomImg}/>
                                                </button>
                                            </div>
                                            
                                        )
                                    )
                                }
                                {
                                    context.getNumberOfImages() < 3 ?
                                    <button className="w-[90px] h-[90px] bg-[#FF8400] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
                                    rounded-[2px] font-inter font-normal text-[64px] leading-[77px] text-white
                                    pb-5 transition-all transform hover:scale-95 active:scale-90 hover:opacity-75
                                    " onClick={() =>  navigate('/camera?state='+searchParams.get('state'))} >+</button>
                                    : <div></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    {
                        !context._getLoading()  ? 
                    <button className="w-[125px] h-[32px] bg-[#FF8400] rounded-[20px]
                    font-inter font-bold text-[12px] leading-[15px] text-white relative
                    top-[85%] left-[60%] transition-all transform hover:scale-95 active:scale-90 hover:opacity-75
                    disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" 
                    onClick={() => submit()} disabled={context.getNumberOfImages() == 0 || context._getId() === ''}>
                        SUMBMIT
                    </button> : <Spinner additional_style={"top-[83%] left-[73%] relative"}/>
                    }   
                </div>
            </div>
            {
                errorMessage != '' ? 
                <div className='box-border w-[746px] h-[100px] bg-white border border-[#B50000] rounded-md'>
                    <div className='flex flex-col gap-2 mx-2 my-2'> 
                        <div className='flex flex-row items-center gap-2'>
                            <img src={error_triangle}/>
                            <p className='font-inter font-normal text-[12px] leading-[15px] text-[#B50000]'>ERROR</p>
                        </div>
                        <p className='font-inter font-normal text-[12px] leading-[15px] text-[#B50000] pl-1'>{errorMessage}</p>
                    </div>
                </div>
                : <div></div>
            }
        </div>
    );
}

export default EnrollmentForm;