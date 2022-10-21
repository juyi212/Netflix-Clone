import Banner from '@components/Banner';
import useSWR from 'swr';
import Carousel from '@components/Carousel';
import React, { createContext, useCallback, useEffect, useState } from 'react';

import { Link, Navigate, Outlet } from 'react-router-dom';
import userfetcher from '@utils/userfetcher';

const Home = React.memo(() => {
  const {
    data: userData,
    error,
    mutate: revalidateUser,
  } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info`, userfetcher);
  const [pageNum, setPageNum] = useState(1);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && pageNum < 3) {
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (pageNum > 2) {
      window.removeEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNum]);

  if (!userData) {
    return <Navigate replace to="/login" />;
  }
  return (
    <div>
      <Outlet />
      <Banner />
      {pageNum > 0 && (
        <>
          {/* <Carousel category={"popular_movie"} genre_id={undefined} onChangeDetailPageshow = {onChangeDetailPageshow}/> */}
          <Carousel from={'/home'} header={'지금 뜨고 컨텐츠 '} category={'popular_movie'} genre_id={'878'} />
        </>
      )}
      {pageNum > 1 && (
        <>
          <Carousel from={'/home'} header={'달달한 로맨스'} category={'category_movie'} genre_id={'10749'} />
          <Carousel from={'/home'} header={'SF 모여라'} category={'category_movie'} genre_id={'878'} />
        </>
      )}
      {pageNum > 2 && (
        <>
          <Carousel from={'/home'} header={'힐링의 음악 컨텐츠'} category={'category_movie'} genre_id={'18'} />
          <Carousel from={'/home'} header={'빠질 수 없는 아메리카'} category={'_'} genre_id={'18'} country={'미국'} />
        </>
      )}
    </div>
  );
});

export default Home;
