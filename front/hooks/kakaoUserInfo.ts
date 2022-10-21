import axios from 'axios';
import { FC } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const kakaoUserInfo = async (access_token?: string): Promise<[]> => {
  let data = await window.Kakao.API.request({
    url: '/v2/user/me',
  });
  return [];
};

export default kakaoUserInfo;
