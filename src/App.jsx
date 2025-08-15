import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import React, { use, useEffect, useState } from 'react'




const App = () => {



  return (

  <MantineProvider>
     <Home/>
  </MantineProvider>
   
  );
}
export default App;