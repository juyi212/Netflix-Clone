import React, {useEffect} from 'react';
import axios from 'axios';
import kakaoUserInfo from '@hooks/kakaoUserInfo';
import { useNavigate } from 'react-router-dom';

const OAuthRedirectHandler = () => {
    const navigate = useNavigate()
        useEffect(()=> {
            let code = new URL(window.location.href).searchParams.get("code");
            axios.post('http://3.39.105.32:9000/netflix-clone/user/auth/kakao/callback', code)
            .then((res) => {
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