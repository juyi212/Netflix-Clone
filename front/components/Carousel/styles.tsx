import styled from '@emotion/styled';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

export const StyledSlider = styled(Slider)` 
    display: relative;
    margin : 0 40px;
    .slick-list {
        height: 250px;
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
    width: 100%;
    transition: transform 300ms ease 100ms;
    z-index: 2;
    &:after {
        content: "";
        display: block;
        
     }
    &:hover {
        transform: scale(1.4) !important;
        z-index: 5;
    }
`

export const Image = styled.img`
    width: 300px;
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


    // text-align:center;
    // display:flex; /* 내용을 중앙정렬 하기위해 flex 사용 */
    // align-items:center; /* 위아래 기준 중앙정렬 */
    // justify-content:center; /* 좌우 기준 중앙정렬 */