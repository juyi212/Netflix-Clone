import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Box, Container, Image, NoData } from '@components/movie-list/styles';
import axios from 'axios';

const Search = React.memo(() => {
  const [searchInput] = useSearchParams();
  let search = searchInput.get('input');
  console.log(location.pathname);
  const [mySearch, setMySearch] = useState([]);

  useEffect(() => {
    if (search) {
      axios
        .get(`http://3.39.105.32:9000/netflix-clone/movie/search_movie?searchKey=${search}`)
        .then((res) => {
          setMySearch(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

  return (
    <div style={{ marginTop: '150px' }}>
      <Outlet />
      <Container style={{ color: 'white', textAlign: 'center' }}>
        {mySearch.length ? (
          <>
            {mySearch?.map((searchMovie: any) => {
              return (
                <Box>
                  <Link
                    to={`${location.pathname}/${searchMovie.id}`} // 수정 필요
                  >
                    <Image src={searchMovie.posterPath} />
                  </Link>
                </Box>
              );
            })}
          </>
        ) : (
          <>
            <NoData>
              <div>검색 결과가 없습니다.</div>
            </NoData>
          </>
        )}
      </Container>
    </div>
  );
});

export default Search;
