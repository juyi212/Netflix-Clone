import React, { PropsWithChildren, useEffect, useState } from 'react';
import Card from '@components/Card';
import { Container, StyledSlider, MovieDetailContainer } from './styles';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';



const settings = {
    slide: 'div',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [ // 반응형 웹 구현 옵션
    { 
        breakpoint: 960, //화면 사이즈 768px
        settings: {	
            //위에 옵션이 디폴트 , 여기에 추가하면 그걸로 변경
            slidesToShow: 6
        } 
    }
]
}
interface ContentProps {
    from ? : string ;
    category?: string;
    genre_id? : string;
    country? : string;
    header: string;
  }
  


function useCategorySWR (category? : string, genre_id? : string, country?: string) {
    return useSWR(() => {
        if (category === "popular_movie") {
            return `${process.env.REACT_APP_SERVICE_PORT}/movie/${category}`
        } else if (category === "category_movie") {
            return `${process.env.REACT_APP_SERVICE_PORT}/movie/category_movie?genreId=${genre_id}`
        } else {
            return `${process.env.REACT_APP_SERVICE_PORT}/movie/country_movie?oriCountry=${country}`
        }
    }, fetcher)
}

const Carousel = React.memo(({ from, category, genre_id, country, header }: PropsWithChildren<ContentProps>)  => {
    const {data: movieData, error, mutate} = useCategorySWR(category, genre_id, country);
    
    return (
        <Container>
            <h1> {header} </h1>
            <StyledSlider {...settings}>
                {movieData?.map((movie: Object, index: string) => {
                    return (
                        <Card 
                            from = {from}
                            movie = {movie}
                            key ={index}
                            // uId = {uId}
                        />
                    );
                })}
            </StyledSlider>
        </Container>
    )})

export default Carousel;