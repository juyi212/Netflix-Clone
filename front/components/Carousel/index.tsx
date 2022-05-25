import React, { useEffect, useState } from 'react';
import banner1 from "@assets/banner1.jpg"
import banner2 from "@assets/banner2.jpg"
import banner3 from "@assets/banner3.jpg"
import Card from '@components/Card';
import { Container, StyledSlider, MovieDetailContainer } from './styles';
import useSWR from 'swr';
import fetcher2 from '@utils/fetcher2';
import axios from 'axios';



// const images = [
//     {pic : banner1, id: 1}, 
//     {pic : banner2, id: 2}, 
//     {pic : banner3, id: 3},    
//     {pic : banner3, id: 3},    
//     {pic : banner3, id: 3},    
//     {pic : banner3, id: 3},    
//     {pic : banner3, id: 3},    
//     {pic : banner3, id: 3},    
// ]

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    initialSlide: 0,
    
}
type Props = {
    category: string
}

// export type MovieType = {
//     adult: string,
//     id: number,
//     isDisplay: string,
//     originCountry: string,
//     originTitle: string,
//     overview: string,
//     popularity: number,
//     posterPath: string,
//     releaseDate: string,
//     title: string,
//     videoPath: string,
//     voteAverage: number,
//     voteCount: number
//   }

const Carousel: React.FC<Props> = ({ category }) => {
    const [mouseCondition,setMouseCondition] = useState(false)
    const { data: movieData, error, mutate } = useSWR(`http://3.39.105.32:9000/netflix-clone/movie/${category}`, fetcher2);
    console.log(movieData)
    
    // const clickLeftButton = () => {
    //     if (translateValue !== 0) {
    //         setTranslateValue((prev) => prev - 100);
    //         } else {
    //         setTranslateValue(100 * (images.length - 1));
    //         }
    // }
    // const clickRightButton = () => {
    //     setTranslateValue((prev) => {
    //         if (translateValue !== 100 * (images.length - 1)) {
    //             return prev + 100
    //         } else return 0
    //     })
    // }
    
    // const onMouseOver = (val: number) => (event: any) => {
    //     setMouseCondition((prev) => !prev)
    //     console.log(val)
    // }

    // const onMouseOut = (val: number) => (event: any) => {
    //     setMouseCondition((prev) => !prev)
    //     console.log(val)
    // }

    return (
        <Container>
            <h1> 뜨고있는 컨텐츠 </h1>
            <StyledSlider {...settings}>
                {movieData?.map((movie: Object) => {
                    return (
                        <Card 
                            movie = {movie}
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
    )}

export default Carousel;