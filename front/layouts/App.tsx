import React, { useEffect } from 'react';
import loadable from '@loadable/component'
import OAuthRedirectHandler from '@components/KakaoLogin/OAuthRedirectHandler';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createBrowserHistory } from 'history';
import useSWR from 'swr';
import fetcher from '@utils/userfetcher';
import Nav from '@components/Nav';

const LogIn = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))
const Home = loadable(() => import('@pages/Home'))
const Detail = loadable(() => import('@pages/Detail'))

const App = () => {
    // let location = useLocation();
    // let state = location.state as { backgroundLocation?: Location };

    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes >
                <Route path="/" element={<Navigate replace to="/login" />} ></Route>
                <Route path="/login" element={<LogIn />} ></Route>
                <Route path="/signup" element={<SignUp />} ></Route>
                <Route path="/home" element={<Home /> } >
                <Route path="/home/:id" element = {<Detail />}/></Route>
                <Route path="/user/kakao" element = {<OAuthRedirectHandler />}/>             
            </Routes>
        </BrowserRouter>
    )}

export default App; 