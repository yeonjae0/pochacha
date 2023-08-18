import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { useEffect } from "react";
import EnterPage from './enter';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <div>
      <EnterPage/>
    </div>
  )
}
