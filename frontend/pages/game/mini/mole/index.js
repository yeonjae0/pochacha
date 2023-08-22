import { useEffect, useState, useRef } from "react";
import MoleGame from "./MoleGame";

export default function Timer() {

  const [sec, setSec] = useState(0);
  const time = useRef(34);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= -1) {
      clearInterval(timerId.current);
    }
  })
  
  return (
    <div>
      <MoleGame sec={sec} />
    </div>
  )
}
