import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Achievements = ({value,achievementData}) => {

  const [achievement,setAchievement]=useState('');

  const axiosPrivate = useAxiosPrivate();

  useEffect(()=>{
    if(achievementData){
      setAchievement(achievementData);
    }
  },[achievementData,achievement])

  const updateAchievement=async(obj)=>{
    try{
      const response=await axiosPrivate.patch(`/users/achievementid/${value}/updateAchievement`,obj);
    }
    catch(err){
      console.log(err.message);
    }
  };

  const handleAchievement=(e)=>{
    const newContent = e.target.textContent;
    updateAchievement({'achievements':[newContent]});
  }

  return (
    <>
                  {/* <!--List of Achievements--> */}
                  <div class="list of achievements">
                    <ul onInput={handleAchievement}
                        onBlur={handleAchievement}
                      id="_achievements"
                      contenteditable="true"
                      className="TaskList list-disc list-inside marker:text-[#449399] space-y-1 border-b-2 outline-none focus:border-green-500 "
                    >
                      <li >
                        <h1 className="text-[20px] text-black inline">
                          {achievement?achievement:'Achievement'}
                        </h1>
                      </li>
                    </ul>
                  </div>
                  
                </>
  )
}

export default Achievements