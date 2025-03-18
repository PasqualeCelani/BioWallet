import WebcamCapture from "../components/WebcamContainer";

const CameraPage = ({}) => {
    return (
        <main>
            <div className="w-full h-[83px] bg-[#FFF2E4] flex justify-center items-center">
                <p className="font-inter font-bold text-[32px] leading-[39px] text-[#FF8400]">VERIFY</p>
            </div>
            <WebcamCapture/>
        </main>
    );
}

export default CameraPage;