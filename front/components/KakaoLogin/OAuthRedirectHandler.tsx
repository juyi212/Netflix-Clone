import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    axios
      .post(`${process.env.REACT_APP_SERVICE_PORT}/user/auth/kakao/callback`, code)
      .then((res) => {
        localStorage.setItem('user', res.data['auth-token']);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div>로딩중..</div>;
};

export default OAuthRedirectHandler;
