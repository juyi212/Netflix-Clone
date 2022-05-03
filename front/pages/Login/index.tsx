import React, {useState} from 'react';
import {LoginBody, Container, Header, Form, Input, Button, LinkContainer } from '@pages/Login/styles';
import {Link} from 'react-router-dom'

const LogIn = () => {
    return (
            <LoginBody>
                <Container>
                    <Header>로그인</Header>
                    <Form>
                        <form>
                            <Input type="email" id="email" placeholder='이메일 주소'/>
                            <Input type="password" id="password" placeholder='비밀번호'/>
                            <Button type="submit"> 로그인 </Button>
                        </form>
                        <LinkContainer>
                            Netflix 회원이 아닌가요? &nbsp;
                            <Link to="/login">지금 가입하세요.</Link>
                        </LinkContainer>
                    </Form>
                </Container>
            </LoginBody>

    )}

export default LogIn; 