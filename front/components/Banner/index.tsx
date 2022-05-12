import React, { SetStateAction, useEffect, useState } from 'react';
import { Container } from './styles';
import banner1 from '@images/banner1.jpg'
import banner2 from '@images/banner2.jpg'
import banner3 from '@images/banner3.jpg'
import Slider from '@components/Slider'

const Banner = () => {
    const images = [
        {pic : 'banner1', id: 1}, 
        {pic : 'banner2', id: 2}, 
        {pic : 'banner3', id: 3},    
    ]
    const [translateValue, setTranslateValue] = useState<number>(0)

    const moveRight = (): void => {
        if (translateValue !== 70 * (images.length - 1)) {
          setTranslateValue((prev) => prev + 70);
        } else {
          setTranslateValue(0);
        }
      };
    
      const moveLeft = (): void => {
        if (translateValue !== 0) {
          setTranslateValue((prev) => prev - 70);
        } else {
          setTranslateValue(70 * (images.length - 1));
        }
      };


    return (
        <Container>
            <Slider
                translateValue={translateValue}
                images={images}
                moveRight={moveRight}
                moveLeft={moveLeft}
            />
        </Container>
    )}

export default Banner;
