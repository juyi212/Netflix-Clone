import styled from '@emotion/styled';

export const DetailContainer = styled.div`
  position: fixed;
  text-align: center;
  width: 50%;
  margin: 0 auto;
  background-color: black;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1033;
`;

export const Icons = styled.div`
  position: absolute;
  z-index: 1000;
  top: 10;
  right: 10; 
`

export const ImageView = styled.div`
    &:before {
      content: "";
      position: absolute;
      display: flex;
      width: 100%; 
      height: 100%;   
      top: 0;
      background: linear-gradient(to top, black, black 30%, transparent);
      background-repeat: no-repeat;
      // transition: all 500ms ease;
  }
`

export const Image = styled.img `
  height: 600px;
  width: 100%;  
`
export const MovieContainer  =styled.div`

`

export const MovieContent = styled.img`
`
export const MovieCastInfo = styled.img`
`
