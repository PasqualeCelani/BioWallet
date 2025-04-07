import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import home from "../assets/Home.png";
import { useSearchParams } from 'react-router-dom';
import {get_keys_from_user} from '../Services/UserService';

const KeyPage = ({}) => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [keys, setKeys] = useState([]);

    const get_keys = async (id) => {
      let result = await get_keys_from_user(id);
      setKeys(result["data"]["keys"])
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          navigate('/?state=VERIFICATION&error=You must be verified to access this page');
          return;
        }

        try {
            const { exp } = jwtDecode(token);
            if (exp * 1000 < Date.now()) {
              localStorage.removeItem('token');
              navigate('/?state=VERIFICATION&error=You must be verified to access this page');
            }
          } catch (err) {
            localStorage.removeItem('token');
            navigate('/?state=VERIFICATION&error=You must be verified to access this page');
        }
        
        const id = searchParams.get("id");
        get_keys(id);
        
        }
        , [navigate]);



    return (
        <>
            <div className="w-full h-[83px] bg-[#FFF2E4] flex flex-row justify-between items-center">
                <button className='transition-all transform hover:scale-95 active:scale-90 hover:opacity-75'
                onClick={() => navigate("/?state=VERIFICATION")}> 
                    <img src={home} />
                </button>
                <p className='font-inter font-bold text-[22px] leading-[27px] text-[#FF8400]'>{searchParams.get("id")}</p>
                <div></div>
            </div>
            <div className='flex flex-col justify-center items-center mt-10'>
            <div className='w-[891px] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] flex flex-col
            pb-20'>
                <div className='w-full h-[65px] bg-[#FF8400] rounded-t-[10px] rounded-b-none flex items-center flex-row
                gap-[200px] px-5'>
                  <p className='font-inter font-bold text-[22px] leading-[27px] text-white'>PUBLIC KEY</p>
                  <p className='font-inter font-bold text-[22px] leading-[27px] text-white'>PRIVATE KEY</p>
                </div>
                <div className='flex flex-col mt-2 gap-2'>
                  {
                    keys.map(
                      (key, index) => (
                        <div className=' w-full h-[136px] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-5' key={index}>
                        <div className='flex flex-row items-center gap-[50px]'>
                          <p className='font-inter font-bold text-[16px] leading-[19px] text-black w-[278px] break-words'>
                            {key["pubblic_key"]}
                          </p>
                          <p className='font-inter font-bold text-[16px] leading-[19px] text-black w-[278px] break-words'>
                            {key["private_key"]}
                          </p>
                        </div>
                      </div>
                      )
                    )
                  }
                </div>
            </div>
            </div>
        </>
    )
}

export default KeyPage;