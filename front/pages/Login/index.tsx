import React, {useState, useCallback} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import useInput from '@hooks/useInput';
import axios from 'axios';
import Nav from '@components/Nav';
import {BsFacebook} from 'react-icons/bs'
import {GrInstagram} from 'react-icons/gr'
import KakaoLogin from '@components/KakaoLogin';
import useSWR from 'swr';
import fetcher from '@utils/userfetcher';
import './style.scss'


const LogIn = () => {
    // 유저데이터 있을 경우, login, signup 페이지 진입 불가 코드 넣기 
    const headerValue = localStorage.getItem("user");
    const { data: userData, error, mutate }  = useSWR('http://3.39.105.32:9000/netflix-clone/user/info' ,fetcher, {
        revalidateOnMount:true
    });
    const navigate = useNavigate()
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    
    const onSubmit = useCallback((e:any) => {
        e.preventDefault()
        if( email && password) {
            axios.post(
              'http://3.39.105.32:9000/netflix-clone/user/login',
              { 
                  "uId":email, 
                  "uPassword":password 
                },
              {
                withCredentials: true,
              },
            )
            .then((res) => {
                localStorage.setItem("user", res.data["auth-token"])
                navigate('/home')
            })
            .catch((error) => {
                console.log(error)
            });
        }
    }, [email, password])

    const onClickKakaoLogin = () => {

    }

    if (!error && userData) {
        return <Navigate replace to="/home" />
    }

    return (
        <div className="container" style={{backgroundImage: `url(/assets/netflix-background.jpeg)`}}>
            <div className="body">
                <Nav />
                <div className="formbody">
                    <div className="form">
                        <h1 className="label">로그인</h1>
                        <form onSubmit = {onSubmit}>
                            <input className="inputform" type="email" value={email} onChange = {onChangeEmail} placeholder='이메일 주소'/>
                            <input className="inputform" type="password" value ={password} onChange = {onChangePassword} placeholder='비밀번호'/>
                            <button className="buttonform" type="submit"> 로그인 </button>
                        </form>
                        <KakaoLogin />
                        <p className="link-container">
                            Netflix 회원이 아닌가요? &nbsp;
                            <Link to="/signup">회원가입하러 가기</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="footer">
                    <div>
                    <h4>질문이 있으신가요? </h4>
                    <div>- 문의 이메일 : dea8307@gmail.com<br/>
                    - 깃헙주소 : https://github.com/juyi212/Netflix-Clone
                    </div>
                    <div className="community">
                        <h4>넷플릭스 관련 커뮤니티</h4>
                        <div>
                            <BsFacebook size="24"/> &nbsp;&nbsp;
                            <GrInstagram size="24"/>
                        </div>
                    </div>
            </div>
            </div>
        </div>

    )}

export default LogIn; 