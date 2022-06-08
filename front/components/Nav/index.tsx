import fetcher from '@utils/userfetcher';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import { Header, SecondaryNav, StyledLink,DropDown, DropDownContents } from './styles';
import gravatar from 'gravatar';
import {BsPersonCircle} from 'react-icons/bs'
import {AiOutlineQuestionCircle, AiOutlineSearch} from 'react-icons/ai'
import axios from 'axios';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

const Nav = React.memo(() => {
    // headervalue 들고오는 것도 따로 분리하기 
    const navigate = useNavigate()
    const { data: userData, error, mutate } = useSWR('http://3.39.105.32:9000/netflix-clone/user/info', fetcher, {
        revalidateOnMount:true
    });
    const onClickLogout = useCallback(() => {
        if(userData) {
            axios.get(`http://3.39.105.32:9000/netflix-clone/user/logout?uId=${userData.uId}`)
            .then((res) => {
                localStorage.removeItem('user')
                // 로그아웃을 하고 로그인페이지로 넘어가면 userData가 확인되어 login 페이지로 이동하지 않는다.. 어떻게 해결해야할까 > null로 해결! 
                mutate(null)
                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [userData])



    return (
        <Header>
            <div className="logo">NETFLIX</div>
            {/* userData 로 분기  */}
            { userData  && 
                <>
                    <div className="main-nav">
                        <StyledLink to='/home'>홈</StyledLink>
                        <StyledLink to='/new'>NEW! 요즘 대세 콘텐츠 </StyledLink>
                        <StyledLink to='/like'>내가 찜한 콘텐츠</StyledLink>
                    </div>
                    <SecondaryNav>
                        <div>
                            <AiOutlineSearch 
                                // onClick ={onChangeSearchInput}
                                style={{marginRight: "25px", color: "white"}} size="24" />
                        </div>
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