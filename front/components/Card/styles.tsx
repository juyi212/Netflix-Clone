import styled from '@emotion/styled';

export const Detail = styled.div`
    width: 100%;
    height: 100px;
    display: none;
    padding: 10px;
`

export const Box = styled.div`
    width: 100%;
    z-index: 1;
    transition: transform 200ms;
    background-color: black;
    border-radius: 12px;

`
export const Image = styled.img`
    width: 100%;
    height: 250px;
    object-fit: fill;
    border-radius: 12px;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`