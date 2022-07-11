
import MovieList from '@components/MovieList';
import { Container } from '@components/MovieList/styles';
import Detail from '@pages/Detail';
import { Box, NoData,Image } from '@pages/Search/styles';
import category from '@utils/category';
import fetcher2 from '@utils/fetcher2';
import React from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';





const CategoryList = React.memo(() => {
    const genre = useLocation()
    const keyword = useParams()
    const params = new URLSearchParams(genre.search);
    const movieId = params.get("movieId") || "";
    console.log(movieId)


    const { data: categoryMovieData, error, mutate }  = useSWR(
        `${process.env.REACT_APP_SERVICE_PORT}/movie/category_movie?genreId=${keyword.genreId}`,
        fetcher2, 
        {
            revalidateOnMount:true
        });
    // 이름 유지를 어떻게 해야할깡 
        console.log(categoryMovieData)
    const categoryName = category(keyword.id)

    return (
        <div style={{ marginTop : "150px"}}>
            <h1> {categoryName}관에 오신 것을 환영합니다 ! </h1>
            <MovieList from={`${genre.pathname}`} movieData = {categoryMovieData}/>
            { movieId && <Detail />}
            {/* <Container style={{color: "white", textAlign:"center"}}>
            {categoryMovieData?.length !== 0 ? 
                <>
                {categoryMovieData?.map((data: any) => {
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
            </Container> */}
        </div>
    )})

export default CategoryList;