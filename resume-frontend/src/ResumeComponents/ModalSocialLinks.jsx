import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ModalSocialLinks = ({closeModal,formState,setFormState,socData,getHeader}) => {
   const axiosPrivate=useAxiosPrivate();
   
   useEffect(()=>{
      if(socData){
        setFormState(socData);
      }
   },[])

    const handleChange = (event) => {
      const {name,value} = event.target;
        setFormState((prevState)=>{
          const newState = {
            ...prevState,
            [name]: value
          };
          if (name === 'email') {
            newState.emailCheckbox = value.trim() !== '';
          } else if (name === 'linkedIn') {
            newState.linkedInCheckbox = value.trim() !== '';
          } else if (name === 'github') {
            newState.githubCheckbox = value.trim() !== '';
          } else if (name === 'personalWebsite') {
            newState.personalWebCheckbox = value.trim() !== '';
          }
    
          return newState;
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateSocialData();
        closeModal();
      };
    
    const updateSocialData=async ()=>{
        try{
        const response = await axiosPrivate.patch('/users/updateSocials',formState);
        await getHeader();
        }
        catch(err){
          console.error(err);
        }
    }
      

    const discardFunc = () => {
      // setFormState({
      //   emailCheckbox: false,
      //   linkedInCheckbox: false,
      //   githubCheckbox: false,
      //   personalWebCheckbox: false,
      //   email: '',
      //   linkedIn: '',
      //   github: '',
      //   personalWebsite: ''});
      closeModal();
    }

    useEffect(()=>{
        document.body.style.overflowY="hidden";

        return()=>{
            document.body.style.overflowY="scroll";
        };
    },[]);


  return ReactDOM.createPortal(
    <>
    <div className="modal-wrapper shadow-2xl bg-gray-500/50 fixed left-0 right-0 bottom-0 top-0 " onClick={closeModal}></div>
    <form onSubmit={handleSubmit}>
        <div className='modal-container bg-white rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] min-w-[40%] min-h-[30%]'>
            
          <div className="flex p-8 gap-4 justify-center items-center">
            <div className="firstColSocialLink flex-1 space-y-6">
              <div className="flex items-center pl-4 space-x-2">
                <input
                  id="emailCheckbox"
                  type="checkbox"
                  name="emailCheckbox"
                  className="socialCheckbox w-4 h-4 accent-green-500"
                  checked={formState.emailCheckbox}
                  disabled
                />

                <svg
                  class="h-7 w-7 socialMediaSVGs"
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
                <input
                  className="w-full py-4 pl-2 border rounded-xl outline-none focus:border-green-500 focus:placeholder-green-500"
                  placeholder="Email Address"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div class="flex items-center pl-4 space-x-2">
                <input
                  id="linkedInCheckbox"
                  type="checkbox"
                  name="linkedInCheckbox"
                  className="socialCheckbox w-4 h-4 accent-green-500"
                  checked={formState.linkedInCheckbox}
                  disabled
                />

                <svg
                  class="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                >
                  <path
                    d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"
                  />
                </svg>
                <input
                  class="w-full py-4 pl-2 border rounded-xl outline-none focus:border-green-500 focus:placeholder-green-500"
                  placeholder="LinkedIn Profile Link"
                  name="linkedIn"
                  value={formState.linkedIn}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="secondColSocialLink flex-1 space-y-6">
              <div class="flex items-center pl-4 space-x-2">
                <input
                  id="githubCheckbox"
                  type="checkbox"
                  name="githubCheckbox"
                  className="socialCheckbox w-4 h-4 accent-green-500"
                  checked={formState.githubCheckbox}
                  disabled
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
                  fill="currentColor"
                  style={{color: "#333"}}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                <input
                  class="w-full py-4 pl-2 border rounded-xl outline-none focus:border-green-500 focus:placeholder-green-500"
                  placeholder="Github Profile Link"
                  name='github'
                  value={formState.github}
                  onChange={handleChange}
                />
              </div>
              <div class="flex items-center pl-4 space-x-2">
                <input
                  id="personalWebCheckbox"
                  type="checkbox"
                  name="personalWebCheckbox"
                  checked={formState.personalWebCheckbox}
                  className="socialCheckbox w-4 h-4 accent-green-500"
                  disabled
                />
                <svg
                  class="h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 32 32"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M16,0.5C7.45313,0.5,0.5,7.45313,0.5,16S7.45313,31.5,16,31.5S31.5,24.54688,31.5,16S24.54688,0.5,16,0.5z M22.65283,19.12671c0.08575-1.03137,0.13281-2.07898,0.13281-3.12671s-0.04706-2.09534-0.13281-3.12671C26.47046,13.70447,28.5,15.13007,28.5,16S26.47046,18.29553,22.65283,19.12671z M16,28.5c-0.86993,0-2.29553-2.02954-3.12671-5.84717c1.03137,0.08575,2.07898,0.13281,3.12671,0.13281s2.09534-0.04706,3.12671-0.13281C18.29553,26.47046,16.86993,28.5,16,28.5z M16,19.78564c-1.30023,0-2.49451-0.07013-3.60168-0.18396C12.28448,18.49451,12.21436,17.30023,12.21436,16s0.07013-2.49451,0.18396-3.60168c1.10718-0.11383,2.30145-0.18396,3.60168-0.18396s2.49451,0.07013,3.60168,0.18396c0.11383,1.10718,0.18396,2.30145,0.18396,3.60168s-0.07013,2.49451-0.18396,3.60168C18.49451,19.71552,17.30023,19.78564,16,19.78564z M3.5,16c0-0.86993,2.02954-2.29553,5.84717-3.12671C9.26141,13.90466,9.21436,14.95227,9.21436,16s0.04706,2.09534,0.13281,3.12671C5.52954,18.29553,3.5,16.86993,3.5,16z M16,3.5c0.86993,0,2.29553,2.02954,3.12671,5.84717C18.09534,9.26141,17.04773,9.21436,16,9.21436s-2.09534,0.04706-3.12671,0.13281C13.70447,5.52954,15.13007,3.5,16,3.5z M27.59399,11.35126c-1.50153-0.70978-3.34314-1.24121-5.34674-1.59851c-0.3573-2.0036-0.88873-3.84521-1.59851-5.34674C23.80518,5.67633,26.32367,8.19482,27.59399,11.35126z M11.35126,4.40607c-0.70978,1.50153-1.24121,3.34314-1.59851,5.34668c-2.00354,0.3573-3.84515,0.88861-5.34668,1.59845C5.67639,8.19476,8.19489,5.67639,11.35126,4.40607z M4.40613,20.6488c1.50153,0.70984,3.34308,1.24115,5.34662,1.59845c0.3573,2.00354,0.88861,3.84509,1.59845,5.34662C8.19489,26.32355,5.67645,23.80511,4.40613,20.6488z M20.6488,27.59393c0.70984-1.50153,1.24115-3.34314,1.59845-5.34668c2.00354-0.3573,3.84515-0.88873,5.34668-1.59851C26.32361,23.80511,23.80524,26.32361,20.6488,27.59393z"
                  ></path>
                </svg>
                <input
                  class="w-full py-4 pl-2 border rounded-xl outline-none focus:border-green-500 focus:placeholder-green-500"
                  placeholder="Personal Website Link"
                  name='personalWebsite'
                  value={formState.personalWebsite}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div class="ModalHeader flex space-x-20 justify-center">
            <button
              onClick={discardFunc}
              class="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
            >
              Discard
            </button>
            <input
              type='submit'
              value="Save"
              className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            />
          </div>
          </div>
    </form>
        
    </>,document.querySelector(".myPortalModalDiv")
  )
}

export default ModalSocialLinks