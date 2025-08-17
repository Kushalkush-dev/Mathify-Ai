import React, { useEffect, useRef, useState } from 'react';

import Colors from '../assets/brushColors.js'

import { ColorSwatch, Group } from '@mantine/core';
import '@mantine/core/styles.css';

import { Button } from '@/components/ui/button';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import DiscreteSlider from '@/components/ui/slider.jsx';



const Home =() => {

  const canvasRef = useRef(null)

  const [isdrawing, setisdrawing] = useState(false);
  const [reset, setreset] = useState(false)
  const [brushcolor, setbrushcolor] = useState("white")
  const [solution, setsolution] = useState("")
  const [brushsize, setbrushsize] = useState(2)





  useEffect(()=>{
    if(reset){
      clearCanvas()
      setreset(false)
    }
    
  },[reset])

useEffect(()=>{
  console.log(solution);
  
},[solution])


  useEffect(()=>{
    const canvas = canvasRef.current;
    if(canvas){
      canvas.style.background="black"
      const ctx = canvas.getContext('2d');
      if(ctx){
       const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.lineCap='round';
        ctx.lineWidth=brushsize
       
      }
    }
  },[])


useEffect(()=>{
  const canvas=canvasRef.current;
  if(canvas){
    const ctx=canvas.getContext('2d');
    if(ctx){
      ctx.lineWidth=brushsize
    }
  }
},[brushsize])


  const startDrawing = (e)=>{
    e.preventDefault()

    const canvas=canvasRef.current;
    if(canvas){
      canvas.style.background='black';
      const ctx = canvas.getContext('2d');
      if(ctx){
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX-rect.left, e.clientY-rect.top);
        setisdrawing(true);
      }

    }

  }


  const stopDrawing = (e) => {
     e.preventDefault();
    setisdrawing(false);
  }

  const draw = (e) => {
    e.preventDefault()
    if(!isdrawing) return;
    const canvas = canvasRef.current;
    if(canvas){
      const ctx=canvas.getContext('2d');
      if(ctx){
        const rect = canvas.getBoundingClientRect();
        ctx.strokeStyle=brushcolor;
        ctx.lineTo(e.clientX-rect.left, e.clientY-rect.top);
        ctx.stroke();

      }
    }
  }

const Calculate= async ()=>{
  const canvas=canvasRef.current
  if(canvas){
    const ctx=canvas.getContext('2d')
    if(ctx){
      const img=canvas.toDataURL("image/png")

      try {

        const response=await fetch("http://localhost:7700/matify/resolve",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: img }),
      })
      const data=await response.json()
      console.log(data.answer);
      setsolution(data.answer)
      
      
        
      } catch (error) {
        console.log("Unable to fetch from api",error);
        
        
      }
    
      
    }
  }
}


const sliderChange=(event,newvalue)=>{

  setbrushsize(newvalue)



}

  const eraser = ()=>{
  setbrushcolor('black')
  }

  const clearCanvas=()=>{
    const canvas=canvasRef.current;
    if(canvas){
      const ctx=canvas.getContext('2d')
      if(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        setsolution("")
      }
    }
  }






// Helper to get touch position relative to canvas
const getTouchPos = (canvas, touch) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
};

// Start drawing on touch
const startDrawingTouch = (e) => {
  e.preventDefault();
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const touch = e.touches[0];
  const pos = getTouchPos(canvas, touch);

  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  setisdrawing(true);
};

// Draw on touch move
const drawTouch = (e) => {
  e.preventDefault();
  if (!isdrawing) return;
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const touch = e.touches[0];
  const pos = getTouchPos(canvas, touch);

  ctx.strokeStyle = brushcolor;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
};

// Stop drawing on touch end
const stopDrawingTouch = (e) => {
  e.preventDefault();
  setisdrawing(false);
};




  return(
  <>
  <div>
    <div className='flex justify-around gap-5 items-center bg-black'>

    <div>
    <button onClick={()=>{
      setreset(true)
    }} className="relative active:scale-90 inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-800 to-red-600 group-hover:from-red-500 group-hover:to-red-600 hover:text-white dark:text-white focus:outline-none">
    <span className="relative font-sans font-semibold px-[14vw] py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
    Reset
    </span>
    </button>


    </div>

    <div>
        <button onClick={eraser} className='hover:opacity-80 active:scale-90'>
        <img src="eraser-Icon.png" alt="eraserlogo" width={"48px"} />
        </button>

    </div>

   <div>
      <Group className='' wrap=''>
       {Colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            style={{ border: '2px solid gray', cursor: 'pointer' }}
            onClick={() => setbrushcolor(color)}
          />
      ))}
    </Group>

   </div>
    
    <div>
   <button onClick={Calculate} className="relative active:scale-90 inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white  focus:outline-none ">
    <span className="relative font-semibold font-sans px-[14vw] py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
    Calculate
    </span>
  </button>

    </div>
    
    


  </div>

  <div className='bg-black absolute left-[3vw] top-[30vh]'>
      <DiscreteSlider brushvalue={brushsize} slidervalue={sliderChange}/>
  </div>

    
  

    <div className='w-full max-h-screen justify-between items-center'>
      <canvas ref={canvasRef} id='canvas' className='w-full min-h-screen overflow-hidden'
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawingTouch}
            onTouchMove={drawTouch}
            onTouchEnd={stopDrawingTouch}></canvas>
    </div>

    {solution && (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 
                bg-gray-700 text-white text-xl px-4 py-2 
                rounded-lg shadow-lg z-50">
                  
      <MathJax>
        {solution}
      </MathJax>
    </div>)}
    
    


  </div>

  
  </>    
  );


}



export default Home;