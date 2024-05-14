import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Skills = ({value,skilldata}) => {
  const [skill,setSkill]=useState('');
  
  useEffect(()=>{
    if(skilldata){
      setSkill(skilldata);
    }
  },[skilldata,skill])

  const updateSkill=async(obj)=>{
    try{
      const response=await axios.patch(`http://localhost:3001/users/skillid/${value}/updateSkill`,obj,{withCredentials:true
      });
    }
    catch(err){
      console.log(err.message)
    }
  };

  const handleSkill=(e)=>{
    const newContent = e.target.textContent;
    updateSkill({'skills':[newContent]});
  }
  return (
    <>
                  
                  <div className="skillsList">
                    <button 
                    onInput={handleSkill}
                    onBlur={handleSkill}
                      contenteditable="true"
                      className="text-white bg-[#989da6] rounded-lg px-5 py-2.5 mr-2 mb-2 cursor-text border-b-2 outline-none focus:border-green-500 "
                    >
                      <span  className="text-[18px] font-semibold">{skill?skill:'Skill'}</span>
                    </button>
                  </div>
    </>
  )
}

export default Skills