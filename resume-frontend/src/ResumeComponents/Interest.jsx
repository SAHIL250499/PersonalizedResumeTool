import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Interest = ({value,interestdata}) => {

  const [interest,setInterest]=useState('');

  useEffect(()=>{
    if(interestdata){
      setInterest(interestdata);
    }
  },[interestdata,interest])

  const updateInterest=async(obj)=>{
    try{
      const response=await axios.patch(`http://localhost:3001/users/interestid/${value}/updateInterest`,obj,{withCredentials:true
      });
    }
    catch(err){
      console.log(err.message)
    }
  };

  const handleInterest=(e)=>{
    const newContent = e.target.textContent;
    updateInterest({'interests':[newContent]});
  }

  return (
    <>
                  <div>
                    <button onInput={handleInterest}
                    onBlur={handleInterest}
                      contenteditable="true"
                      className="text-black border-2 border-[#989da6] rounded-lg px-5 py-2.5 mr-2 mb-2 cursor-text border-b-2 outline-none focus:border-green-500 "
                    >
                      <span className="text-[18px] font-semibold">{interest?interest:'Hiking and Travelling new places'}</span>
                    </button>
                  </div>
        </>
  )
}

export default Interest