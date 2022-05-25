import styled from '@emotion/styled';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Detail } from '@components/Card/styles';

export const Container = styled.div`
    padding: 15px;
    z-index: 1;
`

export const StyledSlider = styled(Slider)` 
    margin : 0 20px;
    .slick-list {
        height: 18vw;
        padding-top: 20px;
        z-index: 3;
    }
    .slick-slide {
        padding-right: 20px;
        display: flex;
        align-items: center;
        z-index: 3;
    }
    &:not(&--open) ${Box}: hover{
        transform: scale(1.1) !important;
        transition: transform 0.2s;
        z-index: 10;
        .detail {
            display: block;
            flex-direction: column;
        }
        & img {
            border-radius: 0;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;

        }
    }
    // &:hover ${Box}{
    //     z-index: 10;
    // }
    // &:not(&--open) ${Box}:hover {
    //     transform: scale(1.1) !important;
    //     z-index: 10;
    //     transition-delay: 0.5s;
    //   }
    // &:not(&--left) ${Box}:hover {
    //     transform: scale(1.1)  translateX(20.5%) !important;
    //     z-index: 10;
    //     transition-delay: 0.2s;
    // }
    // &:not(&--right) ${Box}:hover {
    //     transform: scale(1.1) translateX(-20.5%) !important;
    //     z-index: 10;
    //     transition-delay: 0.2s;
    //   }
    
    //   &:not(&--open):hover ${Box} {
    //     transform: translateX(-20%);
    //     transition-delay: 0.2s;
    //   }
    
    //   &:not(&--right):hover ${Box} {
    //     transform: translateX(-20%);
    //     transition-delay: 0.2s;
    //   }
    
    //   &:not(&--open) ${Box}:hover ~${Box} {
    //     transform: translateX(25%);
    //     transition-delay: 0.2s;
    //   }
    
    //   &:not(&--left) ${Box}:hover ~${Box} {
    //     transform: translateX(25%);
    //     transition-delay: 0.2s;
    //   }
`

export const MovieDetailContainer = styled.div`
    width: 250px;
    height: 250px;
    z-index: 6;
`

// export const ArrowBox = styled.div`
//     position: absolute;
//     top: 50%;
//     display:flex;
//     z-index: 5;
//     justify-content:space-between;
//     align-items:center;
//     padding-left: 40px;
//     .left, .right{
//         font-size:2rem;
//         cursor:pointer;
//         &:hover{
//         color:red;
//         }
//     }
//     `;


