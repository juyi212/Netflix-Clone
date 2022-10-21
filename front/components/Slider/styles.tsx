import styled from '@emotion/styled';

export const SliderContainer = styled.div`
  position: relative;
  max-width: 100vw;
  height: 850px;
  display: flex;
  overflow: hidden;
  margin: 0;
`;

type ImageBoxProps = {
  translateValue: number | null;
};

export const ImageBox = styled.div<ImageBoxProps>`
  display: flex;
  transition: 1s;
  transform: ${({ translateValue }) => `translateX(-${translateValue}vw)`};
`;

export const Image = styled.img`
  width: 100vw;
  object-fit: cover;
  object-position: center center;
  opacity: 0.4;
`;
