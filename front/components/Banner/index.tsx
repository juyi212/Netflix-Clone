import React, { useEffect, useState,useCallback } from 'react';
import banner1 from '@assets/banner1.jpg'
import banner2 from '@assets/banner2.jpg'
import banner3 from '@assets/banner3.jpg'
import Slider from '@components/Slider'
import { SetStateAction } from 'react';
import useSWR from 'swr';
import fetcher2 from '@utils/fetcher2';

const Banner = () => {

    const { data: bannerData, error, mutate } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/movie/popular_movie`, fetcher2);

  
    const [translateValue, setTranslateValue] = useState<number>(0)

    const moveRight = useCallback(() => {
        setTranslateValue((prev) => {
            if (translateValue !== 100 * (bannerData?.length - 1)) {
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
        }, 4000);
        return () => {
          clearInterval(imageInterval);
        };
      }, [translateValue]);


    return (
        <div style={{ marginBottom: '30px'}}>
            <Slider
                translateValue={translateValue}
                bannerData={bannerData}
            />
        </div>
    )}

export default Banner;
