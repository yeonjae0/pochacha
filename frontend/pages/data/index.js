import React from 'react';
// import dynamic from 'next/dynamic';
import ThreeBoard from './ThreeBoard';

// const DynamicThreeBoard = dynamic(() => import('./ThreeBoard'), {
//   ssr: false,
// });

export default function Home() {
  
  const pin = 2

  return (
    <div>
      <ThreeBoard pin={pin} />
      {/* <DynamicThreeBoard /> */}
    </div>
  );
}