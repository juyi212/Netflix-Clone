import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { UserContext } from '@layouts/User';
import userfetcher from '@utils/userfetcher';
import { Box, Container, Image } from './styles';
import { Link } from 'react-router-dom';

const zzimData = [
    { name : "왕0"},
    { name : "왕1"},
    { name : "왕2"},
    { name : "왕3"},
    { name : "왕4"},
    { name : "왕5"},
    { name : "왕5"},
    { name : "왕5"},
    { name : "왕5"},
    { name : "왕5"},
    { name : "왕5"},
]

const MyList = React.memo(() => {
    const context = useContext(UserContext)

    // const { data: zzimData, error, mutate } = useSWR(
    //     context.userData && `${process.env.REACT_APP_SERVICE_PORT}/movie/movie_zzim?userNo=${context.userData?.user.uNo}`, userfetcher, {
    //     revalidateOnMount:true
    // });
    
        

    return (
        <div style={{ marginTop : "150px"}}>
            <Container style={{color: "white", textAlign:"center"}}>
                {zzimData.map(() => {
                    return (
                        <Box>
                            <Link
                                to={`/my-list/`} // 수정 필요 
                                    >
                                <Image src="/assets/banner1.jpg"/>
                            </Link>
                        </Box>
                    )
                })}
            </Container>

        </div>
    )})

export default MyList;