import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



export default function DiscreteSlider({brushvalue,slidervalue}) {
  return (
    <Box sx={{ height: '30vh' }}>
      <Slider
        orientation='vertical'
        aria-label="brushsize"
        value={brushvalue}
        onChange={slidervalue}
        defaultValue={brushvalue}
        getAriaValueText={(value) => `${value}`}
        valueLabelDisplay="auto"
        shiftStep={1}
        step={1}
        marks
        min={1}
        max={10}
       sx={{
          "& .MuiSlider-track": {
            backgroundColor: "#1976d2", // professional blue
            border: "none",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#e0e0e0", // light gray rail
            opacity: 1,
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "#fff",
            border: "2px solid #1976d2",
            width: 18,
            height: 18,
            "&:hover": {
              boxShadow: "0 0 6px rgba(25,118,210,0.4)", // soft glow
            },
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#1976d2",
            color: "#fff",
            borderRadius: "6px",
            fontSize: "0.75rem",
          },
        }}
      />
    </Box>
  );
}
