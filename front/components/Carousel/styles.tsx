import styled from '@emotion/styled';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Detail } from '@components/Card/styles';

export const Container = styled.div`
    padding: 0 15px;
    z-index: 1;
    & h1 {
        margin: 0 0 0 20px;
    }
`

export const StyledSlider = styled(Slider)` 
    margin : 0 20px;
    .slick-list {
        height: 18vw;
        z-index: 3;
        @media screen and (max-width: 2000px) {
            height: 22vw;
            &:not(&--open) ${Box}: hover{
                transform: scale(1.1) !important;
                transition: transform 0.1s;
                z-index: 10;
                .detail {
                    display: none;
                }
                & img {
                    border-radius: 0;
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
        
                }
            }
        }
    }
    .slick-slide {
        padding-top: 50px;
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
            z-index: 10;
        }
        & img {
            border-radius: 0;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;

        }
    }
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


