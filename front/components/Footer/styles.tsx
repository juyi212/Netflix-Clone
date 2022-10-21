import styled from '@emotion/styled';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.75);
  margin-top: 20px;
  min-width: 190px;
  width: 100%;
  min-height: 190px;
  font-size: 1em;
  position: relative;
  & div {
    max-width: 450px;
    margin: 0 auto;
    padding: 30px 0;
    color: #757575;
    & h4 {
      margin: 10px 0;
    }
    & div {
      padding: 10px;
    }
  }
  & .community {
    display: flex;
    padding: 0;
    & h4 {
      margin: 10px 0;
    }
    & div {
      margin: 0;
    }
  }
`;
