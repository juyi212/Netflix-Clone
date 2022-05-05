import React, { useState, useCallback } from 'react';
import {Body, Error, FormBody, Container, Header,Label, Form, Input, Button, LinkContainer } from '@pages/Login/styles';
import {Link} from 'react-router-dom'
import useInput from '@hooks/useInput';
import axios from 'axios';
import { Route, Navigate } from "react-router-dom";

const SignUp = () => {
    const [signUpError, setSignUpError] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const [mismatchError, setMismatchError] = useState(false);
    const [emailMessage, setEmailMessage] = useState<string>('')

    const [email, setEmail] = useState('');
    const [nickname, onChangeNickname] = useInput('');
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
        if (email && nickname && !mismatchError) {
            axios.post('/api/users', {
                email,
                nickname,
                password
            }).then(() => {
                alert("회원가입되었습니다! 로그인해주세요.")
                setTimeout(() => {
                    <Route path="/" element={<Navigate replace to="/login"/>} />
                }, 2000)
            }).catch(() => {
                alert("이미 가입된 이메일 입니다.")
            })
        }
    },[])

    return (
        <Container>
            <Body>
            <Header>
                <div>NETFLIX</div>
            </Header>
            <FormBody>
                <Label>회원가입</Label>
                <Form>
                    <form onSubmit={onSubmit}>
                        <Input type="email" value={email} onChange = {onChangeEmail} placeholder='이메일 주소'/>
                        { emailMessage && <Error>{emailMessage}</Error>}
                        <Input type="text" value={nickname} onChange = {onChangeNickname} placeholder='닉네임'/>
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
    </Container>
    )}

export default SignUp; 