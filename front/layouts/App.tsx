import React, { createContext, useEffect } from 'react';
import OAuthRedirectHandler from '@components/KakaoLogin/OAuthRedirectHandler';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import User from './User';


const App = () => {
    return (
        <BrowserRouter>
            <Routes >
                {/* <Route path="/cs-center" element={<CSCenter />}></Route> */}
                <Route path="/*" element={<User />}></Route>
            </Routes>
        </BrowserRouter>
    )}

export default App; 