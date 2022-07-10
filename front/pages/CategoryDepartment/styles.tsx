import styled from '@emotion/styled';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const Container = styled.div`
    margin: 130px 30px 0 30px;

`

export const StyledCategory = styled(Slider)`
    .slick-list {
        height: 6.5%;
        margin-bottom: 30px;
    }
`


export const Category = styled.div`
    display: flex;
    text-align: center;
    padding: 0.917rem 2rem 1rem;
    border-radius: 999px;
    background-color: rgb(33, 33, 33);
    color: rgb(255, 220, 62);
    font-size: 1.25rem;
    line-height: 1.4;
    white-space: nowrap;
    box-sizing: border-box;
`
