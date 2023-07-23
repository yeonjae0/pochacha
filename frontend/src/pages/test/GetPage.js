import React, { useEffect, useState } from 'react';
import axios from "axios";


function GetPage(){
    
    const [testId, setTestId] = useState(0);
    const [testInfo, setTestInfo] = useState("No Info");

    const BASEURL = "http://52.78.56.80:8080"

    useEffect(()=>{
        axios.get(BASEURL + "/api/get")
        .then((res)=>{
            console.log(res)
            setTestId(res.data[0].id)
            setTestInfo(res.data[0].info)
        })
    }, []);
    
    return(
        <div>
            testId: {testId}
            testInfo: {testInfo}
        </div>
    );
}

export default GetPage;
