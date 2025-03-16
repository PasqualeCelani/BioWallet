import React from 'react';


const Header =({}) =>{
    return(
        <div className="w-full h-[83px] bg-[#FFF2E4] flex justify-center items-center">
            <div className="flex flex-row gap-6">
                <button className="w-[147px] h-[41px] bg-[#FFE4C6] border border-[#FF8400] rounded-[5px]">Verification</button>
                <button className='w-[147px] h-[41px] bg-[#FFFFFF] border border-[#FF8400] rounded-[5px]'>Enrollment</button>
            </div>
        </div>
    )
}

export default Header;