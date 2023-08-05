'use client'
import React from "react";
import { useSelector } from "react-redux";

function OtherPage() {
  const fruits = useSelector(state => state.fruit.fruits);

  return (
    <div>
      <h2>Fruit List</h2>
      {fruits}
    </div>
  );
}

export default OtherPage;