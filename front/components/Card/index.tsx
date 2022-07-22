import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import {Header, Image, Box, Detail, HeaderFirst} from './styles'
import {AiFillHeart, AiOutlineHeart, AiOutlineCheckCircle, AiOutlineDownCircle} from 'react-icons/ai'
import {BsHandThumbsUp, BsHandThumbsUpFill, BsPlusCircle} from 'react-icons/bs';
import axios from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';


interface ContentProps {
    from? : string,
    movie : any,
    uId? : string;
    mutate : () => void;
}


const Card= React.memo(({ from, movie, uId, mutate }: PropsWithChildren<ContentProps>) => {
    const [like, setLike] = useState(false)
    const [zzim, setZzim] = useState(false)

    const onChangeZzim = useCallback(() => {
        if (zzim) {
            // 찜된 상태 
            setZzim(false)
            axios.delete(`${process.env.REACT_APP_SERVICE_PORT}/user/delete_movie_zzim?movieId=${movie.id}&userNo=${uId}`)
            .then((res)=>{
                console.log(res.data)
                mutate()
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            // 찜할 상태 
            setZzim(true)
            axios.post(`${process.env.REACT_APP_SERVICE_PORT}/user/insert_movie_zzim?movieId=${movie.id}&userNo=${uId}`)
            .then((res)=>{
                console.log(res.data)
                mutate()
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [zzim])

    const onChangeLike = useCallback(() => {
        if (like) {
            setLike(false)
        } else {
            setLike(true)
        }
    }, [like])


    useEffect(() => {
        if (movie?.isZzim === "Y") {
            setZzim(true)
        } else if (movie?.isZzim === "N") {
            setZzim(false)
        }
    }, [movie.isZzim, zzim])
    
    
    return (
            <Box>
                <Link
                    to={`${from}/${movie.id}`}
                    state = {{
                        uId
                    }}
                >
                <Image
                    alt="d"
                    src={
                        movie.posterPath
                        // + getParametersForUnsplash(200,200,70,"jpeg")
                    }
                    />
                </Link>
                <Detail className="detail">
                    <Header>
                        <HeaderFirst>
                            <div onClick ={onChangeZzim}>{ zzim ? <AiOutlineCheckCircle size="28" color="red" /> :  <BsPlusCircle size="28"  />}</div>
                            <div onClick ={onChangeLike}>{ like ? <BsHandThumbsUpFill size="28" /> :  <BsHandThumbsUp size="28" />}</div>
                        </HeaderFirst>
                        <Link 
                            to={`${from}/${movie.id}`}
                            state = {{
                                uId
                            }}
                        ><AiOutlineDownCircle size="32" color="white"/></Link>
                    </Header> 
                    {/* {movie.category && 
                        <div style={{color: "white", marginTop: "5px" }}> {CategoryName} </div>
                    } */}
                </Detail>
            </Box>
    )})

export default Card;