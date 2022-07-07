import React, { useCallback, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { UserContext } from '@layouts/User';
import userfetcher from '@utils/userfetcher';
import { Link, Outlet } from 'react-router-dom';
import MovieList from '@components/MovieList';


const MyList = React.memo(() => {
    const context = useContext(UserContext)

    const { data: zzimData, error, mutate } = useSWR(
        context.userData && `${process.env.REACT_APP_SERVICE_PORT}/movie/movie_zzim?userNo=${context.userData?.user.uNo}`, userfetcher, {
        revalidateOnMount:true
    });
        

    return (
        <div style={{ marginTop : "150px"}}>
            <Outlet />
            <MovieList from={"zzim"} movieData = {zzimData}/>
        </div>
    )})

export default MyList;