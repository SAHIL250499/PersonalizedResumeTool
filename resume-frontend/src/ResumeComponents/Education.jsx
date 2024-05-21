import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const Education = ({value,educationdata}) => {

  const [coursename,setCourseName]=useState('');
  const [schoolname,setSchoolName]=useState('');
  const [startmonth,setStartMonth]=useState('');
  const [startyear,setStartYear]=useState('');
  const [endmonth,setEndMonth]=useState('');
  const [endyear,setEndYear]=useState('');

  const axiosPrivate = useAxiosPrivate();

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
      const response=await axiosPrivate.patch(`/users/educationid/${value}/updateEducation`,obj);
    }
    catch(err){
      console.log(err.message);
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
    const newContent = e.target.textContent;
    updateEducation({'startmonth':newContent})
  }
  const handleStartYear=(e)=>{
    const newContent = e.target.textContent;
    updateEducation({'startyear':newContent})
  }

  const handleEndMonth=(e)=>{
    const newContent = e.target.textContent;
    updateEducation({'endmonth':newContent})
  }

  const handleEndYear=(e)=>{
    const newContent = e.target.textContent;
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
                      <div className="text-[#449399]">
                      <span onInput={handleStartMonth}
                          onBlur={handleStartMonth}
                          className="w-10 border-b-2 outline-none focus:border-green-500"
                          contentEditable="true"
                        >{startmonth?startmonth:'MM'}</span><span>/</span>
                        <span onInput={handleStartYear} onBlur={handleStartYear} contentEditable="true"
                          className="w-10 border-b-2 outline-none focus:border-green-500"
                        >{startyear?startyear:'YYYY'}</span>
                        <span>-</span>
                        <span onInput={handleEndMonth} onBlur={handleEndMonth} contentEditable="true"
                          className="w-10 border-b-2 outline-none focus:border-green-500"
                        >{endmonth?endmonth:'MM'}</span>
                        <span>/</span>
                        <span onInput={handleEndYear} onBlur={handleEndYear} contentEditable="true"
                          className="w-10 border-b-2 outline-none focus:border-green-500"
                        >{endyear?endyear:'YYYY'}</span>
                      </div>
                    </li>
                  </ul>
                  
                </>
  )
}

export default Education