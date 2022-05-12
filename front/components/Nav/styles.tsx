import styled from '@emotion/styled';

export const Header = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    color: red;
    z-index: 1000;
    & div {
      font-size: 40px;
      margin : 10px 0 0 30px;
      font-weight: bold;
    }
`