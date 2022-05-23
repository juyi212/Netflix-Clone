import styled from '@emotion/styled';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

export const Container = styled.div`
    padding: 15px;
`

export const StyledSlider = styled(Slider)` 
    display: relative;
    margin : 0 30px;
    .slick-list {
        height: 22vw;
        align-items: center;
    }
    .slick-slide {
        display: flex;
        align-items: center;
        margin-right: 8px;
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


