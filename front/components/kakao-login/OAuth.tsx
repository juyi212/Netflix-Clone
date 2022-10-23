const CLIENT_ID = '53fac96dcc45b034a080250c417a2227';
const REDIRECT_URI = 'http://localhost:3000/user/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
