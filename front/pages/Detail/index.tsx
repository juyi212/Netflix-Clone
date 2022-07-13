import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DetailContainer,Icons, ImageView,Image,MovieContainer, MovieContent, DetailBackground, MovieTitle, MovieDetailInfo } from './styles';
import {AiOutlineCheckCircle, AiOutlineDownCircle} from 'react-icons/ai'
import {BsHandThumbsUp, BsHandThumbsUpFill, BsPlusCircle} from 'react-icons/bs';
import {TiDelete} from 'react-icons/ti'
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import category from '@utils/category';
import axios from 'axios';
import userfetcher from '@utils/userfetcher';

const Detail = React.memo(() => {
    const navigate = useNavigate()
    const [movieId, setMovieId] = useState("")
    const param = useParams()
    const location = useLocation()

    useEffect(() => {
        if(param.id) {
            const movieid = param.id
            setMovieId(movieid)
        }else {
            const params = new URLSearchParams(location.search);
            const movieid = params.get("movieId") || "";
            setMovieId(movieid)
        }
    }, [])

    // const params = new URLSearchParams(location.search);
    // const movieId = params.get("movieId") || "";

    const { data: userData, error : userError, mutate: revalidateUser } = useSWR(`${process.env.REACT_APP_SERVICE_PORT}/user/info`, userfetcher);
    
    const { data: movieDetail, error, mutate } = useSWR(
        movieId && `${process.env.REACT_APP_SERVICE_PORT}/movie/movie_detail?movieId=${movieId}&userNo=${userData?.user.uNo}`, fetcher);
        const [like, setLike] = useState(false)
        const [zzim, setZzim] = useState(false)
        
        console.log(movieDetail?.movie.category)
    const CategoryName= category(movieDetail?.movie.category);

    const onClickDismiss = () => {
        navigate(-1)
    }
    
    const onChangeZzim = () => {
        if (zzim) {
            setZzim(false)
            axios.delete(`${process.env.REACT_APP_SERVICE_PORT}/user/delete_movie_zzim?movieId=${movieId}&userNo=${userData.user.uNo}`)
            .then((res) => {
                console.log(res.data)
                mutate()
            })
            .catch((err) => {
                console.log(err)
            })
        }else {
            setZzim(true)
            axios.post(`${process.env.REACT_APP_SERVICE_PORT}/user/insert_movie_zzim?movieId=${movieId}&userNo=${userData.user.uNo}`)
            .then((res) => {
                console.log(res.data)
                mutate()
            })
            .catch((err) => {
                console.log(err)
            })
        }        
    }
    const onChangeLike = () => {}

    useEffect(() => {
        if (movieDetail?.movie.isZzim === "Y") {
            setZzim(true)
        } else if (movieDetail?.movie.isZzim === "N") {
            setZzim(false)
        }
    }, [movieDetail?.movie.isZzim, zzim])

    useEffect(() => {
        // home 화면 스크롤 방지
        // const detail = document.getElementById("detailBody")
        // detail?.setAttribute('style', 
        //     'position: fixed;, overflow-y: auto')
        
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 99%;`

        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = ``;
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
      }, []);

      
      

    return (
        <DetailBackground id="detailBody">
            <DetailContainer>
                <Icons>
                    <TiDelete size="50" onClick={onClickDismiss} color="white"/>
                </Icons>
                <ImageView>
                    <Image src={movieDetail?.movie.posterPath}/>
                </ImageView>
                <MovieTitle>
                    {movieDetail?.movie.originTitle} : {movieDetail?.movie.title}
                </MovieTitle>
                <MovieContainer>
                    <MovieContent>
                        {movieDetail?.movie.overview === "" ? 
                        <>
                            줄거리 없음
                        </>
                        :
                        <>
                            {movieDetail?.movie.overview}
                        </>
                        }
                    </MovieContent>
                    <MovieDetailInfo>
                        <div>
                            <span onClick ={onChangeZzim}>
                                { zzim
                                    ? <AiOutlineCheckCircle size="30" color="red" /> :  <BsPlusCircle size="30"  />}
                            </span>
                            <span onClick ={onChangeLike} style={{ marginLeft: "18px"}}>
                                { like ? <BsHandThumbsUpFill size="30" /> :  <BsHandThumbsUp size="30" />}
                            </span>
                        </div>
                        <div>
                            <span className="firstInfo">카테고리: </span>
                            {CategoryName?.map((category: string) => {
                                return (
                                    <span style={{marginRight: "7px"}}>{category}</span>
                                )
                            })}
                        </div>
                        <div>
                            {movieDetail?.movie.originCountry &&
                                <>
                                    <span className="firstInfo">국가: </span>
                                    <span>{movieDetail?.movie.originCountry}</span>   
                                </>
                            }
                        </div>
                        <div>
                            <span className="firstInfo">개봉일: </span>
                            <span>{movieDetail?.movie.releaseDate}</span>
                        </div>
                    </MovieDetailInfo>
                </MovieContainer>
                
            </DetailContainer>
        </DetailBackground>
    )
})

export default Detail;

