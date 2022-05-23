import styled from '@emotion/styled';

export const Header = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 98%;
    height: 90px;
    color: red;
    z-index: 1000;
    display: flex; 
    margin-left: 30px;
    align-items: center;
    .logo {
      font-size: 40px;
      font-weight: bold;
    }
    .main-nav {
      display: flex;
      font-size: 15px;
      color : white;
      margin-left: 30px;
      & div {
        padding-left: 30px;
      }
    }
`

export const SecondaryNav = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  margin-right: 30px;
  position: relative;
  align-items: center;
  .dropdown-contents {
    padding: 20px;
    display: none;
    position: absolute;
    background-color: black;
    border-radius: 7px;
    margin-top: 5px;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    color: white;
    & div {
      display: flex;
      margin-bottom: 10px;
    }
  }
  .dropdown {
    &:hover .dropdown-contents{
      display: block;
      right: 0;
    }
  }
}
`
