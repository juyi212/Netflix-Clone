import React from 'react';
import { SliderContainer, ImageBox, Image, ArrowBox } from './styles'
import {FiChevronsLeft} from 'react-icons/fi'
import {FiChevronsRight} from 'react-icons/fi'

interface Props {
    translateValue: number;
    images: { pic: string; id: number }[];
    // moveRight: () => void;
    // moveLeft: () => void;
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
                    alt={"dog" + idx}
                    />
                );
                })}
            </ImageBox>
            {/* <ArrowBox>
                <FiChevronsLeft 
                    className='left'
                    onClick={moveLeft}
                />
                <FiChevronsRight 
                    className='right'
                    onClick={moveRight}
                />
            </ArrowBox> */}
        </SliderContainer>
    )}

export default Slider;