import React, { useEffect, useState } from 'react';
import axios from "axios";
import https from "https";

function GetPage(){
    
    const [testId, setTestId] = useState(0);
    const [testInfo, setTestInfo] = useState("No Info");

    const BASEURL = "https://43.201.150.143:8443"

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    useEffect(()=>{
        axios.get(BASEURL + "/api/get", { httpsAgent: agent})
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
