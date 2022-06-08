import React from 'react';
import { SliderContainer, ImageBox, Image } from './styles'
import {FiChevronsLeft} from 'react-icons/fi'
import {FiChevronsRight} from 'react-icons/fi'

interface Props {
    translateValue: number;
    images: { pic: string; id: number }[];
}

const Slider: React.FC<Props> = ({
    translateValue, 
    images, 
    // moveRight, 
    // moveLeft
}) => {

    return (
        <SliderContainer>
            <ImageBox translateValue={translateValue !== 0 ? translateValue : null}>
            {images.map((picture, idx) => {
                return (
                    <Image
                    key={picture.id}
                    src={picture.pic}
                    
                    />
                );
                })}
            </ImageBox>
        </SliderContainer>
    )}

export default Slider;