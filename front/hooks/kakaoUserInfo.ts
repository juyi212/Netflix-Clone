import axios from "axios";
import { FC } from "react";

declare global {
    interface Window {
        Kakao: any;
    }
  }
  

const kakaoUserInfo = async (access_token? : string): Promise<[]> => {
    
    let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
    console.log(data)
    // axios.get("https://kapi.kakao.com/v2/user/me", 
    // {
    //     headers: {
    //     'Authorization': `Bearer ${access_token}`,
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //     }
    // }).then((res) => {
    //     console.log(res.data)
    // }).catch((err) => {
    //     console.log(err)
    // })
    return []
}

export default kakaoUserInfo;