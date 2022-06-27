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
        height: 19vw;
        z-index: 3;
        @media screen and (max-width: 1800px) {
            height: 27vw;
            &:not(&--open) ${Box}: hover{
                transform: scale(1.1) !important;
                transition: transform 0.1s;
                z-index: 10;
                .detail {
                    display: block;
                    position: absolute;
                    top: 120%;       
                    flex-direction: column;
                    z-index: 10;
                    border-bottom-left-radius: 12px;
                    border-bottom-right-radius: 12px;
                }
            }
        }

        @media screen and (max-width: 1400px) {
            height: 35vw;
            &:not(&--open) ${Box}: hover{
                transform: scale(1.1) !important;
                transition: transform 0.1s;
                z-index: 10;
                .detail {
                    display: none;
                }
            }
        }
        @media screen and (max-width: 1000px) {
            height: 50vw;
            &:not(&--open) ${Box}: hover{
                transform: scale(1.1) !important;
                transition: transform 0.1s;
                z-index: 10;
                .detail {
                    display: none;
                }
            }
        }
    }
    .slick-slide {
        padding-top: 50px;
        padding-right: 20px;
        padding-bottom: 50px;
        display: flex;
        align-items: center;
        z-index: 3;
        height: 300px;
        
    }
    &:not(&--open) ${Box}: hover{
        transform: scale(1.1) !important;
        transition: transform 0.2s;
        z-index: 10;
        .detail {
            display: block;
            position: absolute;
            top: 120%;       
            flex-direction: column;
            z-index: 10;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
        }
    }

`

export const MovieDetailContainer = styled.div`
    width: 250px;
    height: 250px;
    z-index: 6;
`


