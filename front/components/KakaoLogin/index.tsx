import React from 'react';
import { KAKAO_AUTH_URL } from './OAuth';

const KakaoLogin = () => {
  return (
    <a href={KAKAO_AUTH_URL}>
      <img src="/assets/kakao_login.png" style={{ width: '100%' }} />
    </a>
  );
};

export default KakaoLogin;
