import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Language = ({value,languagedata}) => {

  const [language,setLanguage]=useState('');

  useEffect(()=>{
    if(languagedata){
      setLanguage(languagedata);
    }
  },[languagedata,language])

  const updateLanguage=async(obj)=>{
    try{
      const response=await axios.patch(`http://localhost:3001/users/languageid/${value}/updateLanguage`,obj,{withCredentials:true
      });
    }
    catch(err){
      console.log(err.message)
    }
  };

  const handleLanguage=(e)=>{
    const newContent = e.target.textContent;
    updateLanguage({'languages':[newContent]});
  }
  return (
    <>
                  <div className="languageList">
                    <button 
                    onInput={handleLanguage}
                    onBlur={handleLanguage}
                      contenteditable="true"
                      className="text-black border-2 border-[#989da6] rounded-lg px-5 py-2.5 mr-2 mb-2 cursor-text border-b-2 outline-none focus:border-green-500 "
                    >
                      <span className="text-[18px] font-semibold">{language?language:'Language'}</span>
                    </button>
                    
                  </div>
                </>
  )
}

export default Language