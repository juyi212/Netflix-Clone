import React, {useEffect} from 'react';
import axios from 'axios';
import kakaoUserInfo from '@hooks/kakaoUserInfo';
import { useNavigate } from 'react-router-dom';

const OAuthRedirectHandler = () => {
    const navigate = useNavigate()
        useEffect(()=> {
            let code = new URL(window.location.href).searchParams.get("code");
            let grant_type = "authorization_code";
            let client_id = "53fac96dcc45b034a080250c417a2227";
            // let data: any = {
            //     grant_type: "authorization_code",
            //     client_id: client_id,
            //     redirect_uri: "http://localhost:3000/user/kakao",
            //     code: code,
            // }
            // const queryString = Object.keys(data)
            //     .map((k:any)=> encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            //     .join('&');

            axios.post('http://3.39.105.32:9000/netflix-clone/user/auth/kakao/callback', code)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("user", res.data["auth-token"])
                navigate('/home')
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