import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import SocialLinks from './SocialLinks';
import ModalSocialLinks from './ModalSocialLinks';
import debounce from 'lodash.debounce';

const Header = ({headerData,onUpdate}) => {
   const [showComponent,setShowComponent]=useState(false);
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

    // Debounced API call for performance
  const updateHeadersDebounced = debounce(async (obj) => {
    try {
      await axiosPrivate.patch('/users/updateHeader', obj);
      console.log('Header updated:', obj);
    } catch (err) {
      console.error('Failed to update header:', err.message);
    }
  }, 300);

  const handleInputChange = (field) => (event) => {
    const newContent = event.target.textContent;
    updateHeadersDebounced({ [field]: newContent });
  };

  const handleSocialLinks = ()=>{
      return setShowComponent(false);
  }
   

  return (
    <div className="container h-1/5 px-[40px] pt-14 flex">
      {/* Left Section: Name, Title, Description */}
      <div className="Name_Title_Desc w-6/12 top-0">
        <div>
          {/* Name */}
          <div
            onInput={handleInputChange('name')}
            onBlur={handleInputChange('name')}
            contentEditable="true"
            id="name"
            className="text-[46px] text-[#313c4e] border-b-2 outline-none focus:border-green-500"
          >
            <h1>{headerData?.name || 'YOUR NAME'}</h1>
          </div>

          {/* Title */}
          <div
            onInput={handleInputChange('title')}
            onBlur={handleInputChange('title')}
            contentEditable="true"
            className="text-[24px] text-[#449399] border-b-2 outline-none focus:border-green-500"
          >
            {headerData?.title || 'WEB DEVELOPER'}
          </div>
        </div>

        {/* Description */}
        <div
          onInput={handleInputChange('desc')}
          onBlur={handleInputChange('desc')}
          contentEditable="true"
          id="Description"
          className="text-[18px] text-black border-b-2 outline-none focus:border-green-500"
        >
          {headerData?.desc || 'Software Developer who is passionate about Web Development'}
        </div>
      </div>

      {/* Right Section: Social Links */}
      <div id="_mainSocialBox" className="social-links w-6/12 pt-4">
        <SocialLinks socData={headerData?.socialLink || {}} getHeader={() => {}} />
        {!showComponent ? (
          <div className="flex justify-end pt-3">
            <button
              onClick={() => setShowComponent(true)}
              className="addbutton text-white bg-green-500 rounded-full p-2"
            >
              Edit Social Link
            </button>
          </div>
        ) : (
          <ModalSocialLinks
            getHeader={() => {}}
            socData={headerData?.socialLink || {}}
            formState={formState}
            setFormState={setFormState}
            closeModal={handleSocialLinks}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default Header