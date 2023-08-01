"use client"

import React from 'react'
import Router, { useRouter } from 'next/navigation'
import './../css/first.css'
import Link from 'next/link'

export default function RoomLnpink(props) {

  let obj = props.obj
  let router = useRouter()

  return (   
    <Link
      href={{
        pathname: `/room/${obj.roomId}`,
        query: {
            detailData: JSON.stringify(obj),
        },
        pathname: `/room/${obj.roomId}`, // 라우팅 id
        query: { currentName: JSON.stringify(obj) }, // props
      }}>
      {/* as={`/room/${roomId}`}> */}
      <button id='startBtn'>START</button>
      {/* <button id='startBtn' onClick={()=>{ obj={obj}; router.push(`/room/${obj.roomId}`) }}>START</button> */}
    </Link>
  )
}
