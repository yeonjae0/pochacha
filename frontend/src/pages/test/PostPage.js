import React, { useEffect, useState } from 'react';
import axios from "axios";

function PostPage(){
    
    // const [testId, setTestId] = useState(0);
    const [info, setInfo] = useState("No Info");
    const BASEURL = "https://ohogame.shop:8443"

    const pressButton = (param) => {
        axios.post(BASEURL + "/api/post", JSON.stringify({info: param}), {
		headers: { "Content-Type": `application/json`}
            }).then((res)=>console.log(res))
    }
    
    const updateInfo = (event) => {
        setInfo(event.target.value)
    }

    return(
        <div>
            testInfo: <input value={info} onChange={updateInfo}></input>
            <button onClick={()=>pressButton(info)}>저장</button>
        </div>
    );
}

export default PostPage;
