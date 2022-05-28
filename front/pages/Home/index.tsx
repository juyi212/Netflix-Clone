import Banner from '@components/Banner';
import useSWR from 'swr';
import Nav from '@components/Nav';
import Carousel from '@components/Carousel';
import React, { useCallback, useEffect, useState } from 'react';
import fetcher from '@utils/fetcher';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Detail from '@pages/Detail';
import { DetailContainer } from '@pages/Detail/styles';



const Home = () => {
    // header에 토큰을 같이 보낸다 
    const { data: userData, error, mutate: revalidateUser } = useSWR('http://3.39.105.32:9000/netflix-clone/user/info', fetcher);

    const [pageNum, setPageNum] = useState(1);
    const [showDetailPage, setShowDetailPage] = useState(false)
    
    function handleScroll () {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight &&  pageNum < 3) {
            // 페이지 끝에 도달하면 추가 데이터를 받아온다
            setPageNum(pageNum + 1);
        }
    };

       useEffect(() => {
        // scroll event listener 등록
        window.addEventListener("scroll", handleScroll);
        if (pageNum > 2) {
            return () => {
                // scroll event listener 해제
                window.removeEventListener("scroll", handleScroll);
                };
            }
        return () => {
            window.removeEventListener("scroll", handleScroll);
            };
        }, [pageNum]);
    
    const onOpenDetail = useCallback(() => {
        // e.stopPropagation()
        setShowDetailPage((prev) => !prev)
    }, [showDetailPage])

    const onCloseDetail = useCallback(() => {
        setShowDetailPage(false)
    }, [])


    // if (!userData) {
    //     return <Navigate replace to="/login" />
    // }
    return (
        <div>
            {/* 로그인 여부 확인 후 마이페이지 버튼들 보여주기 */}
            <Banner />
            {pageNum > 0 && 
                <>
                    {/* <Carousel category={"popular_movie"} genre_id={undefined} /> */}
                    <Carousel category={"popular_movie"} genre_id={undefined} onOpenDetail = {onOpenDetail}/>
                    {/* <Carousel category={"popular_movie"} genre_id={undefined} onOpenDetail = {onOpenDetail}/> */}
                    {/* <Detail show ={showDetailPage} onCloseDetail = {onCloseDetail}></Detail> */}
                    {showDetailPage && (
                        <Routes>
                            <Route path="/:id" element={<Detail />} />
                        </Routes>
                        )
                     }
                </>
            }
            {pageNum > 1 && <>
                {/* <Carousel category={"popular_movie"} genre_id={undefined}/>
                <Carousel category={"popular_movie"} genre_id={undefined}/>
                <Carousel category={"popular_movie"} genre_id={undefined}/> */}
            </>}
            {pageNum > 2 && <>
                {/* <Carousel category={"popular_movie"} genre_id={undefined}/>
                <Carousel category={"popular_movie"} genre_id={undefined}/>
                <Carousel category={"popular_movie"} genre_id={undefined}/> */}
            </>}

        </div>
    )}

export default Home;