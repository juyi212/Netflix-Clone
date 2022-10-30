declare global {
  interface Window {
    Kakao: any;
  }
}

const kakaoUserInfo = async () => {
  let data = await window.Kakao.API.request({
    url: '/v2/user/me',
  });
  return [];
};

export default kakaoUserInfo;
