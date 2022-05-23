import Banner from '@components/Banner';
import useSWR from 'swr';
import Nav from '@components/Nav';
import Carousel from '@components/Carousel';
import React from 'react';
import fetcher from '@utils/fetcher';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate = useNavigate()
    // header에 토큰을 같이 보낸다 
    const { data: userData, error, mutate: revalidateUser } = useSWR('http://3.39.105.32:9000/netflix-clone/user/info', fetcher);

    
    if (!userData) {
        navigate('/login')
    }
    return (
        <div>
            {/* 로그인 여부 확인 후 마이페이지 버튼들 보여주기 */}
            <Banner />
            <Carousel category={"popular_movie"}/>
            {/* <Carousel category={""}/> */}
            {/* <Carousel /> */}
        </div>
    )}

export default Home;