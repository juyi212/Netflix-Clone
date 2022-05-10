import Banner from '@components/Banner';
import Nav from '@components/Nav';
import React from 'react';

const Home = () => {
    return (
        <div>
            {/* 로그인 여부 확인 후 마이페이지 버튼들 보여주기 */}
            <Nav />
            <Banner />
        </div>
    )}

export default Home;