import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { UserContext } from '@layouts/User';
import userfetcher from '@utils/userfetcher';
import { Box, Container, Image, NoData } from './styles';
import { Link, Outlet } from 'react-router-dom';

interface ContentProps {
    from: string;
    movieData: Array<string>;
}

const MovieList = React.memo(({from, movieData}: PropsWithChildren<ContentProps>) => {
    const [goToPage, setGoToPage] = useState("")
    
    useEffect(() => {
        if (from ==="zzim") {
            setGoToPage("/my-list")
        } else {
            setGoToPage("")
        }
    },[])

    return (
            <Container style={{color: "white", textAlign:"center"}}>
            {movieData?.length !== 0 ? 
                <>
                {movieData?.map((data: any) => {
                    return (
                        <Box>
                            <Link
                                to={`/my-list/${data.id}`} // 수정 필요 
                                >
                                <Image src={data.posterPath}/>
                            </Link>
                        </Box>
                    )
                })}
                </> :
                <>
                    <NoData>
                        <div>찜한 목록이 없습니다.</div>
                    </NoData>
                </>
            }
            </Container>
    )})

export default MovieList;