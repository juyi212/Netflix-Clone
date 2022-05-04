import React, {useState} from 'react';
import {Body, Container, Header,Label, Form, Input, Button, LinkContainer } from '@pages/Login/styles';
import {Link} from 'react-router-dom'

const LogIn = () => {
    return (
            <Body>
                <Header>NETFLIX</Header>
                <Container>
                    <Label>로그인</Label>
                    <Form>
                        <form>
                            <Input type="email" id="email" placeholder='이메일 주소'/>
                            <Input type="password" id="password" placeholder='비밀번호'/>
                            <Button type="submit"> 로그인 </Button>
                        </form>
                        <LinkContainer>
                            Netflix 회원이 아닌가요? &nbsp;
                            <Link to="/signup">회원가입하러 가기</Link>
                        </LinkContainer>
                    </Form>
                </Container>
            </Body>

    )}

export default LogIn; 