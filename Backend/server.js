import express from 'express'
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
const app=express();
dotenv.config()

app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
app.get("/",(req,res)=>{
  res.send("Running")
})

app.post("/matify/resolve",async (req,res)=>{
  try {
  const {image}=req.body
  if(!image) return res.status(400).json({error:"no image provided"})

    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData:{
          mimeType:"image/png",
          data: image.split(",")[1]
        }
      },
      {text:"You are a math solver. Read the handwritten problem and return ONLY the original equation with solution in LaTeX format, no explanations, no extra words."}
    ],
  });
 res.json({
  answer:response.text
 })



    
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"Something went wrong"})
    
    
  }
 
  
})



app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port : http://localhost:${process.env.PORT}`);
  
})