import React, { useEffect, useRef, useState } from 'react';

import Colors from '../assets/brushColors.js'

import { ColorSwatch, Group } from '@mantine/core';
import '@mantine/core/styles.css';

import { Button } from '@/components/ui/button';



const Home =() => {

  const canvasRef = useRef(null)

  const [isdrawing, setisdrawing] = useState(false);
  const [reset, setreset] = useState(false)
  const [brushcolor, setbrushcolor] = useState("white")


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


  const stopDrawing = () => {
    setisdrawing(false);
  }

  const draw = (e) => {
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


  const clearCanvas=()=>{
    const canvas=canvasRef.current;
    if(canvas){
      const ctx=canvas.getContext('2d')
      if(ctx){
        ctx.clearRect(0,0,canvas.width,canvas.height)
      }
    }
  }




  return(
  <>

  <div className='grid grid-cols-3 gap-2 bg-black'>
    <Button onClick={()=>{
      setreset(true)
    }}
    className="bg-black text-white"
    variant="default"
    color="black"
    >Reset</Button>
    
    <Group className='z-50'>
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
    >Calculate</Button>
  </div>

    <div className='w-full h-screen justify-between items-center'>
      <canvas ref={canvasRef} id='canvas' className='w-full min-h-screen'
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}></canvas>
    </div>
  </>    
  );


}



export default Home;