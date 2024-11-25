import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Header from './ResumeComponents/Header'
import WorkExperience from './ResumeComponents/WorkExperience'
import Education from './ResumeComponents/Education'
import Skills from './ResumeComponents/Skills'
import PersonalProjects from './ResumeComponents/PersonalProjects'
import Achievements from './ResumeComponents/Achievements'
import Language from './ResumeComponents/Language'
import Interest from './ResumeComponents/Interest'
import Navbar from './ResumeComponents/Navbar'
import Preview from './ResumeComponents/Preview'
import useAxiosPrivate from './hooks/useAxiosPrivate';


const Resume = () => {
  const inputRef=useRef(null);
  const axiosPrivate = useAxiosPrivate();


  const [headerData,setHeaderData]=useState({});
  const [workExpList,setWorkExpList]=useState([<WorkExperience key={0} value={0}/>]);
  const [educationList,setEducationlist]=useState([<Education key={0} value={0} />]);
  const [skillsList,setSkillsList]=useState([<Skills key={0} value={0}/>]);
  const [projectsList,setProjectsList]=useState([<PersonalProjects key={0} value={0}/>]);
  const [achievementsList,setAchievementsList]=useState([<Achievements key={0} value={0}/>]);
  const [languageList,setLanguageList]=useState([<Language key={0} value={0}/>]);
  const [interestList,setInterestList]=useState([<Interest key={0} value={0}/>]);


  useEffect(()=>{
    getAllDetails();
  },[axiosPrivate])


  const getAllDetails= async() =>{
    try{
      const response=await axiosPrivate.get('/users/getAllDetails');
    
      const json=response.data;
      console.log(json);
      
      if(json && json.length!==0){
        //Get Header
        if(json.headerid){
          setHeaderData(json.headerid);
        }
        //getWorExp
        // setWorkExpList([]);
        if(json.workexparray && json.workexparray.length !== 0){
            const workExpComponents=json.workexparray.map((data,index)=>(
              <WorkExperience key={index} value={index} workexpdata={data}/>
            ))
            setWorkExpList(workExpComponents);
          }

        // setEducationlist([]);
          
        if(json.educationarray && json.educationarray.length !== 0){
          const educationComponents=json.educationarray.map((data,index)=>{
            return <Education key={index} value={index} educationdata={data}/>
          })
          setEducationlist(educationComponents);
        }

        // setProjectsList([]);
        
        if(json.projectarray && json.projectarray.length !== 0){
          const projectComponents=json.projectarray.map((data,index)=>(
            <PersonalProjects key={index} value={index} projectdata={data}/>
          ))
          setProjectsList(projectComponents);
        }


        // setSkillsList([]);
        
        if(json.skills && json.skills.length !== 0){
          const skillComponents=json.skills.map((data,index)=>(
            <Skills key={index} value={index} skilldata={data}/>
          ))
          setSkillsList(skillComponents);
        }

        // setAchievementsList([]);
        if(json.achievements && json.achievements.length !== 0){
          const achievementComponents=json.achievements.map((data,index)=>(
            <Achievements key={index} value={index} achievementData={data}/>
          ))
          setAchievementsList(achievementComponents);
        }

        // setLanguageList([]);
        if(json.languages && json.languages.length !== 0){
          const languageComponents=json.languages.map((data,index)=>(
            <Language key={index} value={index} languagedata={data}/>
          ))
          setLanguageList(languageComponents);
        }

        // setInterestList([]);
        if(json.interests && json.interests.length !== 0){
          const interestComponents=json.interests.map((data,index)=>(
            <Interest key={index} value={index} interestdata={data}/>
          ))
          setInterestList(interestComponents);
        }    
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const handleSocialDataUpdate = (updatedData) => {
    setHeaderData((prevData) => ({
      ...prevData,
      socialLink: updatedData.socialLink, // Update only the social links part
    }));
  };


  const handleClose = () => {
    // Create a new array excluding the item at the specified index
    if(workExpList.length>1){
      const updatedWorkList=workExpList.filter((_,i)=>i!==workExpList.length-1);
    setWorkExpList(updatedWorkList)
    deleteLastWorkExp();
    }
  }

  const handleEducationClose = () => {
    // Create a new array excluding the item at the specified index
    if(educationList.length>1){
      const updatedEducationList=educationList.filter((_,i)=>i!==educationList.length-1);
    setEducationlist(updatedEducationList)
    deleteLastEducation();
    }
  }

  const handleProjectClose = () => {
    // Create a new array excluding the item at the specified index
    if(projectsList.length>1){
      const updatedProjectList=projectsList.filter((_,i)=>i!==projectsList.length-1);
    setProjectsList(updatedProjectList)
    deleteLastProject();
    }
  }

  const handleSkillClose=()=>{
    if(skillsList.length>1){
      const updateSkillList=skillsList.filter((_,i)=>i!==skillsList.length-1);
      setSkillsList(updateSkillList)
      deleteLastSkill();
    }
  }

  const handleAchievementClose=()=>{
    if(achievementsList.length>1){
      const updateAchievementList=achievementsList.filter((_,i)=>i!==achievementsList.length-1);
      setAchievementsList(updateAchievementList)
      deleteLastAchievement();
    }
  }

  const handleLanguageClose=()=>{
    if(languageList.length>1){
      const updateLanguageList=languageList.filter((_,i)=>i!==languageList.length-1);
      setLanguageList(updateLanguageList)
      deleteLastLanguage();
    }
  }

  const handleInterestClose=()=>{
    if(interestList.length>1){
      const updateInterestList=interestList.filter((_,i)=>i!==interestList.length-1);
      setInterestList(updateInterestList)
      deleteLastInterest();
    }
  }


   
  const deleteLastWorkExp=async ()=>{
    try{
      const response=await axiosPrivate.delete('/users/deleteLastWorkExp');
    } 
    catch(err){
      console.error(err);
    }
  }

  const deleteLastEducation=async ()=>{
    try{
      const response=await axiosPrivate.delete('/users/deleteLastEducation');
    } 
    catch(err){
      console.error(err);
    }
  }
  const deleteLastProject=async ()=>{
    try{
      const response=await axiosPrivate.delete('/users/deleteLastProject');
    } 
    catch(err){
      console.error(err);
    }
  }

  const deleteLastSkill=async ()=>{
    try{
      const response=await axiosPrivate.delete('/users/deleteLastSkills');
    }
    catch(err){
      console.error(err);
    }
  }

  const deleteLastAchievement=async ()=>{
    try{
      const response=await axiosPrivate.delete('/users/deleteLastAchievements');
    }
    catch(err){
      console.error(err);
    }
  }

  const deleteLastLanguage=async ()=>{
    try{
      const response=await axiosPrivate.delete('/users/deleteLastLanguages');
    }
    catch(err){
      console.error(err);
    }
  }

  const deleteLastInterest=async ()=>{
    try{
      const response=await axiosPrivate.delete('/users/deleteLastInterests');
    }
    catch(err){
      console.error(err);
    }
  }


  


  const onAddWorkExpBtnClick=event=>{
    setWorkExpList(workExpList.concat(<WorkExperience key={workExpList.length} value={workExpList.length}/>));
  }
  const AddEducationBtnClick=event=>{
    setEducationlist(educationList.concat(<Education key={educationList.length} value={educationList.length}/>))
  }
  const AddSkillsBtnClick=event=>{
    setSkillsList(skillsList.concat(<Skills key={skillsList.length} value={skillsList.length}/>))
  }
  const AddProjectsBtnClick=event=>{
    setProjectsList(projectsList.concat(<PersonalProjects key={projectsList.length} value={projectsList.length}/>))
  }
  const AddAchievementsBtnClick=event=>{
    setAchievementsList(achievementsList.concat(<Achievements key={achievementsList.length} value={achievementsList.length}/>))
  }
  const AddLanguageBtnClick=event=>{
    setLanguageList(languageList.concat(<Language key={languageList.length} value={languageList.length}/>))
  }
  const AddInterestBtnClick=event=>{
    setInterestList(interestList.concat(<Interest key={interestList.length} value={interestList.length}/>))
  }


  return (

    <div className='bg-[#313b47]'>
      <div className="flex flex-col items-center justify-center space-y-10 p-80">
        <div id='resume' ref={inputRef} className='container bg-white min-h-[1182px] w-[1182px]'>
          <Header headerData={headerData} onUpdate={handleSocialDataUpdate} />
          {/* Horizontal Line */}
          <hr
            className="mt-12 h-1 w-full dark:bg-[#242b33]"
          />
          {/* Bottom section of container */}
          <div className="container h-4/5 row px-[40px] pt-8 flex justify-between pb-[40px]">
            {/* <!--first col--> */}
            <div className="w-[45%] space-y-12">
              <div>
                <h1 className="text-[28px] font-bold text-black mb-2">
                  WORK EXPERIENCE
                </h1>
                {/* <!--Work Experience--> */}
                {workExpList}
                <div className='closebutton'>
                <button onClick={handleClose} className="p-2">
                  <svg className=" w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Trash">
                    <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" fill="#34a853" className="color000000 svgShape">
                    </path>
                  </svg>
                </button>
                </div>
                <div
                    className="addbutton container text-center mt-2"
                  >
                    <button
                      onClick={onAddWorkExpBtnClick}
                      className="text-white bg-green-500 rounded-full p-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
              </div>

              <div>
                <h1 className="text-[28px] font-bold text-black">
                  EDUCATION
                </h1>
                {/* <!--Education--> */}
                {educationList}
                <div className='closebutton'>
                <button onClick={handleEducationClose} className=" p-2">
                  <svg className=" w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Trash">
                    <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" fill="#34a853" className="color000000 svgShape">
                    </path>
                  </svg>
                </button>
                </div>
                <div
                    className="addbutton container text-center mt-2"
                  >
                    <button
                      onClick={AddEducationBtnClick}
                      className="text-white bg-green-500 rounded-full p-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
              </div>
            </div>

            {/* <!--second col--> */}
            <div className="w-[45%] space-y-12">
              <div>
                {/* <!--Skills--> */}
                <h1
                  className="text-[28px] font-bold text-black pb-2"
                >
                  SKILLS
                </h1>
                <div className='flex flex-wrap'>
                {skillsList}
                </div>
                <div>
                <button onClick={handleSkillClose} className="closebutton p-2">
                  <svg className=" w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Trash">
                    <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" fill="#34a853" className="color000000 svgShape">
                    </path>
                  </svg>
                </button>
                <button
                      onClick={AddSkillsBtnClick}
                      className="addbutton text-white bg-green-500 rounded-full p-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                </button>
                </div>
              </div>
              <div>
                {/* <!--personal Projects--> */}
                <h1
                  className="text-[28px] font-bold text-black pb-2"
                >
                  PERSONAL PROJECTS
                </h1>
                {projectsList}
                <div className='closebutton'>
                <button onClick={handleProjectClose} className=" p-2">
                  <svg className=" w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Trash">
                    <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" fill="#34a853" className="color000000 svgShape">
                    </path>
                  </svg>
                </button>
                </div>
                <div
                    className="addbutton container text-center mt-2"
                  >
                    <button
                      onClick={AddProjectsBtnClick}
                      className="text-white bg-green-500 rounded-full p-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
              </div>
              {/* <!--achievements--> */}
              <div>
                <h1
                  className="text-[28px] font-bold text-black pb-2"
                >
                  ACHIEVEMENTS
                </h1>
                {achievementsList}
                <button onClick={handleAchievementClose} className="closebutton p-2">
                  <svg className=" w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Trash">
                    <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" fill="#34a853" className="color000000 svgShape">
                    </path>
                  </svg>
                </button>
                <div
                    className="addbutton container text-center mt-2"
                  >
                    <button
                      onClick={AddAchievementsBtnClick}
                      className="text-white bg-green-500 rounded-full p-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
              </div>
              {/* <!--Languages--> */}
              <div>
                <h1
                  class="text-[28px] font-bold text-black pb-2"
                >
                  LANGUAGES
                </h1>
                <div className='flex flex-wrap'>
                  {languageList}
                </div>
                <button onClick={handleLanguageClose} className="closebutton p-2">
                  <svg className=" w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Trash">
                    <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" fill="#34a853" className="color000000 svgShape">
                    </path>
                  </svg>
                </button>
                <button
                      onClick={AddLanguageBtnClick}
                      className="addbutton text-white bg-green-500 rounded-full p-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                </button>

              </div>
              {/* <!--INTERESTS--> */}
              <div>
                <h1
                  class="text-[28px] font-bold text-black pb-2"
                >
                  INTERESTS
                </h1>
                <div className='flex flex-wrap'>
                  {interestList}
                </div>
                <button onClick={handleInterestClose} className="closebutton p-2">
                  <svg className=" w-6 h-6 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Trash">
                    <path d="m78.4 30.4-3.1 57.8c-.1 2.1-1.9 3.8-4 3.8H20.7c-2.1 0-3.9-1.7-4-3.8l-3.1-57.8c-.1-2.2 1.6-4.1 3.8-4.2 2.2-.1 4.1 1.6 4.2 3.8l2.9 54h43.1l2.9-54c.1-2.2 2-3.9 4.2-3.8 2.1.1 3.8 2 3.7 4.2zM89 17c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4s1.8-4 4-4h22V4c0-1.9 1.3-3 3.2-3h27.6C61.7 1 63 2.1 63 4v9h22c2.2 0 4 1.8 4 4zm-53-4h20V8H36v5zm1.7 65c2 0 3.5-1.9 3.5-3.8l-1-43.2c0-1.9-1.6-3.5-3.6-3.5-1.9 0-3.5 1.6-3.4 3.6l1 43.3c0 1.9 1.6 3.6 3.5 3.6zm16.5 0c1.9 0 3.5-1.6 3.5-3.5l1-43.2c0-1.9-1.5-3.6-3.4-3.6-2 0-3.5 1.5-3.6 3.4l-1 43.2c-.1 2 1.5 3.7 3.5 3.7-.1 0-.1 0 0 0z" fill="#34a853" className="color000000 svgShape">
                    </path>
                  </svg>
                </button>
                <button
                      onClick={AddInterestBtnClick}
                      className="addbutton text-white bg-green-500 rounded-full p-2"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                </button>
              </div>
            </div>


          </div>
        </div>
        <div className='flex space-x-12'>
        <Navbar/>
        <Preview ref={inputRef}/>
        </div>
      </div>
      
    </div>
  )
}

export default Resume