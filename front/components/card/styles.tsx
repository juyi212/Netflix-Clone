import styled from '@emotion/styled';

export const Detail = styled.div`
  width: 100%;
  display: none;
  padding: 10px;
  background-color: black;
`;

export const Box = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: transform 200ms;
  background-color: black;
  border-radius: 12px;
`;
export const Image = styled.img`
  width: 100%;
  height: 140%;
  object-fit: fill;
  border-radius: 12px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderFirst = styled.div`
  display: flex;
  & div {
    padding-left: 10px;
  }
`;
