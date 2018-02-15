import React from 'react';

// Draw a very simple Power on/off switch as an icon
export default ({height, width}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 21" preserveAspectRatio="xMidYMid meet">
      <path d="M17.164,1.476l-2.373,2.438c1.398,1.218,2.285,3.01,2.285,5.01c0,3.667-2.973,6.64-6.64,6.64
        c-3.667,0-6.641-2.973-6.641-6.64c0-2,0.886-3.792,2.284-5.01L3.637,1.537c-2.033,1.849-3.31,4.516-3.31,7.48
        c0,5.583,4.525,10.108,10.108,10.108s10.108-4.525,10.108-10.108C20.543,6.019,19.237,3.327,17.164,1.476z"
      />
      <rect x="8.935" y="0.544" width="3.001" height="10.575"/>
    </svg>
  );
};