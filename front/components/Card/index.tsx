import React, { useCallback, useState } from 'react';
import {Header, Image, Box, Detail, HeaderFirst} from './styles'
import {AiFillHeart, AiOutlineHeart, AiOutlineCheckCircle, AiOutlineDownCircle} from 'react-icons/ai'
import {BsHandThumbsUp, BsHandThumbsUpFill, BsPlusCircle} from 'react-icons/bs';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
// import { MovieType } from '@components/Carousel';


interface Props {
    movie : any,
    onOpenDetail : () => void
}

const Card: React.FC<Props> = ({movie, onOpenDetail}) => {
    const navigate = useNavigate()
    const [like, setLike] = useState(false)
    const onChangeLike = useCallback(() => {
        if (like) {
            setLike(false)
        } else {
            setLike(true)
        }
    }, [like])
    

    const onClickGoToDetail = () => {
        navigate(`./${movie.id}`)
    }

    return (
            <Box>
                <Image
                    alt="d"
                    src={movie.posterPath}
                />
                <Detail className="detail">
                    <Header>
                        <HeaderFirst>
                            <div onClick ={onChangeLike}>{ like ? <AiOutlineCheckCircle size="32" /> :  <BsPlusCircle size="32"  />}</div>
                            <div onClick ={onChangeLike}>{ like ? <BsHandThumbsUpFill size="32" /> :  <BsHandThumbsUp size="32" />}</div>
                        </HeaderFirst>
                        <div onClick={onOpenDetail}><AiOutlineDownCircle size="32"/></div>
                    </Header> 
                    <div> 영화장르 (확인필요) </div>
                </Detail>
            </Box>
    )}

export default Card;