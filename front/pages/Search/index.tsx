import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Location } from "history";
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Box, Container, Image, NoData } from '@pages/MyList/styles';
import axios from 'axios';


const Search = React.memo(() => {
    const word = useParams().word
    console.log(word)
    const [mySearch, setMySearch] = useState([])
    
    useEffect(() => {
        if(word) {
            axios.get(`http://3.39.105.32:9000/netflix-clone/movie/search_movie?searchKey=${word}`)
                .then((res) => {
                    setMySearch(res.data)
                })
                .catch((err) => {
                console.log(err)
            })
        }
    },[word])

    return (
        <div style={{ marginTop : "150px"}}>
            <Outlet /> 
            <Container style={{color: "white", textAlign:"center"}}>
                { mySearch.length ? 
                <>
                    {mySearch?.map((searchMovie : any) => {
                        return (
                            <Box>
                                <Link
                                    to={`${location.pathname}/${searchMovie.id}`} // 수정 필요 
                                    >
                                    <Image src={searchMovie.posterPath}/>
                                </Link>
                            </Box>
                        )
                    })}
                </> : 
                <>
                    <NoData>
                        <div>검색 결과가 없습니다.</div>
                    </NoData>
                </>}
            </Container>
        </div>
    )})

export default Search;