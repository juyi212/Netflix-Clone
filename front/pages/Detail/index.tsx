import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DetailContainer,Icons, ImageView,Image,MovieContainer, MovieCastInfo, MovieContent } from './styles';
import {TiDelete} from 'react-icons/ti'
import useSWR from 'swr';
import fetcher2 from '@utils/fetcher2';

// interface ContentProps {
//     show: boolean;
//     onCloseDetail: () => void;
//   }

// ({show, onCloseDetail}: PropsWithChildren<ContentProps>
const Detail = () => {
    const navigate = useNavigate()
    const movieId = useParams().id
    
    const { data: movieDetail, error, mutate } = useSWR(
        movieId && `http://3.39.105.32:9000/netflix-clone/movie/movie_detail?movieId=${movieId}`, fetcher2);
    console.log(movieDetail?.overview)

    const onClickDismiss = () => {
        navigate(-1)
    }

    useEffect(() => {
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
        <DetailContainer>
            <Icons>
                <TiDelete size="50" onClick={onClickDismiss} color="black"/>
            </Icons>
            <ImageView>
                <Image src={movieDetail?.posterPath}/>
            </ImageView>
            
            <MovieContainer>
                <MovieContent>
                    
                </MovieContent>
                <MovieCastInfo></MovieCastInfo>
            </MovieContainer>
        </DetailContainer>
    )
}

export default Detail;