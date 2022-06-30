import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailContainer,Icons, ImageView,Image,MovieContainer, MovieContent, DetailBackground, MovieTitle, MovieDetailInfo } from './styles';
import {AiOutlineCheckCircle, AiOutlineDownCircle} from 'react-icons/ai'
import {BsHandThumbsUp, BsHandThumbsUpFill, BsPlusCircle} from 'react-icons/bs';
import {TiDelete} from 'react-icons/ti'
import useSWR from 'swr';
import fetcher2 from '@utils/fetcher2';
import category from '@utils/category';


const Detail = React.memo(() => {
    const navigate = useNavigate()
    const movieId = useParams().id
    const [like, setLike] = useState(false)
    const [zzim, setZzim] = useState(false)
    
    const { data: movieDetail, error, mutate } = useSWR(
        movieId && `${process.env.REACT_APP_SERVICE_PORT}/movie/movie_detail?movieId=${movieId}`, fetcher2);
    

    console.log(movieDetail?.movie)
    const CategoryName= category(movieDetail?.movie.category).toString();

    const onClickDismiss = () => {
        navigate(-1)
    }
    
    const onChangeZzim = () => {}
    const onChangeLike = () => {}

    useEffect(() => {
        // home 화면 스크롤 방지 
        document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 99%;`
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = '';
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
      }, []);

      
      

    return (
        <DetailBackground>
            
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
                                { zzim ? <AiOutlineCheckCircle size="30" /> :  <BsPlusCircle size="30"  />}
                            </span>
                            <span onClick ={onChangeLike} style={{ marginLeft: "18px"}}>
                                { like ? <BsHandThumbsUpFill size="30" /> :  <BsHandThumbsUp size="30" />}
                            </span>
                        </div>
                        <div>
                            <span className="firstInfo">카테고리: </span>
                            {CategoryName}
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

