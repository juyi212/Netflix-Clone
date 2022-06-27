import styled from '@emotion/styled';

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, auto));
    margin: 0 25px;
    gap: 30px 15px;
`

export const Box = styled.div`
    width: 100%;
    height: 200px;
    padding: 0;
`

export const Image = styled.img`
    width: 100%;
    object-fit: fill;
    height: 200px;
    &: hover {
        transform: scale(1.1) !important;
        transition: transform 0.1s;
        z-index: 10;
    }
`