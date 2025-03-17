
const EnrollmentForm = ({}) => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-[746px] bg-white border border-[#FF8400] 
            shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[5px] h-[323px] flex flex-row">
                <div className="flex-1">
                    <div className="flex flex-col py-5 pl-5 gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="font-inter font-normal text-[12px] leading-[15px] text-[#FF8400]">
                                identity
                            </p>
                            <input type="text" className="box-border w-[206px] h-[41px] bg-white border 
                            border-[#FF8400] rounded-[5px]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-inter font-normal text-[12px] leading-[15px] text-[#FF8400]">
                                images
                            </p>
                            <button className="w-[90px] h-[90px] bg-[#FF8400] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
                            rounded-[2px] font-inter font-normal text-[64px] leading-[77px] text-white
                            pb-5
                            ">+</button>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <button className="w-[125px] h-[32px] bg-[#FF8400] rounded-[20px]
                    font-inter font-bold text-[12px] leading-[15px] text-white relative
                    top-[85%] left-[60%]">
                        SUMBMIT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EnrollmentForm;