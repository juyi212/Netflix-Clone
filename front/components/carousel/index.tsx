import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import Card from '@components/card';
import { Container, StyledSlider, MovieDetailContainer } from './styles';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { UserContext } from '@layouts/User';

const settings = {
  slide: 'div',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    // 반응형 웹 구현 옵션
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 6,
      },
    },
  ],
};
interface ContentProps {
  from: string;
  category?: string;
  genre_id?: string;
  country?: string;
  header: string;
}

function useCategorySWR(category?: string, genre_id?: string, country?: string, userNo?: string) {
  return useSWR(() => {
    if (category === 'popular_movie') {
      return `${process.env.REACT_APP_SERVICE_PORT}/movie/${category}?userNo=${userNo}`;
    } else if (category === 'category_movie') {
      return `${process.env.REACT_APP_SERVICE_PORT}/movie/category_movie?genreId=${genre_id}&userNo=${userNo}`;
    } else {
      return `${process.env.REACT_APP_SERVICE_PORT}/movie/country_movie?oriCountry=${country}&userNo=${userNo}`;
    }
  }, fetcher);
}

const Carousel = React.memo(({ from, category, genre_id, country, header }: PropsWithChildren<ContentProps>) => {
  const context = useContext(UserContext);
  const userNo = context?.userData.user.uNo;
  const { data: movieData, error, mutate } = useCategorySWR(category, genre_id, country, userNo);

  return (
    <Container>
      <h1> {header} </h1>
      <StyledSlider {...settings}>
        {movieData?.map((movie: Object, index: string) => {
          return <Card from={from} movie={movie} uId={userNo} mutate={mutate} key={index} />;
        })}
      </StyledSlider>
    </Container>
  );
});

export default Carousel;
