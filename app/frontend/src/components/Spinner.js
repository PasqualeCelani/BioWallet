const Spinner = ({additional_style}) => {
  const style = "w-10 h-10 border-4 border-gray-300 border-t-[#FF8400] rounded-full animate-spin " + additional_style;
    return (
      <div className={style}/>
    );
  }
  
  export default Spinner;