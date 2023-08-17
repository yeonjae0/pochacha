"use client";

// 여기서 연습한다!
import { useDispatch, useSelector } from "react-redux";
// import { makeFruitList } from "@/store/reducers/fruit";
import { makeFruitList } from "../../store/reducers/fruit";
import React, { useState } from "react";

const addFruitList = () => {
  let [text, setText] = useState("");
  let inputChange = (e) => {
    setText(e.target.value);
  };
  const dispatch = useDispatch();

  const fruitCheck = useSelector((state) => state.fruit);
  const fruitList = useSelector((state) => state.fruit.fruits);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      updateFruitList();
    }
  };

  const updateFruitList = () => {
    let tmpList = [fruitList];
    tmpList.push(text);
    console.log(tmpList);

    dispatch(makeFruitList(tmpList));
    // console.log('fruitList', fruitList)
    // console.log('***' + fruitCheck)
  };
  return (
    <>
      <h1>과일 입력</h1>
      <input type="text" value={text} onChange={inputChange} onKeyDown={handleKeyDown} />
      <button onClick={updateFruitList}>입력</button>
    </>
  );
};

export default addFruitList;

//  이게 원래 코드당
// export default function Mole() {
//   return (
//     <div>
//       <h1>두더지게임</h1>
//     </div>
//   )
// }
