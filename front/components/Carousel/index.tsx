import React, { useState } from 'react';
import banner1 from "@images/banner1.jpg"
import banner2 from "@images/banner2.jpg"
import banner3 from "@images/banner3.jpg"
import Card from '@components/Card';
import { Container, StyledSlider, MovieDetailContainer } from './styles';



const images = [
    {pic : banner1, id: 1}, 
    {pic : banner2, id: 2}, 
    {pic : banner3, id: 3},    
    {pic : banner3, id: 3},    
    {pic : banner3, id: 3},    
    {pic : banner3, id: 3},    
    {pic : banner3, id: 3},    
    {pic : banner3, id: 3},    
]

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    
}

const Carousel = () => {
    const [mouseCondition,setMouseCondition] = useState(false)
    
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
                {images.map((picture, idx) => {
                    return (
                        <Card 
                            picture = {picture.pic}
                            id = {picture.id}              
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