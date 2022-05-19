import React, { useState } from 'react';
import {Header, Image, Box, Detail} from './styles'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

type Props = {
    picture : string,
    id : number,
}
const Card: React.FC<Props> = ({picture, id}) => {
    const [like, setLike] = useState(false)

    return (
            <Box>
                <Image
                    key={id}
                    src={picture}
                />
                <Detail className="detail">
                    <Header>
                        <div>영화 제목 &nbsp;&nbsp;</div>
                        <div>{ like ? <AiFillHeart size="20" color="red" /> :  <AiOutlineHeart size="20" color="red" />}</div>
                    </Header> 
                    <div> 영화 카테고리 </div>
                </Detail>
            </Box>
    )}

export default Card;