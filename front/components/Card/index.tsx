import React, { useCallback, useState } from 'react';
import {Header, Image, Box, Detail} from './styles'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import axios from 'axios';
// import { MovieType } from '@components/Carousel';


interface Props {
    movie : any,
}

const Card: React.FC<Props> = ({movie}) => {
    const [like, setLike] = useState(false)
    const onChangeLike = useCallback(() => {
        if (like) {
            setLike(false)
        } else {
            setLike(true)
        }
    }, [like])
    console.log(movie.id)

    return (
            <Box>
                <Image
                    alt="d"
                    src={movie.posterPath}
                />
                <Detail className="detail">
                    <Header>
                        <div>{movie.title} &nbsp;&nbsp;</div>
                        <div onClick ={onChangeLike}>{ like ? <AiFillHeart size="20" color="red" /> :  <AiOutlineHeart size="20" color="red" />}</div>
                    </Header> 
                    <div> 영화 카테고리 </div>
                </Detail>
            </Box>
    )}

export default Card;