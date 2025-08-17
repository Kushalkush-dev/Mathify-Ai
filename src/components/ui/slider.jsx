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
      />
    </Box>
  );
}
