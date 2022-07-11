import userfetcher from '@utils/userfetcher';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Header, SecondaryNav, StyledLink,DropDown, DropDownContents, SearchContainer, SearchInput } from './styles';
import gravatar from 'gravatar';
import {BsPersonCircle} from 'react-icons/bs'
import {AiOutlineQuestionCircle, AiOutlineSearch} from 'react-icons/ai'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '@layouts/User';
import useDebounce from '@utils/debounce';


// export const UserContext = createContext({})

const Nav = React.memo(() => {
    const navigate = useNavigate()
    const context = useContext(UserContext)
    const [search, setSearch] = useState<string>('')
    const debouncedValue = useDebounce(search, 500)



    const onClickLogout = useCallback(() => {
        if(context.userData) {
            axios.get(`http://3.39.105.32:9000/netflix-clone/user/logout?uId=${context.userData.uId}`)
            .then((res) => {
                localStorage.removeItem('user')
                // 로그아웃을 하고 로그인페이지로 넘어가면 userData가 확인되어 login 페이지로 이동하지 않는다.. 어떻게 해결해야할까 > null로 해결! 
                context.mutateUsers(null)
                navigate('/login')
                
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [context.userData])

    const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    },[search])

    useEffect(() => {
        if (search) {
            navigate({
                pathname: '/search',
                search: `?input=${search}`,
            }) 
        }
    }, [debouncedValue])

    useEffect(() => {
        const header = document.querySelector(".header");
        if (header) {
            const headerHeight = header?.getBoundingClientRect().height;
            window.addEventListener("scroll", () => {
                if (window.scrollY > headerHeight) {
                    header.setAttribute("style", "background-color:rgba(0,0,0,.8);");
                } else {
                    header.setAttribute("style", "background: transparent;");
                }
            });
        }
    },[])

        

    return (
        // <UserContext.Provider></UserContext.Provider>
        <Header className='header'>
            <div className="logo">
                <StyledLink to={'/home'} style={{color: 'red'}}>
                    NETFLIX    
                </StyledLink>
            </div>
            {/* userData 로 분기  */}
            { context.userData  && 
                <>
                    <div className="main-nav">
                        <StyledLink to='/home'>홈</StyledLink>
                        <StyledLink to='/movie'> 카테고리관 </StyledLink>
                        <StyledLink to='/my-list'>내가 찜한 콘텐츠</StyledLink>
                    </div>
                    <SecondaryNav>
                        <SearchContainer>
                            <AiOutlineSearch 
                                className="searchIcon"
                                style={{ color: "white"}} 
                                size="24" />
                            <SearchInput 
                                type="text" 
                                value={search} 
                                placeholder="제목을 검색해주세요." 
                                onChange={onChangeSearch}
                                // onKeyPress={onKeyUpHandler}
                                />
                        </SearchContainer>
                        <DropDown>
                            <img className= "profile-image" src={gravatar.url("dea830@naver.com", {s: '28px', d: 'retro'})} alt={"gg"}/>
                            <DropDownContents>
                                <div>
                                    <BsPersonCircle size="24" style={{ marginRight: "10px"}}/>
                                    <StyledLink to ='/profile'>계정</StyledLink>
                                </div>
                                <div>
                                    <AiOutlineQuestionCircle size="24" style={{ marginRight: "10px"}}/>
                                    <StyledLink to = '/help'>고객센터</StyledLink>
                                </div>
                                <br></br>
                                <div onClick={onClickLogout}>넷플릭스에서 로그아웃</div>
                            </DropDownContents>
                        </DropDown>
                    </SecondaryNav>
            </>}
        </Header>
    )})

export default Nav;
