import React, { forwardRef, useState } from 'react'
import html2pdf from 'html2pdf.js';

const Preview = forwardRef((props,ref) => {
  
  const [loader,setLoader]=useState(false);

  const downloadPDF=async ()=>{
    // setLoader(true);
    setLoader(true);
    const capture=ref.current;  
    document.querySelectorAll(".border-b-2").forEach((i)=>{
      i.classList.add("removeborder");
      i.classList.remove("border-b-2");
    });
    document.querySelectorAll(".closebutton").forEach((i)=>{
      i.classList.add("hidden");
    })

    document.querySelectorAll(".addbutton").forEach((i)=>{
      i.classList.add("hidden");
    })

    const rect=capture.getBoundingClientRect();

    let opt = {
      margin: 0,
      filename: "Demopdf.pdf",
      image: { type: "jpeg" ,quality:0.98},
      html2canvas: {scale:2,width:rect.width,height:rect.height},
      jsPDF: { unit: "in",format:[rect.height/96,rect.width/96], orientation: "portrait" },
    };
    await html2pdf().set(opt).from(capture).toContainer().toCanvas().toImg().toPdf().save();
    
    

    document.querySelectorAll(".removeborder").forEach((i)=>{
      i.classList.add("border-b-2");
      i.classList.remove("removeborder");
    });

    document.querySelectorAll(".closebutton").forEach((i)=>{
      i.classList.remove("hidden");
    })

    document.querySelectorAll(".addbutton").forEach((i)=>{
      i.classList.remove("hidden");
    })

    setLoader(false);
    
  }

  return (
    <div>
    <nav>
    <div>
        <div>
          <button onClick={downloadPDF} disabled={!(loader===false)} class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">
            Download</button>
        </div>
    </div>
     </nav>
    </div>
  )
})

export default Preview