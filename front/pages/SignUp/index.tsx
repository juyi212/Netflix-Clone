import React, { useState, useCallback } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import useInput from '@hooks/useInput';
import axios from 'axios';
import Nav from '@components/Nav';
import {BsFacebook} from 'react-icons/bs'
import {GrInstagram} from 'react-icons/gr'
import '../Login/style.scss'
import fetcher from '@utils/userfetcher';
import useSWR from 'swr';

const SignUp = () => {
    // 유저데이터 있을 경우, login, signup 페이지 진입 불가 코드 넣기 
    const { data: userData, error, mutate }  = useSWR('http://3.39.105.32:9000/netflix-clone/user/info' ,fetcher );
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [mismatchError, setMismatchError] = useState(false);
    const [emailMessage, setEmailMessage] = useState<string>('')

    const [email, setEmail] = useState('');
    const [name, onChangeName] = useInput('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const onChangeEmail = useCallback((e: any) => {
        const emailRegex =  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setEmail(e.target.value)
        if (!emailRegex.test(e.target.value)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요.')
        } else {
            setEmailMessage('')
        }
    }, [])
    
    const onChangePassword = useCallback((e: any) => {
        setPassword(e.target.value)
        setMismatchError(passwordCheck !== e.target.value)
    }, [passwordCheck, setPassword])

    const onChangePasswordCheck = useCallback((e: any) => {
        setPasswordCheck(e.target.value)
        setMismatchError(password !== e.target.value)
    }, [password, setPasswordCheck])

    const onSubmit = useCallback((e: any) => {
        e.preventDefault()
        if (email && name ) {
            console.log("???")
            axios.post('http://3.39.105.32:9000/netflix-clone/user/join', {
                "uId": email,
                "uName" :name,
                "uPassword":password
            }).then(() => {
                alert("회원가입되었습니다! 로그인해주세요.")
                navigate('/login')
            }).catch((error) => {
                console.log(error)
            })
        }
    },[email, name, password, mismatchError])

    if (userData) {
        return <Navigate replace to="/home" />
    }

    return (
        <div className="container" style={{backgroundImage: `url(/assets/netflix-background.jpeg)`}}>
            <div className="body">
            <Nav />
            <div className="formbody">
                <div className="form">
                    <h1 className="label">회원가입</h1>
                    <form onSubmit={onSubmit}>
                        <input className="inputform" type="email" value={email} onChange = {onChangeEmail} placeholder='이메일 주소'/>
                        { emailMessage && <div className="error">{emailMessage}</div>}
                        <input className="inputform" type="text" value={name} onChange = {onChangeName} placeholder='닉네임'/>
                        <input className="inputform" type="password" value={password} onChange= {onChangePassword} placeholder='비밀번호'/>
                        <input className="inputform" type="password" value= {passwordCheck} onChange= {onChangePasswordCheck} placeholder='비밀번호 확인'/>
                        { mismatchError && <div className="error">비밀번호가 일치하지 않습니다.</div> }
                        {/* { !nickname && <Error>닉네임을 입력해주세요.</Error> } */}
                        { signUpError && <div className="error">이미 가입된 이메일입니다.</div>}
                        {/* {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>} */}
                        <button className="buttonform" type="submit"> 회원가입 </button>
                    </form>
                    <p className="link-container">
                        이미 회원이신가요?&nbsp;
                        <Link to="/login">로그인 하러가기</Link>
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

export default SignUp; 

