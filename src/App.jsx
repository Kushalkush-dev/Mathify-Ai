import { MantineProvider } from "@mantine/core";
import Home from "./pages/Home";
import React, { use, useEffect, useState } from 'react'
import { MathJax, MathJaxContext } from "better-react-mathjax";


const mathJaxConfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
};

const App = () => {



  return (

<MantineProvider>
      <MathJaxContext version={3} config={mathJaxConfig}>
        <Home />
      </MathJaxContext>
    </MantineProvider>
   
  );
}
export default App;