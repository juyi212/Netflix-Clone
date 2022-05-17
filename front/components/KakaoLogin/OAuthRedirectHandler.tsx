import React, {useEffect} from 'react';
import axios from 'axios';
import kakaoUserInfo from '@hooks/kakaoUserInfo';

const OAuthRedirectHandler = () => {
        useEffect(()=> {
            let code = new URL(window.location.href).searchParams.get("code");
            let grant_type = "authorization_code";
            let client_id = "53fac96dcc45b034a080250c417a2227";
            let data: any = {
                grant_type: "authorization_code",
                client_id: client_id,
                redirect_uri: "http://localhost:3000/user/kakao",
                code: code,
            }
            const queryString = Object.keys(data)
                .map((k:any)=> encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                .join('&');

            axios.post('https://kauth.kakao.com/oauth/token', queryString, {
                headers: {
                  'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then((res) => {
                
                //kakaoUserInfo(res.data.access_token)
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