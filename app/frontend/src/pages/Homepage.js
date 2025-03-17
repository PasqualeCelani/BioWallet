import { useState } from 'react';
import VerificationSearch from '../components/VerificationSearch';


const Homepage =({}) =>{

    const STATES = {
        VERIFICATION : "VERIFICATION",
        ENROLLMENT : "ENROLLMENT"
    };

    const activeButtonState = "w-[147px] h-[41px] bg-[#FFE4C6] border border-[#FF8400] rounded-[5px]";
    const notActiveButtonState = "w-[147px] h-[41px] bg-[#FFFFFF] border border-[#FF8400] rounded-[5px]";

    const [state, setState] = useState(STATES.VERIFICATION);

    return(
        <>
        <div className="w-full h-[83px] bg-[#FFF2E4] flex justify-center items-center">
            <div className="flex flex-row gap-6">
                <button className={state === STATES.VERIFICATION ? activeButtonState : notActiveButtonState} 
                onClick={() => setState(STATES.VERIFICATION)}>Verification</button>
                <button className={state === STATES.ENROLLMENT ? activeButtonState : notActiveButtonState}
                onClick={() => setState(STATES.ENROLLMENT)}>Enrollment</button>
            </div>
        </div>
        <div className="container mx-auto pt-[96px]">
          { 
            state ===  STATES.VERIFICATION ? <VerificationSearch /> : <div></div>
          }
        </div>
        </>
    )
}

export default Homepage;