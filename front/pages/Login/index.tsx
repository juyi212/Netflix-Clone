import React, {useState, useCallback, useContext} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import useInput from '@hooks/useInput';
import axios from 'axios';
import {BsFacebook} from 'react-icons/bs'
import {GrInstagram} from 'react-icons/gr'
import KakaoLogin from '@components/KakaoLogin';
import useSWR from 'swr';
import fetcher from '@utils/userfetcher';
import { Body, Button, Container, Footer, Form, FormBody, Input, Label, LinkContainer } from './styles';
import { UserContext } from '@layouts/User';


const LogIn = React.memo(() => {
    // 유저데이터 있을 경우, login, signup 페이지 진입 불가 코드 넣기 
    const headerValue = localStorage.getItem("user");
    const { data: userData, error, mutate }  = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info` ,fetcher, {
        revalidateOnMount:true
    });
    const navigate = useNavigate()
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    const context = useContext(UserContext)
    
    const onSubmit = useCallback((e:any) => {
        e.preventDefault()
        if( email && password) {
            axios.post(
              `${process.env.REACT_APP_SERVICE_PORT}/user/login`,
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
                context.mutateUsers()
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
        <Container style={{backgroundImage: `url(/assets/netflix-background.jpeg)`}}>
            <Body>
                <FormBody>
                    <Form>
                        <Label>로그인</Label>
                        <form onSubmit = {onSubmit}>
                            <Input className="inputform" type="email" value={email} onChange = {onChangeEmail} placeholder='이메일 주소'/>
                            <Input className="inputform" type="password" value ={password} onChange = {onChangePassword} placeholder='비밀번호'/>
                            <Button className="buttonform" type="submit"> 로그인 </Button>
                        </form>
                        <KakaoLogin />
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

    )})

export default LogIn; 