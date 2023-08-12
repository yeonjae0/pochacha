import React from 'react';
import dynamic from 'next/dynamic';

const DynamicThreeBoard = dynamic(() => import('./ThreeBoard'), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <DynamicThreeBoard />
    </div>
  );
}