import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { DetailContainer, ImageView, MovieCastInfo, MovieContent } from './styles';
import {TiDeleteOutline} from 'react-icons/ti'
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
            `http://3.39.105.32:9000/netflix-clone/movie/movie_detail?movieId=${movieId}`, fetcher2);
    
    console.log(movieDetail)

    // if (!show) {
    //     return null;
    // }
    const onClickDismiss = () => {
        navigate(-1)
    }

    return (
        <DetailContainer>
            <div>
                <TiDeleteOutline size="40" onClick={onClickDismiss}/>
            </div>
            <ImageView>
            </ImageView>
            <MovieContent></MovieContent>
            <MovieCastInfo></MovieCastInfo>
        </DetailContainer>
    )
}

export default Detail;