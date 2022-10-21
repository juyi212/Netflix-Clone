import React, { useState, useCallback, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useInput from '@hooks/useInput';
import axios from 'axios';
import KakaoLogin from '@components/KakaoLogin';
import useSWR from 'swr';
import fetcher from '@utils/userfetcher';
import { Body, Button, Container, Form, FormBody, Input, Label, LinkContainer } from './styles';
import { UserContext } from '@layouts/User';
import Footer from '@components/Footer';

const LogIn = React.memo(() => {
  const headerValue = localStorage.getItem('user');
  const {
    data: userData,
    error,
    mutate,
  } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info`, fetcher, {
    revalidateOnMount: true,
  });
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const context = useContext(UserContext);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (email && password) {
        axios
          .post(
            `${process.env.REACT_APP_SERVICE_PORT}/user/login`,
            {
              uId: email,
              uPassword: password,
            },
            {
              withCredentials: true,
            },
          )
          .then((res) => {
            localStorage.setItem('user', res.data['auth-token']);
            context.mutateUsers();
            navigate('/home');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    [email, password],
  );

  if (!error && userData) {
    return <Navigate replace to="/home" />;
  }

  return (
    <Container style={{ backgroundImage: `url(/assets/netflix-background.jpeg)` }}>
      <Body>
        <FormBody>
          <Form>
            <Label>로그인</Label>
            <form onSubmit={onSubmit}>
              <Input type="email" value={email} onChange={onChangeEmail} placeholder="이메일 주소" />
              <Input type="password" value={password} onChange={onChangePassword} placeholder="비밀번호" />
              <Button type="submit"> 로그인 </Button>
            </form>
            <KakaoLogin />
            <LinkContainer>
              Netflix 회원이 아닌가요? &nbsp;
              <Link to="/signup">회원가입하러 가기</Link>
            </LinkContainer>
          </Form>
        </FormBody>
      </Body>
      <Footer />
    </Container>
  );
});

export default LogIn;
