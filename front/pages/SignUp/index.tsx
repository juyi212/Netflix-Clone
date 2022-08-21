import React, { useState, useCallback } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import useInput from '@hooks/useInput';
import axios from 'axios';
import {BsFacebook} from 'react-icons/bs'
import {GrInstagram} from 'react-icons/gr'
// import '../Login/style.scss'
import fetcher from '@utils/userfetcher';
import useSWR from 'swr';
import { Body, Button, Container, Form, FormBody, Input, LinkContainer, Error } from '@pages/Login/styles';
import Footer from '@components/Footer';

const SignUp = () => {
    // 유저데이터 있을 경우, login, signup 페이지 진입 불가 코드 넣기 
    const { data: userData, error, mutate }  = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info` ,fetcher );
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [mismatchError, setMismatchError] = useState(false);
    const [emailMessage, setEmailMessage] = useState<string>('')

    const [email, setEmail] = useState('');
    const [name, onChangeName] = useInput('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const onChangeEmail = (e: any) => {
        const emailRegex =  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setEmail(e.target.value)
        if (!emailRegex.test(e.target.value)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요.')
        } else {
            setEmailMessage('')
        }
    }
    
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
            axios.post(`${process.env.REACT_APP_SERVICE_PORT}/user/join`, {
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
        <Container style={{backgroundImage: `url(/assets/netflix-background.jpeg)`}}>
            <Body>
            <FormBody>
                <Form>
                    <h1 className="label">회원가입</h1>
                    <form onSubmit={onSubmit}>
                        <Input  type="email" value={email} onChange = {onChangeEmail} placeholder='이메일 주소'/>
                        { emailMessage && <Error>{emailMessage}</Error>}
                        <Input type="text" value={name} onChange = {onChangeName} placeholder='닉네임'/>
                        <Input type="password" value={password} onChange= {onChangePassword} placeholder='비밀번호'/>
                        <Input type="password" value= {passwordCheck} onChange= {onChangePasswordCheck} placeholder='비밀번호 확인'/>
                        { mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error> }
                        { signUpError && <div className="error">이미 가입된 이메일입니다.</div>}
                        <Button type="submit"> 회원가입 </Button>
                    </form>
                    <LinkContainer>
                        이미 회원이신가요?&nbsp;
                        <Link to="/login">로그인 하러가기</Link>
                    </LinkContainer>
                </Form>
            </FormBody>
            </Body>
            {/* <Footer>
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
            </Footer> */}
            <Footer />
    </Container>
    )}

export default SignUp; 

