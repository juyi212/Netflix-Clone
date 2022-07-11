import React, { useCallback, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { UserContext } from '@layouts/User';
import userfetcher from '@utils/userfetcher';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import MovieList from '@components/MovieList';
import Detail from '@pages/Detail';


const MyList = React.memo(() => {
    const context = useContext(UserContext)
    const genre = useLocation()
    const params = new URLSearchParams(genre.search);
    const movieId = params.get("movieId") || "";

    const { data: zzimData, error, mutate } = useSWR(
        context.userData && `${process.env.REACT_APP_SERVICE_PORT}/movie/movie_zzim?userNo=${context.userData?.user.uNo}`, userfetcher, {
        revalidateOnMount:true
    });
        

    return (
        <div style={{ marginTop : "150px"}}>
            <MovieList movieData = {zzimData}/>
            { movieId && <Detail />}
        </div>
    )})

export default MyList;