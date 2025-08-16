import React, { useEffect, useRef, useState } from 'react';

import Colors from '../assets/brushColors.js'

import { ColorSwatch, Group } from '@mantine/core';
import '@mantine/core/styles.css';

import { Button } from '@/components/ui/button';
import { MathJax, MathJaxContext } from 'better-react-mathjax';



const Home =() => {

  const canvasRef = useRef(null)

  const [isdrawing, setisdrawing] = useState(false);
  const [reset, setreset] = useState(false)
  const [brushcolor, setbrushcolor] = useState("white")
  const [solution, setsolution] = useState('')





  useEffect(()=>{
    if(reset){
      clearCanvas()
      setreset(false)
    }
    
  },[reset])




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
        ctx.lineWidth=3
       
      }
    }
  },[])

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



  const eraser = ()=>{
  setbrushcolor('black')
  }

  const clearCanvas=()=>{
    const canvas=canvasRef.current;
    if(canvas){
      const ctx=canvas.getContext('2d')
      if(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height)
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
    <div className='flex justify-evenly bg-black'>
    <Button onClick={()=>{
      setreset(true)
    }}
    className="bg-black text-white"
    variant="default"
    color="black"
    >Reset</Button>
    

    <button onClick={eraser} className='bg-blue-400 px-3 text-white'>
      Eraser
    </button>
    <Group className=''>
       {Colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            style={{ border: '2px solid white', cursor: 'pointer' }}
            onClick={() => setbrushcolor(color)}
          />
      ))}
    </Group>

    <Button
    className="bg-black text-white"
    variant="default"
    color="black"
    onClick={()=>{Calculate()}}
    >Calculate</Button>
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

    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 
                bg-red-400 text-white text-xl px-4 py-2 
                rounded-lg shadow-lg z-50">
  hello
</div>


  </div>

  
  </>    
  );


}



export default Home;