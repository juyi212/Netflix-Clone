import styled from '@emotion/styled';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

export const Container = styled.div`
    padding: 20px;
`

export const StyledSlider = styled(Slider)` 
    display: relative;
    margin : 0 30px;
    .slick-list {
        height: 18vw;
        align-items: center;
    }
    .slick-slide {
        display: flex;
        align-items: center;
    }
`;


// export const CarouselContainer = styled.div` 
//     margin: 10px;
//     position: relative;
//     max-width: 300vw;
//     overflow : hidden;
//     `
// type ImageBoxProps = {
//     translateValue: number | null;
// };

// export const CarouselBox = styled.div<ImageBoxProps>`
//     display:flex;
//     padding-left: 30px;
//     transition:1s;
//     transform:${({ translateValue }) => `translateX(-${translateValue}vw)`}
// `;

export const Box = styled.div`
    display: flex;
    padding-right: 10px;
    width: 100%;
    z-index: 2;
    transition: transform 500ms;
    &:after {
        content: "";
         }
    &:hover {
        transform: scale(1.3) !important;
        z-index: 5;
        & div {
            display: block;
        }
    }
`

export const Image = styled.img`
    max-width: 100%;
    display: flex;
`

export const Detail = styled.div`
    width: 100%;
    display: none;
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


