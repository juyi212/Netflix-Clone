import React, { PropsWithChildren, useCallback, useState } from 'react';
import {Header, Image, Box, Detail, HeaderFirst} from './styles'
import {AiFillHeart, AiOutlineHeart, AiOutlineCheckCircle, AiOutlineDownCircle} from 'react-icons/ai'
import {BsHandThumbsUp, BsHandThumbsUpFill, BsPlusCircle} from 'react-icons/bs';
import axios from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import userfetcher from '@utils/userfetcher';
import category from '@utils/category';
// import { MovieType } from '@components/Carousel';


interface ContentProps {
    movie : any,
    uId? : string;
}

const Card= React.memo(({ movie, uId }: PropsWithChildren<ContentProps>) => {
    const [like, setLike] = useState(false)
    const [zzim, setZzim] = useState(false)

    // const { data: userData, error, mutate } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info`, userfetcher, {
    //     revalidateOnMount:true
    // });

    const CategoryName= category(movie.category).toString();


    const onChangeZzim = useCallback(() => {
        if (zzim) {
            // 찜된 상태 
            setZzim(false)
            axios.post(`${process.env.REACT_APP_SERVICE_PORT}/user/delete_movie_zzim?movieId=${movie.id}&userNo=${uId}`)
            .then((res)=>{
                console.log(res.data)
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
    
    // const onClickGoToDetail = () => {
    //     navigate(`/home/${movie.id}`)
    // }
    
    return (
            <Box>
                <Link
                    to={`/home/${movie.id}`}
                    state = {{
                        uId
                    }}
                >
                <Image
                    alt="d"
                    src={movie.posterPath}
                    />
                </Link>
                <Detail className="detail">
                    <Header>
                        <HeaderFirst>
                            {/* <div></div> */}
                            {/* <div onClick ={onChangeZzim}>{ zzim ? <AiOutlineCheckCircle size="28" /> :  <BsPlusCircle size="28"  />}</div> */}
                            {/* <div onClick ={onChangeLike}>{ like ? <BsHandThumbsUpFill size="28" /> :  <BsHandThumbsUp size="28" />}</div> */}
                        </HeaderFirst>
                        <Link 
                            to={`/home/${movie.id}`}
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