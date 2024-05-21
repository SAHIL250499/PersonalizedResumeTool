import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

const PersonalProjects = ({value,projectdata}) => {

  const [projectname,setProjectName]=useState('');
  const [projects,setProjects]=useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(()=>{
    if(projectdata){
      const{projectname,projects}=projectdata;
      console.log(projectdata);
      setProjectName(projectname);
      setProjects(projects);
    }


  },[projectdata,projectname,projects])


  const updateProject=async(obj)=>{
    try{
      const response=await axiosPrivate.patch(`/users/projectid/${value}/updateProject`,obj);
    }
    catch(err){
      console.log(err.message);
    }
  };


  const handleProjectName=(e)=>{
    const newContent = e.target.textContent;
    updateProject({'projectname':newContent});
  }

  const handleProjectList=(e)=>{
    const list=[];
    const newContent = e.target;
    const allLis=newContent.getElementsByTagName('li')
    for(let l=0;l<allLis.length;l++){
      list.push(allLis[l].textContent)
    }
    updateProject({'projects':list});
  }



  return (
    <>
                  <ul id="_personalProjects" className="Work Experience space-y-2">
                    <li>
                      <h1  onInput={handleProjectName}
                          onBlur={handleProjectName}
                      contenteditable="true" className="text-[20px] text-black border-b-2 outline-none focus:border-green-500 ">
                        {projectname?projectname:'Project Name'}
                      </h1>
                    </li>
                    <li>
                      {/* <!--list of projects--> */}
                      <div className="list of projects">
                        <ul 
                         onInput={handleProjectList}
                         onBlur={handleProjectList}
                          contenteditable="true"
                          className="TaskList list-disc list-inside marker:text-[#449399] border-b-2 outline-none focus:border-green-500 "
                        >

                          {projects.length?(
                              projects.map((proj)=>(
                                <li>
                                  {proj}
                                </li>
                              ))
                          ):(
                             <li>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                             </li>
                           
                          )}
                          
                        </ul>
                      </div>
                    </li>
                  </ul>
                  
                </>
  )
}

export default PersonalProjects