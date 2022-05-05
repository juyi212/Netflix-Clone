import React, {useState, useCallback} from 'react';
import {FormBody, Body, Container, Header,Label, Form, Input, Button, LinkContainer } from '@pages/Login/styles';
import {Link} from 'react-router-dom'
import useInput from '@hooks/useInput';

const LogIn = () => {
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    
    const onSubmit = useCallback((e:any) => {
        e.preventDafault()
    }, [])

    return (
        <Container>
            <Body>
                <Header>
                    <div>NETFLIX</div>
                </Header>
                <FormBody>
                    <Label>로그인</Label>
                    <Form>
                        <form onSubmit = {onSubmit}>
                            <Input type="email" value={email} onChange = {onChangeEmail} placeholder='이메일 주소'/>
                            <Input type="password" value ={password} onChange = {onChangePassword} placeholder='비밀번호'/>
                            <Button type="submit"> 로그인 </Button>
                        </form>
                        <LinkContainer>
                            Netflix 회원이 아닌가요? &nbsp;
                            <Link to="/signup">회원가입하러 가기</Link>
                        </LinkContainer>
                    </Form>
                </FormBody>
            </Body>
        </Container>

    )}

export default LogIn; 