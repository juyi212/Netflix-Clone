import React from 'react';
import { SliderContainer, ImageBox, Image } from './styles'
import {FiChevronsLeft} from 'react-icons/fi'
import {FiChevronsRight} from 'react-icons/fi'

interface Props {
    translateValue: number;
    bannerData: any;
}

const Slider: React.FC<Props> = ({
    translateValue, 
    bannerData, 
    }) => {
    
    return (
        <SliderContainer>
            <ImageBox translateValue={translateValue !== 0 ? translateValue : null}>
            {bannerData?.map((banner: any, id: number) => {
                return (
                    <Image
                    key={id}
                    src={banner.bannerPath}
                    />
                );
                })}
            </ImageBox>
        </SliderContainer>
    )}

export default Slider;