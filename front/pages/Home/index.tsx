import Banner from '@components/Banner';
import useSWR from 'swr';
import Carousel from '@components/Carousel';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import userfetcher from '@utils/userfetcher';


const Home = React.memo(() => {
    // header에 토큰을 같이 보낸다 
    const { data: userData, error, mutate: revalidateUser } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info`, userfetcher);
    const [pageNum, setPageNum] = useState(1);
    // const [showDetailPage, setShowDetailPage] = useState(false);
    let location = useLocation();
    let state = location.state as { backgroundLocation?: Location };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight &&  pageNum < 3) {
            // 페이지 끝에 도달하면 추가 데이터를 받아온다
            setPageNum(pageNum + 1);
        }
    }

    useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    if (pageNum > 2) {
        // scroll event listener 해제
        window.removeEventListener("scroll", handleScroll);
        }
    return () => {
        window.removeEventListener("scroll", handleScroll);
        };
    }, [pageNum]);


    if (!userData) {
        return <Navigate replace to="/login" />
    }
    return (
        <div>
            <Outlet /> 
            <Banner />                
            {pageNum > 0 && 
                <>
                    {/* <Carousel category={"popular_movie"} genre_id={undefined} onChangeDetailPageshow = {onChangeDetailPageshow}/> */}
                    <Carousel header = {"지금 뜨고 컨텐츠 "} category={"popular_movie"} genre_id={"878"}  />
                </>
            }
            {pageNum > 1 && 
            <>
                <Carousel header = {"달달한 로맨스"} category={"category_movie"} genre_id={"10749"} />
                <Carousel header = {"SF 모여라"} category={"category_movie"} genre_id={"878"} />
            </>}
            {pageNum > 2 && 
            <>
                <Carousel header = {"힐링의 음악 컨텐츠"} category={"category_movie"} genre_id={"18"}/>
                <Carousel header = {"빠질 수 없는 아메리카"} category={"_"} genre_id={"18"} country = {"미국"} />
            </>}
            
        </div>
    )})

export default Home;