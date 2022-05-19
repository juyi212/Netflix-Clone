import React, { useEffect } from 'react';
import loadable from '@loadable/component'
import OAuthRedirectHandler from '@components/KakaoLogin/OAuthRedirectHandler';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createBrowserHistory } from 'history';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const LogIn = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))
const Home = loadable(() => import('@pages/Home'))

const App = () => {
    // const headerValue = localStorage.getItem("user");
    // const { data: userData, mutate: revalidateUser } = useSWR(['http://3.39.105.32:9000/netflix-clone/user/info', headerValue], fetcher);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} ></Route>
                <Route path="/home" element={<Home /> } ></Route>
                <Route path="/login" element={<LogIn />} ></Route>
                <Route path="/signup" element={<SignUp />} ></Route>
                <Route path="/user/kakao" element = {<OAuthRedirectHandler />}/>             
                {/* 디테일 페이지 */}
            </Routes>
        </BrowserRouter>
    )}

export default App; 