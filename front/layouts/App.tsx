import React from 'react';
import loadable from '@loadable/component'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const LogIn = loadable(() => import('@pages/Login'))
const SignUp = loadable(() => import('@pages/SignUp'))
const Home = loadable(() => import('@pages/Home'))

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} ></Route>
                <Route path="/home" element={<Home />} ></Route>
                <Route path="/login" element={<LogIn />} ></Route>
                <Route path="/signup" element={<SignUp />} ></Route>
                {/* 디테일 페이지 */}
            </Routes>
        </BrowserRouter>
    )}

export default App; 