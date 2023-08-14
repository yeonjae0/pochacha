import { useEffect, useState, useRef } from "react"
import MoleGame from "./MoleGame";

export default function Timer() {

  // const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const time = useRef(34);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      // setMin(parseInt(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= -1) {
      console.log('시간 초과')
      clearInterval(timerId.current);
    }
  })
  
  return (
    <div>
    {/* <div style={{ backgroundColor: '#9DE551', height: '100vh' }}> */}
      <MoleGame sec={sec} />
    </div>
  )
}
