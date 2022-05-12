import React, { useEffect, useState,useCallback } from 'react';
import banner1 from '@images/banner1.jpg'
import banner2 from '@images/banner2.jpg'
import banner3 from '@images/banner3.jpg'
import Slider from '@components/Slider'
import { SetStateAction } from 'react';

const Banner = () => {
    const images = [
        {pic : banner1, id: 1}, 
        {pic : banner2, id: 2}, 
        {pic : banner3, id: 3},    
    ]
    const [translateValue, setTranslateValue] = useState<number>(0)

    const moveRight = useCallback(() => {
        setTranslateValue((prev) => {
            if (translateValue !== 100 * (images.length - 1)) {
                return prev + 100
            } else return 0
        });
    },[translateValue])
    
    //   const moveLeft = useCallback(() => {
    //     if (translateValue !== 0) {
    //         setTranslateValue((prev) => prev - 100);
    //       } else {
    //         setTranslateValue(100 * (images.length - 1));
    //       }
    //   } ,[translateValue])
    
      useEffect(() => {
        const imageInterval = setInterval(() => {
          moveRight();
        }, 3000);
        return () => {
          clearInterval(imageInterval);
        };
      }, [translateValue]);


    return (
        <div>
            <Slider
                translateValue={translateValue}
                images={images}
                // moveRight={moveRight}
                // moveLeft={moveLeft}
            />
        </div>
    )}

export default Banner;
