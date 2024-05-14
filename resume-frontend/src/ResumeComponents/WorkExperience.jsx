import axios from 'axios';
import React, { useEffect, useState } from 'react'

const WorkExperience = ({value,workexpdata}) => {
  const [jobtitle,setJobTitle]=useState('');
  const [companyname,setCompanyName]=useState('');
  const [startmonth,setStartMonth]=useState('');
  const [startyear,setStartYear]=useState('');
  const [endmonth,setEndMonth]=useState('');
  const [endyear,setEndYear]=useState('');
  const [tasks,setTasks]=useState([]);

  useEffect(()=>{
    if(workexpdata){
      const{companyname,jobtitle,startmonth,startyear,endmonth,endyear,tasks}=workexpdata;
      setJobTitle(jobtitle);
      setCompanyName(companyname);
      setStartMonth(startmonth);
      setStartYear(startyear);
      setEndMonth(endmonth);
      setEndYear(endyear);
      setTasks(tasks);

      // setCompanyName(props.workexpdata.companyname);
    }
  },[workexpdata,jobtitle,companyname,startmonth,startyear,endmonth,endyear,tasks])



  const updateWorkExperience=async(obj)=>{
    try{
      const response=await axios.patch(`http://localhost:3001/users/workid/${value}/updateWorkExp`,obj,{withCredentials:true
      });
    }
    catch(err){
      console.log(err.message)
    }
  };

  const handleJobTitle=(e)=>{
    const newContent = e.target.textContent;
    updateWorkExperience({'jobtitle':newContent})
  }

  const handleCompanyName=(e)=>{
    const newContent = e.target.textContent;
    updateWorkExperience({'companyname':newContent})
  }

  const handleStartMonth=(e)=>{
    const newContent = e.target.value;
    updateWorkExperience({'startmonth':newContent})
  }
  const handleStartYear=(e)=>{
    const newContent = e.target.value;
    updateWorkExperience({'startyear':newContent})
  }

  const handleEndMonth=(e)=>{
    const newContent = e.target.value;
    updateWorkExperience({'endmonth':newContent})
  }

  const handleEndYear=(e)=>{
    
    const newContent = e.target.value;
    updateWorkExperience({'endyear':newContent})
  }

  const handleTaskList=(e)=>{
    const list=[];
    const newContent = e.target;
    const allLis=newContent.getElementsByTagName('li')
    for(let l=0;l<allLis.length;l++){
      list.push(allLis[l].textContent)
    }
    updateWorkExperience({'tasks':list})
  }


  return (<>

                  <ul class="WorkExperience space-y-4">
                    <li>
                      <h3 onInput={handleJobTitle}
                          onBlur={handleJobTitle}
                        contenteditable="true"
                        className="text-[24px] font-bold text-black border-b-2 outline-none focus:border-green-500"
                      >
                        {jobtitle?jobtitle:'Job Title'}
                      </h3>
                    </li>
                    <li>
                      <h3 onInput={handleCompanyName}
                          onBlur={handleCompanyName}
                        contenteditable="true"
                        className="w-10/12 text-[24px] text-black border-b-2 outline-none focus:border-green-500"
                      >
                        {companyname?companyname:'Company Name'}
                      </h3>
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

                    <li>
                      <div className="Achievements/Tasks">
                        <h3 className="text-[16px] text-[#449399]">
                          Achievements/Tasks
                        </h3>
                        <ul onInput={handleTaskList}
                          onBlur={handleTaskList}
                          contenteditable="true"
                          className="TaskList list-disc list-inside marker:text-[#449399] space-y-2 border-b-2 outline-none focus:border-green-500 "
                        >
                          {tasks.length?(
                              tasks.map((task)=>(
                                <li>
                                    <span  className="text-[18px] ">
                                      {task}
                                    </span>
                                </li>
                              ))
                          ):(
                            <li>
                            <span  className="text-[18px] ">
                              {/* {console.log(tasks)} */}
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </span>
                          </li>
                          )}
                          
                        </ul>
                      </div>
                    </li>
                  </ul>
                  
                  
                  </>
                
  )
}

export default WorkExperience