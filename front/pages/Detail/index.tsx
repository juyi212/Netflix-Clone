import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DetailContainer,Icons, ImageView,Image,MovieContainer, MovieContent, DetailBackground, MovieTitle, MovieDetailInfo } from './styles';
import {TiDelete} from 'react-icons/ti'
import useSWR from 'swr';
import fetcher2 from '@utils/fetcher2';
import category from '@utils/category';


const Detail = React.memo(() => {
    const navigate = useNavigate()
    const movieId = useParams().id
    
    const { data: movieDetail, error, mutate } = useSWR(
        movieId && `http://3.39.105.32:9000/netflix-clone/movie/movie_detail?movieId=${movieId}`, fetcher2);
    

        console.log(movieDetail?.movie)

        const movieCate = () => {
        if (movieDetail?.movie.category) {
            const movieCategory = movieDetail?.movie.category;
            const tempToArray = movieCategory.split(',')
            const CategoryName = category(tempToArray)
            return CategoryName;
        }
        return "없음";
    }

    const onClickDismiss = () => {
        navigate(-1)
    }
    
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
                        {movieDetail?.movie.overview}
                    </MovieContent>
                    <MovieDetailInfo>
                        <div>
                            <span className="firstInfo">카테고리: </span>
                            {movieCate()}
                        </div>
                        <div>
                            <span className="firstInfo">국가: </span>
                            <span>{movieDetail?.movie.originCountry}</span>
                        </div>
                    </MovieDetailInfo>
                </MovieContainer>
                
            </DetailContainer>
        </DetailBackground>
    )
})

export default Detail;

