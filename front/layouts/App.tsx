import React, { createContext, useEffect } from 'react';
import OAuthRedirectHandler from '@components/KakaoLogin/OAuthRedirectHandler';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import User from './User';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<User />}></Route>
        {/* 유저 정보 필요 or 필요없음 */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
