import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { UserContext } from '@layouts/User';
import userfetcher from '@utils/userfetcher';
import { Box, Container, Image, NoData } from './styles';
import { Link, Outlet } from 'react-router-dom';


const MyList = React.memo(() => {
    const context = useContext(UserContext)

    const { data: zzimData, error, mutate } = useSWR(
        context.userData && `${process.env.REACT_APP_SERVICE_PORT}/movie/movie_zzim?userNo=${context.userData?.user.uNo}`, userfetcher, {
        revalidateOnMount:true
    });
        

    return (
        <div style={{ marginTop : "150px"}}>
            <Outlet />
            <Container style={{color: "white", textAlign:"center"}}>
            {zzimData?.length !== 0 ? 
                <>
                {zzimData?.map((zzim: any) => {
                    return (
                        <Box>
                            <Link
                                to={`/my-list/${zzim.id}`} // 수정 필요 
                                >
                                <Image src={zzim.posterPath}/>
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

        </div>
    )})

export default MyList;