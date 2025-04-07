import VerificationSearch from '../components/VerificationSearch';
import EnrollmentForm from '../components/EnrollmentForm';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';


const Homepage =({}) =>{
    const activeButtonState = "w-[147px] h-[41px] bg-[#FFE4C6] border border-[#FF8400] rounded-[5px] \
    transition-all transform hover:scale-95 active:scale-90 hover:opacity-75";
    const notActiveButtonState = "w-[147px] h-[41px] bg-[#FFFFFF] border border-[#FF8400] rounded-[5px] \
    transition-all transform hover:scale-95 active:scale-90 hover:opacity-75";

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.get('state')) {
          setSearchParams({ state: 'VERIFICATION' });
        }
        if(searchParams.get('state') != 'VERIFICATION' && searchParams.get('state') != 'ENROLLMENT') {
            setSearchParams({ state: 'VERIFICATION' });
        }
      }, [searchParams, setSearchParams]);

    return(
        <>
        <div className="w-full h-[83px] bg-[#FFF2E4] flex justify-center items-center">
            <div className="flex flex-row gap-6">
                <button className={searchParams.get('state') === "VERIFICATION" ? activeButtonState : notActiveButtonState} 
                onClick={() => setSearchParams({ state: 'VERIFICATION' })}>Verification</button>
                <button className={searchParams.get('state') === "ENROLLMENT" ? activeButtonState : notActiveButtonState}
                onClick={() => setSearchParams({ state: 'ENROLLMENT' })}>Enrollment</button>
            </div>
        </div>
        <div className="container mx-auto pt-[96px]">
          { 
            searchParams.get('state') === "VERIFICATION" ? <VerificationSearch /> : <EnrollmentForm />
          }
        </div>
        </>
    )
}

export default Homepage;