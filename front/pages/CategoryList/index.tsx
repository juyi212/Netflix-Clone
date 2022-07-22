
import MovieList from '@components/MovieList';
import { UserContext } from '@layouts/User';
import Detail from '@pages/Detail';
import category from '@utils/category';
import fetcher from '@utils/fetcher';
import React, { useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';





const CategoryList = React.memo(() => {
    const genre = useLocation()
    const keyword = useParams()
    const params = new URLSearchParams(genre.search);
    const movieId = params.get("movieId") || "";
    const categoryName = category(keyword.genreId)
    const context = useContext(UserContext)
    const userNo = context?.userData.user.uNo


    const { data: categoryMovieData, error, mutate }  = useSWR(
        `${process.env.REACT_APP_SERVICE_PORT}/movie/category_movie?genreId=${keyword.genreId}&userNo=${userNo}`,
        fetcher, 
        {
            revalidateOnMount:true
        });

    return (
        <div style={{ marginTop : "150px"}}>
            <h1 style={{marginLeft: "50px"}}> {categoryName}관에 오신 것을 환영합니다 ! </h1>
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