import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Education = ({value,educationdata}) => {

  const [coursename,setCourseName]=useState('');
  const [schoolname,setSchoolName]=useState('');
  const [startmonth,setStartMonth]=useState('');
  const [startyear,setStartYear]=useState('');
  const [endmonth,setEndMonth]=useState('');
  const [endyear,setEndYear]=useState('');

  useEffect(()=>{
    if(educationdata){
      const {coursename,schoolname,startmonth,startyear,endmonth,endyear}=educationdata;
      setCourseName(coursename);
      setSchoolName(schoolname);
      setStartMonth(startmonth);
      setStartYear(startyear);
      setEndMonth(endmonth);
      setEndYear(endyear);
      console.log(educationdata);
    }


  },[coursename,schoolname,startmonth,startyear,endmonth,endyear,educationdata])

  const updateEducation=async(obj)=>{
    try{
      const response=await axios.patch(`http://localhost:3001/users/educationid/${value}/updateEducation`,obj,{withCredentials:true
      });
    }
    catch(err){
      console.log(err.message)
    }
  };

  const handleCourseName=(e)=>{
    const newContent = e.target.textContent;
    updateEducation({'coursename':newContent});
  }

  const handleSchoolName=(e)=>{
    const newContent = e.target.textContent;
    updateEducation({'schoolname':newContent});
  }

  const handleStartMonth=(e)=>{
    const newContent = e.target.value;
    updateEducation({'startmonth':newContent})
  }
  const handleStartYear=(e)=>{
    const newContent = e.target.value;
    updateEducation({'startyear':newContent})
  }

  const handleEndMonth=(e)=>{
    const newContent = e.target.value;
    updateEducation({'endmonth':newContent})
  }

  const handleEndYear=(e)=>{
    const newContent = e.target.value;
    updateEducation({'endyear':newContent})
  }






  return (
    <>
                  
                  <ul id="_education" class="space-y-4">
                    <li>
                      <h1 onInput={handleCourseName}
                          onBlur={handleCourseName}
                        contenteditable="true"
                        className="text-[24px] text-black font-bold border-b-2 outline-none focus:border-green-500 "
                      >
                        {coursename?coursename:'COURSE NAME'}   
                      </h1>
                    </li>
                    <li>
                      <h1 onInput={handleSchoolName}
                          onBlur={handleSchoolName} contenteditable="true" className="text-[24px] text-black border-b-2 outline-none focus:border-green-500 ">
                        {schoolname?schoolname:'School Name'}
                      </h1>
                    </li>
                    <li>
                      <div className="text-[16px] text-[#449399]">
                        <input onChange={handleStartMonth}
                          value={startmonth?startmonth:''}
                          className="w-10 text-center"
                          type="number"
                          oninput="this.value=this.value.slice(0,2)"
                          placeholder="mm"
                        /><span>/</span>
                        <input onChange={handleStartYear}
                          value={startyear?startyear:''}
                          className="w-10 text-center"
                          type="number"
                          oninput="this.value=this.value.slice(0,4)"
                          maxlength="4"
                          placeholder="yyyy"
                        />
                        <span>-</span>
                        <input onChange={handleEndMonth}
                          value={endmonth?endmonth:''}
                          className="w-10 text-center"
                          type="number"
                          oninput="this.value=this.value.slice(0,2)"
                          maxlength="2"
                          placeholder="mm"
                        />
                        <span>/</span>
                        <input onChange={handleEndYear}
                          value={endyear?endyear:''}
                          className="w-10 text-center"
                          type="number"
                          oninput="this.value=this.value.slice(0,4)"
                          maxlength="4"
                          placeholder="yyyy"
                        />
                      </div>
                    </li>
                  </ul>
                  
                </>
  )
}

export default Education