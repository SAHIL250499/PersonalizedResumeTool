import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const Header = () => {
   const [name,setName]=useState('');
   const [title,setTitle]=useState('');
   const [desc,setDesc]=useState('');
  


  
   useEffect(()=>{
      const getHeader=async()=>{
        try{
          const response=await axios.get('http://localhost:3001/users/getHeader',{withCredentials:true});
          console.log(response.data);
          setName(response.data.name);
          setTitle(response.data.title);
          setDesc(response.data.desc);
        }
        catch(err){console.error(err)}
      }

      getHeader();
    
   },[name,title,desc])


   const updateHeaders=async(obj)=>{
    
    try{
      const response=await axios.patch('http://localhost:3001/users/updateHeader',obj,{withCredentials:true
      });
    }
    catch(err){
      console.log(err.message)
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
            <h1 >{name?name:'SAHIL PATIL'}</h1>
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

      {/* <!--social links--> */}
      <div
        onclick="showModal()"
        id="_mainSocialBox"
        className="social-links w-6/12 pt-4"
      >
        {/* <!--Social Media Links--> */}
        <ul className="space-y-1" id="_socialMediaUL">
          <li className="flex space-x-3 justify-end">
            <span className="text-[18px] font-medium text-black">
              social-links ("Click Me")
            </span>
            <div className="icon">
              <svg
                className="h-7 w-7 socialMediaSVGs"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 512 512"
                viewBox="0 0 512 512"
                id="gmail"
              >
                <polygon
                  fill="#020202"
                  points="193 248.9 26 382.6 26 116.4 125.4 195.2"
                ></polygon>
                <polygon
                  fill="#020202"
                  points="122.1 167.1 44.7 105.7 467.3 105.7 389.9 167.1 296.8 240.9 256 272.6 215.2 240.9"
                ></polygon>
                <path
                  fill="#020202"
                  d="M302.8,261.6l180.7,144.7H28.5l180.7-144.7l40.7,31.5c0.2,0.2,0.5,0.3,0.7,0.5c3.3,2.1,7.6,2.1,10.9,0
                  c0.2-0.2,0.5-0.3,0.7-0.5L302.8,261.6z"
                ></path>
                <polygon
                  fill="#020202"
                  points="486 116.4 486 382.6 319 248.9 386.6 195.2"
                ></polygon>
                <path
                  fill="none"
                  d="M483.5,406.3H28.5l180.7-144.7l40.7,31.5c0.2,0.2,0.5,0.3,0.7,0.5c3.3,2.1,7.6,2.1,10.9,0
                  c0.2-0.2,0.5-0.3,0.7-0.5l40.7-31.5L483.5,406.3z"
                ></path>
                <polygon
                  fill="none"
                  points="486 116.4 486 382.6 319 248.9 386.6 195.2"
                ></polygon>
                <polygon
                  fill="none"
                  points="193 248.9 26 382.6 26 116.4 125.4 195.2"
                ></polygon>
                <polygon
                  fill="none"
                  points="467.3 105.7 389.9 167.1 296.8 240.9 256 272.6 215.2 240.9 122.1 167.1 44.7 105.7"
                ></polygon>
              </svg>
            </div>
          </li>
          <li className="flex space-x-3 justify-end">
            <span className="text-[18px] font-medium text-black">
              social-links ("Click Me")
            </span>
            <div className="icon">
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <path
                  d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"
                />
              </svg>
            </div>
          </li>
          <li className="flex space-x-3 justify-end">
            <span className="text-[18px] font-medium text-black">
              social-links ("Click Me")
            </span>
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="currentColor"
                style={{ color: "#333" }}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </div>
          </li>
          <li className="flex space-x-3 justify-end">
            <span className="text-[18px] font-medium text-black">
              social-links ("Click Me")
            </span>
            <div className="icon">
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 32 32"
                viewBox="0 0 32 32"
              >
                <path
                  d="M16,0.5C7.45313,0.5,0.5,7.45313,0.5,16S7.45313,31.5,16,31.5S31.5,24.54688,31.5,16S24.54688,0.5,16,0.5z M22.65283,19.12671c0.08575-1.03137,0.13281-2.07898,0.13281-3.12671s-0.04706-2.09534-0.13281-3.12671C26.47046,13.70447,28.5,15.13007,28.5,16S26.47046,18.29553,22.65283,19.12671z M16,28.5c-0.86993,0-2.29553-2.02954-3.12671-5.84717c1.03137,0.08575,2.07898,0.13281,3.12671,0.13281s2.09534-0.04706,3.12671-0.13281C18.29553,26.47046,16.86993,28.5,16,28.5z M16,19.78564c-1.30023,0-2.49451-0.07013-3.60168-0.18396C12.28448,18.49451,12.21436,17.30023,12.21436,16s0.07013-2.49451,0.18396-3.60168c1.10718-0.11383,2.30145-0.18396,3.60168-0.18396s2.49451,0.07013,3.60168,0.18396c0.11383,1.10718,0.18396,2.30145,0.18396,3.60168s-0.07013,2.49451-0.18396,3.60168C18.49451,19.71552,17.30023,19.78564,16,19.78564z M3.5,16c0-0.86993,2.02954-2.29553,5.84717-3.12671C9.26141,13.90466,9.21436,14.95227,9.21436,16s0.04706,2.09534,0.13281,3.12671C5.52954,18.29553,3.5,16.86993,3.5,16z M16,3.5c0.86993,0,2.29553,2.02954,3.12671,5.84717C18.09534,9.26141,17.04773,9.21436,16,9.21436s-2.09534,0.04706-3.12671,0.13281C13.70447,5.52954,15.13007,3.5,16,3.5z M27.59399,11.35126c-1.50153-0.70978-3.34314-1.24121-5.34674-1.59851c-0.3573-2.0036-0.88873-3.84521-1.59851-5.34674C23.80518,5.67633,26.32367,8.19482,27.59399,11.35126z M11.35126,4.40607c-0.70978,1.50153-1.24121,3.34314-1.59851,5.34668c-2.00354,0.3573-3.84515,0.88861-5.34668,1.59845C5.67639,8.19476,8.19489,5.67639,11.35126,4.40607z M4.40613,20.6488c1.50153,0.70984,3.34308,1.24115,5.34662,1.59845c0.3573,2.00354,0.88861,3.84509,1.59845,5.34662C8.19489,26.32355,5.67645,23.80511,4.40613,20.6488z M20.6488,27.59393c0.70984-1.50153,1.24115-3.34314,1.59845-5.34668c2.00354-0.3573,3.84515-0.88873,5.34668-1.59851C26.32361,23.80511,23.80524,26.32361,20.6488,27.59393z"
                ></path>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header