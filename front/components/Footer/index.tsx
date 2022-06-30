import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Container } from './styles';
import {BsFacebook} from 'react-icons/bs'
import {GrInstagram} from 'react-icons/gr'

// export const UserContext = createContext({})

const Footer = React.memo(() => (
    <Container>
        <div>
            <h4>질문이 있으신가요?</h4>
            <div>- 문의 이메일 : dea8307@gmail.com<br />
                - 깃헙주소 : https://github.com/juyi212/Netflix-Clone
            </div>
            <div className="community">
                <h4>넷플릭스 관련 커뮤니티</h4>
                <div>
                    <BsFacebook size="24" /> &nbsp;&nbsp;
                    <GrInstagram size="24" />
                </div>
            </div>
        </div>
    </Container>

))

export default Footer;
