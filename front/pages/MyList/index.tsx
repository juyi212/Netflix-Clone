import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { UserContext } from '@layouts/App';
import userfetcher from '@utils/userfetcher';
import { Container } from './styles';

const zzimData = [
    { name : "왕0"},
    { name : "왕1"},
    { name : "왕2"},
    { name : "왕3"},
    { name : "왕4"},
    { name : "왕5"},
]

const MyList = React.memo(() => {
    const context = useContext(UserContext)

    // const { data: zzimData, error, mutate } = useSWR(
    //     context.userData && `http://3.39.105.32:9000/netflix-clone/movie/movie_zzim?userNo=${context.userData?.user.uNo}`, userfetcher, {
    //     revalidateOnMount:true
    // });
    
        

    return (
        <div style={{ marginTop : "150px"}}>
            <Container style={{color: "white"}}>
                {zzimData.map(() => {
                    return (
                        <div>ㅎㅎㅎ</div>
                    )
                })}
            </Container>

        </div>
    )})

export default MyList;