import React, { useCallback, useState } from 'react';
import {Header, Image, Box, Detail, HeaderFirst} from './styles'
import {AiFillHeart, AiOutlineHeart, AiOutlineCheckCircle, AiOutlineDownCircle} from 'react-icons/ai'
import {BsHandThumbsUp, BsHandThumbsUpFill, BsPlusCircle} from 'react-icons/bs';
import axios from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import userfetcher from '@utils/userfetcher';
import category from '@utils/category';
// import { MovieType } from '@components/Carousel';


interface Props {
    movie : any,
    uId? : string;
}

const Card: React.FC<Props> = ({movie, uId}) => {
    const [like, setLike] = useState(false)
    const [zzim, setZzim] = useState(false)
    const test = [12,13,14];
    const CategoryName= category(test).toString();
    const onChangeLike = useCallback(() => {
        if (like) {
            setLike(false)
        } else {
            setLike(true)
        }
    }, [like])

    const onChangeZzim = useCallback(() => {
        if (zzim) {
            // 찜된 상태 
            setZzim(false)
        } else {
            // 찜할 상태 
            setZzim(true)
            axios.post(`http://3.39.105.32:9000/netflix-clone/user/insert_movie_zzim?movieId=${movie.id}&userNo=${uId}`)
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [zzim])
    
    // const onClickGoToDetail = () => {
    //     navigate(`/home/${movie.id}`)
    // }
    
    return (
            <Box>
                <Link
                    to={`/home/${movie.id}`}
                >
                <Image
                    alt="d"
                    src={movie.posterPath}
                    />
                </Link>
                <Detail className="detail">
                    <Header>
                        <HeaderFirst>
                            <div onClick ={onChangeZzim}>{ zzim ? <AiOutlineCheckCircle size="32" /> :  <BsPlusCircle size="32"  />}</div>
                            <div onClick ={onChangeLike}>{ like ? <BsHandThumbsUpFill size="32" /> :  <BsHandThumbsUp size="32" />}</div>
                        </HeaderFirst>
                        <Link 
                            to={`/home/${movie.id}`}
                            
                        ><AiOutlineDownCircle size="32"/></Link>
                    </Header> 
                    {movie.category && 
                        <div style={{color: "white" }}> {CategoryName} </div>
                    }
                </Detail>
            </Box>
    )}

export default Card;