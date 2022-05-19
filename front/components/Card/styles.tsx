import styled from '@emotion/styled';

export const Detail = styled.div`
    width: 100%;
    display: none;
    padding: 10px;
`

export const Box = styled.div`
    width: 100%;
    z-index: 2;
    transition: transform 200ms;
    background-color: black;
    border-radius: 12px;
    &:after {
        content: "";
         }
    &:hover {
        transform: scale(1.1) !important;
        z-index: 5;
        .detail {
            display: flex;
            flex-direction: column;
        }
        & img {
            border-radius: 0;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;

        }
    }
`
export const Image = styled.img`
    max-width: 100%;
    display: flex;
    border-radius: 12px;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`