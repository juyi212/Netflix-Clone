import React, { useState, useCallback } from 'react';
import { Footer, Body, Error, FormBody, Container,Label, Form, Input, Button, LinkContainer } from '@pages/Login/styles';
import {Link} from 'react-router-dom'
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Route, Navigate } from "react-router-dom";
import Nav from '@components/Nav';
import {BsFacebook} from 'react-icons/bs'
import {GrInstagram} from 'react-icons/gr'

const SignUp = () => {
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
                setTimeout(() => {
                    <Route path="/" element={<Navigate replace to="/login"/>} />
                }, 2000)
            }).catch((error) => {
                console.log(error)
            })
        }
    },[email, name, password, mismatchError])

    return (
        <Container>
            <Body>
            <Nav />
            <FormBody>
                <Form>
                    <Label>회원가입</Label>
                    <form onSubmit={onSubmit}>
                        <Input type="email" value={email} onChange = {onChangeEmail} placeholder='이메일 주소'/>
                        { emailMessage && <Error>{emailMessage}</Error>}
                        <Input type="text" value={name} onChange = {onChangeName} placeholder='닉네임'/>
                        <Input type="password" value={password} onChange= {onChangePassword} placeholder='비밀번호'/>
                        <Input type="password" value= {passwordCheck} onChange= {onChangePasswordCheck} placeholder='비밀번호 확인'/>
                        { mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error> }
                        {/* { !nickname && <Error>닉네임을 입력해주세요.</Error> } */}
                        { signUpError && <Error>이미 가입된 이메일입니다.</Error>}
                        {/* {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>} */}
                        <Button type="submit"> 회원가입 </Button>
                    </form>
                    <LinkContainer>
                        이미 회원이신가요?&nbsp;
                        <Link to="/login">로그인 하러가기</Link>
                    </LinkContainer>
                </Form>
            </FormBody>
            </Body>
            <Footer>
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
            </Footer>
    </Container>
    )}

export default SignUp; 