import React, {useEffect} from 'react';
import axios from 'axios';

const OAuthRedirectHandler = () => {
        useEffect(()=> {
            let code = new URL(window.location.href).searchParams.get("code");
            let grant_type = "authorization_code";
            let client_id = "53fac96dcc45b034a080250c417a2227";
            axios.post(`https://kauth.kakao.com/oauth/token?
            grant_type=${grant_type}
            &client_id=${client_id}
            &redirect_uri=http://localhost:3000/oauth/callback/kakao
            &code=${code}`
            , {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error)
                })
            }, [])
    return (
        <div>
            로딩중..
        </div>
    )
}

export default  OAuthRedirectHandler;