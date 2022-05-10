import React, {useState, useCallback} from 'react';
import {Footer, FormBody, Body, Container,Label, Form, Input, Button, LinkContainer } from '@pages/Login/styles';
import {Link} from 'react-router-dom'
import useInput from '@hooks/useInput';
import axios from 'axios';
import Nav from '@components/Nav';
import {BsFacebook} from 'react-icons/bs'
import {GrInstagram} from 'react-icons/gr'


const LogIn = () => {
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    
    const onSubmit = useCallback((e:any) => {
        e.preventDafault()
        if( email && password) {
            axios
            .post(
              '/api/users/login',
              { email, password },
              {
                withCredentials: true,
              },
            )
            .then(() => {
              //mutate()
            })
            .catch((error) => {
              //setLogInError(error.response?.data?.code === 401);
            });
        }
    }, [])

    return (
        <Container>
            <Body>
                <Nav />
                <FormBody>
                    <Form>
                        <Label>로그인</Label>
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

export default LogIn; 