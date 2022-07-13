import styled from '@emotion/styled';

export const DetailBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1030;
    background-color: rgba(0, 0, 0, .6);
`

export const DetailContainer = styled.div`
  position: fixed;
  overflowY: auto;
  text-align: center;
  width: 52%;
  margin: 0 auto;
  background-color: black;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1033;
  margin-top: 40px;
  margin-bottom: 40px;

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
      height: 50%;   
      top: 0;
      // background: linear-gradient(to top, black, black 20%, transparent);
      background-repeat: no-repeat;

  }
`

export const Image = styled.img `
  height: 600px;
  width: 100%;  
`
export const MovieTitle = styled.h1`
  margin : 30px 30px 0 30px;
`

export const MovieContainer  =styled.div`
    display: flex;
    margin: 45px;
    text-align: left;
`
export const MovieContent = styled.div`
    width: 60%;
    font-size: 20px;
`
export const MovieDetailInfo = styled.div`
  margin-left: 30px;
  font-size: 20px;
  & div {
    margin-bottom: 10px;
    .firstInfo {
      color: gray;
      margin-right: 10px;
    }
  }
`
