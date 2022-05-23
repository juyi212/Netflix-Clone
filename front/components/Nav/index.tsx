import fetcher from '@utils/fetcher';
import React, { useCallback } from 'react';
import useSWR from 'swr';
import { Header, SecondaryNav } from './styles';
import gravatar from 'gravatar';
import {BsPersonCircle} from 'react-icons/bs'
import {AiOutlineQuestionCircle, AiOutlineSearch} from 'react-icons/ai'

const Nav = () => {
    const headerValue = localStorage.getItem("user");
    const { data: userData, error, mutate: revalidateUser } = useSWR(['http://3.39.105.32:9000/netflix-clone/user/info', headerValue], fetcher);
    
    const onClickLogout = useCallback(() => {
        
    }, [])


    return (
        <Header>
            <div className="logo">NETFLIX</div>
            <div className="main-nav">
                <div>홈</div>
                <div>NEW! 요즘 대세 콘텐츠 </div>
                <div>내가 찜한 콘텐츠</div>
            </div>
            <SecondaryNav>
                <div>
                    <AiOutlineSearch  style={{marginRight: "25px", color: "white"}} size="24" />
                </div>
                <div className="dropdown">
                    <img className= "profile-image" src={gravatar.url("dea830@naver.com", {s: '28px', d: 'retro'})} alt={"gg"}/>
                    <div role='menu' className='dropdown-contents'>
                        <div>
                            <BsPersonCircle size="24" style={{ marginRight: "10px"}}/>
                            <div>계정</div>
                        </div>
                        <div>
                            <AiOutlineQuestionCircle size="24" style={{ marginRight: "10px"}}/>
                            <div>고객센터</div>
                        </div>
                        <br></br>
                        <div onClick={onClickLogout}>넷플릭스에서 로그아웃</div>
                    </div>
                </div>
            </SecondaryNav>
        </Header>
    )}

export default Nav;