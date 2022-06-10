import React, { PropsWithChildren, useEffect, useState } from 'react';
import banner1 from "@assets/banner1.jpg"
import banner2 from "@assets/banner2.jpg"
import banner3 from "@assets/banner3.jpg"
import Card from '@components/Card';
import { Container, StyledSlider, MovieDetailContainer } from './styles';
import useSWR from 'swr';
import fetcher2 from '@utils/fetcher2';
import axios from 'axios';


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
    category: string;
    genre_id? : string;
    uId? : string;
    header : string;
  }
  


function useCategorySWR (category? : string, genre_id? : string) {
    return useSWR(() => {
        if (category === "popular_movie") {
            return `http://3.39.105.32:9000/netflix-clone/movie/${category}`
        } else if (category === "category_movie") {
            return `http://3.39.105.32:9000/netflix-clone/movie/category_movie?genreId=${genre_id}`
        } else {
            return `http://3.39.105.32:9000/netflix-clone/movie/country_movie?oriCountry=g`
        }
    }, fetcher2)
}

const Carousel = React.memo(({ category, genre_id, header, uId }: PropsWithChildren<ContentProps>)  => {
    const [mouseCondition,setMouseCondition] = useState(false)
    const {data: movieData, error, mutate} = useCategorySWR(category, genre_id);
   

    return (
        <Container>
            <h1> {header} </h1>
            <StyledSlider {...settings}>
                {movieData?.map((movie: Object, index: string) => {
                    return (
                        <Card 
                            movie = {movie}
                            key ={index}
                            uId = {uId}
                        />
                        // <Box>
                        //     <Image
                        //     key={picture.id}
                        //     src={picture.pic}
                        //     alt={"img" + idx}
                        //     />
                        //     <Detail>
                        //         영화내용 영화내용 
                        //     </Detail>
                        // </Box>
                    );
                })}
            </StyledSlider>
        </Container>
        // <CarouselContainer>
        //     <ArrowBox>
        //         <FiChevronsLeft 
        //             className='left'
        //             onClick={clickLeftButton}
        //         />
        //         <FiChevronsRight 
        //             className='right'
        //             onClick={clickRightButton}
        //         />
        //     </ArrowBox>
        //     <CarouselBox translateValue={translateValue !== 0 ? translateValue : null}>
        //         {images.map((picture, idx) => {
        //             return (
        //                 <Box>
        //                     <div className="item">

        //                     <Image
        //                     key={picture.id}
        //                     src={picture.pic}
        //                     alt={"dog" + idx}
        //                     />
        //                     </div>
        //                 </Box>
        //             );
        //         })}
        //     </CarouselBox>
        // </CarouselContainer>
    )})

export default Carousel;