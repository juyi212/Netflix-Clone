import styled from '@emotion/styled';

export const Container = styled.div`
  background-image: url(../../images/netflix-background.jpeg);
  min-height: 100vh;
`

export const Body = styled.div `
    margin: 0 auto -236px;
    background-color: transparent;
    max-width: 450px;
    &:before {
        content: "";
        height: 91px;
        display: block;
    }
`

export const FormBody = styled.div`
    background-color: rgba(0,0,0,.75);
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0;
    min-height: 515px;
    padding: 20px 0 30px;
    width: 100%;

`

export const Label = styled.h1`
  text-align: center;
  font-family: Slack-Larsseit, Helvetica Neue, Helvetica, Segoe UI, Tahoma, Arial, sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 28px;
  line-height: 46px;
  letter-spacing: -0.75px;
`;

export const Form = styled.div `
    padding: 20px 68px;
`
export const Input = styled.input `
    width: 100%;
    height: 48px;
    border: none; 
    font-size: 16px;
    margin : 18px 0 0 0;
    padding: 0 10px;
    border-radius: 4px;
    &:focus {
        --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
        box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    }
`
export const Button = styled.button `
    color: #fff;
    text-align: center;
    text-decoration: none;
    background: #e50914;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 700;
    margin: 24px 0 12px;
    width: 100%;
    height: 50px;
    text-align: center;
    outline: none;
    cursor: pointer;
    border: none;
`
export const LinkContainer = styled.p`
  font-size: 15px;
  color: #616061;
  margin: 60px 8px;
  width: 400px;
  max-width: 400px;
  & a {
    color: white;
    text-decoration: none;
    font-weight: 700;
    &:hover {
      text-decoration: underline;
    }
  }
`;


export const Header = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    color: red;
    & div {
      font-size: 40px;
      margin : 10px 0 0 30px;
      font-weight: bold;
    }
`

export const Error = styled.div`
  color: #e01e5a;
  margin-top : 5px;
  font-weight: bold;
  font-size: 15px;
`;