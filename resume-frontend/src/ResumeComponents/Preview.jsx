import React, { forwardRef, useRef, useState } from 'react'
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {useReactToPrint} from 'react-to-print';
import Resume from '../Resume';

const Preview = forwardRef((props,ref) => {
  
  const [loader,setLoader]=useState(false);

  

  // const handlePrint=useReactToPrint({
  //   content:()=>ref.current
  // })

  const downloadPDF=async ()=>{
    // setLoader(true);
    const capture=ref.current;  
    const input=ref.current;
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
    
    html2canvas(capture).then((canvas)=>{
      const imgData=canvas.toDataURL('img/png');
      const doc=new html2pdf();
      doc.addImage(imgData,'PNG',0,0);
      // setLoader(false);
      doc.save('person_resume.pdf');
    })
    const rect=capture.getBoundingClientRect();
    console.log(rect);

    // let opt = {
    //   margin: 0,
    //   filename: "Demopdf.pdf",
    //   image: { type: "png" },
    //   html2canvas: { quality: 2, useCORS: true,scale:1, scrollY: 0 },
    //   jsPDF: { unit: "in",format:[11.7,12], orientation: "portrait" },
    // };
    // await html2pdf().set(opt).from(capture).toImg().save();

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