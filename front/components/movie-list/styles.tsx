import styled from '@emotion/styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15%, auto));
  margin: 0 50px;
  gap: 180px 20px;
`;

export const Box = styled.div`
  width: 100%;
  height: 200px;
  padding: 0;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: fill;
  height: 350px;
  &: hover {
    transform: scale(1.1) !important;
    transition: transform 0.1s;
    z-index: 10;
  }
`;

export const NoData = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
`;
