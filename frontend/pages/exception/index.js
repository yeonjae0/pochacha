'use client'

import { useRouter } from 'next/router';

export default function Exception(props) {
    const router = useRouter();
    const errorMsg = router.query.msg;
    return(
        <div style={{margin:"20px"}}>
            <h1>죄송합니다!</h1>
            <br />
            <h3>😅 {errorMsg}</h3>
        </div>
    );
}