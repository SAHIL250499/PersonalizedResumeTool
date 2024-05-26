import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import SocialLinks from './SocialLinks';
import ModalSocialLinks from './ModalSocialLinks';

const Header = () => {
   const [name,setName]=useState('');
   const [title,setTitle]=useState('');
   const [desc,setDesc]=useState('');
   const [showComponent,setShowComponent]=useState(false);
   const [socData,setSocData]=useState({});
   const [formState, setFormState] = useState({
    emailCheckbox: false,
    linkedInCheckbox: false,
    githubCheckbox: false,
    personalWebCheckbox: false,
    email: '',
    linkedIn: '',
    github: '',
    personalWebsite: ''});

  const axiosPrivate = useAxiosPrivate();
  
   useEffect(()=>{
      getHeader();
   },[])

   const getHeader=async()=>{
    try{
      const response=await axiosPrivate.get('/users/getHeader');
      if(response.data){
      setName(response.data.name);
      setTitle(response.data.title);
      setDesc(response.data.desc);
      if(response.data.socialLink){
        setSocData(response.data.socialLink);
      }
      }
    
    }
    catch(err){
      console.error(err);
    }
  }

  

   const updateHeaders=async(obj)=>{
    
    try{
      const response=await axiosPrivate.patch('/users/updateHeader',obj);
    }
    catch(err){
      console.log(err.message);
    }
  };


 
  const handleNameChange = (event) => {
    const newContent = event.target.textContent;
    updateHeaders({'name':newContent})
  };

  const handleTitleChange = (event) => {
    const newContent = event.target.textContent;
    updateHeaders({'title':newContent})
  };
  const handleDescChange = (event) => {
    const newContent = event.target.textContent;
    updateHeaders({'desc':newContent})
  };

  const handleSocialLinks = ()=>{
      return setShowComponent(false);
  }
   

  return (
    <div className="container h-1/5 px-[40px] pt-14 flex">
      <div className="Name_Title_Desc w-6/12 top-0">
        <div>          
          <div onInput={handleNameChange}
        onBlur={handleNameChange}
            contentEditable='true'
            id="name"
            className={`text-[46px] text-[#313c4e] border-b-2 outline-none focus:border-green-500`}
          >
            <h1 >{name?name:'YOUR NAME'}</h1>
          </div>
          <div
            value={title}
            onInput={handleTitleChange}
            onBlur={handleTitleChange}
            contentEditable='true'
            className="text-[24px] text-[#449399] border-b-2 outline-none focus:border-green-500"
          >
            {title?title:'WEB DEVELOPER'}
          </div>
        </div>

        <div
          value={desc}
          onInput={handleDescChange}
          onBlur={handleDescChange}
          contentEditable="true"
          id="Description"
          className="text-[18px] text-black border-b-2 outline-none focus:border-green-500"
        >
          {desc?desc:'Software Developer who is passionate about Web Development'}
        </div>
      </div>
      <div
        id="_mainSocialBox"
        className="social-links w-6/12 pt-4"
      >
        <SocialLinks socData={socData} getHeader={getHeader}/>
        {!showComponent?
        (<div className='flex justify-end pt-3'>
          <button onClick={()=>setShowComponent(true)}
                      className="addbutton text-white bg-green-500 rounded-full p-2"> 
                      Edit Social Link
            </button>
          </div>)
        :(<ModalSocialLinks getHeader={getHeader} socData={socData} formState={formState} setFormState={setFormState} closeModal={handleSocialLinks}/>)}
        </div>
        
    </div>
  )
}

export default Header