import React, { useState } from 'react';
import banner1 from "@images/banner1.jpg"
import banner2 from "@images/banner2.jpg"
import banner3 from "@images/banner3.jpg"
import { StyledSlider, Image, Box } from './styles';
import {FiChevronsLeft} from 'react-icons/fi'
import {FiChevronsRight} from 'react-icons/fi'



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
    const [translateValue, setTranslateValue] = useState<number>(0)
    
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

    return (
        <div>
            <StyledSlider {...settings}>
                {images.map((picture, idx) => {
                    return (
                        <Box>

                            <Image
                            key={picture.id}
                            src={picture.pic}
                            alt={"img" + idx}
                            />

                        </Box>
                    );
                })}
            </StyledSlider>
            </div>
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